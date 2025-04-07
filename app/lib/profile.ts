import {
    fetchEmployee,
    fetchContacto,
    fetchDepartamento,
    fetchCapabilityLead,
    fetchPeopleLead,
    fetchProjects,
} from "./apiCalls";

export async function fetchProfile() {
    const employeeId = "9bb0e5e0-bc27-4ee3-b98c-7dcf44abe2e2";

    // Fetch the main employee data
    const employee = await fetchEmployee(employeeId);
    if (!employee) return null;

    // Fetch contact information, department, capability lead, and people lead
    const contacto = await fetchContacto(employee.Contacto_ID);
    if (!contacto) return null;

    const departamento = await fetchDepartamento(employee.ID_Departamento);
    if (!departamento) return null;

    const capabilityLead = await fetchCapabilityLead(employee.ID_CapabilityLead);
    if (!capabilityLead) return null;

    const peopleLeadID = await fetchPeopleLead(employee.ID_PeopleLead);
    if (!peopleLeadID) return null;

    const peopleLead = await fetchEmployee(peopleLeadID.ID_Empleado);
    if (!peopleLead) return null;

    const projects = await fetchProjects(employee.ID_Empleado);
    if (!projects) return null;

    // Create the profile object
    const profile = {
        id: employee.ID_Empleado,
        name: employee.Nombre,
        role: employee.Rol,
        level: employee.Nivel,
        department: departamento.Nombre,
        email: contacto.Email,
        phone: contacto.Num_Telefono,
        direction: { // Todavía no contamos con estos datos
            city: "Monterrey",
            state: "Nuevo Leon",
            country: "Mexico",
        },
        avatarUrl: employee.AvatarURL,
        bio: employee.Biografia,
        projects: projects.map((project: any) => ({
            id: project.ID_Proyecto,
            name: project.Proyectos.Nombre,
            client: project.Proyectos.ID_Cliente,
            cargability: "80%",
            endDate: "2025-01-01",
        })),
        certifications: employee.Certificados.map((cert: any) => ({
            id: cert.ID_Certificado,
            name: cert.Nombre,
            expiration: cert.Fecha_caducidad,
        })),
        goals: employee.Metas.map((goal: any) => ({
            id: goal.ID_Meta,
            name: goal.Nombre,
            startDate: goal.FechaInicio,
            endDate: goal.FechaFin,
            description: goal.Descripcion,
        })),
        softSkills: employee.HabilidadesBlandas || ["Hablar en público", "Trabajo en equipo"],
        hardSkills: employee.HabilidadesDuras || ["JavaScript", "Python"],
        interests: employee.Intereses || ["Ejercicio", "Viajar", "Leer"],
        peopleLead: {
            id: peopleLead.ID_Empleado,
            name: peopleLead.Nombre,
            avatarURL: employee.AvatarURLPeopleLead,
        },
        capabilityLead: {
            id: capabilityLead.ID_CapabilityLead,
            name: capabilityLead.Nombre,
            avatarURL: capabilityLead.AvatarURL,
        },
    };


    return profile;
}