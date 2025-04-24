// lib/employeeService.ts
import { supabase } from './supabase';

// Añadir estas interfaces a las existentes
export interface ProyectoEmpleado {
  idProyecto: string;
  nombreProyecto: string;
  nombreCliente: string;
  puesto: string;
  status: string;
}

export interface PuestoProyecto {
  ID_Proyecto: string;
  Puesto: string;
}

export interface Proyecto {
  ID_Proyecto: string;
  Nombre: string;
  ID_Cliente: string;
  Status: string;
}

export interface Cliente {
  PK_Cliente: string;
  Nombre: string;
}

export interface Empleado_Habilidad
{
  ID_Habilidad : string;
}

export interface Habilidad {
  ID_Habilidad?: string;
  Tipo: string;
  Descripcion: string;
}

export interface Interes {
  ID_Interes: string;
  Descripcion: string;
}

export interface Employee {
  ID_Empleado: string;
  Nombre: string;
  Rol: string;
  Nivel: string;
  ID_Departamento: string;
  Cargabilidad: string;
  ID_CapabilityLead: string | null;
  ID_PeopleLead: string | null;
  Contacto_ID: string;
  FechaContratacion: string;
  FechaUltNivel: string;
  Habilidad: Habilidad;
  Interes: Interes;
  Contacto: Contacto;
  Proyecto: Proyecto;
  Direccion: Direccion;
}

export interface PeopleLead {
  id: string;
  Nombre: string;
  avatarUrl: string;
}

export interface CapabilityLead {
  id: string;
  Nombre: string;
  avatarUrl: string;
}

export interface Contacto {
    Email: string,
    Num_Telefono: string
}

export interface Direccion {
  Num_Casa: string|null;
  Calle: string | null;
  Estado : string | null;
  Pais: string | null;
  Ciudad: string | null;
}

export interface Informe {
  id: string;
  name: string;
}


export interface EmployeeFullData {
  employee: Employee | null;
  peopleLead: PeopleLead | null;
  capabilityLead: CapabilityLead | null;
  informes: Informe[];
  softSkills: Habilidad[]; 
  hardSkills: Habilidad[];  
  intereses : Interes[];
  contacto: Contacto | null;
  proyectos: ProyectoEmpleado[]; // Añadir esta línea
  direccion: Direccion | null;
}

// Helper functions para cada tipo de dato
const fetchEmployee = async (employeeId: string): Promise<Employee | null> => {
  const { data, error } = await supabase
    .from('Empleado')
    .select('*')
    .eq('ID_Empleado', employeeId)
    .single();

  if (error) {
    console.error('Error fetching employee:', error);
    return null;
  }
  return data;
};

const fetchPeopleLead = async (peopleLeadId: string | null): Promise<PeopleLead | null> => {
  if (!peopleLeadId) return null;

  try {
    const { data: peopleLeadRecord, error } = await supabase
      .from('People_lead')
      .select('ID_Empleado')
      .eq('ID', peopleLeadId)
      .single();

    if (error || !peopleLeadRecord) return null;

    const { data: empleadoData, error: empleadoError } = await supabase
      .from('Empleado')
      .select('ID_Empleado, Nombre')
      .eq('ID_Empleado', peopleLeadRecord.ID_Empleado)
      .single();

    if (empleadoError || !empleadoData) return null;

    return {
      id: empleadoData.ID_Empleado,
      Nombre: empleadoData.Nombre,
      avatarUrl: ""
    };
  } catch (error) {
    console.error('Error fetching people lead:', error);
    return null;
  }
};

const fetchCapabilityLead = async (capabilityLeadId: string | null): Promise<CapabilityLead | null> => {
  if (!capabilityLeadId) return null;

  const { data, error } = await supabase
    .from('Capability_Lead')
    .select('ID_CapabilityLead, Nombre')
    .eq('ID_CapabilityLead', capabilityLeadId)
    .single();

  if (error || !data) return null;

  return {
    id: data.ID_CapabilityLead,
    Nombre: data.Nombre,
    avatarUrl: ""
  };
};

const fetchContacto = async (employeeID: string | null): Promise<Contacto | null> => {
  if (!employeeID) return null;

  const { data, error } = await supabase
    .from('Contacto')
    .select('Email, Num_Telefono')
    .eq('ID_empleado', employeeID)
    .single();

  if (error || !data) return null;

  return {
    Email: data.Email,
    Num_Telefono: data.Num_Telefono
  };
};

const fetchDirection = async (employeeID: string | null): Promise<Direccion | null> => {
  if (!employeeID) return null;

  const { data, error } = await supabase
    .from('Direccion')
    .select('Calle, Estado, Pais, Ciudad, Num_Casa')
    .eq('ID_Empleado', employeeID)
    .single();

  if (error || !data) return null;

  return {
    Num_Casa : data.Num_Casa,
    Calle : data.Calle,
    Estado : data.Estado,
    Ciudad : data.Ciudad,
    Pais : data.Pais
    
  };
};

const fetchInformes = async (employeeId: string): Promise<Informe[]> => {
  const { data, error } = await supabase
    .from('Informes')
    .select('id, name')
    .eq('empleado_id', employeeId);

  return error ? [] : data || []; 
};

const fetchHabilidad = async (habilidadId: string): Promise<Habilidad[]> => {
  const { data, error } = await supabase
    .from('Habilidades')
    .select('Tipo, Descripcion')
    .eq('ID_Habilidad', habilidadId);

  return error ? [] : data || [];
};

const fetchAllHabilidades = async (): Promise<Habilidad[]> => {
  const{data, error} = await supabase
    .from('Habilidades')
    .select("ID_Habilidad, Tipo, Descripcion")

    return error ? [] : data || [];
}

const fetchHabilidades = async (habilidadesIds: string[]): Promise<Habilidad[]> => {
  if(habilidadesIds.length === 0) return [];
  const { data, error } = await supabase
    .from('Habilidades')
    .select('Tipo, Descripcion')
    .in('ID_Habilidad', habilidadesIds);

  return error ? [] : data || [];
};

const fetchHabilidadesByType = async (type: 'soft' | 'hard'): Promise<Habilidad[]> => {
  const { data, error } = await supabase
    .from('Habilidades')
    .select('ID_Habilidad, Tipo, Descripcion')
    .eq('Tipo', type);

  return error ? [] : data || [];
};


// Función para obtener las habilidades de un empleado por tipo
const fetchEmployeeHabilidadesByType = async (employeeId: string, type: 'soft' | 'hard'): Promise<Habilidad[]> => {
  try {
    // 1. Obtener todas las habilidades del empleado
    const empleadoHabilidades = await fetchEmpleado_Habilidades(employeeId);
    if (empleadoHabilidades.length === 0) return [];

    // 2. Obtener los datos de las habilidades filtradas por tipo
    const habilidadesIds = empleadoHabilidades.map(eh => eh.ID_Habilidad);
    const { data, error } = await supabase
      .from('Habilidades')
      .select('ID_Habilidad, Tipo, Descripcion')
      .in('ID_Habilidad', habilidadesIds)
      .eq('Tipo', type);

    return error ? [] : data || [];
  } catch (error) {
    console.error(`Error fetching employee ${type} skills:`, error);
    return [];
  }
};

// Funciones específicas para cada tipo
export const getEmployeeSoftSkills = async (employeeId: string): Promise<Habilidad[]> => {
  return fetchEmployeeHabilidadesByType(employeeId, 'soft');
};

export const getEmployeeHardSkills = async (employeeId: string): Promise<Habilidad[]> => {
  return fetchEmployeeHabilidadesByType(employeeId, 'hard');
};

export const getAllSoftSkills = async (): Promise<Habilidad[]> => {
  return fetchHabilidadesByType('soft');
};

export const getAllHardSkills = async (): Promise<Habilidad[]> => {
  return fetchHabilidadesByType('hard');
};


const fetchEmpleado_Habilidades = async (employeeId: string): Promise<Empleado_Habilidad[]> => {
  const { data, error } = await supabase
    .from('Empleado_Habilidades')
    .select('ID_Habilidad')
    .eq('ID_Empleado', employeeId);

  return error ? [] : data || [];
};

const fetchIntereses = async (employeeId: string): Promise<Interes[]> => {
  const { data, error } = await supabase
    .from('Intereses')
    .select('ID_Interes, Descripcion')
    .eq('ID_Empleado', employeeId);

    if (error) {
      console.error('Error fetching intereses:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return [];
    }
    return data || [];
};

const fetchPuestosProyecto = async (employeeId: string): Promise<PuestoProyecto[]> => {
  const { data, error } = await supabase
    .from('Puestos_proyecto')
    .select('ID_Proyecto, Puesto')
    .eq('ID_Empleado', employeeId);

  return error ? [] : data || [];
};

const fetchProyectos = async (proyectoIds: string[]): Promise<Proyecto[]> => {
  if (proyectoIds.length === 0) return [];
  
  const { data, error } = await supabase
    .from('Proyectos')
    .select('ID_Proyecto, Nombre, ID_Cliente, Status')
    .in('ID_Proyecto', proyectoIds);

  return error ? [] : data || [];
};

const fetchClientes = async (clienteIds: string[]): Promise<Cliente[]> => {
  if (clienteIds.length === 0) return [];
  
  const { data, error } = await supabase
    .from('Cliente')
    .select('PK_Cliente, Nombre')
    .in('PK_Cliente', clienteIds);

  return error ? [] : data || [];
};

// Función principal para obtener todos los datos
export const getEmployeeFullData = async (employeeId: string): Promise<EmployeeFullData> => {
  try {
    const employee = await fetchEmployee(employeeId);
    if (!employee) throw new Error('Employee not found');

    const [
      peopleLead,
      capabilityLead,
      contacto,
      informes,
      softSkills,
      hardSkills,
      intereses,
      proyectos,
      direccion
    ] = await Promise.all([
      fetchPeopleLead(employee.ID_PeopleLead),
      fetchCapabilityLead(employee.ID_CapabilityLead),
      fetchContacto(employeeId),
      fetchInformes(employeeId),
      getEmployeeSoftSkills(employeeId),  
      getEmployeeHardSkills(employeeId),  
      fetchIntereses(employeeId),
      getEmployeeProjects(employeeId),
      fetchDirection(employeeId) 
    ]);

    return {
      employee,
      peopleLead,
      capabilityLead,
      contacto,
      informes,
      softSkills,
      hardSkills,
      intereses,
      proyectos,
      direccion 
    };
  } catch (error) {
    console.error('Error fetching employee full data:', error);
    throw error;
  }
};


export const getEmployeeProjects = async (employeeId: string): Promise<ProyectoEmpleado[]> => {
  try {
    // 1. Obtener puestos del empleado en proyectos
    const puestos = await fetchPuestosProyecto(employeeId);
    if (puestos.length === 0) return [];

    // 2. Obtener información de los proyectos
    const proyectoIds = puestos.map(p => p.ID_Proyecto);
    const proyectos = await fetchProyectos(proyectoIds);

    // 3. Obtener información de los clientes
    const clienteIds = proyectos.map(p => p.ID_Cliente);
    const clientes = await fetchClientes(clienteIds);

    // 4. Combinar toda la información
    return puestos.map(puesto => {
      const proyecto = proyectos.find(p => p.ID_Proyecto === puesto.ID_Proyecto);
      const cliente = clientes.find(c => c && proyecto && c.PK_Cliente === proyecto.ID_Cliente);

      return {
        idProyecto: puesto.ID_Proyecto,
        nombreProyecto: proyecto?.Nombre || 'Proyecto desconocido',
        nombreCliente: cliente?.Nombre || 'Cliente desconocido',
        puesto: puesto.Puesto,
        status: proyecto?.Status || 'Desconocido',
      };
    });
  } catch (error) {
    console.error('Error fetching employee projects:', error);
    return [];
  }
};


// Funciones para actualizar datos
export const updateInterests = async (employeeId: string, currentIntereses: Interes[], newInterests: string[]): Promise<Interes[]> => {
  try {
    // Validación de entrada
    if (!employeeId || !Array.isArray(newInterests)) {
      throw new Error('Invalid input parameters');
    }

    const currentInterests = currentIntereses.map(h => h.Descripcion);

    const interestsToAdd = newInterests.filter(
      interest => !currentInterests.includes(interest)
    );
    
    const interestsToRemove = currentInterests.filter(
      interest => !newInterests.includes(interest)
    );

    // Eliminar intereses que ya no están
    if (interestsToRemove.length > 0) {
      const idsToRemove = currentIntereses
        .filter(h => interestsToRemove.includes(h.Descripcion))
        .map(h => h.ID_Interes);

      if (idsToRemove.length > 0) {
        const { error } = await supabase
          .from('Intereses')
          .delete()
          .in('ID_Interes', idsToRemove);
        
        if (error) throw error;
      }
    }

    // Añadir nuevos intereses
    if (interestsToAdd.length > 0) {
      const newRecords = interestsToAdd.map(descripcion => ({
        ID_Empleado: employeeId,
        Descripcion: descripcion
      }));

      const { error } = await supabase
        .from('Intereses')
        .insert(newRecords);
      
      if (error) throw error;
    }

    // Obtener intereses actualizados
    const { data: updatedIntereses, error } = await supabase
      .from('Intereses')
      .select('ID_Interes, Descripcion')
      .eq('ID_Empleado', employeeId);
    
    if (error) throw error;
    
    return updatedIntereses || [];
  } catch (error) {
    console.error('Detailed error updating interests:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      employeeId,
      currentIntereses,
      newInterests,
      fullError: error
    });
    throw error;
  }
};

export const updateEmployeeSkills = async (
  employeeId: string,
  skillType: 'soft' | 'hard',
  currentSkills: Habilidad[],
  newSkills: Habilidad[]
): Promise<Habilidad[]> => {
  // Validación de entrada
  if (!employeeId || !Array.isArray(newSkills)) {
    throw new Error('Invalid input parameters');
  }

  try {
    // 1. Extraer IDs de las habilidades actuales y nuevas
    const currentSkillIds = currentSkills.map(s => s.ID_Habilidad);
    const newSkillIds = newSkills.map(s => s.ID_Habilidad);

    // 2. Identificar habilidades a añadir y eliminar
    const skillsToAdd = newSkillIds.filter(id => !currentSkillIds.includes(id));
    const skillsToRemove = currentSkillIds.filter(id => !newSkillIds.includes(id));

    // 3. Eliminar relaciones que ya no están
    if (skillsToRemove.length > 0) {
      const { error: deleteError } = await supabase
        .from('Empleado_Habilidades')
        .delete()
        .eq('ID_Empleado', employeeId)
        .in('ID_Habilidad', skillsToRemove);

      if (deleteError) throw deleteError;
    }

    // 4. Añadir nuevas relaciones
    if (skillsToAdd.length > 0) {
      const newRecords = skillsToAdd.map(skillId => ({
        ID_Empleado: employeeId,
        ID_Habilidad: skillId
      }));

      const { error: insertError } = await supabase
        .from('Empleado_Habilidades')
        .insert(newRecords);

      if (insertError) throw insertError;
    }

    // 5. Devolver habilidades actualizadas
    return fetchEmployeeHabilidadesByType(employeeId, skillType);
  } catch (error) {
    console.error(`Error updating ${skillType} skills:`, {
      employeeId,
      currentSkills,
      newSkills,
      error
    });
    throw error;
  }
};