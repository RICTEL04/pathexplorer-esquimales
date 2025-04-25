"use client";
import React, { useState, useEffect } from "react";
import { getCursos } from "@/lib/cursosManager";
import { createCursoWithHabilidades } from "@/lib/cursosManager"; // Importa la función para crear curso con habilidades
import { supabase } from "@/lib/supabase";

interface Curso {
  ID_Curso: string;
  Nombre: string;
  Fecha_fin_curso: string;
  link: string;
}

interface Habilidad {
  ID_Habilidad: string;
  Tipo: string;
  Descripcion: string;
}

const CursosPage: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [habilidades, setHabilidades] = useState<Habilidad[]>([]);
  const [selectedHabilidades, setSelectedHabilidades] = useState<Habilidad[]>([]);
  const [showCreateCursoForm, setShowCreateCursoForm] = useState(false);
  const [cursoData, setCursoData] = useState({
    name: "",
    description: "",
    link: "",
  });

  // Función para cargar los cursos y habilidades desde la base de datos
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const cursos = await getCursos();
        setCursos(cursos);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    const fetchHabilidades = async () => {
      try {
        const { data, error } = await supabase.from("Habilidades").select("ID_Habilidad, Tipo, Descripcion");
        if (error) throw error;

        console.log("Habilidades obtenidas:", data); // Debug: Mostrar las habilidades obtenidas
        setHabilidades(data || []);
      } catch (error) {
        console.error("Error al obtener las habilidades:", error);
      }
    };

    fetchCursos();
    fetchHabilidades();
  }, []);

  // Manejar cambios en el formulario de creación de curso
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCursoData({
      ...cursoData,
      [name]: value,
    });
  };

  // Agregar una habilidad a la lista seleccionada
  const handleAddHabilidad = (habilidad: Habilidad) => {
    setSelectedHabilidades((prev) => [...prev, habilidad]);
    setHabilidades((prev) => prev.filter((h) => h.ID_Habilidad !== habilidad.ID_Habilidad));
  };

  // Eliminar una habilidad de la lista seleccionada
  const handleRemoveHabilidad = (habilidad: Habilidad) => {
    setHabilidades((prev) => [...prev, habilidad]);
    setSelectedHabilidades((prev) => prev.filter((h) => h.ID_Habilidad !== habilidad.ID_Habilidad));
  };

  // Manejar el envío del formulario de creación de curso
  const handleCreateCurso = async () => {
    const habilidadesIds = selectedHabilidades.map((habilidad) => ({
      ID_Habilidad: habilidad.ID_Habilidad,
    }));

    const result = await createCursoWithHabilidades(
      {
        Nombre: cursoData.name,
        Descripcion: cursoData.description,
        link: cursoData.link,
      },
      habilidadesIds
    );

    if (result.success) {
      console.log("Curso creado con éxito. ID del curso:", result.cursoId);

      // Limpiar el formulario y cerrar el modal
      setCursoData({ name: "", description: "", link: "" });
      setSelectedHabilidades([]);
      setShowCreateCursoForm(false);

      // Recargar los cursos
      const cursos = await getCursos();
      setCursos(cursos);
    } else {
      console.error("Error al crear el curso:", result.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Cursos</h1>

      {/* Botón para crear un nuevo curso */}
      <button
        onClick={() => setShowCreateCursoForm(true)}
        className="mb-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Crear Nuevo Curso
      </button>

      {/* Lista de cursos */}
      <div className="space-y-4">
        {cursos.length === 0 ? (
          <p className="text-gray-600">No hay cursos disponibles.</p>
        ) : (
          cursos.map((curso) => (
            <div
              key={curso.ID_Curso}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
            >
              <h3 className="text-lg font-bold">{curso.Nombre}</h3>
              <p className="text-gray-600">Fecha de finalización: {curso.Fecha_fin_curso}</p>
              <a
                href={curso.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Ver curso
              </a>
            </div>
          ))
        )}
      </div>

      {/* Modal para crear un nuevo curso */}
      {showCreateCursoForm && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Curso</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateCurso();
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre del Curso
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={cursoData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={cursoData.description}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                  Enlace
                </label>
                <input
                  type="url"
                  id="link"
                  name="link" // Asegúrate de que este nombre coincida con la clave en cursoData
                  value={cursoData.link}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Habilidades</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {habilidades.map((habilidad) => (
                    <button
                      key={habilidad.ID_Habilidad}
                      type="button"
                      onClick={() => handleAddHabilidad(habilidad)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                    >
                      {habilidad.Descripcion}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700">Habilidades seleccionadas:</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedHabilidades.map((habilidad) => (
                      <button
                        key={habilidad.ID_Habilidad}
                        type="button"
                        onClick={() => handleRemoveHabilidad(habilidad)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200"
                      >
                        {habilidad.Descripcion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateCursoForm(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                >
                  Crear Curso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CursosPage;