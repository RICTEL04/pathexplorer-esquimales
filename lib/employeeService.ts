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

interface SkillWithLevel {
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string | null;
  currentJob: boolean;
  description: string;
  skills: SkillWithLevel[];
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

export interface Certificado {
  ID_Certificado: string;
  Nombre: string;
  Fecha_caducidad: string;
  Verificacion: string;
  Descripcion: string;
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



export interface PeopleLead {
  id: string;
  Nombre: string;
  AvatarUrl: string | null;
}

export interface CapabilityLead {
  id: string;
  Nombre: string;
  Nombre_Departamento: string;
  AvatarUrl: string | null;
}

export interface Contacto {
    Email: string,
    Num_Telefono: string
}

export interface Direccion {
  Estado : string | null;
  Pais: string | null;
}

export interface Informe {
  id: string;
  name: string;
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
}

export interface EmployeeFullData2 {
  employee: Employee | null;
  peopleLead: PeopleLead | null;
  capabilityLead: CapabilityLead | null;
  informes: Informe[];
  softSkills: Habilidad[]; 
  hardSkills: Habilidad[];  
  intereses : Interes[];
  contacto: Contacto | null;
  proyectos: ProyectoEmpleado[]; // Añadir esta línea
}

export interface EmployeeFullData {
  ID_Empleado: string | undefined;
  Nombre: string | undefined;
  Rol: string | undefined;
  Nivel: string | undefined;
  Departamento: string | null;
  Biografia: string | null;
  AvatarURL: string | null;
  peopleLead: PeopleLead | null;
  capabilityLead: CapabilityLead | null;
  informes: Informe[];
  softSkills: Habilidad[]; 
  hardSkills: Habilidad[];  
  intereses : Interes[];
  contacto: Contacto | null;
  proyectos: ProyectoEmpleado[]; 
  certificados: Certificado[];
  direccion: Direccion | null;
}

// Helper functions para cada tipo de dato
const fetchEmployee = async (employeeId: string) => {
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

const fetchDepartamento = async (idDepartamento: string | null): Promise<string | null> => {
  if (!idDepartamento) return null;

  const { data, error } = await supabase
    .from('Departamento')
    .select('Nombre')
    .eq('ID_Departamento', idDepartamento)
    .single();

  if (error || !data) return null;

  return data.Nombre
};

const fetchAvatarURL = async (employeeID: string | null): Promise<string | null> => {
  if (!employeeID) return null;

  const bucketName = "profile-pictures";
  const basePath = `${employeeID}/perfil`;
  
  try {
    // 1. Listar archivos en el directorio para encontrar la imagen real
    const { data: files, error } = await supabase.storage
      .from(bucketName)
      .list(`${employeeID}`, {
        limit: 1,
        search: 'perfil'
      });

    if (error || !files || files.length === 0) {
      console.log('No se encontró archivo de avatar:', error?.message);
      return null;
    }

    // Obtener el nombre real del archivo (con extensión)
    const actualFileName = files[0].name;
    const fullFilePath = `${employeeID}/${actualFileName}`;

    // 2. Obtener URL firmada (temporal) para acceder al archivo
    const { data: signedUrl } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fullFilePath, 3600); // URL válida por 1 hora

    if (!signedUrl?.signedUrl) {
      console.log('No se pudo generar URL firmada');
      return null;
    }

    console.log('Avatar encontrado:', signedUrl.signedUrl);
    return signedUrl.signedUrl;
    
  } catch (error) {
    console.error('Error verificando avatar:', error);
    return null;
  }
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

    const url = await fetchAvatarURL(empleadoData.ID_Empleado);
    
    

    return {
      id: empleadoData.ID_Empleado,
      Nombre: empleadoData.Nombre,
      AvatarUrl: url
    };
  } catch (error) {
    console.error('Error fetching people lead:', error);
    return null;
  }
};



const fetchCapabilityLead = async (employeeId: string | null): Promise<CapabilityLead | null> => {
  if (!employeeId) return null;

  // Realizamos la consulta SQL adaptada
  const { data, error } = await supabase
    .from('Empleado')
    .select(`
      Departamento:ID_Departamento!inner(
        Nombre_Departamento:Nombre,
        Capability_Lead:Capability_Lead!inner(
          ID_Encargado:ID_Empleado,
          Empleado:ID_Empleado!inner(
            Nombre_Encargado:Nombre
          )
        )
      )
    `)
    .eq('ID_Empleado', employeeId)
    .single();

  if (error || !data || !data.Departamento ) {
    console.error('Error fetching data:', error);
    return null;
  }

  // Extraemos los datos de manera segura
  const department = Array.isArray(data.Departamento) ? data.Departamento[0] : data.Departamento;
  const capabilityLead = Array.isArray(department.Capability_Lead) 
    ? department.Capability_Lead[0] 
    : department.Capability_Lead;
  
  const leadEmployee = capabilityLead?.Empleado
    ? (Array.isArray(capabilityLead.Empleado) ? capabilityLead.Empleado[0] : capabilityLead.Empleado)
    : null;

  if (!leadEmployee) return null;

  return {
    id: capabilityLead.ID_Encargado,
    Nombre: leadEmployee.Nombre_Encargado,
    Nombre_Departamento: department.Nombre_Departamento,
    AvatarUrl: await fetchAvatarURL(capabilityLead.ID_Encargado) || null
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
    .from('Contacto')
    .select('Estado, Pais')
    .eq('ID_empleado', employeeID)
    .single();

  if (error || !data) return null;

  return {

    Estado : data.Estado,
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
    .from('Puesto_proyecto')
    .select('ID_Proyecto, Puesto')
    .eq('ID_Empleado', employeeId);

  return error ? [] : data || [];
};

const fetchCertificados = async (employeeId: string): Promise<Certificado[]> =>{
  if(!employeeId){
    throw new Error('Invalid input parameters');
  } 

  const {data, error}  =await supabase
  .from('Certificados')
  .select('ID_Certificado, Nombre, Fecha_caducidad, Verificacion, Descripcion')
  .eq('ID_Empleado',employeeId);

  return error ? [] : data || [];
}

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
      ID_Empleado,
      Nombre,
      Rol,
      Nivel,
      Departamento,
      Biografia,
      AvatarURL,
      peopleLead,
      capabilityLead,
      contacto,
      informes,
      softSkills,
      hardSkills,
      intereses,
      proyectos,
      certificados,
      direccion
    ] = await Promise.all([
      employee.ID_Empleado,
      employee.Nombre,
      employee.Rol,
      employee.Nivel,
      fetchDepartamento(employee.ID_Departamento),
      employee.Biografia,
      fetchAvatarURL(employeeId),
      fetchPeopleLead(employee.ID_PeopleLead),
      fetchCapabilityLead(employeeId),
      fetchContacto(employeeId),
      fetchInformes(employeeId),
      getEmployeeSoftSkills(employeeId),  
      getEmployeeHardSkills(employeeId),  
      fetchIntereses(employeeId),
      getEmployeeProjects(employeeId),
      fetchCertificados(employeeId),
      fetchDirection(employeeId) 
    ]);

    return {
      ID_Empleado,
      Nombre,
      Rol,
      Nivel,
      Departamento,
      Biografia,
      AvatarURL,
      peopleLead,
      capabilityLead,
      contacto,
      informes,
      softSkills,
      hardSkills,
      intereses,
      proyectos,
      certificados,
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

export const updateEmployeePhone = async (employeeId: string, newPhone: string): Promise<string> => {
  try {

    if(!employeeId){
      throw new Error('Invalid input parameters');
    } 

    const { error } = await supabase
      .from('Contacto')
      .update({ Num_Telefono: newPhone })
      .eq('ID_empleado', employeeId);

    if (error) throw error;
    
    return newPhone;
  } catch (error) {
    console.error('Error updating employee phone:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      employeeId,
      newPhone,
      fullError: error
    });
    throw error;
  }
};

export const updateEmployeeBiography = async (employeeId: string, newBiography: string): Promise<string> => {
  try {

    if(!employeeId){
      throw new Error('Invalid input parameters');
    } 

    const { error } = await supabase
      .from('Empleado')
      .update({ Biografia: newBiography })
      .eq('ID_Empleado', employeeId);

    if (error) throw error;
    
    return newBiography;
  } catch (error) {
    console.error('Error updating employee phone:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      employeeId,
      newBiography,
      fullError: error
    });
    throw error;
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

export const updateEmployeeAvatarURL = async (employeeId: string, Imagen: File): Promise<void> => {
  const bucketName = "profile-pictures";
  const filePath = `${employeeId}/perfil`;

  // Validate the image
  if (!Imagen || !(Imagen instanceof File) || Imagen.size === 0) {
    console.error('La imagen no es válida o está vacía');
    return;
  }

  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, Imagen, {
        contentType: Imagen.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return;
    }
    
    console.log("File uploaded successfully:", uploadData);
  } catch (error) {
    console.error("Unexpected error uploading file:", error);
  }
};

export const updateEmployeeAddress = async (employeeId: string, newAddress: Direccion): Promise<Direccion> => {
  try {
    // Verificar si ya existe una dirección para este empleado
    const { data: existingAddress, error: fetchError } = await supabase
      .from('Contacto')
      .select('*')
      .eq('ID_empleado', employeeId)
      .maybeSingle(); // Cambiado a maybeSingle para manejar mejor el caso null

    // Si hay un error diferente a "no encontrado", lanzar excepción
    if (fetchError && !fetchError.details?.includes('Results contain 0 rows')) {
      throw fetchError;
    }

    // Preparar los datos para Supabase
    const supabaseAddress = {
      Estado: newAddress.Estado,
      Pais: newAddress.Pais,
    };

    let result;
    if (existingAddress) {
      // Actualizar dirección existente
      const { data, error } = await supabase
        .from('Contacto')
        .update(supabaseAddress)
        .eq('ID_empleado', employeeId)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Crear nueva dirección
      const { data, error } = await supabase
        .from('Contacto')
        .insert(supabaseAddress)
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    // Devolver la dirección actualizada/creada
    return {
      Estado: result.Estado,
      Pais: result.Pais
    };
  } catch (error) {
    console.error('Error updating address:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      employeeId,
      newAddress,
      fullError: error
    });
    throw error;
  }
};