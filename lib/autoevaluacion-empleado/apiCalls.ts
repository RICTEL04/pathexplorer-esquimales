import { supabase } from "../supabase";

export async function getEmpleadosSinAutoevaluacion(empleadoID: string) {
  // Call a function named 'my_function' with parameters
  const { data, error } = await supabase.rpc('select_proyectos_sin_autoevaluacion', {
    p_id_empleado: empleadoID,
  });

  if (error) {
    console.error("Error calling function:", error);
  } else {
    console.log("Function result:", data);
  }
  return data;
}

export async function selectEmpleado(empleadoID: string) {
  const { data, error } = await supabase
    .from("Empleado")
    .select("*")
    .eq("ID_Empleado", empleadoID)
    .single();

  if (error) {
    console.error("Error fetching employee:", error);
  }
  return data;
}

export async function selectProyectosPostulados(empleadoID: string) {
  const { data, error } = await supabase
    .from("Empleado_Proyectos")
    .select("*")
    .eq("ID_Empleado", empleadoID)
    .eq("isApproved", false);

  if (error) {
    console.error("Error fetching projects:", error);
  }
  console.log("Proyectos postulados:", data);
  return data;
}
