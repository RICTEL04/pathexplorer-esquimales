import { supabase } from './supabase';

export async function handlePeopleLeadActions(Employee:string) {
    const { error: dbError } = await supabase
        .from('People_lead')
        .insert({
            ID_Empleado: Employee,
          });
      
      if (dbError) throw dbError;
  }