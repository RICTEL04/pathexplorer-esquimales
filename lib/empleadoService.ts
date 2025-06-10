import { supabase } from './supabase';

export interface Proyecto {
  ID_Proyecto: any;
  ID_DeliveryLead?: any; // Optional, as it is only included in Delivery_Lead
  fecha_inicio: any;
  fecha_fin: any;
  Nombre: any;
  Descripcion: any;
  Status?: any; // Optional, as it is only included in Delivery_Lead
}

export interface Certificado {
  ID_Certificado: any;
  Nombre: any;
  Fecha_caducidad: any;
  Documento: any;
  Verificacion: any;
  Descripcion: any;
}

export interface EmpleadoProyecto {
  id: any;
  ID_Empleado: any;
  ID_Proyecto: any;
  Proyectos: Proyecto[];
}

export interface PuestoProyecto {
  id: any;
  created_at: any;
  Puesto: any;
  Proyectos: Proyecto[];
}

export interface CapabilityLead {
  ID_Empleado: any;
  ID_Departamento: any;
  ID_CapabilityLead: any;
  Departamento: {
    Nombre: any;
    Descripcion: any;
  }[];
}

export interface DeliveryLead {
  ID_DeliveryLead: any;
  ID_Empleado: any;
  Proyectos: Proyecto[];
}

export interface Metas {
  ID_meta: any;
  ID_Empleado: any;
  Nombre: any;
  Descripcion: any;
  Tipo_Meta: any;
  Plazo: any;
  Fecha_limite: any;
}

export interface Empleado {
  ID_Empleado: any;
  Nombre: any;
  Rol: any;
  Nivel: any;
  FechaContratacion: any;
  ID_Departamento: any;
  Certificados: Certificado[];
  Empleado_Proyectos: EmpleadoProyecto[]; // Adjusted to match the returned array structure
  Proyectos: Proyecto[]; // Assuming this is a direct relation, adjust if needed
  Capability_Lead: CapabilityLead[]; // Adjusted to match the returned array structure
  Delivery_Lead: DeliveryLead[]; // Adjusted to match the returned array structure
  Metas: Metas[]; // Assuming Metas is defined elsewhere
}

export async function getEmpleados(peopleLeadId?: string): Promise<Empleado[]> {
  let query = supabase
    .from('Empleado')
    .select(`
      ID_Empleado,
      Nombre,
      Rol,
      Nivel,
      FechaContratacion,
      ID_Departamento,
      Metas(
        ID_meta,
        ID_Empleado,
        Nombre,
        Descripcion,
        Tipo_Meta,
        Plazo,
        Fecha_limite
      ),
      Certificados(
        ID_Certificado,
        Nombre,
        Fecha_caducidad,
        Documento,
        Verificacion,
        Descripcion
      ),
      Puesto_persona(
        ID_Puesto,
        Puesto_proyecto(
          Puesto,
          N_puestos,
          Completo,
          Proyectos(
            ID_Proyecto,
            fecha_inicio,
            fecha_fin,
            Nombre,
            Descripcion,
            Status
          )
        )
      ),
      Capability_Lead(
        ID_Empleado,
        ID_Departamento,
        ID_CapabilityLead,
        Departamento(
          Nombre,
          Descripcion
        )
      ),
      Delivery_Lead(
        ID_Empleado,
        ID_DeliveryLead,
        Proyectos!ID_DeliveryLead(
          ID_Proyecto,
          ID_DeliveryLead,
          fecha_inicio,
          fecha_fin,
          Nombre,
          Descripcion,
          Status
        )
      )
    `);

  // Si se pasa el peopleLeadId, filtra por ese ID
  if (peopleLeadId) {
    query = query.eq('ID_PeopleLead', peopleLeadId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error al obtener los empleados:', error);
    throw error;
  }
  console.log('Datos obtenidos:', data);

  console.log('Empleados:', data);

  // Map the data to ensure all required properties exist
  const empleados: Empleado[] = (data ?? []).map((item: any) => ({
    ID_Empleado: item.ID_Empleado,
    Nombre: item.Nombre,
    Rol: item.Rol,
    Nivel: item.Nivel,
    FechaContratacion: item.FechaContratacion,
    ID_Departamento: item.ID_Departamento,
    Certificados: item.Certificados ?? [],
    Empleado_Proyectos: (Array.isArray(item.Puesto_persona)
      ? item.Puesto_persona.flatMap((pp: any) => {
        const proyectosArr: EmpleadoProyecto[] = [];
        const puestoProyecto = pp.Puesto_proyecto;
        if (puestoProyecto) {
          // Handle array or object for Puesto_proyecto
          const ppArr = Array.isArray(puestoProyecto) ? puestoProyecto : [puestoProyecto];
          ppArr.forEach((ep: any) => {
            // Handle array or object for Proyectos
            const proyectos = ep.Proyectos
              ? Array.isArray(ep.Proyectos) ? ep.Proyectos : [ep.Proyectos]
              : [];
            proyectosArr.push({
              id: ep.id ?? pp.ID_Puesto ?? null,
              ID_Empleado: ep.ID_Empleado ?? item.ID_Empleado,
              ID_Proyecto: ep.ID_Proyecto ?? (proyectos[0]?.ID_Proyecto ?? null),
              Proyectos: proyectos.map((p: any) => ({
                ID_Proyecto: p.ID_Proyecto,
                ID_DeliveryLead: p.ID_DeliveryLead,
                fecha_inicio: p.fecha_inicio,
                fecha_fin: p.fecha_fin,
                Nombre: p.Nombre,
                Descripcion: p.Descripcion,
                Status: p.Status,
              })),
            });
          });
        }
        return proyectosArr;
      })
      : []
    ),
    Proyectos: item.Proyectos ?? [],
    Capability_Lead: item.Capability_Lead ?? [],
    Delivery_Lead: item.Delivery_Lead ?? [],
    Metas: item.Metas ?? [],
  }));

  return empleados;
}