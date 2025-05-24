"use client";

interface RawEmployee {
  ID_Empleado: string;
  Nombre: string;
  Rol: string;
  ID_Departamento: string;
  Nivel: string;
  Cargabilidad: string;
  FechaContratacion: string;
  FechaUltNivel: string;
  ID_PeopleLead: string;
  Biografia: string | null;
  cargabilidad_num: number;
}

export default function EmployeeCard({
  employee,
  onSwitchList,
  editing = false,
}: {
  employee: RawEmployee;
  onSwitchList?: () => void;
  editing?: boolean;
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200 w-full mx-auto text-xs flex flex-col h-full">
      {/* Profile Image and Name/Position */}
      <div className="flex items-center mb-3">
        <img
          src="/profile.avif"
          alt={`Profile of ${employee.Nombre}`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <h2 className="font-bold text-gray-800 text-sm min-h-[2.2em] break-words line-clamp-2">{employee.Nombre}</h2>
          <p className="text-gray-600 text-xs min-h-[2.2em] break-words line-clamp-2">{employee.Rol}</p>
        </div>
      </div>
      {/* Light Purple Cards for Project and Level */}
      <div className="flex flex-wrap gap-1 mt-auto">
        <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
          Nivel: {employee.Nivel}
        </span>
        <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
          Cargabilidad: {employee.cargabilidad_num} %
        </span>
        <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
          Ultimo ascenso: {employee.FechaUltNivel}
        </span>
      </div>
      {editing && onSwitchList && (
        <button
          onClick={onSwitchList}
          className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs"
        >
          Cambiar lista
        </button>
      )}

    </div>
  );
}