import { selectProyectosPostulados } from "@/lib/autoevaluacion-empleado/apiCalls";
import { Employee, ProjectJson } from "@/lib/delivery-lead-proyectos/definitions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Asegúrate de tener tu cliente supabase aquí
import { useRouter } from "next/navigation";
import { Card, Tag } from "antd";

export default function CurrentProjectsColumn({
    empleado,
    setSelfReviewModalOpen,
    setSelectedProject,
}: {
    empleado: Employee | null;
    setSelfReviewModalOpen: (open: boolean) => void;
    setSelectedProject: (project: ProjectJson) => void;
}) {
    const router = useRouter();
    const [proyectosActuales, setProyectosActuales] = useState<ProjectJson[]>([]);
    const [proyectosPostulados, setProyectosPostulados] = useState<ProjectJson[]>([]);
    const [postulacionesDetalladas, setPostulacionesDetalladas] = useState<any[]>([]);

    // Fetch current projects for the employee usando la función RPC
    useEffect(() => {
        const fetchCurrentProjects = async () => {
            if (!empleado?.ID_Empleado) return;

            try {
                // Llama a la función RPC
                const { data, error } = await supabase.rpc("get_active_projects_by_employee", {
                    emp_id: empleado.ID_Empleado,
                });
                console.log("Current projects data:", data);
                if (error) {
                    console.error("Error fetching active projects:", error);
                    setProyectosActuales([]);
                    return;
                }
                setProyectosActuales(data ?? []);
            } catch (error) {
                console.error("Error fetching current projects:", error);
            }
        };

        fetchCurrentProjects();
    }, [empleado?.ID_Empleado]);

    // Fetch postulaciones detalladas
    useEffect(() => {
        const fetchPostulacionesDetalladas = async () => {
            if (!empleado?.ID_Empleado) return;

            // Consulta las postulaciones y haz join con proyectos y puesto_proyecto
            const { data, error } = await supabase
                .from("Postulaciones")
                .select(`
                    ID_Proyecto,
                    ID_Puesto,
                    Proyecto:ID_Proyecto (
                        Nombre,
                        Cliente
                    ),
                    Puesto:ID_Puesto (
                        Puesto
                    )
                `)
                .eq("ID_empleado", empleado.ID_Empleado);

            if (!error && data) {
                setPostulacionesDetalladas(data);
            } else {
                setPostulacionesDetalladas([]);
            }
        };

        fetchPostulacionesDetalladas();
    }, [empleado?.ID_Empleado]);

    // Agrupa postulaciones por proyecto
    const postulacionesPorProyecto = postulacionesDetalladas.reduce((acc, post) => {
        const id = post.ID_Proyecto;
        if (!acc[id]) {
            acc[id] = {
                proyecto: post.Proyecto,
                puestos: [],
            };
        }
        acc[id].puestos.push(post.Puesto?.Puesto || "Puesto");
        return acc;
    }, {} as Record<string, { proyecto: any; puestos: string[] }>);

    return (
        <div className="lg:col-span-1">
            <div className="h-[80vh] mt-12 flex flex-col gap-y-2 min-h-0">
                <Link
                    className="px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded transition-all"
                    href={`/employee/proyectos/historial`}
                >
                    Historial
                </Link>
                <div className="bg-white rounded-lg p-4 flex-1 flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-black font-bold h-fit">
                            Proyectos actuales
                            <span className="ml-2 text-purple-600 text-base font-semibold">
                                ({proyectosActuales.filter(
                                    (proyecto) =>
                                        !proyectosPostulados.map(p => p.ID_Proyecto).includes(proyecto.ID_Proyecto)
                                ).length})
                            </span>
                        </h3>
                    </div>
                    <div className="space-y-4 overflow-y-auto no-scrollbar flex-1 min-h-0 max-h-[55vh]">
                        {proyectosActuales.length === 0 ? (
                            <p className="text-gray-600">No hay proyectos actuales por ahora.</p>
                        ) : (
                            proyectosActuales
                                .filter(
                                    (proyecto) =>
                                        !proyectosPostulados.map(p => p.ID_Proyecto).includes(proyecto.ID_Proyecto)
                                )
                                .map((proyecto, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col md:flex-row md:items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 transition hover:shadow-md cursor-pointer"
                                        onClick={() => router.push(`/employee/proyectos/${proyecto.ID_Proyecto}`)}
                                    >
                                        {/* Icono de proyecto */}
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                                            ${proyecto.Status === "active"
                                                ? "bg-green-100 text-green-600"
                                                : proyecto.Status === "done"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-gray-200 text-gray-500"
                                            }`}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                            </svg>
                                        </div>
                                        {/* Detalles del proyecto */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-lg font-semibold text-black truncate">{proyecto.Nombre}</p>
                                            <p className="text-sm text-gray-500 truncate">Cliente: <span className="font-medium">{proyecto.Cliente}</span></p>
                                        </div>
                                        {/* Estado del proyecto */}
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold
                                            ${proyecto.Status === "active"
                                                ? "bg-green-200 text-green-800"
                                                : proyecto.Status === "done"
                                                    ? "bg-blue-200 text-blue-800"
                                                    : "bg-gray-300 text-gray-700"
                                            }`}>
                                            {proyecto.Status === "active" ? "Activo" : proyecto.Status === "done" ? "Finalizado" : "Otro"}
                                        </span>
                                        {/* Botón de autoevaluación si aplica */}
                                        {proyecto.Status === "done" && (
                                            <button
                                                className="ml-4 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    setSelectedProject(proyecto);
                                                    setSelfReviewModalOpen(true);
                                                }}
                                            >
                                                Autoevaluación
                                            </button>
                                        )}
                                    </div>
                                ))
                        )}
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 flex-1 flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-black font-bold mb-2 flex items-center">
                            Proyectos postulados
                            <span className="ml-2 text-purple-600 text-base font-semibold">
                                ({Object.keys(postulacionesPorProyecto).length})
                            </span>
                        </h3>
                    </div>
                    <div className="space-y-2 overflow-y-auto no-scrollbar flex-1 min-h-0">
                        {Object.keys(postulacionesPorProyecto).length === 0 ? (
                            <p className="text-gray-600">No tienes postulaciones activas.</p>
                        ) : (
                            Object.entries(postulacionesPorProyecto).map(([id, value]) => {
                                const { proyecto, puestos } = value as { proyecto: any; puestos: string[] };
                                return (
                                    <div
                                        key={id}
                                        className="flex flex-col md:flex-row md:items-center gap-4 bg-gray-50 border border-purple-200 rounded-lg shadow-sm p-4 transition hover:shadow-md cursor-pointer"
                                        onClick={() => { router.push(`/employee/proyectos/${id}`)
                                        }}
                                        // Puedes agregar un onClick si quieres navegación
                                    >
                                        {/* Icono de proyecto */}
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-purple-100 text-purple-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                            </svg>
                                        </div>
                                        {/* Detalles del proyecto */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-lg font-semibold text-purple-800 truncate">{proyecto?.Nombre || "Proyecto"}</p>
                                            <p className="text-sm text-gray-500 truncate">Cliente: <span className="font-medium">{proyecto?.Cliente || "Cliente"}</span></p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {puestos.map((puesto, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full text-xs font-semibold"
                                                    >
                                                        {puesto}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}