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
        Documento,
        Verificacion,
        Descripcion
      ),
      Departamento:ID_Departamento (
        Nombre,
        Descripcion
      )
    `);

  if (error) throw error;

  return data?.map((empleado) => ({
    ...empleado,
    Departamento: empleado.Departamento || { Nombre: "Sin departamento", Descripcion: "" }, // Manejar departamentos nulos
  })) || [];
}

export async function handlePeopleLeadActions(employeeId: string) {
  try {
    const { error } = await supabase
      .from('People_lead')
      .insert({
        ID_Empleado: employeeId, // ID del empleado que será el People Lead
      });

    if (error) {
      console.error('Error al agregar el People Lead:', error);
      throw error;
    }

    console.log('People Lead agregado exitosamente');
    return { success: true };
  } catch (error) {
    console.error('Error en handlePeopleLeadActions:', error);
    return { success: false, error };
  }
}







