import { ProyectoTerminado } from "@/lib/historial-proyectos/definitions";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

interface HistorialCardProps {
    project: ProyectoTerminado;
    setSelectedProject: (id: number) => void; // Callback to set selected project
    index: number;
}

function HistorialCard({ project, setSelectedProject, index }: HistorialCardProps) {

    return (
        <div className="bg-white text-gray-500 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow hover:bg-gray-200 cursor-pointer">
            <div onClick={() => setSelectedProject(index)}>
                <h3 className="text-lg font-bold text-gray-800">{project.Nombre}</h3>
                <p className="text-gray-600">Fecha Inicio: {project.fecha_inicio}</p>
                <p className="text-gray-600">Fecha Fin: {project.fecha_fin}</p>
            </div>
        </div>
    );
}

export default HistorialCard;