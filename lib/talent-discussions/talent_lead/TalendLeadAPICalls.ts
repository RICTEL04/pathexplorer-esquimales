import { supabase } from "@/lib/supabase";
import {
  EmployeesByNivelResult,
  employeeForTalentDiscussion,
  capabilityLeadSmallData,
  PeopleLeadSmallData,
  Talent_Discussion,
  TD_Employee,
  TD_Employee_Request,
  TD_Capability_Lead,
  TD_PeopleLead,
} from "@/lib/talent-discussions/talentDiscussionDefinitions";
import { set } from "zod";

export interface TalentDiscussionCompleta {
  talent_discussion: Talent_Discussion | null;
  employees: employeeForTalentDiscussion[];
  people_leads: {
    td_people_lead: TD_PeopleLead;
    people_lead: PeopleLeadSmallData;
    empleado: { ID_Empleado: string; Nombre: string } | null;
  }[];
  capability_leads: {
    td_capability_lead: TD_Capability_Lead;
    capability_lead: capabilityLeadSmallData;
    empleado: { ID_Empleado: string; Nombre: string } | null;
  }[];
}

export async function getTalentLeadIdForEmployee(
  setLoading: (loading: boolean) => void,
  employeeId: string
): Promise<string | null> {
  setLoading(true);
  try {
    const { data, error } = await supabase.rpc("get_talent_lead_id_for_employee", {
      p_employee_id: employeeId,
    });

    if (error) throw error;

    // Si no existe, data será null
    return data ?? null;
  } catch (error) {
    return null;
  } finally {
    setLoading(false);
  }
}

export async function getTalentDiscussionsByLead(
  setLoading: (loading: boolean) => void,
  idTalentLead: string
): Promise<Talent_Discussion[]> {
  setLoading(true);
  try {
    const { data, error } = await supabase.rpc("get_talent_discussions_by_lead", {
      p_id_talent_lead: idTalentLead,
    });

    if (error) throw error;

    // Mapeo de snake_case a PascalCase/camelCase
    const mapped: Talent_Discussion[] = (data ?? []).map((td: any) => ({
      ID_Talent_Discussion: td.id_talent_discussion,
      Discussion: td.discussion,
      ID_Talent_Lead: td.id_talent_lead,
      Nombre_Talent_Lead: td.nombre_talent_lead,
      Nivel: td.nivel,
      Fecha_Inicio: td.fecha_inicio ? new Date(td.fecha_inicio) : null,
      Fecha_Final: td.fecha_final ? new Date(td.fecha_final) : null,
      Estado: td.estado,
    }));

    return mapped;
  } catch (error) {
    return [];
  } finally {
    setLoading(false);
  }
}

export async function getEmployeesByNivel(setLoading: (loading: boolean) => void, level: string): Promise<EmployeesByNivelResult> {
  
  try{
      const { data, error } = await supabase.rpc("get_employees_by_level", {
        level_param: level,
      });
      
      console.log("Data from get_employees_by_level:", data);

      if (error) throw error;

      const capabilityLeadMap = new Map<string, capabilityLeadSmallData>();
      const peopleLeadMap = new Map<string, PeopleLeadSmallData>();

      const employees: employeeForTalentDiscussion[] = (data ?? []).map((row: any) => {
        // Agrupa capability leads únicos
        if (row.id_capability_lead && row.nombre_capability_lead) {
          capabilityLeadMap.set(row.id_capability_lead, {
            ID_CapabilityLead: row.id_capability_lead,
            nombre_capabilityLead: row.nombre_capability_lead,
          });
        }
        // Agrupa people leads únicos
        if (row.id_people_lead && row.nombre_people_lead) {
          peopleLeadMap.set(row.id_people_lead, {
            ID_People_Lead: row.id_people_lead,
            nombre_People_Lead: row.nombre_people_lead,
          });
        }

        // Mapeo exacto a la interfaz
        return {
          ID_Empleado: row.id_empleado,
          Nombre: row.nombre_empleado,
          Rol: row.rol,
          Nivel: row.nivel,
          ID_Departamento: row.id_departamento,
          Nombre_Departamento: row.nombre_departamento,
          Cargabilidad: row.cargabilidad,
          Fecha_Contratacion: undefined, // No viene en el select, puedes mapear si lo agregas
          FechaUltiNivel: undefined,     // No viene en el select, puedes mapear si lo agregas
          ID_People_Lead: row.id_people_lead,
          Nombre_People_Lead: row.nombre_people_lead,
          ID_CapabilityLead: row.id_capability_lead,
          Nombre_CapabilityLead: row.nombre_capability_lead,
          Metas: [],
        };
      });

      return {
        employees,
        capabilityLeads: Array.from(capabilityLeadMap.values()),
        peopleLeads: Array.from(peopleLeadMap.values()),
      };
  } catch (error){
    // Return empty arrays if there is an error
    return {
      employees: [],
      capabilityLeads: [],
      peopleLeads: [],
    };
  } finally {
    setLoading(false)
  }


}

export async function getPossibleEmployeesByTD(setLoading: (loading: boolean) => void, id: string): Promise<EmployeesByNivelResult> {
  
  try{
      const { data, error } = await supabase.rpc("get_employees_by_talent_discussion", {
        p_id_talent_discussion: id,
      });
      
      console.log("Data from get_employees_by_level:", data);

      if (error) throw error;

      const capabilityLeadMap = new Map<string, capabilityLeadSmallData>();
      const peopleLeadMap = new Map<string, PeopleLeadSmallData>();

      const employees: employeeForTalentDiscussion[] = (data ?? []).map((row: any) => {
        // Agrupa capability leads únicos
        if (row.id_capability_lead && row.nombre_capability_lead) {
          capabilityLeadMap.set(row.id_capability_lead, {
            ID_CapabilityLead: row.id_capability_lead,
            nombre_capabilityLead: row.nombre_capability_lead,
          });
        }
        // Agrupa people leads únicos
        if (row.id_people_lead && row.nombre_people_lead) {
          peopleLeadMap.set(row.id_people_lead, {
            ID_People_Lead: row.id_people_lead,
            nombre_People_Lead: row.nombre_people_lead,
          });
        }

        // Mapeo exacto a la interfaz
        return {
          ID_Empleado: row.id_empleado,
          Nombre: row.nombre_empleado,
          Rol: row.rol,
          Nivel: row.nivel,
          ID_Departamento: row.id_departamento,
          Nombre_Departamento: row.nombre_departamento,
          Cargabilidad: row.cargabilidad,
          Fecha_Contratacion: undefined, // No viene en el select, puedes mapear si lo agregas
          FechaUltiNivel: undefined,     // No viene en el select, puedes mapear si lo agregas
          ID_People_Lead: row.id_people_lead,
          Nombre_People_Lead: row.nombre_people_lead,
          ID_CapabilityLead: row.id_capability_lead,
          Nombre_CapabilityLead: row.nombre_capability_lead,
          Metas: [],
        };
      });

      return {
        employees,
        capabilityLeads: Array.from(capabilityLeadMap.values()),
        peopleLeads: Array.from(peopleLeadMap.values()),
      };
  } catch (error){
    // Return empty arrays if there is an error
    return {
      employees: [],
      capabilityLeads: [],
      peopleLeads: [],
    };
  } finally {
    setLoading(false)
  }


}

export async function createTalentDiscussionWithParticipants(
  setLoading: (loading: boolean) => void,
  discussionText: string,
  nivel: string,
  idTalentLead: string,
  fechaInicio: string, // formato 'YYYY-MM-DD'
  fechaFinal: string,  // formato 'YYYY-MM-DD'
  peopleLeads: PeopleLeadSmallData[],
  employee: employeeForTalentDiscussion[]
): Promise<string> {
  setLoading(true);
  try {
    const peopleLeadIds = peopleLeads.map(pl => pl.ID_People_Lead);
    const employeeIds = employee.map(emp => emp.ID_Empleado);
    const { data, error } = await supabase.rpc("create_talent_discussion_with_participants", {
      p_discussion_text: discussionText,
      p_id_talent_lead: idTalentLead,
      p_nivel: nivel,
      p_fecha_inicio: fechaInicio,
      p_fecha_final: fechaFinal,
      p_people_lead_ids: peopleLeadIds.length > 0 ? peopleLeadIds : null,
      p_employee_ids: employeeIds.length > 0 ? employeeIds : null,
    });

    if (error) throw error;

    return data as string; // Devuelve el ID de la nueva Talent Discussion
  } catch (error) {
    return "";
  } finally {
    setLoading(false);
  }
}

export async function getTalentDiscussionCompleta(
  setLoading: (loading: boolean) => void,
  idTalentDiscussion: string
): Promise<TalentDiscussionCompleta | null> {
  setLoading(true);
  try {
    const { data, error } = await supabase.rpc("obtener_talent_discussion_completa_json", {
      p_id_talent_discussion: idTalentDiscussion,
    });

    if (error || !data) throw error;

    const json = data as any;

    console.log("JSON obtenido:", json);

    // Crear un mapa de ID_CapabilityLead a nombre_capabilityLead
    const capabilityLeadIdToName: Record<string, string> = {};
    (json.capability_leads ?? []).forEach((cl: any) => {
      if (cl.capability_lead?.ID_CapabilityLead && cl.empleado?.Nombre) {
        capabilityLeadIdToName[cl.capability_lead.ID_CapabilityLead] = cl.empleado.Nombre;
        console.log(`Capability Lead ID: ${cl.capability_lead.ID_CapabilityLead}, Nombre: ${cl.empleado.Nombre}`);
      }
    });

    // Parsear talent_discussion
    const td = json.talent_discussion;
    const talent_discussion: Talent_Discussion | null = td
      ? {
          ID_Talent_Discussion: td.ID_TalentDiscussion,
          Discussion: td.Discussion,
          ID_Talent_Lead: td.ID_TalentLead,
          Nombre_Talent_Lead: td.nombre_talent_lead,
          Nivel: td.Nivel,
          Fecha_Inicio: td.Fecha_Inicio ? new Date(td.Fecha_Inicio) : null,
          Fecha_Final: td.Fecha_Final ? new Date(td.Fecha_Final) : null,
          Estado: td.Estado,
          Estado_TD_People_Lead: null, // No viene en el JSON, puedes agregar si lo necesitas
        }
      : null;

    // Parsear employees y asignar Nombre_CapabilityLead
    const employees: employeeForTalentDiscussion[] = (json.employees ?? []).map((emp: any) => {
      const empleado = emp.empleado || {};
      const people_lead = emp.people_lead || {};
      const capability_lead = emp.capability_lead || {};

      return {
        ID_Empleado: empleado.ID_Empleado ?? "",
        Nombre: empleado.Nombre ?? "",
        Rol: empleado.Rol ?? "",
        Nivel: empleado.Nivel ?? "",
        ID_Departamento: empleado.ID_Departamento ?? "",
        Nombre_Departamento: empleado.Nombre_Departamento ?? "",
        Cargabilidad: empleado.Cargabilidad ?? "",
        Fecha_Contratacion: empleado.Fecha_Contratacion ? new Date(empleado.Fecha_Contratacion) : undefined,
        FechaUltiNivel: empleado.FechaUltiNivel ? new Date(empleado.FechaUltiNivel) : undefined,
        ID_People_Lead: people_lead?.ID ?? "",
        Nombre_People_Lead: people_lead?.Nombre ?? "",
        ID_CapabilityLead: capability_lead?.ID_CapabilityLead ?? "",
        // Aquí asignas el nombre usando el mapa
        Nombre_CapabilityLead: capabilityLeadIdToName[capability_lead?.ID_CapabilityLead] ?? "No Asignado",
        Metas: [],
        TD_Employee_Requests: emp.request
          ? {
              ID_TD_Employee_Request: emp.request.ID_TD_Employee_Request,
              ID_TalentDiscussion: emp.request.ID_TalentDiscussion,
              ID_TD_Employee: emp.request.ID_TD_Employee,
              Descripcion: emp.request.Descripcion,
              Estado: emp.request.Estado,
              Resultado: emp.request.Resultado,
            }
          : null,
        Reportes: emp.Reportes ? Object.entries(emp.Reportes).map(([name, url]) => ({ name, url })) : [],
      };
    });
    console
    // Parsear people_leads
    const people_leads = (json.people_leads ?? []).map((pl: any) => ({
      td_people_lead: {
        ID_TD_PeopleLead: pl.td_people_lead.ID_TD_People_Lead,
        ID_TalentDiscussion: pl.td_people_lead.ID_TalentDiscussion,
        ID_PeopleLead: pl.td_people_lead.ID_People_Lead,
        Estado: pl.td_people_lead.Estado,
      },
      people_lead: {
        ID_People_Lead: pl.people_lead.ID,
        nombre_People_Lead: pl.empleado.Nombre,
      },
      empleado: pl.empleado
        ? {
            ID_Empleado: pl.empleado.ID_Empleado,
            Nombre: pl.empleado.Nombre,
          }
        : null,
    }));

    // Parsear capability_leads
    const capability_leads = (json.capability_leads ?? []).map((cl: any) => ({
      td_capability_lead: {
        ID_TD_Capability_Lead: cl.td_capability_lead.ID_TD_Capability_Lead,
        ID_TalentDiscussion: cl.td_capability_lead.ID_TalentDiscussion,
        ID_CapabilityLead: cl.td_capability_lead.ID_CapabilityLead,
      },
      capability_lead: {
        ID_CapabilityLead: cl.capability_lead.ID_CapabilityLead,
        nombre_capabilityLead: cl.empleado.Nombre,
      },
      empleado: cl.empleado
        ? {
            ID_Empleado: cl.empleado.ID_Empleado,
            Nombre: cl.empleado.Nombre,
          }
        : null,
    }));

    return {
      talent_discussion,
      employees,
      people_leads,
      capability_leads,
    };
  } catch (error) {
    return null;
  } finally {
    setLoading(false);
  }
}

export async function forceTalentDiscussionParticipants(
  setLoading: (loading: boolean) => void,
  talentDiscussionId: string,
  peopleLeadIdsNoAsignados: string[] = [],
  peopleLeadIdsAsignados: string[] = [],
  employeeIds: string[] = []
): Promise<boolean> {
  setLoading(true);
  try {
    const { error } = await supabase.rpc("force_talent_discussion_participants", {
      p_talent_discussion_id: talentDiscussionId,
      p_people_lead_ids_no_asignados: peopleLeadIdsNoAsignados.length > 0 ? peopleLeadIdsNoAsignados : null,
      p_people_lead_ids_asignados: peopleLeadIdsAsignados.length > 0 ? peopleLeadIdsAsignados : null,
      p_employee_ids: employeeIds.length > 0 ? employeeIds : null,
    });

    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  } finally {
    setLoading(false);
  }
}

export async function cambiar_estado_talent_discussion(
  setLoading: (loading: boolean) => void,
  id_talent_discussion: string,
  estado: string
){
  try {
    const { error } = await supabase.rpc("cambiar_estado_talent_discussion", {
      p_talent_discussion_id: id_talent_discussion,
      p_nuevo_estado: estado,
    });

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Error al cambiar el estado de la Talent Discussion:", error);
    return false;
  } finally {
    setLoading(false);
  }
}

export async function fetchReportsForEmployee(employeeId: string) {
    const { data, error } = await supabase.storage
        .from('reportes')
        .list(`${employeeId}/`, { limit: 100 });
    if (error) return [];

    const reports = await Promise.all(
        (data ?? []).map(async (file) => {
            const { data: urlData } = await supabase.storage
                .from('reportes')
                .getPublicUrl(`${employeeId}/${file.name}`);
            return { name: file.name, url: urlData.publicUrl };
        })
    );
    return reports;
}

export async function actualizarTD_Employee_Request(
  setLoading: (loading: boolean) => void,
  idTD_Employee_Request: string,
  estado: string,
  resultado: string
): Promise<{ success: boolean; message: string; updated_record: any } | null> {
  setLoading(true);
  try {
    const { data, error } = await supabase.rpc("actualizar_td_employee_request", {
      p_id_td_employee_request: idTD_Employee_Request,
      p_estado: estado,
      p_resultado: resultado,
    });

    if (error || !data || data.length === 0) {
      return null;
    }

    // El registro actualizado viene en data[0].updated_record
    return {
      success: data[0].success,
      message: data[0].message,
      updated_record: data[0].updated_record,
    };
  } catch (err) {
    return null;
  } finally {
    setLoading(false);
  }
}