import { aplicarEmpleadoProyecto } from "@/lib/aplicarEmpleadoProyecto";
import { Employee, ProjectJson } from "@/lib/delivery-lead-proyectos/definitions";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getProyectos } from "@/lib/getProyectos";

export default function SuggestedProjectsColumn({
    empleado,
}: {
    empleado: Employee | null;
}) {
    const [proyectosSugeridos, setProyectosSugeridos] = useState<ProjectJson[]>([]);

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

    // Handle "Aplicar" button click
    const handleAplicar = async (proyectoId: string) => {
        if (!empleado?.ID_Empleado) {
            console.error("User ID is not available.");
            return;
        }

        const success = await aplicarEmpleadoProyecto(empleado.ID_Empleado, proyectoId);

        if (success) {
            alert("Aplicación exitosa al proyecto.");
        } else {
            alert("Hubo un error al aplicar al proyecto.");
        }
    };
    return (
        <div className="lg:col-span-2">
            <h2 className="text-2xl text-black font-bold">Proyectos sugeridos</h2>
            <div className="space-y-4 overflow-y-scroll no-scrollbar mt-4 h-[80vh]">
                {proyectosSugeridos.length === 0 ? (
                    <p className="text-gray-600">No hay proyectos sugeridos por ahora.</p>
                ) : (
                    proyectosSugeridos.map((proyecto, index) => (
                        <div
                            key={index}
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
    );
}