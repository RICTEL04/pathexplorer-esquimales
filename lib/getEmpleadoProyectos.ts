import { supabase } from './supabase';

/**
 * Fetches the ID_Proyecto column from the Empleado_Proyectos table that matches the given ID_Empleado.
 * @param ID_Empleado - The ID of the employee.
 * @returns A promise that resolves to an array of project IDs or an empty array if no matches are found.
 */
export const getEmpleadoProyectos = async (ID_Empleado: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('Empleado_Proyectos')
      .select('ID_Proyecto') // Select only the ID_Proyecto column
      .eq('ID_Empleado', ID_Empleado);

    if (error) {
      console.error('Error fetching Empleado_Proyectos:', error);
      return [];
    }

    console.log(`Fetched project IDs for employee ${ID_Empleado}:`, data);
    return data?.map((row) => row.ID_Proyecto) || [];
  } catch (error) {
    console.error('Unexpected error fetching Empleado_Proyectos:', error);
    return [];
  }
};