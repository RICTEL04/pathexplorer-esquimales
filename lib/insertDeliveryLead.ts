import { supabase } from './supabase';

export async function handleDeliveryLeadActions(Employee:string) {
    const { error: dbError } = await supabase
        .from('Delivery_Lead')
        .insert({
            ID_Empleado: Employee,
          });
      
      if (dbError) throw dbError;
  }