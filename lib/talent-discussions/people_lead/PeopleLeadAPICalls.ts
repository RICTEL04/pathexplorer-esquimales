import { Talent_Discussion, 
          employeeForTalentDiscussion,
           } from "@/lib/talent-discussions/talentDiscussionDefinitions";
import { supabase } from "@/lib/supabase";

interface CrearEmployeeRequestConCapabilityLeadResult {
  id_td_employee_request: string | null;
  id_td_capability_lead: string | null;
}

interface ActualizarEstadoPeopleLeadYCrearRequestsResult {
  td_people_lead_actualizado: boolean;
  requests_creados: number;
}

export async function getPeopleLeadIdForEmployee(
  setLoading: (loading: boolean) => void,
  employeeId: string
): Promise<string | null> {
  setLoading(true);
  try {
    const { data, error } = await supabase.rpc("get_people_lead_id_for_employee", {
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

export async function getTalentDiscussionsByPeopleLead(
  setLoading: (loading: boolean) => void,
  idPeopleLead: string
): Promise<Talent_Discussion[]> {
  setLoading(true);
  try {
    const { data, error } = await supabase.rpc("get_talent_discussions_by_people_lead", {
      p_id_people_lead: idPeopleLead,
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
      Estado_TD_People_Lead: td.estado_td_people_lead || null, // Aseguramos que sea null si no existe
    }));

    return mapped;
  } catch (error) {
    return [];
  } finally {
    setLoading(false);
  }
}

export async function getTalentDiscussionByIdAndPeopleLead(
  setLoading: (loading: boolean) => void,
  idTalentDiscussion: string,
  idPeopleLead: string
): Promise<Talent_Discussion | null> {
  try {
    const { data, error } = await supabase.rpc("get_talent_discussion_by_id_and_people_lead", {
      p_id_talent_discussion: idTalentDiscussion,
      p_id_people_lead: idPeopleLead,
    });

    if (error || !data || data.length === 0) return null;

    const td = data[0];
    return {
      ID_Talent_Discussion: td.id_talent_discussion,
      Discussion: td.discussion,
      ID_Talent_Lead: td.id_talent_lead,
      Nombre_Talent_Lead: td.nombre_talent_lead,
      Nivel: td.nivel,
      Fecha_Inicio: td.fecha_inicio ? new Date(td.fecha_inicio) : null,
      Fecha_Final: td.fecha_final ? new Date(td.fecha_final) : null,
      Estado: td.estado,
      Estado_TD_People_Lead: td.estado_td_people_lead,
    };
  } catch (error) {
    return null;
  } finally {
    setLoading(false);
  }
}

export async function getEmployeesByTalentDiscussionAndPeopleLead(
  setLoading: (loading: boolean) => void,
  idPeopleLead: string,
  idTalentDiscussion: string
): Promise<employeeForTalentDiscussion[]> {
  try {
    const { data, error } = await supabase.rpc("get_employees_by_td_and_pl", {
      p_id_people_lead: idPeopleLead,
      p_id_talent_discussion: idTalentDiscussion,
    });

    if (error) throw error;
    console.log("Data from get_employees_by_td_and_pl:", data);
    const mapped: employeeForTalentDiscussion[] = (data ?? []).map((emp: any) => ({
      ID_Empleado: emp.id_empleado,
      Nombre: emp.nombre,
      Rol: emp.rol,
      Nivel: emp.nivel,
      ID_Departamento: emp.id_departamento,
      Nombre_Departamento: emp.nombre_departamento,
      Cargabilidad: emp.cargabilidad,
      Fecha_Contratacion: emp.fecha_contratacion ? new Date(emp.fecha_contratacion) : null,
      FechaUltiNivel: emp.fechaultinivel ? new Date(emp.fechaultinivel) : null,
      ID_People_Lead: emp.id_people_lead,
      Nombre_People_Lead: emp.nombre_people_lead,
      ID_CapabilityLead: emp.id_capabilitylead,
      Nombre_CapabilityLead: emp.nombre_capabilitylead,
      Metas: [],
      TD_Employee_Requests: emp.td_employee_request
        ? {
            ID_TD_Employee_Request: emp.td_employee_request.id_td_employee_request,
            ID_TalentDiscussion: emp.td_employee_request.id_talentdiscussion,
            ID_TD_Employee: emp.td_employee_request.id_td_employee,
            Descripcion: emp.td_employee_request.descripcion,
            Estado: emp.td_employee_request.estado,
            Resultado: emp.td_employee_request.resultado,
          }
        : undefined,
    }));

    return mapped;
  } catch (error) {
    return [];
  } finally {
    setLoading(false);
  }
}



export async function crearEmployeeRequestConCapabilityLead(
  setLoading: (loading: boolean) => void,
  idEmpleado: string,
  idTalentDiscussion: string,
  descripcionRequest: string,
  idCapabilityLead?: string | null
): Promise<CrearEmployeeRequestConCapabilityLeadResult | null> {
  setLoading(true);
  try {
    const { data, error } = await supabase.rpc("crear_employee_request_con_capability_lead", {
      p_id_empleado: idEmpleado,
      p_id_talent_discussion: idTalentDiscussion,
      p_descripcion_request: descripcionRequest,
      p_id_capability_lead: idCapabilityLead ?? null,
    });

    if (error || !data || data.length === 0) return null;

    const result = data[0];
    return {
      id_td_employee_request: result.id_td_employee_request,
      id_td_capability_lead: result.id_td_capability_lead,
    };
  } catch (error) {
    return null;
  } finally {
    setLoading(false);
  }
}


export async function actualizarEstadoPeopleLeadYCrearRequests(
  setLoading: (loading: boolean) => void,
  idPeopleLead: string,
  idTalentDiscussion: string,
  empleadosIds: string[],
  estado: string = "Pendiente"
): Promise<ActualizarEstadoPeopleLeadYCrearRequestsResult | null> {
  try {
    const { data, error } = await supabase.rpc("actualizar_estado_people_lead_y_crear_requests", {
      p_id_people_lead: idPeopleLead,
      p_id_talent_discussion: idTalentDiscussion,
      p_empleados_ids: empleadosIds.length > 0 ? empleadosIds : null,
      p_estado: estado,
    });

    if (error || !data || data.length === 0) return null;

    const result = data[0];
    return {
      td_people_lead_actualizado: result.td_people_lead_actualizado,
      requests_creados: result.requests_creados,
    };
  } catch (error) {
    return null;
  } finally {
    setLoading(false);
  }
}


export async function actualizar_estado_td_people_lead(
  setLoading: (loading: boolean) => void,
  idTalentDiscussion: string,
  idPeopleLead: string,
  nuevoEstado: string = "Asignados"
): Promise<{ actualizado: boolean; mensaje: string } | null> {
  try {
    const { data, error } = await supabase.rpc("actualizar_estado_td_people_lead", {
      p_id_talent_discussion: idTalentDiscussion,
      p_id_people_lead: idPeopleLead,
      p_nuevo_estado: nuevoEstado,
    });

    if (error || !data || data.length === 0) return null;

    // La función retorna un objeto con actualizado y mensaje
    return {
      actualizado: data[0].actualizado,
      mensaje: data[0].mensaje,
    };
  } catch (error) {
    console.error("Error updating TD People Lead state:", error);
    return null;
  } finally {
    setLoading(false);
  }
}