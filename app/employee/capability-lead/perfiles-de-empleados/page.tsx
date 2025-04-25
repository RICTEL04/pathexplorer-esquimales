"use client";
import { useState } from "react";
import { employees } from "./employeesData"; // Import the dummy data
import EmployeeCard from "./EmployeeCard"; // Import the EmployeeCard component

export default function PerfilesDeEmpleadosPage() {
  const [selectedProject, setSelectedProject] = useState("Todos");
  const [isLeadFilter, setIsLeadFilter] = useState("Todos");
  const [showProjectFilter, setShowProjectFilter] = useState(false); // Toggle for project filter
  const [showLeadFilter, setShowLeadFilter] = useState(false); // Toggle for isProjectLead filter

  const filteredEmployees = employees.filter((employee) => {
    const projectMatch =
      selectedProject === "Todos" || employee.project === selectedProject;
    const leadMatch =
      isLeadFilter === "Todos" ||
      (isLeadFilter === "Sí" && employee.isProjectLead) ||
      (isLeadFilter === "No" && !employee.isProjectLead);
    return projectMatch && leadMatch;
  });

  const uniqueProjects = ["Todos", ...new Set(employees.map((employee) => employee.project))];

  return (
    <div>
      <h1 className="text-gray-800 text-2xl font-bold mb-4">Perfiles de Empleados</h1>
      <p className="text-gray-600 mb-6">Aquí puedes gestionar los perfiles de los empleados.</p>

      {/* Expandable Project Filter */}
      <div className="mb-4">
        <button
          onClick={() => setShowProjectFilter(!showProjectFilter)}
          className="w-full text-left px-4 py-2 bg-gray-200 rounded-md font-medium text-gray-800"
        >
          Filtro por Proyecto {showProjectFilter ? "▲" : "▼"}
        </button>
        {showProjectFilter && (
          <div className="flex space-x-4 mt-2">
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
        )}
      </div>

      {/* Expandable isProjectLead Filter */}
      <div className="mb-4">
        <button
          onClick={() => setShowLeadFilter(!showLeadFilter)}
          className="w-full text-left px-4 py-2 bg-gray-200 rounded-md font-medium text-gray-800"
        >
          Filtro por Líder de Proyecto {showLeadFilter ? "▲" : "▼"}
        </button>
        {showLeadFilter && (
          <div className="flex space-x-4 mt-2">
            {["Todos", "Sí", "No"].map((option) => (
              <button
                key={option}
                onClick={() => setIsLeadFilter(option)}
                className={`px-4 py-2 rounded-md border ${
                  isLeadFilter === option
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {option === "Todos" ? "Todos" : option === "Sí" ? "Líderes" : "No Líderes"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}