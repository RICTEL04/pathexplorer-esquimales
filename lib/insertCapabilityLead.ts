import { supabase } from './supabase';

export async function handleCapabilityLeadActions(Employee:string) {
    const { error: dbError } = await supabase
        .from('Capability_Lead')
        .insert({
            ID_Empleado: Employee,
          });
      
      if (dbError) throw dbError;
  }