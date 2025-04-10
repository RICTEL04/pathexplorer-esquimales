import { supabase } from './supabase';

export async function updateCertificado(ID_Certificado: string, verificacion: boolean, descripcion: string) {
  const { data, error } = await supabase
    .from('Certificados') // Nombre de la tabla
    .update({
      Verificacion: verificacion,
      Descripcion: descripcion,
    })
    .eq('ID_Certificado', ID_Certificado); // Filtrar por el ID del certificado

  if (error) {
    console.error('Error al actualizar el certificado:', error);
    throw error;
  }

  return data;
}