import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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

  // Obtener el ID del usuario logeado
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
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
      if (error) {
        console.error("Error obteniendo empleado:", error);
        setLoading(false);
        return;
      }
      setEmpleado(data?.empleado || null);
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
      // Obtener todos los proyectos inactivos para enviar a la IA
      const { data: proyectos, error } = await supabase.rpc("get_inactive_projects_with_skills");
      if (error) {
        console.error("Error obteniendo proyectos para sugerencias:", error);
        setLoading(false);
        return;
      }
      // Prepara los datos para el request
      const metas = Array.isArray(empleado.Metas)
        ? empleado.Metas.map((m: any) => m.Nombre || m)
        : [];
      const habilidades = Array.isArray(empleado.Habilidades)
        ? empleado.Habilidades.map((h: any) => h.nombre_habilidad || h.nombre || h)
        : [];
      const intereses = Array.isArray(empleado.Intereses)
        ? empleado.Intereses.map((i: any) => i.Descripcion || i)
        : [];
      const proyectosList = (proyectos || []).map((p: any) => ({
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
        setProyectosSugeridos(suggestedProjects || []);
      } catch (err) {
        console.error("Error llamando a ProjectRecommender:", err);
        setProyectosSugeridos([]);
      }
      setLoading(false);
    };
    fetchProyectosSugeridos();
  }, [Boolean(empleado), viewType]);

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
            if (!empleado?.Cargabilidad || candidatoFilter === "todos") return true;
            const cargabilidadProyecto =
              proyecto.cargabilidad_num !== undefined
                ? proyecto.cargabilidad_num
                : proyecto.Cargabilidad !== undefined
                ? proyecto.Cargabilidad
                : 0;
            const suma = Number(empleado.Cargabilidad) + Number(cargabilidadProyecto);
            if (candidatoFilter === "candidato") return suma < 100;
            if (candidatoFilter === "no-candidato") return suma >= 100;
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
          className={`px-3 py-1 rounded ${viewType === "sugeridos" ? "bg-purple-600 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setViewType("sugeridos")}
        >
          Proyectos sugeridos
        </button>
        <button
          className={`px-3 py-1 rounded ${viewType === "disponibles" ? "bg-purple-600 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setViewType("disponibles")}
        >
          Proyectos disponibles
        </button>
      </div>
      {viewType === "disponibles" && (
        <>
          <div className="flex gap-2 mt-4">
            <button
              className={`px-3 py-1 rounded ${candidatoFilter === "todos" ? "bg-purple-600 text-white" : "bg-gray-200 text-black"}`}
              onClick={() => setCandidatoFilter("todos")}
            >
              Todos
            </button>
            <button
              className={`px-3 py-1 rounded ${candidatoFilter === "candidato" ? "bg-green-600 text-white" : "bg-gray-200 text-black"}`}
              onClick={() => setCandidatoFilter("candidato")}
            >
              Aplicas
            </button>
            <button
              className={`px-3 py-1 rounded ${candidatoFilter === "no-candidato" ? "bg-red-600 text-white" : "bg-gray-200 text-black"}`}
              onClick={() => setCandidatoFilter("no-candidato")}
            >
              No aplicas
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
          <div className="text-center text-gray-400 py-8">No hay proyectos para mostrar.</div>
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
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-purple-700">{proyecto.Nombre}</h3>
                    <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700 border">{proyecto.Status}</span>
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
                <div className="flex gap-4 mt-auto text-xs text-gray-500 pt-2 border-t">
                  {proyecto.fecha_inicio && (
                    <span>
                      <b>Inicio:</b> {new Date(proyecto.fecha_inicio).toLocaleDateString()}
                    </span>
                  )}
                  {proyecto.fecha_fin && (
                    <span>
                      <b>Fin:</b> {new Date(proyecto.fecha_fin).toLocaleDateString()}
                    </span>
                  )}
                </div>
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
