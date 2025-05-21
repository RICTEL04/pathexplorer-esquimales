import { supabase } from './supabase';

export async function getCapability() {
    const { data, error } = await supabase
    .from('Capability_Lead')
    .select(`
      ID_Empleado,
      ID_Departamento,
      Empleado (
        Nombre,
        Nivel,
        Rol
      ),
      Departamento (
        Nombre
      )  
    `);}