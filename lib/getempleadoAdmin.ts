import { supabase } from './supabase';

export async function getEmpleados() {
  const { data, error } = await supabase
    .from('Empleado')
    .select(`
      ID_Empleado,
      Nombre,
      Contacto (
        PK_Contacto,
        Email,
        Num_Telefono
      ),
      Rol,
      Departamento:ID_Departamento (Nombre),
      FechaContratacion,
      Nivel
    `);

  if (error) throw error;
  
  // Ensure Contacto and Departamento are always arrays, even if null
  return data?.map(empleado => ({
    ...empleado,
    Contacto: empleado.Contacto || [],
    Departamento: Array.isArray(empleado.Departamento) ? 
                 empleado.Departamento : 
                 empleado.Departamento ? [empleado.Departamento] : []
  })) || [];
}








