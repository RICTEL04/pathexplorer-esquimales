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

export async function insertMeta(newMeta: Meta) {
  try {
    // 1. Insertar la meta principal
    const { data: metaData, error: metaError } = await supabase
      .from("Metas")
      .insert({
        ID_Empleado: newMeta.ID_Empleado,
        Nombre: newMeta.Nombre,
        Tipo_Meta: newMeta.Tipo_Meta,
        Plazo: newMeta.Plazo,
        Descripcion: newMeta.Descripcion,
        Fecha_Inicio: newMeta.Fecha_Inicio,
        Fecha_limite: newMeta.Fecha_limite,
        Registrada: newMeta.Registrada,
        Estado: newMeta.Estado,
        Self_Reflection: newMeta.Self_Reflection
      })
      .select();

    if (metaError) throw metaError;
    
    // Si no hay datos o no se insertó correctamente
    if (!metaData || metaData.length === 0) {
      throw new Error("No se pudo insertar la meta");
    }
    
    const insertedMetaId = metaData[0].ID_meta;
    
    // 2. Insertar los revisores de la meta
    if (newMeta.Revisores && newMeta.Revisores.length > 0) {
      const revisorInserts = newMeta.Revisores.map(revisor => ({
        ID_EmpleadoRevisor: revisor.ID_EmpleadoRevisor,
        ID_meta: insertedMetaId,
        ID_Empleado: newMeta.ID_Empleado,
        Retroalimentacion: null
      }));
      
      const { error: revisoresError } = await supabase
        .from("Revisor_Meta")
        .insert(revisorInserts);
      
      if (revisoresError) throw revisoresError;
    }
    
    return metaData[0];
  } catch (error) {
    console.error("Error inserting meta:", error);
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

export default {
  fetchSession,
  fetchMetas,
  insertMeta,
  updateMeta,
  fetchRevisores
};

