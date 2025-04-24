import { supabase } from './supabase';

export async function getProyectos() {
  const { data, error } = await supabase
    .from('Proyectos')
    .select('ID_Proyecto, Nombre, ID_Cliente, Descripcion, Status, ID_DeliveryLead, fecha_inicio, fecha_fin');

  if (error) {
    console.error('Error fetching proyectos:', error);
    throw error;
  }

  return data; // Devuelve los proyectos obtenidos
}