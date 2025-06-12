import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Tag } from "antd";
import {
  CalendarOutlined,
} from "@ant-design/icons";

export default function SuggestedProjectsColumn() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [empleado, setEmpleado] = useState<any>(null);
  const [proyectosSugeridos, setProyectosSugeridos] = useState<any[]>([]);
  const [proyectosDisponibles, setProyectosDisponibles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState<"sugeridos" | "disponibles">("sugeridos");
  const [searchTerm, setSearchTerm] = useState("");
  const [candidatoFilter, setCandidatoFilter] = useState<"todos" | "candidato" | "no-candidato">("todos");
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [noAplicaPorCargabilidad, setNoAplicaPorCargabilidad] = useState(false);
  const [hayProyectosDisponibles, setHayProyectosDisponibles] = useState(true); // NUEVO ESTADO

  // Extraer metas y habilidades igual que en page.tsx
  const metas = empleado?.metas
    ? empleado.metas.map((m: any) => m.Nombre || m)
    : [];

  const habilidades = [
    ...(empleado?.hardSkills || []),
    ...(empleado?.softSkills || []),
  ].map((h: any) => h.nombre || h.nombre_habilidad || h);

  // Intereses igual
  const intereses = empleado?.intereses
    ? empleado.intereses.map((i: any) => i.Descripcion || i)
    : [];

  // Obtener el ID del usuario logeado
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Usuario logeado:", session?.user.id);
      setUserId(session?.user.id ?? null);
    };
    getSession();
  }, []);

  // Obtener datos del empleado logeado (incluye cargabilidad, metas, habilidades, intereses)
  useEffect(() => {
    const fetchEmpleado = async () => {
      if (!userId) return;
      setLoading(true);
      const { data, error } = await supabase.rpc("get_empleado_a_recomendar", { p_id_empleado: userId });
      console.log("Datos del empleado222222:", data);
      if (error) {
        console.error("Error obteniendo empleado:", error);
        setLoading(false);
        return;
      }
      // Si data es un array, toma el primer elemento
      // Si data tiene un campo 'empleado', usa ese campo
      let empleadoObj = data;
      if (Array.isArray(data)) {
        empleadoObj = data[0] || null;
      } else if (data?.empleado) {
        empleadoObj = data.empleado;
      }
      setEmpleado(empleadoObj || null);
      setLoading(false);
    };
    fetchEmpleado();
  }, [userId]);

  // Obtener proyectos disponibles (todos los inactivos)
  useEffect(() => {
    if (viewType !== "disponibles") return;
    const fetchProyectosDisponibles = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_inactive_projects_with_skills");
      if (error) {
        console.error("Error obteniendo proyectos disponibles:", error);
        setLoading(false);
        return;
      }
      console.log("Proyectos disponibles:", data);
      setProyectosDisponibles(data || []);
      setLoading(false);
    };
    fetchProyectosDisponibles();
  }, [viewType]);

  // Obtener proyectos sugeridos (IA)
  useEffect(() => {
    if (viewType !== "sugeridos" || !empleado) return;
    const fetchProyectosSugeridos = async () => {
      setLoading(true);
      setNoAplicaPorCargabilidad(false);
      setHayProyectosDisponibles(true); // reset

      const { data: proyectos, error } = await supabase.rpc("get_inactive_projects_with_skills");
      console.log("Proyectos obtenidos para sugerencias:", proyectos);
      if (error) {
        console.error("Error obteniendo proyectos para sugerencias:", error);
        setLoading(false);
        return;
      }

      // Si no hay proyectos en la base, marcarlo
      if (!proyectos || proyectos.length === 0) {
        setProyectosSugeridos([]);
        setHayProyectosDisponibles(false);
        setLoading(false);
        return;
      }

      const metas = Array.isArray(empleado?.metas_en_progreso)
        ? empleado.metas_en_progreso.map((m: any) => m.Nombre || m)
        : [];

      const habilidades = Array.isArray(empleado?.habilidades)
        ? empleado.habilidades.map((h: any) => h.nombre || h.nombre_habilidad || h)
        : [];

      const intereses = Array.isArray(empleado?.intereses)
        ? empleado.intereses.map((i: any) => i.Descripcion || i)
        : [];

      const cargabilidadEmpleado = Number(empleado.Cargabilidad ?? 0);
      const proyectosList = (proyectos || [])
        .filter((p: any) => {
          const cargabilidadProyecto =
            p.cargabilidad_num !== undefined
              ? Number(p.cargabilidad_num)
              : p.Cargabilidad !== undefined
              ? Number(p.Cargabilidad)
              : 0;
          return cargabilidadEmpleado + cargabilidadProyecto <= 100; // Cambia aquí: antes era < 100
        })
        .map((p: any) => ({
          ID_Proyecto: p.ID_Proyecto,
          Nombre: p.Nombre,
          Descripcion: p.Descripcion,
          Status: p.Status,
          fecha_inicio: p.fecha_inicio,
          fecha_fin: p.fecha_fin,
          cargabilidad_num: p.cargabilidad_num,
          habilidades_proyecto: p.habilidades_proyecto,
          ImagenUrl: p.ImagenUrl,
        }));

      if (proyectosList.length === 0) {
        setProyectosSugeridos([]);
        setNoAplicaPorCargabilidad(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/ProjectRecommender", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            metas,
            habilidades,
            intereses,
            proyectos: proyectosList,
          }),
        });
        if (!response.ok) throw new Error("Error en la API interna");
        const { suggestedProjects } = await response.json();
        // Enriquecer los proyectos sugeridos con la info completa
        const proyectosCompletos = (suggestedProjects || []).map((sp: any) => {
          const original = proyectosList.find((p: any) => p.ID_Proyecto === sp.ID_Proyecto);
          return original ? { ...original, ...sp } : sp;
        });
        setProyectosSugeridos(proyectosCompletos);
      } catch (err) {
        console.error("Error llamando a ProjectRecommender:", err);
        setProyectosSugeridos([]);
      }
      setLoading(false);
    };
    fetchProyectosSugeridos();
  }, [empleado, viewType]);

  // Decide qué lista mostrar y aplicar filtro solo en "disponibles"
  const proyectosFiltrados =
    viewType === "disponibles"
      ? proyectosDisponibles
          .filter((proyecto) => {
            const term = searchTerm.toLowerCase();
            return (
              proyecto.Nombre?.toLowerCase().includes(term) ||
              proyecto.ID_Proyecto?.toString().includes(term)
            );
          })
          .filter((proyecto) => {
            if (candidatoFilter === "todos") return true;
            const cargabilidadProyecto =
              proyecto.cargabilidad_num !== undefined
                ? proyecto.cargabilidad_num
                : proyecto.Cargabilidad !== undefined
                ? proyecto.Cargabilidad
                : 0;
            const suma = Number(empleado?.Cargabilidad ?? 0) + Number(cargabilidadProyecto);
            if (candidatoFilter === "candidato") return suma <= 100;
            if (candidatoFilter === "no-candidato") return suma > 100;
            return true;
          })
      : proyectosSugeridos;

  // Función para manejar el click en proyecto disponible
  const handleProjectClick = (proyecto: any) => {
    if (viewType !== "disponibles") {
      router.push(`/employee/proyectos/${proyecto.ID_Proyecto}`);
      return;
    }
    const cargabilidadProyecto =
      proyecto.cargabilidad_num !== undefined
        ? proyecto.cargabilidad_num
        : proyecto.Cargabilidad !== undefined
        ? proyecto.Cargabilidad
        : 0;
    const suma = Number(empleado?.Cargabilidad ?? 0) + Number(cargabilidadProyecto);
    if (suma >= 100) {
      setSelectedProject(proyecto);
      setShowModal(true);
    } else {
      router.push(`/employee/proyectos/${proyecto.ID_Proyecto}`);
    }
  };

  return (
    <div className="lg:col-span-2">
      <h2 className="text-2xl text-black font-bold">Proyectos</h2>
      <div className="flex gap-2 mt-2">
        <button
          className={`px-3 py-1 rounded ${viewType === "sugeridos" ? "bg-gradient-to-r from-violet-700 to-fuchsia-600 hover:from-violet-800 hover:to-fuchsia-700 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setViewType("sugeridos")}
        >
          Proyectos sugeridos
        </button>
        <button
          className={`px-3 py-1 rounded ${viewType === "disponibles" ? "bg-gradient-to-r from-violet-700 to-fuchsia-600 hover:from-violet-800 hover:to-fuchsia-700 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setViewType("disponibles")}
        >
          Proyectos disponibles
        </button>
      </div>
      {viewType === "disponibles" && (
        <>
          <div className="flex gap-2 mt-4">
            <button
              className={`px-3 py-1 rounded ${candidatoFilter === "todos" ? "bg-gradient-to-r from-violet-700 to-fuchsia-600 hover:from-violet-800 hover:to-fuchsia-700 text-white" : "bg-gray-200 text-black"}`}
              onClick={() => setCandidatoFilter("todos")}
            >
              Todos
            </button>
            <button
              className={`px-3 py-1 rounded ${candidatoFilter === "candidato" ? "bg-gradient-to-r from-green-700 to-yellow-700 hover:from-green-800 hover:to-yellow-800 text-white" : "bg-gray-200 text-black"}`}
              onClick={() => setCandidatoFilter("candidato")}
            >
              Puedes postularte
            </button>
            <button
              className={`px-3 py-1 rounded ${candidatoFilter === "no-candidato" ? "bg-gradient-to-r from-red-700 to-orange-600 hover:from-red-800 hover:to-orange-700 text-white" : "bg-gray-200 text-black"}`}
              onClick={() => setCandidatoFilter("no-candidato")}
            >
              No puedes postularte
            </button>
          </div>
          <input
            type="text"
            placeholder="Buscar por título o ID..."
            className="mt-4 mb-2 px-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-300"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </>
      )}
      <div className="space-y-4 overflow-y-scroll no-scrollbar mt-4 h-[80vh]">
        {loading ? (
          <div className="text-center text-gray-400 py-8">Cargando proyectos...</div>
        ) : proyectosFiltrados.length === 0 ? (
          viewType === "sugeridos" ? (
            !hayProyectosDisponibles ? (
              <div className="text-center text-gray-400 py-8">
                No hay proyectos para mostrar.
              </div>
            ) : noAplicaPorCargabilidad ? (
              <div className="text-center text-red-500 py-8">
                Tu cargabilidad es muy alta, no puedes aplicar a proyectos.<br />
                <span className="font-bold">Cargabilidad actual: {empleado?.Cargabilidad ?? 0}%</span>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                No hay proyectos sugeridos para ti en este momento.
              </div>
            )
          ) : (
            <div className="text-center text-gray-400 py-8">No hay proyectos para mostrar.</div>
          )
        ) : (
          proyectosFiltrados.map((proyecto: any) => {
            const imagenSrc = proyecto.ImagenUrl
              ? `https://nuyfnqiodjynfkubkqpn.supabase.co/storage/v1/object/public/project-images/${proyecto.ImagenUrl}`
              : proyecto.Imagen || undefined;
            const cargabilidad =
              proyecto.cargabilidad_num !== undefined
                ? proyecto.cargabilidad_num
                : proyecto.Cargabilidad !== undefined
                ? proyecto.Cargabilidad
                : undefined;
            const habilidades =
              proyecto.habilidades_proyecto?.length > 0
                ? proyecto.habilidades_proyecto
                : proyecto.Habilidades?.length > 0
                ? proyecto.Habilidades
                : [];
            return (
              <div
                key={proyecto.ID_Proyecto}
                className="bg-white rounded-lg border-l-4 border-purple-400 border shadow-md p-4 relative cursor-pointer hover:shadow-xl transition-all duration-200 flex flex-col"
                onClick={() => handleProjectClick(proyecto)}
              >
                {/* Marca para proyectos NO candidatos */}
                {viewType === "disponibles" && (() => {
                  const cargabilidadProyecto =
                    proyecto.cargabilidad_num !== undefined
                      ? proyecto.cargabilidad_num
                      : proyecto.Cargabilidad !== undefined
                      ? proyecto.Cargabilidad
                      : 0;
                  const suma = Number(empleado?.Cargabilidad ?? 0) + Number(cargabilidadProyecto);
                  if (suma > 100) { // Cambia aquí
                    return (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow z-10">
                        No aplicas
                      </div>
                    );
                  }
                  return null;
                })()}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-purple-700">{proyecto.Nombre}</h3>
                    <Tag color="blue" icon={<CalendarOutlined />} className="font-medium">
                      {proyecto.fecha_inicio} - {proyecto.fecha_fin}
                    </Tag>
                  </div>
                  {imagenSrc && (
                    <img
                      src={imagenSrc}
                      alt={proyecto.Nombre}
                      className="w-20 h-20 object-cover rounded-full border-2 border-purple-300 shadow ml-4"
                      style={{ objectPosition: "center" }}
                    />
                  )}
                </div>
                {cargabilidad !== undefined && (
                  <div className="mb-2">
                    <span className="inline-block text-xs font-semibold text-purple-600 bg-purple-100 rounded px-2 py-0.5">
                      Cargabilidad: {cargabilidad}%
                    </span>
                  </div>
                )}
                {habilidades.length > 0 && (
                  <div className="mb-2">
                    <span className="text-gray-600 text-xs font-semibold">Habilidades requeridas:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {habilidades.map((hab: any, idx: number) => (
                        <span
                          key={idx}
                          className="bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded-full border border-purple-200"
                        >
                          {hab.Nombre || hab}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      {/* Modal de aviso */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/20 bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4 text-red-600">No puedes aplicar a este proyecto</h2>
            <p className="mb-6 text-gray-700">
              Tu cargabilidad más la del proyecto supera el 100%.<br />
              Sin embargo, puedes ver los detalles del proyecto.
            </p>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              onClick={() => {
                setShowModal(false);
                if (selectedProject) {
                  router.push(`/employee/proyectos/${selectedProject.ID_Proyecto}`);
                }
              }}
            >
              Ver detalles
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
