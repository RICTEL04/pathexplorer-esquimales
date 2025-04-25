import { supabase } from './supabase';

export async function getCursos() {
  const { data, error } = await supabase
    .from('Cursos')
    .select('ID_Curso, Nombre, Fecha_fin_curso, link');

  if (error) {
    console.error('Error fetching cursos:', error);
    throw error;
  }

  return data; // Devuelve los cursos obtenidos
}

export async function createCursoWithHabilidades(
  cursoData: { Nombre: string; Descripcion: string; link: string },
  habilidades: { ID_Habilidad: string }[]
) {
  try {
    // Insertar el curso en la tabla Cursos
    const { data: curso, error: cursoError } = await supabase
      .from('Cursos')
      .insert([
        {
          Nombre: cursoData.Nombre,
          Descripcion: cursoData.Descripcion,
          link: cursoData.link,
        },
      ])
      .select('ID_Curso')
      .single();

    if (cursoError) {
      console.error('Error al insertar el curso:', cursoError);
      throw cursoError;
    }

    const cursoId = curso.ID_Curso;

    // Crear las relaciones en la tabla Cursos_Habilidades
    const habilidadesData = habilidades.map((habilidad) => ({
      ID_Curso: cursoId,
      ID_Habilidad: habilidad.ID_Habilidad,
    }));

    const { error: habilidadesError } = await supabase.from('Cursos_Habilidades').insert(habilidadesData);

    if (habilidadesError) {
      console.error('Error al insertar las relaciones en Cursos_Habilidades:', habilidadesError);
      throw habilidadesError;
    }

    console.log('Curso y habilidades creados exitosamente');
    return { success: true, cursoId };
  } catch (error) {
    console.error('Error al crear el curso con habilidades:', error);
    return { success: false, error };
  }
}