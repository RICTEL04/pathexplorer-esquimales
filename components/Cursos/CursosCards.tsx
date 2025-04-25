import React from "react";
import { course } from "@/lib/cursos-empleado/definitions";
import CoursesCard from "./CursosCard";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import { EmployeeFullData2 } from "@/lib/employeeService";
import certification from "@/lib/certificados-empleados/definitions";

interface CoursesCardsProps {
    courses: course[];
    employee: EmployeeFullData2;
    certifications: certification[];
}

export default function CoursesCards({ courses, certifications, employee }: CoursesCardsProps) {

    return (
        <div className="flex flex-row h-[75vh]">
            <div className="flex flex-col gap-4 w-2/3 pr-2 overflow-y-scroll overflow-x-hidden scroll no-scrollbar">
                {courses.map((course) => (
                    <CoursesCard
                        key={course.ID_Curso}
                        course={course}
                    />
                ))}
            </div>
            <div className="flex flex-col w-1/3 pl-2">
                <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-white rounded-lg shadow-md p-4">
                    {/* Placeholder User Icon */}
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <UserIcon className="w-10 h-10 text-gray-500" />
                    </div>
                    {/* User Name and Position */}
                    <h3 className="text-lg font-bold text-gray-800">{employee.employee?.Nombre}</h3>
                    <p className="text-sm text-gray-600 mb-4">{employee.employee?.Rol}</p>
                    {/* Employee Summary */}
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row gap-2 w-full mb-4">
                            <div className="w-full bg-gray-200 rounded-lg p-4">
                                <span className="text-xl font-semibold">
                                    <p>
                                        Cursos Disponibles:
                                    </p>
                                    <p className="font-bold text-4xl text-black">
                                        {courses.length}
                                    </p>
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-lg p-4">
                                <span className="text-xl font-semibold">
                                    <p>
                                        Certificados Aprobados:
                                    </p>
                                    <p className="font-bold text-4xl text-black">
                                        {certifications.filter(cert => cert.Verificacion === true).length}
                                    </p>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 w-full mb-4">
                            <div className="w-full bg-gray-200 rounded-lg p-4">
                                <span className="text-xl font-semibold">
                                    <p>
                                        Certificados Pendientes:
                                    </p>
                                    <p className="font-bold text-4xl text-black">
                                        {certifications.filter(cert => cert.Verificacion === null).length}
                                    </p>
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-lg p-4">
                                <span className="text-xl font-semibold">
                                    <p>
                                        Certificados Rechazados:
                                    </p>
                                    <p className="font-bold text-4xl text-black">
                                        {certifications.filter(cert => cert.Verificacion === false).length}
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}