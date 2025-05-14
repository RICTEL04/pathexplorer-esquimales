"use client";

interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  level: number;
  project: string;
  companyEntryDate: string;
  timeOnLevel: string;
  activeProject: string;
  activeProjectStartDate: string;
  projectRole: string;
  isProjectLead: boolean;
  certificates: string[];
  courses: string[];
}

export default function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      {/* Profile Image and Name/Position */}
      <div className="flex items-center mb-4">
        <img
          src="/profile.avif"
          alt={`Profile of ${employee.name}`}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{employee.name}</h2>
          <p className="text-gray-600">{employee.position}</p>
        </div>
      </div>

      {/* Light Purple Cards for Project and isProjectLead */}
      <div className="flex flex-wrap gap-2 mt-4">
      <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
          Nivel: {employee.level}
        </span>
        <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
          {employee.project}
        </span>
        <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
          {employee.projectRole}
        </span>
        <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
          {employee.isProjectLead ? "Management" : "Non-Management"}
        </span>
      </div>
      <p className="text-gray-700 text-base font-medium">ID: {employee.id}</p>
      <p className="text-gray-700 text-base font-medium">Fecha de ingreso: {employee.companyEntryDate}</p>
      <p className="text-gray-700 text-base font-medium">Tiempo en nivel: {employee.timeOnLevel}</p>
      <p className="text-gray-700 text-base font-medium">
        Inicio del proyecto activo: {employee.activeProjectStartDate}
      </p>

    </div>
  );
}