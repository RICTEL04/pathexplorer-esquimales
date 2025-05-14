"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Habilidad {
  ID_Habilidad: string;
  Tipo: string;
  Descripcion: string;
}

const HabilidadesPage: React.FC = () => {
  const [habilidades, setHabilidades] = useState<Habilidad[]>([]);
  const [showCreateHabilidadForm, setShowCreateHabilidadForm] = useState(false);
  const [habilidadData, setHabilidadData] = useState({
    tipo: "soft", // Valor predeterminado
    descripcion: "",
  });

  // Filtrar habilidades por tipo
  const softSkills = habilidades.filter(habilidad => habilidad.Tipo === "soft");
  const hardSkills = habilidades.filter(habilidad => habilidad.Tipo === "hard");

  // Función para cargar las habilidades desde la base de datos
  useEffect(() => {
    const fetchHabilidades = async () => {
      try {
        const { data, error } = await supabase.from("Habilidades").select("ID_Habilidad, Tipo, Descripcion");
        if (error) throw error;

        console.log("Habilidades obtenidas:", data);
        setHabilidades(data || []);
      } catch (error) {
        console.error("Error al obtener las habilidades:", error);
      }
    };

    fetchHabilidades();
  }, []);

  // Manejar cambios en el formulario de creación de habilidad
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHabilidadData({
      ...habilidadData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario de creación de habilidad
  const handleCreateHabilidad = async () => {
    try {
      const { error } = await supabase.from("Habilidades").insert([
        {
          Tipo: habilidadData.tipo,
          Descripcion: habilidadData.descripcion,
        },
      ]);

      if (error) throw error;

      console.log("Habilidad creada con éxito");

      setHabilidadData({ tipo: "soft", descripcion: "" });
      setShowCreateHabilidadForm(false);

      const { data } = await supabase.from("Habilidades").select("ID_Habilidad, Tipo, Descripcion");
      setHabilidades(data || []);
    } catch (error) {
      console.error("Error al crear la habilidad:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Habilidades</h1>
        <button
          onClick={() => setShowCreateHabilidadForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear Nueva Habilidad
        </button>
      </div>

      {/* Contenedor de dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna de Soft Skills */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <h2 className="text-xl font-semibold text-blue-800">Habilidades Blandas</h2>
            <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {softSkills.length} habilidades
            </span>
          </div>
          
          {softSkills.length === 0 ? (
            <p className="text-blue-600 italic">No hay habilidades blandas registradas</p>
          ) : (
            <div className="space-y-3">
              {softSkills.map((habilidad) => (
                <div
                  key={habilidad.ID_Habilidad}
                  className="bg-white rounded-lg border border-blue-200 p-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-blue-700">{habilidad.Descripcion}</h3>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Columna de Hard Skills */}
        <div className="bg-violet-50 rounded-lg p-4 border border-violet-100">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-violet-500 rounded-full mr-2"></div>
            <h2 className="text-xl font-semibold text-violet-800">Habilidades Tecnicas</h2>
            <span className="ml-auto bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded-full">
              {hardSkills.length} habilidades
            </span>
          </div>
          
          {hardSkills.length === 0 ? (
            <p className="text-violet-600 italic">No hay hard skills registradas</p>
          ) : (
            <div className="space-y-3">
              {hardSkills.map((habilidad) => (
                <div
                  key={habilidad.ID_Habilidad}
                  className="bg-white rounded-lg border border-violet-200 p-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-violet-700">{habilidad.Descripcion}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear una nueva habilidad */}
      {showCreateHabilidadForm && (
        <div className="fixed inset-0 bg-gray-800/50 bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Crear Nueva Habilidad</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateHabilidad();
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                  Nombre de la Habilidad
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={habilidadData.descripcion}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                  rows={3}
                />
              </div>
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                  Tipo de Habilidad
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => setHabilidadData({...habilidadData, tipo: "soft"})}
                    className={`px-4 py-2 rounded-l-md border ${habilidadData.tipo === "soft" ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    Blanda
                  </button>
                  <button
                    type="button"
                    onClick={() => setHabilidadData({...habilidadData, tipo: "hard"})}
                    className={`px-4 py-2 rounded-r-md border ${habilidadData.tipo === "hard" ? 'bg-violet-500 text-white border-violet-500' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    Tecnica
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateHabilidadForm(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                >
                  Crear Habilidad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabilidadesPage;