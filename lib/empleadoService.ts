import { supabase } from './supabase';

export async function getEmpleados() {
    const { data, error } = await supabase
  .from('Empleado')
  .select(`
    ID_Empleado,
    Nombre,
    Rol,
    Nivel,
    Certificados (
      ID_Certificado,
      Nombre,
      Fecha_caducidad,
      Documento
    )
  `);
    
    if (error) throw error
    return data
  }








