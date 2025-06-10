import { supabase } from "../supabase";
import { DeliveryLead, Review } from "./definitions";
import { Employee } from "./definitions";
import { ProjectJson } from "./definitions";

async function getDeliveryLead() {
  const session = await supabase.auth.getSession();
  if (session.error) throw session.error;
  if (session.data.session) {
    const { data, error } = await supabase
      .from('Delivery_Lead')
      .select('ID_DeliveryLead')
      .eq('ID_Empleado', session.data.session.user.id)
      .single();
    if (error) throw error;
    if (!data) {
      throw new Error("No delivery lead found");
    }
    const deliveryLead: DeliveryLead = {
      ID_DeliveryLead: data.ID_DeliveryLead,
      ID_Empleado: session.data.session.user.id,
    };
    console.log("Delivery Lead:", deliveryLead);
    return deliveryLead;
  }
}

export async function fetchProjects() {
  const deliveryLead = await getDeliveryLead();
  if (!deliveryLead) {
    throw new Error("No delivery lead found");
  }
  const { data, error } = await supabase
    .from('Proyectos')
    .select('*')
    .order('ID_Proyecto', { ascending: false })
    .eq('ID_DeliveryLead', deliveryLead.ID_DeliveryLead);
  if (error) throw error;
  return data;
}

export async function insertProject(projectData: ProjectJson) {
  const { data, error } = await supabase
    .from('Proyectos')
    .insert({
      Nombre: projectData.Nombre,
      Descripcion: projectData.Descripcion,
      Fecha_Inicio: projectData.Fecha_Inicio,
      Fecha_Fin: projectData.Fecha_Fin,
      ID_DeliveryLead: projectData.ID_DeliveryLead,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function insertRoles(rolesData: any[]) {
  const { error } = await supabase.from('Roles').insert(rolesData);
  if (error) throw error;
}

export async function updateProject(editProject: ProjectJson) {
  const { error } = await supabase
    .from('Proyectos')
    .update({
      Nombre: editProject.Nombre,
      Descripcion: editProject.Descripcion,
      Fecha_Inicio: editProject.Fecha_Inicio,
      Fecha_Fin: editProject.Fecha_Fin,
    })
    .eq('ID_Proyecto', editProject.ID_Proyecto);
  if (error) throw error;
}

export async function deleteRolesByProject(projectId: string) {
  await supabase.from('Roles').delete().eq('Proyecto_id', projectId);
}

export async function updateProjectStatus(projectId: string, status: string) {
  const { error } = await supabase
    .from('Proyectos')
    .update({ Status: status })
    .eq('ID_Proyecto', projectId);
  if (error) throw error;
}

export async function fetchEmployeesByProject(projectId: string): Promise<Employee[]> {
  const { data, error } = await supabase
    .from('Empleado')
    .select(`
      ID_Empleado,
      Nombre,
      Rol,
      Puesto_persona!inner(
        ID_Puesto,
        isReviewed,
        Puesto_proyecto!inner(
          ID_Proyecto,
          Puesto,
          N_puestos,
          Completo
        )
      )
    `)
    .eq('Puesto_persona.Puesto_proyecto.ID_Proyecto', projectId)
    .eq('Puesto_persona.isReviewed', false);

  console.log("Fetched employees by project:", data);
  if (error) throw error;
  const employees: Employee[] = (data ?? []).map((emp: any) => ({
    ID_Empleado: emp.ID_Empleado,
    Nombre: emp.Nombre,
    Rol: emp.Rol,
    isReviewed: emp.Puesto_persona?.isReviewed || false,
  }));
  return employees;
}

export async function insertReview(reviewData: Review) {
  const { error } = await supabase
    .from('Evaluacion_Proyecto')
    .insert(reviewData);
  if (error) throw error;
}