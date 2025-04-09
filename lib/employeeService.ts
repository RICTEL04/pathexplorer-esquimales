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

export interface Habilidad {
  ID_Habilidad: string;
  Tipo: string;
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
  Contacto: Contacto;
  Proyecto: Proyecto;
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

export interface Informe {
  id: string;
  name: string;
}


export interface EmployeeFullData {
  employee: Employee | null;
  peopleLead: PeopleLead | null;
  capabilityLead: CapabilityLead | null;
  informes: Informe[];
  habilidades: Habilidad[];
  contacto: Contacto | null;
  proyectos: ProyectoEmpleado[]; // Añadir esta línea
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

const fetchContacto = async (contactoId: string | null): Promise<Contacto | null> => {
  if (!contactoId) return null;

  const { data, error } = await supabase
    .from('Contacto')
    .select('Email, Num_Telefono')
    .eq('PK_Contacto', contactoId)
    .single();

  if (error || !data) return null;

  return {
    Email: data.Email,
    Num_Telefono: data.Num_Telefono
  };
};

const fetchInformes = async (employeeId: string): Promise<Informe[]> => {
  const { data, error } = await supabase
    .from('Informes')
    .select('id, name')
    .eq('empleado_id', employeeId);

  return error ? [] : data || [];
};

const fetchHabilidades = async (employeeId: string): Promise<Habilidad[]> => {
  const { data, error } = await supabase
    .from('Habilidades')
    .select('ID_Habilidad, Tipo, Descripcion')
    .eq('ID_Empleado', employeeId);

  return error ? [] : data || [];
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
      habilidades,
      proyectos
    ] = await Promise.all([
      fetchPeopleLead(employee.ID_PeopleLead),
      fetchCapabilityLead(employee.ID_CapabilityLead),
      fetchContacto(employee.Contacto_ID),
      fetchInformes(employeeId),
      fetchHabilidades(employeeId),
      getEmployeeProjects(employeeId) 
    ]);

    return {
      employee,
      peopleLead,
      capabilityLead,
      contacto,
      informes,
      habilidades,
      proyectos 
    };
  } catch (error) {
    console.error('Error fetching employee full data:', error);
    throw error;
  }
};

// Funciones para actualizar datos
export const updateInterests = async (employeeId: string, currentHabilidades: Habilidad[], newInterests: string[]): Promise<Habilidad[]> => {
  const currentInterests = currentHabilidades
    .filter(h => h.Tipo === 'interest')
    .map(h => h.Descripcion);

  const interestsToAdd = newInterests.filter(
    interest => !currentInterests.includes(interest)
  );
  
  const interestsToRemove = currentInterests.filter(
    interest => !newInterests.includes(interest)
  );

  // Eliminar intereses que ya no están
  if (interestsToRemove.length > 0) {
    const idsToRemove = currentHabilidades
      .filter(h => 
        h.Tipo === 'interest' && 
        interestsToRemove.includes(h.Descripcion)
      )
      .map(h => h.ID_Habilidad);

    if (idsToRemove.length > 0) {
      const { error } = await supabase
        .from('Habilidades')
        .delete()
        .in('ID_Habilidad', idsToRemove);
      
      if (error) throw error;
    }
  }

  // Añadir nuevos intereses
  if (interestsToAdd.length > 0) {
    const newRecords = interestsToAdd.map(descripcion => ({
      ID_Empleado: employeeId,
      Tipo: 'interest',
      Descripcion: descripcion
    }));

    const { error } = await supabase
      .from('Habilidades')
      .insert(newRecords);
    
    if (error) throw error;
  }

  // Obtener habilidades actualizadas
  const { data: updatedHabilidades, error } = await supabase
    .from('Habilidades')
    .select('ID_Habilidad, Tipo, Descripcion')
    .eq('ID_Empleado', employeeId);
  
  if (error) throw error;
  
  return updatedHabilidades || [];
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