"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Habilidad {
  ID_Habilidad: string;
  Nombre: string;
  nivel: string;
}

interface ProyectoConHabilidades {
  ID_Proyecto: string;
  nombre_proyecto: string;
  Descripcion: string;
  Status: string;
  ID_DeliveryLead: string;
  fecha_inicio: string;
  fecha_fin: string;
  isReviewed: boolean;
  cargabilidad_num: number;
  Cliente: string;
  created_at: string;
  ImagenUrl: string | null;
  habilidades: Habilidad[];
}

export default function ProyectosPage() {
  const [projects, setProjects] = useState<ProyectoConHabilidades[]>([]);
  const [employeeCounts, setEmployeeCounts] = useState<{ [key: string]: number }>({});
  const [search, setSearch] = useState(""); // Nuevo estado para el filtro
  const [statusFilter, setStatusFilter] = useState(""); // "" para todos
  const router = useRouter();

  useEffect(() => {
    const fetchProjectsAndCounts = async () => {
      // Llama a la función RPC
      const { data: proyectosData, error } = await supabase.rpc("get_proyectos_con_habilidades");
      if (!error && proyectosData) {
        setProjects(proyectosData);

        // Fetch counts for all projects
        const { data: countsData, error: countsError } = await supabase
          .from("Empleado_Proyectos")
          .select("ID_Proyecto", { count: "exact", head: false });

        // Map for ID_Proyecto -> count
        const countsMap: { [key: string]: number } = {};
        if (!countsError && countsData) {
          countsData.forEach((row: any) => {
            countsMap[row.ID_Proyecto] = (countsMap[row.ID_Proyecto] || 0) + 1;
          });
        }
        setEmployeeCounts(countsMap);
      }
    };

    fetchProjectsAndCounts();
  }, []);

  // Filtrado de proyectos por nombre o ID y status
  const filteredProjects = projects.filter(
    (project) =>
      (project.nombre_proyecto.toLowerCase().includes(search.toLowerCase()) ||
        project.ID_Proyecto.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "" || 
        (statusFilter === "active" && project.Status === "active") ||
        (statusFilter === "inactive" && project.Status === "inactive") ||
        (statusFilter === "done" && project.Status === "done"))
  );

  // Mapeo de status a nombres en español
  const statusMap: Record<string, string> = {
    active: "Activo",
    inactive: "En progreso",
    done: "Finalizado",
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-gray-800 text-4xl font-bold mb-2">Proyectos</h1>
          <p className="text-gray-600">Aquí puedes gestionar los proyectos.</p>
        </div>
        <button
          onClick={() => router.push("./proyectos/new")}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Proyecto</span>
        </button>
      </div>
      {/* Filtro de búsqueda */}
      <div className="mb-6 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Buscar por nombre o ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Todos</option>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
          <option value="done">Finalizado</option>
        </select>
      </div>
      <div className="mt-8">
        {filteredProjects.length === 0 ? (
          <p className="text-gray-600">No hay proyectos disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const supabaseUrl = "https://nuyfnqiodjynfkubkqpn.supabase.co/storage/v1/object/public/project-images/";
              const imagenUrlCompleta = project.ImagenUrl ? supabaseUrl + project.ImagenUrl : null;

              return (
                <div
                  key={project.ID_Proyecto}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col"
                  onClick={() => router.push(`./proyectos/${project.ID_Proyecto}`)}
                >
                  {/* Encabezado: Nombre, Status y Imagen circular */}
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-black font-bold text-lg">{project.nombre_proyecto}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.Status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {statusMap[project.Status] || project.Status}
                      </span>
                    </div>
                    {imagenUrlCompleta && (
                      <img
                        src={imagenUrlCompleta}
                        alt={project.nombre_proyecto}
                        className="w-16 h-16 object-cover rounded-full border-2 border-purple-200 shadow ml-4"
                      />
                    )}
                  </div>

                  {/* Cliente */}
                  <div className="mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                      Cliente: {project.Cliente}
                    </span>
                  </div>

                  {/* Fechas */}
                  <div className="flex gap-4 text-xs text-gray-500 mb-2">
                    <span>Inicio: <span className="font-semibold">{project.fecha_inicio}</span></span>
                    <span>Fin: <span className="font-semibold">{project.fecha_fin}</span></span>
                  </div>

                  {/* Empleados asignados y cargabilidad */}
                  <div className="flex gap-4 items-center mb-2">
                    <span className="text-orange-700 font-semibold text-xs">
                      Cargabilidad: {project.cargabilidad_num}%
                    </span>
                    {project.isReviewed && (
                      <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded text-xs ml-auto">
                        Revisado
                      </span>
                    )}
                  </div>

                  {/* Habilidades */}
                  <div className="mt-auto">
                    <span className="font-semibold text-gray-700 text-sm">Habilidades requeridas:</span>
                    <ul className="flex flex-wrap gap-2 mt-1">
                      {project.habilidades && project.habilidades.length > 0 ? (
                        project.habilidades.map((hab) => (
                          <li
                            key={hab.ID_Habilidad}
                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
                          >
                            {hab.Nombre} ({hab.nivel})
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-400 text-xs">Ninguna</li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}