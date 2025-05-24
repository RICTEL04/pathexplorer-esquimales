import { supabase } from './supabase';

export interface Proyecto {
  ID_Proyecto: any;
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
  Puesto_proyecto: PuestoProyecto[];
  Capability_Lead: CapabilityLead[]; // Adjusted to match the returned array structure
  Delivery_Lead: DeliveryLead[]; // Adjusted to match the returned array structure
  Metas: Metas[]; // Assuming Metas is defined elsewhere
}



export async function getEmpleados(): Promise<Empleado[]> {
  const { data, error } = await supabase
    .from('Empleado')
    .select(`
      ID_Empleado,
      Nombre,
      Rol,
      Nivel,
      FechaContratacion,
      ID_Departamento,
      Metas (
        ID_meta,
        ID_Empleado,
        Nombre,
        Descripcion,
        Tipo_Meta,
        Plazo,
        Fecha_limite
      ),
      Certificados (
        ID_Certificado,
        Nombre,
        Fecha_caducidad,
        Documento,
        Verificacion,
        Descripcion
      ),
      Puesto_proyecto (
        id,
        created_at,
        Puesto,
        Proyectos (
          ID_Proyecto,
          fecha_inicio,
          fecha_fin,
          Nombre,
          Descripcion
        )
      ),
      Capability_Lead (
        ID_Empleado,
        ID_Departamento,
        ID_CapabilityLead,
        Departamento (
          Nombre,
          Descripcion
        )
      ),
      Delivery_Lead (
        ID_DeliveryLead,
        ID_Empleado,
        Proyectos (
          ID_Proyecto,
          Nombre,
          Descripcion,
          Status,
          fecha_inicio,
          fecha_fin
        )
      )
    `);

  if (error) throw error;

  console.log('Empleados:', data);

  return data as Empleado[];
}