import type { Employee, Project } from "./types";

export function mapEmployeeData(item: any, project: Project | null) {
  return {
    id: String(item.Empleado?.ID_Empleado ?? ""),
    name: item.Empleado?.Nombre || "",
    position: item.Empleado?.Rol || "",
    email: "",
    level: item.Empleado?.Nivel ? Number(item.Empleado.Nivel) : 0,
    project: item.Puesto || "Sin puesto",
    companyEntryDate: item.Empleado?.FechaContratacion || "",
    timeOnLevel: item.Empleado?.FechaUltNivel || "",
    activeProject: project?.Nombre || "",
    activeProjectStartDate: item.created_at || "",
    projectRole: item.Empleado?.Rol || "",
    isProjectLead: false,
    certificates: [],
    courses: [],
  };
}

export function mapAllEmployeeData(employee: Employee) {
  return {
    id: String(employee.ID_Empleado),
    name: employee.Nombre,
    position: employee.Rol,
    email: "",
    level: employee.Nivel ? Number(employee.Nivel) : 0,
    project: employee.Puesto_proyecto?.Puesto || "Sin puesto",
    companyEntryDate: employee.FechaContratacion || "",
    timeOnLevel: employee.FechaUltNivel || "",
    activeProject: employee.Puesto_proyecto?.Proyectos?.[0]?.Nombre || "Sin proyecto",
    activeProjectStartDate: employee.Puesto_proyecto?.created_at || "",
    projectRole: employee.Rol,
    isProjectLead: false,
    certificates: [],
    courses: [],
  };
}