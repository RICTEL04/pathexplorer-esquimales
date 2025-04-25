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

  // Función para cargar las habilidades desde la base de datos
  useEffect(() => {
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
      // Insertar la habilidad en la tabla Habilidades
      const { error } = await supabase.from("Habilidades").insert([
        {
          Tipo: habilidadData.tipo,
          Descripcion: habilidadData.descripcion,
        },
      ]);

      if (error) throw error;

      console.log("Habilidad creada con éxito");

      // Limpiar el formulario y cerrar el modal
      setHabilidadData({ tipo: "soft", descripcion: "" });
      setShowCreateHabilidadForm(false);

      // Recargar las habilidades
      const { data } = await supabase.from("Habilidades").select("ID_Habilidad, Tipo, Descripcion");
      setHabilidades(data || []);
    } catch (error) {
      console.error("Error al crear la habilidad:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Habilidades</h1>

      {/* Botón para crear una nueva habilidad */}
      <button
        onClick={() => setShowCreateHabilidadForm(true)}
        className="mb-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Crear Nueva Habilidad
      </button>

      {/* Lista de habilidades */}
      <div className="space-y-4">
        {habilidades.length === 0 ? (
          <p className="text-gray-600">No hay habilidades disponibles.</p>
        ) : (
          habilidades.map((habilidad) => (
            <div
              key={habilidad.ID_Habilidad}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
            >
              <h3 className="text-lg font-bold">{habilidad.Descripcion}</h3>
              <p className="text-gray-600">{habilidad.Tipo}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal para crear una nueva habilidad */}
      {showCreateHabilidadForm && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
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
                  Nombre
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={habilidadData.descripcion}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                  Tipo de Habilidad
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={habilidadData.tipo}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                >
                  <option value="soft">Soft</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateHabilidadForm(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
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