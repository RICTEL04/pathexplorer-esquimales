import { supabase } from "./supabase";

export async function fetchEmployee(employeeId: string) {
    const { data, error } = await supabase
        .from("Empleado")
        .select(`
            *, 
            Certificados(*), 
            Metas(*)
        `)
        .eq("ID_Empleado", employeeId)
        .single();

    if (error) {
        console.error("Error fetching employee:", error);
        return null;
    }
    return data;
}

export async function fetchContacto(contactoId: string) {
    const { data, error } = await supabase
        .from("Contacto")
        .select("*")
        .eq("PK_Contacto", contactoId)
        .single();

    if (error) {
        console.error("Error fetching contacto:", error);
        return null;
    }
    return data;
}

export async function fetchDepartamento(departamentoId: string) {
    const { data, error } = await supabase
        .from("Departamento")
        .select("*")
        .eq("ID_Departamento", departamentoId)
        .single();

    if (error) {
        console.error("Error fetching departamento:", error);
        return null;
    }
    return data;
}

export async function fetchCapabilityLead(capabilityLeadId: string) {
    const { data, error } = await supabase
        .from("Capability_Lead")
        .select("*")
        .eq("ID_CapabilityLead", capabilityLeadId)
        .single();

    if (error) {
        console.error("Error fetching Capability Lead:", error);
        return null;
    }
    return data;
}

export async function fetchPeopleLead(peopleLeadID: string) {
    const { data, error } = await supabase
        .from("People_lead")
        .select("ID_Empleado")
        .eq("ID", peopleLeadID)
        .single();

    if (error) {
        console.error("Error fetching People Lead:", error);
        return null;
    }
    console.log("People Lead Data:", data);
    return data;
}

export async function fetchProjects(employeeId: string) {
    const { data, error } = await supabase
        .from("Puestos_proyecto")
        .select(`*, Proyectos(*)`)
        .eq("ID_Empleado", employeeId);

    if (error) {
        console.error("Error fetching projects:", error);
        return null;
    }
    return data;
}