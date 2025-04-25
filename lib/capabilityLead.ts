import { supabase } from './supabase';

export async function getCapabilityLead() {
    const { data, error } = await supabase
  .from('Empleado')
  .select(`
    ID_Empleado,
    Nombre,
    Rol,
    Nivel,
    FechaContratacion,
    FechaUltNivel,
    Puesto_proyecto (
        id,
        created_at,
        Puesto,
        Proyectos (
          ID_Proyecto,
          Nombre
        )
    )
  `);
    
    if (error) throw error
    return data
  }