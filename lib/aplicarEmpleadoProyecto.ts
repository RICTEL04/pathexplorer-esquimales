import { supabase } from './supabase';

/**
 * Inserts a new record into the Empleado_Proyectos table.
 * @param ID_Empleado - The ID of the employee.
 * @param ID_Proyecto - The ID of the project.
 * @returns A promise that resolves to true if the insertion is successful, or false if it fails.
 */
export const aplicarEmpleadoProyecto = async (
  ID_Empleado: string,
  ID_Proyecto: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('Empleado_Proyectos')
      .insert({
        ID_Empleado,
        ID_Proyecto,
      });

    if (error) {
      console.error('Error inserting into Empleado_Proyectos:', error);
      return false;
    }

    console.log(`Successfully applied to project ${ID_Proyecto} for employee ${ID_Empleado}`);
    return true;
  } catch (error) {
    console.error('Unexpected error applying to project:', error);
    return false;
  }
};