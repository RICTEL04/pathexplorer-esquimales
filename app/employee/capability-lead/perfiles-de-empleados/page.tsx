"use client";
import { getCapabilityLead } from "@/lib/capabilityLead";
import { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";

interface Proyectos {
  ID_Proyecto: string;
  Nombre: string;
}

interface Puesto_proyecto {
  id: string;
  created_at: string;
  Puesto: string;
  Proyectos: Proyectos[];
}

interface Empleado {
  ID_Empleado: string;
  Nombre: string;
  Rol: string;
  Nivel?: string;
  FechaContratacion?: string;
  FechaUltNivel?: string;
  Puesto_proyecto?: Puesto_proyecto; // Relación con Puesto_proyecto
}

export default function PerfilesDeEmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState("Todos");
  const [showProjectFilter, setShowProjectFilter] = useState(false);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const rawData = await getCapabilityLead();
        const data: Empleado[] = rawData.map((item: any) => ({
          ID_Empleado: item.ID_Empleado,
          Nombre: item.Nombre,
          Rol: item.Rol,
          Nivel: item.Nivel,
          FechaContratacion: item.FechaContratacion,
          FechaUltNivel: item.FechaUltNivel,
          Puesto_proyecto: item.Puesto_proyecto?.[0] || null, // Ensure it's a single object or null
        }));
        setEmpleados(data);
      } catch (err) {
        console.error("Error fetching empleados:", err);
        setError("Error al cargar los datos de empleados.");
      }
    };
    fetchEmpleados();
  }, []);

  const filteredEmployees = empleados.filter((employee) => {
    const projectMatch =
      selectedProject === "Todos" ||
      (employee.Puesto_proyecto?.Proyectos || []).some(
        (proyecto) => proyecto.Nombre === selectedProject
      );
    return projectMatch;
  });

  const uniqueProjects = [
    "Todos",
    ...new Set(
      empleados.flatMap((employee) => {
        if (employee.Puesto_proyecto && Array.isArray(employee.Puesto_proyecto.Proyectos)) {
          return employee.Puesto_proyecto.Proyectos.map((proyecto) => proyecto.Nombre);
        }
        return [];
      })
    ),
  ];

  const mapEmployeeData = (employee: Empleado) => ({
    id: Number(employee.ID_Empleado),
    name: employee.Nombre,
    position: employee.Rol,
    email: "", 
    level: employee.Nivel ? Number(employee.Nivel) : 0, 
    project: employee.Puesto_proyecto?.Puesto || "Sin puesto",
    companyEntryDate: employee.FechaContratacion || "", 
    timeOnLevel: employee.FechaUltNivel || "", 
    activeProject: employee.Puesto_proyecto?.Proyectos?.[0]?.Nombre || "Sin proyecto",
    activeProjectStartDate: employee.Puesto_proyecto?.created_at || "", 
    projectRole: employee.Rol,
    isProjectLead: false, 
    certificates: [],
    courses: [], 
  });

  return (
    <div>
      <h1 className="text-gray-800 text-2xl font-bold mb-4">Perfiles de Empleados</h1>
      <p className="text-gray-600 mb-6">Aquí puedes gestionar los perfiles de los empleados.</p>

      {/* Filtro por Proyecto */}
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

      {/* Tarjetas de Empleados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.ID_Empleado} employee={mapEmployeeData(employee)} />
        ))}
      </div>
    </div>
  );
}
