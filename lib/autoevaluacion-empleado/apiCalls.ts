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

export async function getProyectosNoTerminados() {
  const { data, error } = await supabase
    .from("Proyectos")
    .select("*")
    .eq("isReviewed", false);

  if (error) {
    console.error("Error fetching unfinished projects:", error);
  }
  return data;
}

export async function getProyectosSinAutoevaluacion(empleadoID: string) {
  const { data, error } = await supabase
    .from('Proyectos')
    .select(`
      ID_Proyecto,
      Nombre,
      Descripcion,
      Status,
      ID_DeliveryLead,
      fecha_inicio,
      fecha_fin,
      Cargabilidad,
      Puesto_proyecto(
        ID_Puesto,
        Puesto_persona(
          ID_Empleado,
          isReviewed
        )
      )
    `)
    .in('Puesto_proyecto.Puesto_persona.ID_Empleado', [empleadoID]);

  // Now filter out projects where an auto-evaluation exists
  // (Supabase can't do NOT EXISTS in one query, so you may need to filter in JS)
  // Optionally, you can fetch Evaluacion_Proyecto separately and filter in JS

  if (error) {
    console.error("Error fetching projects:", error);
  }
  return data;
}
