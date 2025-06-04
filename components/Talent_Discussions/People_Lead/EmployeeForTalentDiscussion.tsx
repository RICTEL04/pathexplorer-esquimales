import React from "react";
import { employeeForTalentDiscussion } from "@/lib/talent-discussions/talentDiscussionDefinitions";

interface EmployeeCardProps {
  employee: employeeForTalentDiscussion;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">{employee.Nombre}</h3>
        <div className="flex items-center space-x-2">
          <span className="bg-white text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            Nivel {employee.Nivel}
          </span>
          {employee.TD_Employee_Requests && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
              <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Solicitud
            </span>
          )}
        </div>
      </div>
      <p className="text-blue-100 text-sm mt-1">{employee.Rol}</p>
    </div>

    {/* Body - Mantenemos la misma estructura pero sin la sección de solicitud */}
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex items-start">
        <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <div>
          <p className="text-xs text-gray-500">Departamento</p>
          <p className="text-sm font-medium text-gray-800">{employee.Nombre_Departamento || "-"}</p>
        </div>
      </div>

      <div className="flex items-start">
        <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <div>
          <p className="text-xs text-gray-500">Cargabilidad</p>
          <p className="text-sm font-medium text-gray-800">{employee.Cargabilidad || "-"}</p>
        </div>
      </div>

      <div className="flex items-start">
        <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div>
          <p className="text-xs text-gray-500">Fecha Contratación</p>
          <p className="text-sm font-medium text-gray-800">
            {employee.Fecha_Contratacion ? new Date(employee.Fecha_Contratacion).toLocaleDateString() : "-"}
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <div>
          <p className="text-xs text-gray-500">People Lead</p>
          <p className="text-sm font-medium text-gray-800">{employee.Nombre_People_Lead || "-"}</p>
        </div>
      </div>

      <div className="flex items-start">
        <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
        <div>
          <p className="text-xs text-gray-500">Capability Lead</p>
          <p className="text-sm font-medium text-gray-800">{employee.Nombre_CapabilityLead || "-"}</p>
        </div>
      </div>
    </div>
  </div>
);