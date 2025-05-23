import { getProyectosTerminados } from "@/lib/historial-proyectos/apiCalls";
import { ProyectoTerminado } from "@/lib/historial-proyectos/definitions";
import { use, useEffect, useState } from "react";
import HistorialCard from "./HistorialCard";
import HistorialView from "./HistorialView";
import { getUserId } from "@/lib/getUserId";

interface HistorialProyectosProps {
    projects: ProyectoTerminado[];
}

export default function HistorialProyectos({ projects }: HistorialProyectosProps) {
    const [selectedProject, setSelectedProject] = useState<number>(0);

    return (
        <div className="flex flex-row h-[75vh]">
            <div className="flex flex-col gap-4 w-1/3 pr-2 overflow-y-scroll overflow-x-hidden">
                {projects.map((project, index) => (
                    <HistorialCard
                        key={index}
                        project={project}
                        setSelectedProject={setSelectedProject}
                        index={index}
                    />
                ))}
            </div>
            <div className="flex flex-col w-2/3 pl-2">
                {projects.length > 0 && projects[selectedProject] ? (
                    <HistorialView
                        Evaluaciion={projects[selectedProject].Evaluacion}
                        Autoevaluacion={projects[selectedProject].AutoEvaluacion}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p className="text-lg">Selecciona una certificación para ver los detalles</p>
                    </div>
                )}
            </div>
        </div>
    );
}
