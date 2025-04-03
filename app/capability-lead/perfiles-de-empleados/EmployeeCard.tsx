"use client";

interface Employee {
  id: number;
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
      <h2 className="text-lg font-bold text-gray-800 mb-1">{employee.name}</h2>
      <p className="text-gray-600">{employee.position}</p>

      {/* Light Purple Cards for Project and isProjectLead */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
          {employee.project}
        </span>
        <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
          {employee.isProjectLead ? "Líder" : "Miembro"}
        </span>
      </div>

      <p className="text-gray-500 text-sm">{employee.email}</p>
      <p className="text-gray-700 font-medium">Nivel: {employee.level}</p>
      <p className="text-gray-500 text-sm">Fecha de ingreso: {employee.companyEntryDate}</p>
      <p className="text-gray-500 text-sm">Tiempo en nivel: {employee.timeOnLevel}</p>
      <p className="text-gray-500 text-sm">Proyecto activo: {employee.activeProject}</p>
      <p className="text-gray-500 text-sm">
        Inicio del proyecto activo: {employee.activeProjectStartDate}
      </p>
      <p className="text-gray-500 text-sm">Rol en proyecto: {employee.projectRole}</p>
      <p className="text-gray-500 text-sm">Certificados:</p>
      <ul className="list-disc list-inside text-gray-500 text-sm">
        {employee.certificates.map((certificate, index) => (
          <li key={index}>{certificate}</li>
        ))}
      </ul>
      <p className="text-gray-500 text-sm">Cursos:</p>
      <ul className="list-disc list-inside text-gray-500 text-sm">
        {employee.courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}