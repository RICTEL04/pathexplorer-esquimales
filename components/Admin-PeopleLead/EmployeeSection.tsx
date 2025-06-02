import { Empleado } from "@/app/admin/leads/page";
import React, { useEffect, useState } from "react";

interface EmployeeSectionProps {
  loading: boolean;
  empleados: Empleado[];
  selectedEmpleados: string[];
  setSelectedEmpleados: React.Dispatch<React.SetStateAction<string[]>>;
  reloadAssigned: boolean;
}

export default function EmployeeSection({
  loading,
  empleados,
  selectedEmpleados,
  setSelectedEmpleados,
  reloadAssigned
}: EmployeeSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmpleados, setFilteredEmpleados] = useState<Empleado[]>([]);

  useEffect(() => {
    const filteredEmpleados = empleados.filter(empleado =>
      empleado.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.Rol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.Nivel.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmpleados(filteredEmpleados);
  }, [reloadAssigned]);

  const handleSelectEmpleado = (id: string) => {
    setSelectedEmpleados((prev) =>
      prev.includes(id)
        ? prev.filter((eid) => eid !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Empleados sin People Lead Asignado
        </h2>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Buscar empleados..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredEmpleados.length === 0 ? (
        <div className="text-center py-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay empleados sin asignar</h3>
          <p className="mt-1 text-sm text-gray-500">
            Todos los empleados tienen un People Lead asignado.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {/* Table header */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seleccionar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Contratación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nivel
                </th>
              </tr>
            </thead>
          </table>
          {/* Scrollable body */}
          <div className="overflow-y-auto max-h-64">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmpleados.map((empleado) => (
                  <tr
                    key={empleado.ID_Empleado}
                    className={`hover:bg-gray-50 ${selectedEmpleados.includes(empleado.ID_Empleado) ? "bg-blue-50" : ""}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedEmpleados.includes(empleado.ID_Empleado)}
                        onChange={() => handleSelectEmpleado(empleado.ID_Empleado)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-800 font-medium">
                            {empleado.Nombre.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{empleado.Nombre}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {empleado.Rol}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {empleado.Departamento?.Nombre || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(empleado.FechaContratacion).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {empleado.Nivel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}