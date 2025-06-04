import React from "react";
import { employeeForTalentDiscussion } from "@/lib/talent-discussions/talentDiscussionDefinitions";

interface ModalDetalleSolicitudProps {
  open: boolean;
  onClose: () => void;
  employee: employeeForTalentDiscussion | null;
}

export const ModalDetalleSolicitud: React.FC<ModalDetalleSolicitudProps> = ({
  open,
  onClose,
  employee,
}) => {
  if (!open || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Detalle del Empleado</h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Información básica del empleado */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Información del Empleado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><span className="font-semibold">Nombre:</span> {employee.Nombre}</p>
                <p><span className="font-semibold">Rol:</span> {employee.Rol}</p>
                <p><span className="font-semibold">Nivel:</span> {employee.Nivel}</p>
              </div>
              <div>
                <p><span className="font-semibold">Departamento:</span> {employee.Nombre_Departamento || "-"}</p>
                <p><span className="font-semibold">Cargabilidad:</span> {employee.Cargabilidad || "-"}</p>
                <p><span className="font-semibold">Fecha Contratación:</span> {employee.Fecha_Contratacion ? new Date(employee.Fecha_Contratacion).toLocaleDateString() : "-"}</p>
              </div>
            </div>
          </div>

          {/* Información de leads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">People Lead</h4>
              <p>{employee.Nombre_People_Lead || "-"}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Capability Lead</h4>
              <p>{employee.Nombre_CapabilityLead || "-"}</p>
            </div>
          </div>

          {/* Sección de solicitud TD (solo si existe) */}
          {employee.TD_Employee_Requests && (
            <div className="bg-blue-50 rounded-lg p-4 border border-purple-100">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">Solicitud Talent Discussion</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-700">Descripción:</p>
                  <p className="text-gray-800 bg-white p-3 rounded">{employee.TD_Employee_Requests.Descripcion}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold text-gray-700 mr-2">Estado:</p>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    employee.TD_Employee_Requests.Estado === "Aprobada"
                      ? "bg-green-100 text-green-800"
                      : employee.TD_Employee_Requests.Estado === "Rechazada"
                      ? "bg-red-100 text-red-800"
                      : employee.TD_Employee_Requests.Estado === "Pendiente"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-300 text-gray-900"
                  }`}>
                    {employee.TD_Employee_Requests.Estado}
                  </span>
                </div>
                {employee.TD_Employee_Requests.Resultado && (
                  <div>
                    <p className="font-semibold text-gray-700">Resultado:</p>
                    <p className="text-gray-800 bg-white p-3 rounded">{employee.TD_Employee_Requests.Resultado}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};