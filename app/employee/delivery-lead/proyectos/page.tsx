"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Elimina la interfaz ProyectoConHabilidades y usa solo el json dinámico

export default function ProyectosPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [deliveryLeadId, setDeliveryLeadId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDeliveryLeadIdAndProjects = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user.id ?? null;
      setUserId(userId);

      if (!userId) return;

      const { data: deliveryLeadData, error: deliveryLeadError } = await supabase
        .from("Delivery_Lead")
        .select("ID_DeliveryLead")
        .eq("ID_Empleado", userId)
        .single();

      if (deliveryLeadError || !deliveryLeadData) return;

      const deliveryLeadId = deliveryLeadData.ID_DeliveryLead;
      setDeliveryLeadId(deliveryLeadId);

      const { data: proyectosData, error: proyectosError } = await supabase
        .rpc("get_proyectos_by_delivery_lead", { emp_id: deliveryLeadId });

      if (!proyectosError && proyectosData) {
        setProjects(proyectosData);
      }
    };

    fetchDeliveryLeadIdAndProjects();
  }, []);

  // Filtrado de proyectos por nombre o ID
  const filteredProjects = projects.filter(
    (project) =>
      project.nombre_proyecto?.toLowerCase().includes(search.toLowerCase()) ||
      project.id_proyecto?.toLowerCase().includes(search.toLowerCase())
  );

  // Proyectos activos: status distinto de 'done'
  const activeProjects = filteredProjects.filter(
    (project) => project.status !== "done"
  );

  // Proyectos finalizados: status igual a 'done'
  const finishedProjects = filteredProjects.filter(
    (project) => project.status === "done"
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
      </div>
      {/* Filtro de búsqueda */}
      <div className="mb-6 flex ">
        <input
          type="text"
          placeholder="Buscar por nombre o ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Proyectos activos</h2>
        {activeProjects.length === 0 ? (
          <p className="text-gray-600">No hay proyectos activos.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProjects.map((project) => {
              const supabaseUrl = "https://nuyfnqiodjynfkubkqpn.supabase.co/storage/v1/object/public/project-images/";
              const imagenUrlCompleta = project.imagenurl ? supabaseUrl + project.imagenurl : null;

              return (
                <div
                  key={project.id_proyecto}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col"
                  onClick={() => router.push(`./proyectos/${project.id_proyecto}`)}
                >
                  {/* Encabezado: Nombre, Status y Imagen circular */}
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-black font-bold text-lg">{project.nombre_proyecto}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {statusMap[project.status] || project.status}
                      </span>
                    </div>
                    {imagenUrlCompleta && (
                      <img
                        src={imagenUrlCompleta}
                        alt={project.nombre_proyecto}
                        className="w-20 h-20 object-cover rounded-full border-2 border-purple-200 shadow ml-4"
                        style={{
                          width: "5rem",
                          height: "5rem",
                          minWidth: "5rem",
                          minHeight: "5rem",
                          maxWidth: "5rem",
                          maxHeight: "5rem",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>

                  {/* Cliente */}
                  <div className="mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                      Cliente: {project.cliente}
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
                    {project.isreviewed && (
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
                        project.habilidades.map((hab: any) => (
                          <li
                            key={`${project.id_proyecto}-${hab.ID_Habilidad}`}
                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
                          >
                            {hab.Nombre} ({hab.nivel})
                          </li>
                        ))
                      ) : (
                        <li key={`no-habilidad-${project.id_proyecto}`} className="text-gray-400 text-xs">Ninguna</li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Proyectos finalizados</h2>
        {finishedProjects.length === 0 ? (
          <p className="text-gray-600">No hay proyectos finalizados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finishedProjects.map((project) => {
              const supabaseUrl = "https://nuyfnqiodjynfkubkqpn.supabase.co/storage/v1/object/public/project-images/";
              const imagenUrlCompleta = project.imagenurl ? supabaseUrl + project.imagenurl : null;

              return (
                <div
                  key={project.id_proyecto}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col"
                  onClick={() => router.push(`./proyectos/${project.id_proyecto}`)}
                >
                  {/* Encabezado: Nombre, Status y Imagen circular */}
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-black font-bold text-lg">{project.nombre_proyecto}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {statusMap[project.status] || project.status}
                      </span>
                    </div>
                    {imagenUrlCompleta && (
                      <img
                        src={imagenUrlCompleta}
                        alt={project.nombre_proyecto}
                        className="w-20 h-20 object-cover rounded-full border-2 border-purple-200 shadow ml-4"
                        style={{
                          width: "5rem",
                          height: "5rem",
                          minWidth: "5rem",
                          minHeight: "5rem",
                          maxWidth: "5rem",
                          maxHeight: "5rem",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>

                  {/* Cliente */}
                  <div className="mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                      Cliente: {project.cliente}
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
                    {project.isreviewed && (
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
                        project.habilidades.map((hab: any) => (
                          <li
                            key={`${project.id_proyecto}-${hab.ID_Habilidad}`}
                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
                          >
                            {hab.Nombre} ({hab.nivel})
                          </li>
                        ))
                      ) : (
                        <li key={`no-habilidad-${project.id_proyecto}`} className="text-gray-400 text-xs">Ninguna</li>
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