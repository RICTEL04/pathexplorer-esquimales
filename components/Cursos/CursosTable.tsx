import React from "react";
import CoursesRow from "./CursosRow";
import { course } from "@/lib/cursos-empleado/definitions";

interface CoursesTableProps {
    courses: course[];
}

export default function CoursesTable({ courses }: CoursesTableProps) {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-md shadow-md overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Habilidad</th>
                    <th className="px-6 py-3">Tipo</th>
                </tr>
            </thead>
            <tbody className="bg-white border-b border-gray-200">
                {courses.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-100" onDoubleClick={() => {window.open(course.link, "_blank")}}>
                        <CoursesRow course={course} />
                    </tr>
                ))}
            </tbody>
        </table>
    );
}