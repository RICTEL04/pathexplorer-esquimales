import { supabase } from './supabase';

export async function deleteCertificado(idCertificado: string) {
    const { error } = await supabase
      .from('Certificados')
      .delete()
      .eq('ID_Certificado', idCertificado);
  
    if (error) {
      console.error('Error deleting certificado:', error);
      throw error;
    }
  
    return true; 
  }