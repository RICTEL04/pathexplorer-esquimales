"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, ChevronDown, ArrowRight, User } from "lucide-react";
import { getProyectos } from "@/lib/getProyectos";
import { getUserId } from "@/lib/getUserId";
import { fetchEmpleadoFromUid } from "@/lib/fetchEmpleadoFromUid";
import { aplicarEmpleadoProyecto } from "@/lib/aplicarEmpleadoProyecto";
import { getEmpleadoProyectos } from "@/lib/getEmpleadoProyectos";
import { removeEmpleadoProyecto } from "@/lib/removeEmpleadoProyecto"; // Import the function
import { getEmpleadosSinAutoevaluacion } from "@/lib/autoevaluacion-empleado/apiCalls";
import SelfReviewModal from "@/components/Autoevaluacion/SelfReviewModal";
import { ProjectJson } from "@/lib/delivery-lead-proyectos/definitions";


export default function ProyectosPage() {
  const [proyectosSugeridos, setProyectosSugeridos] = useState<ProjectJson[]>([]);
  const [proyectosActuales, setProyectosActuales] = useState<ProjectJson[]>([]);
  const [proyectosPostulados, setProyectosPostulados] = useState<ProjectJson[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [empleadoNombre, setEmpleadoNombre] = useState<string | null>(null);
  const [selfReviewModalOpen, setSelfReviewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectJson | null>(null);

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

        const mappedProyectos: ProjectJson[] = proyectos.map((proyecto: any) => ({
          ID_Proyecto: proyecto.ID_Proyecto,
          Nombre: proyecto.Nombre,
          Descripcion: proyecto.Descripcion,
          Status: proyecto.Status,
          ID_Cliente: proyecto.ID_Proyecto_Cliente,
          cargabilidad: Math.floor(Math.random() * 100),
          ID_DeliveryLead: proyecto.ID_DeliveryLead,
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
        // Filter the suggested projects to match the current project IDs
        const currentProjectsResult = await getEmpleadosSinAutoevaluacion(userId);

        if (Array.isArray(currentProjectsResult)) {
          const mappedProyectos: ProjectJson[] = currentProjectsResult.map((proyecto: any) => ({
            ID_Proyecto: proyecto.ID_Proyecto,
            Nombre: proyecto.Nombre,
            Descripcion: proyecto.Descripcion,
            Status: proyecto.Status,
            ID_Cliente: proyecto.ID_Proyecto_Cliente,
            cargabilidad: Math.floor(Math.random() * 100),
            ID_DeliveryLead: proyecto.ID_DeliveryLead,
          }));

          setProyectosActuales(mappedProyectos);
        } else {
          setProyectosActuales([]);
          console.error("getEmpleadosSinAutoevaluacion did not return an array:", currentProjectsResult);
        }

      } catch (error) {
        console.error("Error fetching current projects:", error);
      }
    };

    fetchCurrentProjects();
  }, [userId]);

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
        prev.filter((proyecto) => proyecto.ID_Proyecto !== proyectoId)
      );
    } else {
      alert("Hubo un error al eliminar el proyecto.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Review Modal */}
      {selfReviewModalOpen && selectedProject && userId && (
        <SelfReviewModal
          onClose={() => setSelfReviewModalOpen(false)}
          selectedProject={selectedProject}
          employee={userId}
        />
      )}
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
                proyectosSugeridos.map((proyecto, idx) => (
                  <div
                    key={proyecto.ID_Proyecto ? `sugerido-${proyecto.ID_Proyecto}` : `sugerido-idx-${idx}`}
                    className="bg-white rounded-lg border border-gray-200 p-4 relative"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-black font-bold">{proyecto.Nombre}</h3>
                        <p className="text-gray-600 text-sm">{proyecto.Status}</p>
                        <p className="text-gray-600 mt-2">{proyecto.Descripcion}</p>
                      </div>
                      <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{proyecto.ID_Cliente}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleAplicar(proyecto.ID_Proyecto)}
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
                proyectosActuales.map((proyecto, idx) => (
                  <div
                    key={proyecto.ID_Proyecto ? `actual-${proyecto.ID_Proyecto}` : `actual-idx-${idx}`}
                    className="mb-4 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">{proyecto.ID_Cliente}</span>
                      </div>
                      <div>
                        <p className="text-black font-medium">{proyecto.Nombre}</p>
                        <p className="text-gray-600">{proyecto.Descripcion}</p>
                      </div>
                    </div>
                    {proyecto.Status === "active" ? (
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => handleRemove(proyecto.ID_Proyecto)} // Call handleRemove with proyecto.ID_Proyecto
                          className="bg-red-600 hover:bg-red-800 text-white px-4 py-1 rounded flex items-center gap-1 transition-all"
                        >
                          Eliminar
                        </button>
                      </div>
                    ) : proyecto.Status === "done" ? (
                      <div>
                        <button
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
                          onClick={() => { setSelectedProject(proyecto); setSelfReviewModalOpen(true); console.log("Selected project:", proyecto); console.log("Selected ID:", userId); }}
                        >
                          Revisar
                        </button>
                      </div>
                    ) : null}
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