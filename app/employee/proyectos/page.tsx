"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, ChevronDown, ArrowRight, User } from "lucide-react";
import { getProyectos } from "@/lib/getProyectos";
import { getUserId } from "@/lib/getUserId";
import { fetchEmpleadoFromUid } from "@/lib/fetchEmpleadoFromUid";
import { aplicarEmpleadoProyecto } from "@/lib/aplicarEmpleadoProyecto";
import { getEmpleadoProyectos } from "@/lib/getEmpleadoProyectos";
import { removeEmpleadoProyecto } from "@/lib/removeEmpleadoProyecto"; // Import the function


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
  const [userId, setUserId] = useState<string | null>(null);
  const [empleadoNombre, setEmpleadoNombre] = useState<string | null>(null);

  // Fetch the logged-in user's ID
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  // Fetch the Empleado.Nombre based on userId
  useEffect(() => {
    const fetchEmpleadoNombre = async () => {
      if (!userId) return;

      const nombre = await fetchEmpleadoFromUid(userId);
      setEmpleadoNombre(nombre);
    };

    fetchEmpleadoNombre();
  }, [userId]);

  // Fetch projects from the database
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const proyectos = await getProyectos();

        const mappedProyectos: Project[] = proyectos.map((proyecto: any) => ({
          id: proyecto.ID_Proyecto,
          nombre: proyecto.Nombre,
          descripcion: proyecto.Descripcion,
          status: proyecto.Status,
          cliente: proyecto.ID_Cliente,
          cargabilidad: Math.floor(Math.random() * 100),
        }));

        setProyectosSugeridos(mappedProyectos);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProyectos();
  }, []);

  // Fetch current projects for the employee
  useEffect(() => {
    const fetchCurrentProjects = async () => {
      if (!userId) return;

      try {
        // Get the project IDs for the current employee
        const projectIds = await getEmpleadoProyectos(userId);

        // Filter the suggested projects to match the current project IDs
        const currentProjects = proyectosSugeridos.filter((proyecto) =>
          projectIds.includes(proyecto.id)
        );

        setProyectosActuales(currentProjects);
      } catch (error) {
        console.error("Error fetching current projects:", error);
      }
    };

    fetchCurrentProjects();
  }, [userId, proyectosSugeridos]);

  // Handle "Aplicar" button click
  const handleAplicar = async (proyectoId: string) => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    const success = await aplicarEmpleadoProyecto(userId, proyectoId);

    if (success) {
      alert("Aplicación exitosa al proyecto.");
    } else {
      alert("Hubo un error al aplicar al proyecto.");
    }
  };

  // Handle "Remove" button click
  const handleRemove = async (proyectoId: string) => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    const success = await removeEmpleadoProyecto(userId, proyectoId);

    if (success) {
      alert("Proyecto eliminado exitosamente.");
      // Update the current projects list
      setProyectosActuales((prev) =>
        prev.filter((proyecto) => proyecto.id !== proyectoId)
      );
    } else {
      alert("Hubo un error al eliminar el proyecto.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

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
                      </div>
                      <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{proyecto.cliente}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleAplicar(proyecto.id)}
                        className="bg-purple-600 hover:bg-purple-800 text-white px-4 py-1 rounded flex items-center gap-1 transition-all"
                      >
                        Aplicar <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right column - Current Projects */}
          <div>
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
                        <p className="text-gray-600">{proyecto.descripcion}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => handleRemove(proyecto.id)} // Call handleRemove with proyecto.id
                        className="bg-red-600 hover:bg-red-800 text-white px-4 py-1 rounded flex items-center gap-1 transition-all"
                      >
                        Eliminar
                      </button>
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