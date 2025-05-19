import EmployeeCard from "@/app/employee/capability-lead/perfiles-de-empleados/EmployeeCard";
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
      fecha_inicio: projectData.fecha_inicio,
      fecha_fin: projectData.fecha_fin,
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
      fecha_inicio: editProject.fecha_inicio,
      fecha_fin: editProject.fecha_fin,
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

type EmpleadoProyectoJoin = {
  ID_Empleado: string;
  Empleado: Employee;
};

export async function fetchEmployeesByProject(projectId: string): Promise<Employee[]> {
  const { data, error } = await supabase
    .from('Empleado_Proyectos')
    .select('ID_Empleado, isReviewed, Empleado (ID_Empleado, Nombre, Rol)')
    .eq('ID_Proyecto', projectId);

  if (error) throw error;

  // Type guard to validate the response
  const isProperStructure = (item: any): item is EmpleadoProyectoJoin => 
    item?.Empleado?.ID_Empleado !== undefined &&
    item?.Empleado?.Nombre !== undefined &&
    item?.Empleado?.Rol !== undefined;

  // Process data with safety checks
  const employees = (Array.isArray(data) ? data : [])
    .filter(isProperStructure)
    .map((item) => {
      // If item.Empleado is an array, take the first element
      const empleado = Array.isArray(item.Empleado) ? item.Empleado[0] : item.Empleado;
      return {
        ID_Empleado: empleado.ID_Empleado,
        Nombre: empleado.Nombre,
        Rol: empleado.Rol,
        isReviewed: item.isReviewed,
      };
    });

  console.log("Processed employees:", employees);
  return employees;
}

export async function insertReview(reviewData: Review) {
  const { error } = await supabase
    .from('Evaluacion_Proyecto')
    .insert(reviewData);
  if (error) throw error;
}