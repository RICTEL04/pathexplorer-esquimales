import { getEmpleadosSinAutoevaluacion, selectProyectosPostulados } from "@/lib/autoevaluacion-empleado/apiCalls";
import { Employee, ProjectJson } from "@/lib/delivery-lead-proyectos/definitions";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CurrentProjectsColumn({
    empleado,
    setSelfReviewModalOpen,
    setSelectedProject,
}: {
    empleado: Employee | null;
    setSelfReviewModalOpen: (open: boolean) => void;
    setSelectedProject: (project: ProjectJson) => void;
}) {
    const [proyectosActuales, setProyectosActuales] = useState<ProjectJson[]>([]);
    const [proyectosPostulados, setProyectosPostulados] = useState<ProjectJson[]>([]);

    // Fetch current projects for the employee
    useEffect(() => {
        const fetchCurrentProjects = async () => {
            if (!empleado?.ID_Empleado) return;

            try {
                const proyectosPostulados = await selectProyectosPostulados(empleado.ID_Empleado);
                setProyectosPostulados(proyectosPostulados ?? []);
                console.log("Proyectos postulados:", proyectosPostulados);
                // Filter the suggested projects to match the current project IDs
                const currentProjectsResult = await getEmpleadosSinAutoevaluacion(empleado?.ID_Empleado);

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
    }, [empleado?.ID_Empleado]);

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
                    <h3 className="text-black font-bold mb-2 h-fit">Proyectos actuales</h3>
                    <div className="space-y-2 overflow-y-auto no-scrollbar flex-1 min-h-0">
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
                                    className="border-b pb-2 last:border-0 last:pb-0 flex justify-between items-center"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-2 h-12 rounded-xs flex items-center justify-center ${proyecto.Status === "active"
                                                ? "bg-green-400"
                                                : proyecto.Status === "done"
                                                    ? "bg-blue-400"
                                                    : "bg-gray-400"
                                                }`}
                                        >
                                            <span className="text-white text-xs">{proyecto.ID_Cliente}</span>
                                        </div>
                                        <div>
                                            <p className="text-black font-medium">{proyecto.Nombre}</p>
                                        </div>
                                    </div>
                                    {proyecto.Status === "done" ? (
                                        <div className="mt-2 flex justify-end">
                                            <button
                                                className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
                                                onClick={() => { setSelectedProject(proyecto); setSelfReviewModalOpen(true); console.log("Selected project:", proyecto); console.log("Selected ID:", empleado?.ID_Empleado); }}
                                            >
                                                Autoevaluación
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 flex-1 flex flex-col min-h-0">
                    <h3 className="text-black font-bold mb-2">Proyectos postulados</h3>
                    <div className="space-y-2 overflow-y-auto no-scrollbar flex-1 min-h-0">
                        {proyectosActuales.length === 0 ? (
                            <p className="text-gray-600">No hay proyectos actuales por ahora.</p>
                        ) : (
                            proyectosActuales
                            .filter(
                                (proyecto) =>
                                    proyectosPostulados.map(p => p.ID_Proyecto).includes(proyecto.ID_Proyecto)
                            )
                            .map((proyecto, index) => (
                                <div
                                    key={index}
                                    className="border-b pb-2 last:border-0 last:pb-0 flex justify-between items-center"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-2 h-12 rounded-xs flex items-center justify-center ${proyecto.Status === "active"
                                                ? "bg-green-400"
                                                : proyecto.Status === "done"
                                                    ? "bg-blue-400"
                                                    : "bg-gray-400"
                                                }`}
                                        >
                                            <span className="text-white text-xs">{proyecto.ID_Cliente}</span>
                                        </div>
                                        <div>
                                            <p className="text-black font-medium">{proyecto.Nombre}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}