import { supabase } from './supabase';

export interface Proyecto {
  ID_Proyecto: string;
  Nombre: string;
  ID_Cliente: string;
  Descripcion?: string;
  Status: string;
  ID_DeliveryLead?: string;
  fecha_inicio?: string; // o Date si haces parse
  fecha_fin?: string;    // o Date si haces parse
}

/**
 * Obtiene todos los proyectos.
 */
export async function getProyectos(): Promise<Proyecto[]> {
  const { data, error } = await supabase
    .from<Proyecto>("Proyectos")
    .select("ID_Proyecto, Nombre, ID_Cliente, Descripcion, Status, ID_DeliveryLead, fecha_inicio, fecha_fin");

  if (error) {
    console.error("Error fetching proyectos:", error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene proyectos específicos por sus IDs.
 * @param proyectoIds Array con los IDs de los proyectos a obtener.
 */
export async function fetchProyectos(proyectoIds: string[]): Promise<Proyecto[]> {
  if (proyectoIds.length === 0) return [];

  const { data, error } = await supabase
    .from<Proyecto>("Proyectos")
    .select("ID_Proyecto, Nombre, ID_Cliente, Status")
    .in("ID_Proyecto", proyectoIds);

  if (error) {
    console.error("Error fetching proyectos by IDs:", error);
    throw error;
  }

  return data || [];
}