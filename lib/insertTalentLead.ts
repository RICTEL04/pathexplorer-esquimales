import { supabase } from './supabase';

export async function handleTalentLeadActions(Employee:string) {
    const { error: dbError } = await supabase
        .from('Talent_Lead')
        .insert({
            ID_Empleado: Employee,
        });
      
      if (dbError) throw dbError;
  }