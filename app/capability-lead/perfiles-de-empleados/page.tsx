"use client";
import { useState } from "react";

const employees = [
  { id: 1, name: "Juan Pérez", position: "Desarrollador Frontend", email: "juan.perez@example.com", level: 3, project: "Proyecto A" },
  { id: 2, name: "María López", position: "Diseñadora UX/UI", email: "maria.lopez@example.com", level: 2, project: "Proyecto B" },
  { id: 3, name: "Carlos García", position: "Gerente de Proyecto", email: "carlos.garcia@example.com", level: 1, project: "Proyecto A" },
  { id: 4, name: "Ana Torres", position: "Ingeniera de Software", email: "ana.torres@example.com", level: 5, project: "Proyecto C" },
];

export default function PerfilesDeEmpleadosPage() {
  const [selectedProject, setSelectedProject] = useState("Todos");

  const filteredEmployees =
    selectedProject === "Todos"
      ? employees
      : employees.filter((employee) => employee.project === selectedProject);

  const uniqueProjects = ["Todos", ...new Set(employees.map((employee) => employee.project))];

  return (
    <div>
      <h1 className="text-gray-800 text-2xl font-bold mb-4">Perfiles de Empleados</h1>
      <p className="text-gray-600 mb-6">Aquí puedes gestionar los perfiles de los empleados.</p>

      {/* Filter Bar */}
      <div className="flex space-x-4 mb-6">
        {uniqueProjects.map((project) => (
          <button
            key={project}
            onClick={() => setSelectedProject(project)}
            className={`px-4 py-2 rounded-md border ${
              selectedProject === project
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            {project}
          </button>
        ))}
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-lg font-bold text-gray-800">{employee.name}</h2>
            <p className="text-gray-600">{employee.position}</p>
            <p className="text-gray-500 text-sm">{employee.email}</p>
            <p className="text-gray-700 font-medium">Nivel: {employee.level}</p>
            <p className="text-gray-500 text-sm">Proyecto: {employee.project}</p>
          </div>
        ))}
      </div>
    </div>
  );
}