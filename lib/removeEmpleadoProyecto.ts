import { supabase } from './supabase';

/**
 * Deletes an entry from the Empleado_Proyectos table based on ID_Empleado and ID_Proyecto.
 * @param ID_Empleado - The ID of the employee.
 * @param ID_Proyecto - The ID of the project.
 * @returns A promise that resolves to true if the deletion is successful, or false if it fails.
 */
export const removeEmpleadoProyecto = async (
  ID_Empleado: string,
  ID_Proyecto: string
): Promise<boolean> => {
  try {
    console.log('Attempting to delete with:', { ID_Empleado, ID_Proyecto }); // Debugging log

    const { error } = await supabase
      .from('Empleado_Proyectos')
      .delete()
      .eq('ID_Empleado', ID_Empleado) // Match the ID_Empleado column
      .eq('ID_Proyecto', ID_Proyecto); // Match the ID_Proyecto column

    if (error) {
      console.error('Error deleting from Empleado_Proyectos:', error);
      return false;
    }

    console.log(`Successfully removed project ${ID_Proyecto} for employee ${ID_Empleado}`);
    return true;
  } catch (error) {
    console.error('Unexpected error deleting from Empleado_Proyectos:', error);
    return false;
  }
};