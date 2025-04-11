import { supabase } from './supabase';

// Ejemplo de función para eliminar un rol (deberías implementar todas)
export  const handleRemovePeopleLead = async (employeeId: string) => {
    try {
      const { error } = await supabase
        .from('People_lead')
        .delete()
        .eq('ID_Empleado', employeeId);
  
      if (error) throw error;
      
    } catch (error) {
      console.error('Error al eliminar People Lead:', error);
      throw error;
    }
  };

  export  const handleRemoveCapabilityLead  = async (employeeId: string) => {
    try {
        const { error } = await supabase
        .from('Capability_Lead')
        .delete()
        .eq('ID_Empleado', employeeId);
      if (error) throw error;
      
    } catch (error) {
      console.error('Error al eliminar Capability Lead:', error);
      throw error;
    }
  };

  export  const handleRemoveDeliveryLead  = async (employeeId: string) => {
    try {
        const { error } = await supabase
        .from('Delivery_Lead')
        .delete()
        .eq('ID_Empleado', employeeId);
      if (error) throw error;
      
    } catch (error) {
      console.error('Error al eliminar Delivery Lead:', error);
      throw error;
    }
  };

  export  const handleRemoveTalentLead  = async (employeeId: string) => {
    try {
        const { error } = await supabase
        .from('Talent_Lead')
        .delete()
        .eq('ID_Empleado', employeeId);
      if (error) throw error;
      
    } catch (error) {
      console.error('Error al eliminar Talent Lead:', error);
      throw error;
    }
  };

