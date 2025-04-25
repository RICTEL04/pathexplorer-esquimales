import React from "react";
import { course } from "@/lib/cursos-empleado/definitions";
import BookOpenIcon from "@heroicons/react/24/solid/BookOpenIcon";

interface CoursesCardProps {
    course: course;
}

export default function CoursesCard({
    course,
}: CoursesCardProps) {
    return (
        <div className="flex flex-row bg-white text-gray-500 rounded-lg shadow-md p-4 items-center justify-between">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
                <BookOpenIcon className="w-6 h-6 text-blue-700" />
            </div>
            <div className="flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-800">{course.Nombre}</h3>
                <div className="flex flex-row gap-4 mt-2">
                    <div>
                        <p className="text-sm text-gray-600">Fecha Fin: {course.Fecha_fin_curso}</p>
                        <p className="text-sm text-gray-600">
                            Descripción: {course ? course.Descripcion : "No description available"}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {course.skills.map((skill) => (
                            <span
                                key={skill.ID_Habilidad}
                                className={`text-sm font-medium px-3 py-1 rounded-full ${skill.Tipo === "hard"
                                    ? "bg-blue-100 text-blue-700"
                                    : skill.Tipo === "soft"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {skill.Descripcion}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <button
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex-shrink-0"
                onClick={() => {
                    window.open(course.link, "_blank");
                }}
            >
                Ir a Curso
            </button>
        </div>
    );
}