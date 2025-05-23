import { Evaluacion } from "@/lib/historial-proyectos/definitions";
import React from "react";

interface HistorialViewProps {
    Evaluaciion: Evaluacion | null;
    Autoevaluacion: Evaluacion | null;
}

function EvaluacionBlock({
    title,
    evaluacion,
}: {
    title: string;
    evaluacion: Evaluacion | null;
}) {
    if (!evaluacion) return null;
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 w-full mb-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-medium">Calificación:</label>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={star <= evaluacion.Calificacion ? "text-yellow-400 text-3xl" : "text-gray-300 text-3xl"}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-medium">Fortalezas:</label>
                <div className="w-full border rounded p-2 bg-gray-50 min-h-[64px] whitespace-pre-line">
                    {evaluacion.Fortalezas || <span className="text-gray-400">Sin comentarios.</span>}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-2 font-medium">Áreas de Mejora:</label>
                <div className="w-full border rounded p-2 bg-gray-50 min-h-[64px] whitespace-pre-line">
                    {evaluacion.Areas_Mejora || <span className="text-gray-400">Sin comentarios.</span>}
                </div>
            </div>
        </div>
    );
}

function HistorialView({ Evaluaciion, Autoevaluacion }: HistorialViewProps) {
    if (!Evaluaciion && !Autoevaluacion) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                <p className="text-lg">No hay información de evaluación disponible.</p>
            </div>
        );
    }
    return (
        <div className="flex flex-col overflow-y-scroll overflow-x-hidden no-scrollbar">
            <EvaluacionBlock title="Evaluación" evaluacion={Evaluaciion} />
            <EvaluacionBlock title="Autoevaluación" evaluacion={Autoevaluacion} />
        </div>
    );
}

export default HistorialView;