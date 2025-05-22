import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {Meta, Revisor_Meta} from "./metasDefinitions"

export async function fetchSession(setLoading: (loading: boolean) => void) {
    // Obtener la sesión actual
    const { data: { session } } = await supabase.auth.getSession();
    return session;
};

export async function fetchMetas(employeeID: string, setLoading: (loading: boolean) => void) {
  try {
    // Consulta con JOIN para obtener metas y sus revisores con nombres
    const { data, error } = await supabase
      .from("Metas")
      .select(`
        *,
        Revisores:Revisor_Meta(
          *,
          Revisor:Empleado!Revisor_Meta_ID_EmpleadoRevisor_fkey(Nombre)
        )
      `)
      .eq("ID_Empleado", employeeID);

    if (error) throw error;

    // Transformar la estructura de datos con tipado correcto
    const metasWithRevisores: Meta[] = data?.map(meta => {
      // Definimos el tipo explícitamente para evitar el error "Parameter 'r' implicitly has an 'any' type"
      const revisores = meta.Revisores?.map((r: any): Revisor_Meta => ({
        ID_Revisor: r.ID_Revisor,
        ID_EmpleadoRevisor: r.ID_EmpleadoRevisor,
        ID_meta: r.ID_meta,
        ID_Empleado: r.ID_Empleado,
        Retroalimentacion: r.Retroalimentacion,
        Nombre: r.Revisor?.Nombre || 'Sin nombre'
      })) || [];
      
      return {
        ID_meta: meta.ID_meta,
        Nombre: meta.Nombre,
        Tipo_Meta: meta.Tipo_Meta,
        Plazo: meta.Plazo,
        Descripcion: meta.Descripcion,
        Fecha_Inicio: meta.Fecha_Inicio,
        Fecha_limite: meta.Fecha_limite,
        ID_Empleado: meta.ID_Empleado,
        Registrada: meta.Registrada,
        Estado: meta.Estado,
        Self_Reflection: meta.Self_Reflection,
        Revisores: revisores
      };
    }) || [];

    console.log("Metas con revisores:", metasWithRevisores);
    return metasWithRevisores;
  } catch (error) {
    console.error("Error fetching metas:", error);
    throw error;
  } finally {
    setLoading(false);
  }
}

export async function insertMeta(meta: Meta) {
  try {
    // 1. Upsert para la meta principal
    const { data: metaData, error: metaError } = await supabase
      .from("Metas")
      .upsert({
        ID_meta: meta.ID_meta || undefined, // Si no tiene ID, se inserta nueva
        ID_Empleado: meta.ID_Empleado,
        Nombre: meta.Nombre,
        Tipo_Meta: meta.Tipo_Meta,
        Plazo: meta.Plazo,
        Descripcion: meta.Descripcion,
        Fecha_Inicio: meta.Fecha_Inicio,
        Fecha_limite: meta.Fecha_limite,
        Registrada: meta.Registrada,
        Estado: meta.Estado,
        Self_Reflection: meta.Self_Reflection
      })
      .select();

    if (metaError) throw metaError;
    
    if (!metaData || metaData.length === 0) {
      throw new Error("No se pudo realizar el upsert de la meta");
    }
    
    const metaId = metaData[0].ID_meta;
    
    // 2. Eliminar los revisores existentes para esta meta (si es actualización)
    if (meta.ID_meta) {
      const { error: deleteError } = await supabase
        .from("Revisor_Meta")
        .delete()
        .eq("ID_meta", meta.ID_meta);
        
      if (deleteError) throw deleteError;
    }
    
    // 3. Insertar los revisores de la meta
    if (meta.Revisores && meta.Revisores.length > 0) {
      const revisorInserts = meta.Revisores.map(revisor => ({
        ID_EmpleadoRevisor: revisor.ID_EmpleadoRevisor,
        ID_meta: metaId,
        ID_Empleado: meta.ID_Empleado,
        Retroalimentacion: revisor.Retroalimentacion
      }));
      
      const { error: revisoresError } = await supabase
        .from("Revisor_Meta")
        .insert(revisorInserts);
      
      if (revisoresError) throw revisoresError;
    }
    
    return metaData[0];
  } catch (error) {
    console.error("Error en upsert de meta:", error);
    throw error;
  }
}

export async function updateMeta(updatedMeta: Meta) {
  try {
    // 1. Actualizar la meta principal
    const { data: metaData, error: metaError } = await supabase
      .from("Metas")
      .update({
        Nombre: updatedMeta.Nombre,
        Tipo_Meta: updatedMeta.Tipo_Meta,
        Plazo: updatedMeta.Plazo,
        Descripcion: updatedMeta.Descripcion,
        Fecha_Inicio: updatedMeta.Fecha_Inicio,
        Fecha_limite: updatedMeta.Fecha_limite,
        Registrada: updatedMeta.Registrada,
        Estado: updatedMeta.Estado,
        Self_Reflection: updatedMeta.Self_Reflection
      })
      .eq("ID_meta", updatedMeta.ID_meta)
      .select();

    if (metaError) throw metaError;
    
    // 2. Eliminar los revisores actuales para esta meta
    const { error: deleteError } = await supabase
      .from("Revisor_Meta")
      .delete()
      .eq("ID_meta", updatedMeta.ID_meta);
      
    if (deleteError) throw deleteError;
    
    // 3. Insertar los nuevos revisores
    if (updatedMeta.Revisores && updatedMeta.Revisores.length > 0) {
      const revisorInserts = updatedMeta.Revisores.map(revisor => ({
        ID_EmpleadoRevisor: revisor.ID_EmpleadoRevisor,
        ID_meta: updatedMeta.ID_meta,
        ID_Empleado: updatedMeta.ID_Empleado,
        Retroalimentacion: revisor.Retroalimentacion
      }));
      
      const { error: insertError } = await supabase
        .from("Revisor_Meta")
        .insert(revisorInserts);
        
      if (insertError) throw insertError;
    }
    
    return metaData;
  } catch (error) {
    console.error("Error updating meta:", error);
    throw error;
  }
}

// Función para obtener revisores disponibles (empleados que pueden ser revisores)
export async function fetchRevisores() {
  try {
    const { data, error } = await supabase
      .from("Empleado")
      .select("ID_Empleado, Nombre");
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching revisores:", error);
    throw error;
  }
}

export async function deleteMeta(metaId: string): Promise<void> {
  try {
    // 1. Primero eliminamos los revisores asociados a la meta
    const { error: deleteRevisoresError } = await supabase
      .from('Revisor_Meta')
      .delete()
      .eq('ID_meta', metaId);

    if (deleteRevisoresError) {
      throw deleteRevisoresError;
    }

    // 2. Luego eliminamos la meta principal
    const { error: deleteMetaError } = await supabase
      .from('Metas')
      .delete()
      .eq('ID_meta', metaId);

    if (deleteMetaError) {
      throw deleteMetaError;
    }

    console.log(`Meta ${metaId} y sus revisores eliminados correctamente`);
  } catch (error) {
    console.error('Error al eliminar la meta:', error);
    throw new Error('No se pudo eliminar la meta');
  }
}

export default {
  fetchSession,
  fetchMetas,
  insertMeta,
  updateMeta,
  fetchRevisores
};

// Función para obtener todas las metas donde un empleado es revisor
export async function fetchMetasAsRevisor(revisorID: string, setLoading: (loading: boolean) => void) {
  try {
    // Consulta para obtener todas las metas donde el empleado es revisor
    const { data, error } = await supabase
      .from("Revisor_Meta")
      .select(`
        *,
        Metas:Metas(
          ID_meta,
          Nombre,
          Tipo_Meta,
          Plazo,
          Descripcion,
          Fecha_Inicio,
          Fecha_limite,
          ID_Empleado,
          Registrada,
          Estado,
          Self_Reflection
        ),
        EmpleadoDueno:Empleado!Revisor_Meta_ID_Empleado_fkey(
          Nombre
        )
      `)
      .eq("ID_EmpleadoRevisor", revisorID);

    if (error) throw error;
    
    if (!data || data.length === 0) {
      return [];
    }

    // Filtrar las metas según los criterios especificados
    const metasFiltradas = data.filter(item => {
      // Si la meta está completada o cancelada Y no hay retroalimentación, excluirla
      if (
        (item.Metas.Estado === "Completada" || item.Metas.Estado === "Cancelada") && 
        item.Retroalimentacion !== null
      ) {
        return false;
      }
      return true;
    });

    // Obtener IDs de las metas filtradas
    const metaIds = metasFiltradas.map(item => item.ID_meta).filter(id => id !== null);
    
    if (metaIds.length === 0) {
      return [];
    }

    // Obtener todos los revisores para las metas encontradas
    const { data: revisoresData, error: revisoresError } = await supabase
      .from("Revisor_Meta")
      .select(`
        *,
        Revisor:Empleado!Revisor_Meta_ID_EmpleadoRevisor_fkey(
          Nombre
        )
      `)
      .in("ID_meta", metaIds);

    if (revisoresError) throw revisoresError;

    // Agrupar revisores por ID_meta
    const revisoresPorMeta: Record<string, Revisor_Meta[]> = {};
    
    revisoresData?.forEach(r => {
      if (!revisoresPorMeta[r.ID_meta]) {
        revisoresPorMeta[r.ID_meta] = [];
      }
      
      revisoresPorMeta[r.ID_meta].push({
        ID_Revisor: r.ID_Revisor,
        ID_EmpleadoRevisor: r.ID_EmpleadoRevisor,
        ID_meta: r.ID_meta,
        ID_Empleado: r.ID_Empleado,
        Retroalimentacion: r.Retroalimentacion,
        Nombre: r.Revisor?.Nombre || 'Sin nombre'
      });
    });

    // Transformar los datos al formato Meta[]
    const metasComoRevisor: Meta[] = metasFiltradas.map(item => {
      const metaData = item.Metas;
      
      return {
        ID_meta: metaData.ID_meta,
        Nombre: metaData.Nombre,
        Tipo_Meta: metaData.Tipo_Meta,
        Plazo: metaData.Plazo,
        Descripcion: metaData.Descripcion,
        Fecha_Inicio: metaData.Fecha_Inicio,
        Fecha_limite: metaData.Fecha_limite,
        ID_Empleado: metaData.ID_Empleado,
        Registrada: metaData.Registrada,
        Estado: metaData.Estado,
        Self_Reflection: metaData.Self_Reflection,
        Revisores: revisoresPorMeta[item.ID_meta] || [],
        NombreEmpleado: item.EmpleadoDueno?.Nombre || 'Sin nombre'
      };
    });

    console.log("Metas como revisor filtradas:", metasComoRevisor);
    return metasComoRevisor;
  } catch (error) {
    console.error("Error fetching metas as revisor:", error);
    throw error;
  } finally {
    setLoading(false);
  }
}

export async function updateMetaRegistrada(metaID: string, registrada: boolean) {
  try {
    const { data, error } = await supabase
      .from("Metas")
      .update({ Registrada: registrada })
      .eq("ID_meta", metaID)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating meta registration status:", error);
    throw error;
  }
}

/**
 * Actualiza el estado de una meta
 * @param metaID ID de la meta a actualizar
 * @param estado Nuevo estado de la meta
 */
export async function updateMetaEstado(metaID: string, estado: string) {
  try {
    const { data, error } = await supabase
      .from("Metas")
      .update({ Estado: estado })
      .eq("ID_meta", metaID)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating meta status:", error);
    throw error;
  }
}

export async function updateMetaRevision(
  meta: Meta,
  estado: string,
  revisorID?: string,
  retroalimentacion?: string
) {
  try {
    // 1. Actualizar el estado de la meta
    const { data: metaData, error: metaError } = await supabase
      .from("Metas")
      .update({ Estado: estado })
      .eq("ID_meta", meta.ID_meta)
      .select();

    if (metaError) {
      throw metaError;
    }
    
    // 2. Actualizar la retroalimentación del revisor específico
    const { data: revisorData, error: revisorError } = await supabase
      .from("Revisor_Meta")
      .update({ Retroalimentacion: retroalimentacion })
      .eq("ID_meta", meta.ID_meta)
      .eq("ID_EmpleadoRevisor", revisorID)
      .select();
      
    if (revisorError) {
      throw revisorError;
    }
    
    // Verificar si se actualizó correctamente el revisor
    if (!revisorData || revisorData.length === 0) {
      throw new Error("No se encontró el registro del revisor para actualizar");
    }
    
    return {
      meta: metaData?.[0],
      revisor: revisorData[0]
    };
  } catch (error) {
    console.error("Error updating meta revision:", error);
    throw error;
  }
}