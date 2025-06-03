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
  Puesto_proyecto: PuestoProyecto[];
  Proyectos: Proyecto[]; // Assuming this is a direct relation, adjust if needed
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
      Empleado_Proyectos (
        id,
        ID_Empleado,
        ID_Proyecto,
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