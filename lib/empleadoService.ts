import { supabase } from './supabase';

export async function getEmpleados() {
  const { data, error } = await supabase
    .from('Empleado')
    .select(`
      ID_Empleado,
      Nombre,
      Rol,
      Nivel,
      FechaContratacion,
      ID_Departamento,
      Certificados (
        ID_Certificado,
        Nombre,
        Fecha_caducidad,
        Documento,
        Verificacion,
        Descripcion
      ),
      Puesto_proyecto (
        id,
        created_at,
        Puesto,
        Proyectos (
          ID_Proyecto,
          fecha_inicio,
          fecha_fin,
          Nombre,
          Descripcion
        )
      ),
        Capability_Lead (
          ID_Empleado,
          ID_Departamento,
          ID_CapabilityLead,
          Departamento (
            Nombre,
            Descripcion
            
          )
        )
    `);
    
    interface CapabilityLead {
      ID_Empleado: any;
      ID_Departamento: any;
      ID_CapabilityLead: any;
      Departamento: {
        Nombre: any;
        Descripcion: any;
      }[];
    }
    
    interface Empleado {
      ID_Empleado: any;
      Nombre: any;
      Rol: any;
      Nivel: any;
      FechaContratacion: any;
      ID_Departamento: any;
      Certificados: any[];
      Puesto_proyecto: any[];
      Capability_Lead: CapabilityLead[]; // Especificar que es un array
    }
    
  if (error) throw error;

   
  data.forEach((empleado) => {
    const idDepartamentoCapabilityLead = empleado.Capability_Lead?.[0]?.ID_Departamento;
  
    if (idDepartamentoCapabilityLead) {
      console.log(`ID_Departamento del Capability Lead: ${idDepartamentoCapabilityLead}`);
    } else {
      console.log('Este empleado no tiene un Capability Lead asociado.');
    }   
  });

  
  

  // Devolver los datos tal como los proporciona Supabase
  return data || [];
}


