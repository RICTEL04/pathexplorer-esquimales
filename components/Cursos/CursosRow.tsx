import React from "react";
import { course } from "@/lib/cursos-empleado/definitions";

interface CourseRowProps {
    course: course;
}

function CoursesRow({ course }: CourseRowProps) {
    return (
        <>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{course.Nombre}</td>
            <td className="px-6 py-4">{course.skill.Descripcion}</td>
            <td className="px-6 py-4">{course.skill.Tipo === "hard" ? "Hard Skill" : course.skill.Tipo === "soft" ? "Soft Skill": "Unknown"}</td>
        </>
    );
}

export default CoursesRow;