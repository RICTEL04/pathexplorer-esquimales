"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, ChevronDown, ArrowRight, User } from "lucide-react";
import { getProyectos } from "@/lib/getProyectos"; // Importa la función para obtener proyectos

// Define interfaces para los datos
interface Project {
  id: string;
  nombre: string;
  descripcion: string;
  status: string;
  habilidad?: string;
  cliente: string;
  cargabilidad?: number;
}

export default function ProyectosPage() {
  const [proyectosSugeridos, setProyectosSugeridos] = useState<Project[]>([]);
  const [proyectosActuales, setProyectosActuales] = useState<Project[]>([]);
  const [proyectosPostulados, setProyectosPostulados] = useState<Project[]>([]);

  // Función para cargar los proyectos desde la base de datos
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const proyectos = await getProyectos();

        // Mapea los datos obtenidos para ajustarlos a la interfaz
        const mappedProyectos: Project[] = proyectos.map((proyecto: any) => ({
          id: proyecto.ID_Proyecto,
          nombre: proyecto.Nombre,
          descripcion: proyecto.Descripcion,
          status: proyecto.Status,
          cliente: proyecto.ID_Cliente, // Puedes reemplazar con el nombre del cliente si es necesario
          cargabilidad: Math.floor(Math.random() * 100), // Genera un valor aleatorio para cargabilidad
        }));

        // Por ahora, dejamos todas las secciones vacías
        setProyectosSugeridos(mappedProyectos);
        setProyectosActuales([]);
        setProyectosPostulados([]);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProyectos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <span className="text-yellow-500">PATH</span>
          <span className="text-purple-700">EXPLORER</span>
        </h1>
        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
      </header>

      {/* Main content */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Suggested Projects */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl text-black font-bold">Proyectos sugeridos</h2>
            <div className="space-y-4">
              {proyectosSugeridos.length === 0 ? (
                <p className="text-gray-600">No hay proyectos sugeridos por ahora.</p>
              ) : (
                proyectosSugeridos.map((proyecto) => (
                  <div key={proyecto.id} className="bg-white rounded-lg border border-gray-200 p-4 relative">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-black font-bold">{proyecto.nombre}</h3>
                        <p className="text-gray-600 text-sm">{proyecto.status}</p>
                        <p className="text-gray-600 mt-2">{proyecto.descripcion}</p>
                        <div className="mt-4">
                          <span className="text-black inline-block bg-gray-100 rounded-full px-4 py-1 text-sm">
                            {proyecto.habilidad || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{proyecto.cliente}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button className="bg-green-400 hover:bg-green-500 text-white px-4 py-1 rounded flex items-center gap-1 transition-all">
                        Aplicar <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right column - Employee info and current projects */}
          <div>
            {/* Current Projects */}
            <div className="bg-white rounded-lg p-4 mb-6">
              <h3 className="text-black font-bold mb-4">Proyectos actuales</h3>
              {proyectosActuales.length === 0 ? (
                <p className="text-gray-600">No hay proyectos actuales por ahora.</p>
              ) : (
                proyectosActuales.map((proyecto) => (
                  <div key={proyecto.id} className="mb-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">{proyecto.cliente}</span>
                      </div>
                      <div>
                        <p className="text-black font-medium">{proyecto.nombre}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-black font-bold">{proyecto.cargabilidad}%</span>
                          <span className="text-black text-gray-600">Cargabilidad</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Applied Projects */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-black font-bold mb-4">Proyectos postulados</h3>
              {proyectosPostulados.length === 0 ? (
                <p className="text-gray-600">No hay proyectos postulados por ahora.</p>
              ) : (
                proyectosPostulados.map((proyecto) => (
                  <div key={proyecto.id} className="mb-4 last:mb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">{proyecto.cliente}</span>
                      </div>
                      <div>
                        <p className="text-black font-medium">{proyecto.nombre}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-black font-bold">{proyecto.cargabilidad}%</span>
                          <span className="text-black text-gray-600">Cargabilidad</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}