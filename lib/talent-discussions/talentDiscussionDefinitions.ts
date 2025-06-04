import Meta from "../metas-empleados/metasDefinitions";

export interface EmployeesByNivelResult {
  employees: employeeForTalentDiscussion[];
  capabilityLeads: capabilityLeadSmallData[];
  peopleLeads: PeopleLeadSmallData[];
}


export interface Talent_Discussion {
    ID_Talent_Discussion: string;
    Discussion: string;
    ID_Talent_Lead: string;
    Nombre_Talent_Lead: string;
    Nivel: string;
    Fecha_Inicio: Date | null;
    Fecha_Final: Date | null;
    Estado: string;
    Estado_TD_People_Lead: string | null;
}

export interface Talent_Lead {
    ID_TalentLead: string;
    ID_Departamento: string;
    Rol: string;
    ID_Employee: string;
}

export interface TD_Employee {
    ID_TD_Employee: string;
    ID_TalentDiscussion: string;
    ID_Empleado : string;
}

export interface TD_PeopleLead {
    ID_TD_PeopleLead: string;
    ID_TalentDiscussion: string;   
    ID_PeopleLead: string;
    Estado: string
}

export interface TD_Capability_Lead {
    ID_TD_Capability_Lead: string;
    ID_TalentDiscussion: string;
    ID_CapabilityLead: string;
}

export interface TD_Employee_Request {
    ID_TD_Employee_Request: string;
    ID_TalentDiscussion: string;
    ID_TD_Employee: string;
    Descripcion: string;
    Estado: string;
    Resultado: string;
}

export interface employeeForTalentDiscussion {

    ID_Empleado: string;
    Nombre: string;
    Rol: string;
    Nivel: string;
    ID_Departamento: string;
    Nombre_Departamento?: string; // Opcional, si necesitas el nombre del departamento
    Cargabilidad: string;
    Fecha_Contratacion: Date;
    FechaUltiNivel: Date;
    ID_People_Lead: string;
    Nombre_People_Lead?: string; // Opcional, si necesitas el nombre del People Lead
    ID_CapabilityLead: string;
    Nombre_CapabilityLead?: string; // Opcional, si necesitas el nombre del Capability Lead
    Metas: Meta[];
    TD_Employee_Requests: TD_Employee_Request | null; // Opcional, si necesitas las solicitudes de TD_Employee
     
}

export interface capabilityLeadSmallData 
{
    ID_CapabilityLead : string;
    nombre_capabilityLead: string;

}

export interface PeopleLeadSmallData 
{
    ID_People_Lead : string;
    nombre_People_Lead: string;
    
}

