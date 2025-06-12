"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { createCursoWithHabilidades } from "@/lib/cursosManager";
import { getCursos } from "@/lib/cursosManager";

interface Curso {
  ID_Curso: string;
  Nombre: string;
  Fecha_fin_curso: string;
  link: string;
  Descripcion?: string;
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
  const [showEditCursoForm, setShowEditCursoForm] = useState(false); // Controla si se muestra el formulario de edición
  const [cursoToEdit, setCursoToEdit] = useState<Curso | null>(null); // Almacena el curso que se está editando
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cursoData, setCursoData] = useState({
    name: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [cursosData, habilidadesData] = await Promise.all([
          getCursos(),
          supabase.from("Habilidades").select("ID_Habilidad, Tipo, Descripcion")
        ]);
        
        setCursos(cursosData);
        setHabilidades(habilidadesData.data || []);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCursoData({
      ...cursoData,
      [name]: value,
    });
  };

  const handleAddHabilidad = (habilidad: Habilidad) => {
    setSelectedHabilidades((prev) => [...prev, habilidad]);
    setHabilidades((prev) => prev.filter((h) => h.ID_Habilidad !== habilidad.ID_Habilidad));
  };

  const handleRemoveHabilidad = (habilidad: Habilidad) => {
    setHabilidades((prev) => [...prev, habilidad]);
    setSelectedHabilidades((prev) => prev.filter((h) => h.ID_Habilidad !== habilidad.ID_Habilidad));
  };

  const handleCreateCurso = async () => {
    setIsLoading(true);
    try {
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
        setCursoData({ name: "", description: "", link: "" });
        setSelectedHabilidades([]);
        setShowCreateCursoForm(false);
        
        const updatedCursos = await getCursos();
        setCursos(updatedCursos);
      }
    } catch (error) {
      console.error("Error al crear el curso:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCurso = (curso: Curso) => {
    setCursoToEdit({
      ...curso,
      Descripcion: curso.Descripcion || "", // Asegúrate de que la descripción no sea `undefined`
    });
    setShowEditCursoForm(true);
  };

  const handleUpdateCurso = async () => {
    if (!cursoToEdit) return;

    setIsLoading(true);
    try {
      const { ID_Curso, Nombre, Descripcion, link, Fecha_fin_curso } = cursoToEdit;

      const { error } = await supabase
        .from("Cursos")
        .update({
          Nombre,
          Descripcion,
          link,
          Fecha_fin_curso,
        })
        .eq("ID_Curso", ID_Curso);

      if (error) {
        throw error;
      }

      // Actualizar la lista de cursos
      const updatedCursos = await getCursos();
      setCursos(updatedCursos);

      // Cerrar el formulario de edición
      setShowEditCursoForm(false);
      setCursoToEdit(null);
    } catch (error) {
      console.error("Error al actualizar el curso:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCursos = cursos.filter(curso =>
    curso.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (curso.Descripcion && curso.Descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Cursos</h1>
        <p className="text-gray-600 mt-2">Administra y crea nuevos cursos para tu organización</p>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Buscar cursos..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              onClick={() => setShowCreateCursoForm(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-violet-700 to-fuchsia-600 hover:from-violet-800 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Crear Nuevo Curso
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredCursos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No se encontraron cursos</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? "Intenta con otro término de búsqueda" : "Crea tu primer curso haciendo clic en el botón superior"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCursos.map((curso) => (
                <div
                  key={curso.ID_Curso}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-800">{curso.Nombre}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        Activo
                      </span>
                    </div>
                    {curso.Descripcion && (
                      <p className="mt-2 text-gray-600 line-clamp-2">{curso.Descripcion}</p>
                    )}
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Finaliza: {new Date(curso.Fecha_fin_curso).toLocaleDateString()}
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <a
                        href={curso.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Ver curso
                        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                      <button
                        onClick={() => handleEditCurso(curso)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear nuevo curso */}
      {showCreateCursoForm && (
        <div className="fixed inset-0 bg-gray-700/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Crear Nuevo Curso</h2>
                <button
                  onClick={() => setShowCreateCursoForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleCreateCurso(); }} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Curso <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={cursoData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Introduce el nombre del curso"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={cursoData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Describe el contenido y objetivos del curso"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                    Enlace al curso <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    value={cursoData.link}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="https://ejemplo.com/curso"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Habilidades asociadas
                    </label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Disponibles</h3>
                        {habilidades.length === 0 ? (
                          <p className="text-sm text-gray-500">No hay habilidades disponibles</p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {habilidades.map((habilidad) => (
                              <button
                                key={habilidad.ID_Habilidad}
                                type="button"
                                onClick={() => handleAddHabilidad(habilidad)}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-150"
                              >
                                {habilidad.Descripcion}
                                <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Seleccionadas</h3>
                        {selectedHabilidades.length === 0 ? (
                          <p className="text-sm text-gray-500">No hay habilidades seleccionadas</p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {selectedHabilidades.map((habilidad) => (
                              <button
                                key={habilidad.ID_Habilidad}
                                type="button"
                                onClick={() => handleRemoveHabilidad(habilidad)}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-150"
                              >
                                {habilidad.Descripcion}
                                <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowCreateCursoForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creando...
                      </>
                    ) : 'Crear Curso'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar curso */}
      {showEditCursoForm && cursoToEdit && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Editar Curso</h2>
                <button
                  onClick={() => {
                    setShowEditCursoForm(false);
                    setCursoToEdit(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleUpdateCurso(); }} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Curso <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={cursoToEdit.Nombre}
                    onChange={(e) => setCursoToEdit({ ...cursoToEdit, Nombre: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={cursoToEdit.Descripcion}
                    onChange={(e) => setCursoToEdit({ ...cursoToEdit, Descripcion: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                    Enlace al curso <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    value={cursoToEdit.link}
                    onChange={(e) => setCursoToEdit({ ...cursoToEdit, link: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditCursoForm(false);
                      setCursoToEdit(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "Actualizando..." : "Actualizar Curso"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CursosPage;