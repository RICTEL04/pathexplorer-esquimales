// filepath: c:\Users\david\Documents\programming\clases_tec\desarrollo6to\pathexplorer-esquimales\app\employee\capability-lead\proyectos\[id]\types.ts
export interface Project {
  ID_Proyecto: number;
  Nombre: string;
  Descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface Role {
  id: number;
  role_name: string;
  Proyecto_id: number;
}

export interface Employee {
  ID_Empleado: number;
  Nombre: string;
  Rol: string;
  Nivel: number;
  FechaContratacion: string;
  FechaUltNivel: string;
  Puesto_proyecto?: {
    Puesto: string;
    Proyectos?: { Nombre: string }[];
    created_at?: string;
  } | null;
}

export interface MappedEmployee {
  id: string;
  name: string;
  position: string;
  email: string;
  level: number;
  project: string;
  companyEntryDate: string;
  timeOnLevel: string;
  activeProject: string;
  activeProjectStartDate: string;
  projectRole: string;
  isProjectLead: boolean;
  certificates: any[];
  courses: any[];
}