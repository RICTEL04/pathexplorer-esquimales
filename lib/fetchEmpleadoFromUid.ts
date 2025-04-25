import { supabase } from './supabase';

export const fetchEmpleadoFromUid = async (userId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('Empleado')
      .select('Nombre')
      .eq('ID_Empleado', userId)
      .single();

    if (error) {
      console.error('Error fetching empleado from userId:', error);
      return null;
    }

    return data?.Nombre || null;
  } catch (error) {
    console.error('Unexpected error fetching empleado from userId:', error);
    return null;
  }
};