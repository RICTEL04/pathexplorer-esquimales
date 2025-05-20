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
    <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200 w-full mx-auto text-xs flex flex-col h-full">
      {/* Profile Image and Name/Position */}
      <div className="flex items-center mb-3">
        <img
          src="/profile.avif"
          alt={`Profile of ${employee.name}`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <h2 className="font-bold text-gray-800 text-sm min-h-[2.2em] break-words line-clamp-2">{employee.name}</h2>
          <p className="text-gray-600 text-xs min-h-[2.2em] break-words line-clamp-2">{employee.position}</p>
        </div>
      </div>
      {/* Light Purple Cards for Project and isProjectLead */}
      <div className="flex flex-wrap gap-1 mt-auto">
        <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
          Nivel: {employee.level}
        </span>
        <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
          {employee.project}
        </span>
        <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
          {employee.isProjectLead ? "Management" : "Non-Management"}
        </span>
      </div>
    </div>
  );
}