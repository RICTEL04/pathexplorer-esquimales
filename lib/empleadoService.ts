import { supabase } from './supabase';

export async function getEmpleados() {
  const { data, error } = await supabase
    .from('Empleado')
    .select(`
      ID_Empleado,
      Nombre,
      Rol,
      Nivel,
      FechaContratacion,
      ID_Departamento,
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
        )
    `);

    
  if (error) throw error;

  // Devolver los datos tal como los proporciona Supabase
  return data || [];
}


