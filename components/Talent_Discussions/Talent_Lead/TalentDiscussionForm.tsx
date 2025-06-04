import React, { useState, useEffect } from "react";
import { getEmployeesByNivel } from "@/lib/talent-discussions/talent_lead/TalendLeadAPICalls";
import { EmployeesByNivelResult } from "@/lib/talent-discussions/talentDiscussionDefinitions";

interface TalentDiscussionFormProps {
  onClose: () => void;
  onSubmit: (data: {
    discussion: string;
    nivel: string;
    fechaInicio: string;
    fechaFinal: string;
    employeesByNivel: EmployeesByNivelResult;
  }) => void;
}

export function TalentDiscussionForm({ onClose, onSubmit }: TalentDiscussionFormProps) {
  const [discussion, setDiscussion] = useState("");
  const [nivel, setNivel] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [employeesByNivel, setEmployeesByNivel] = useState<EmployeesByNivelResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!nivel) {
        setEmployeesByNivel(null);
        setFetchError(null);
        return;
      }
      setLoading(true);
      setFetchError(null);
      try {
        const result = await getEmployeesByNivel(() => {}, nivel);
        setEmployeesByNivel(result);
        if (
          result.employees.length === 0 ||
          result.peopleLeads.length === 0 ||
          result.capabilityLeads.length === 0
        ) {
          setFetchError("No hay empleados, people leads o capability leads para este nivel.");
        }
      } catch (err) {
        setFetchError("Error al obtener empleados.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [nivel]);

  const canSubmit =
    discussion &&
    nivel &&
    fechaInicio &&
    fechaFinal &&
    employeesByNivel &&
    employeesByNivel.employees.length > 0 &&
    employeesByNivel.peopleLeads.length > 0 &&
    employeesByNivel.capabilityLeads.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Crear Talent Discussion</h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          {/* Discussion Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discussion</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={discussion}
              onChange={e => setDiscussion(e.target.value)}
              placeholder="Describe la discusión de talento..."
            />
          </div>

          {/* Nivel and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Nivel Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={nivel}
                onChange={e => setNivel(e.target.value)}
                disabled={loading}
              >
                <option value="">Selecciona un nivel</option>
                {[...Array(12)].map((_, i) => (
                  <option key={12 - i} value={String(12 - i)}>
                    Nivel {12 - i}
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha Inicio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={fechaInicio}
                onChange={e => setFechaInicio(e.target.value)}
              />
            </div>

            {/* Fecha Final */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha final</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={fechaFinal}
                onChange={e => setFechaFinal(e.target.value)}
              />
            </div>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <span className="ml-2 text-purple-600">Buscando involucrados...</span>
            </div>
          )}

          {fetchError && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {fetchError}
            </div>
          )}

          {/* Involucrados Section */}
          {employeesByNivel && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Involucrados</h3>
              
              {/* Empleados */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Empleados ({employeesByNivel.employees.length})
                </h4>
                <div className="max-h-40 overflow-y-auto">
                  <ul className="divide-y divide-gray-200">
                    {employeesByNivel.employees.map(emp => (
                      <li key={emp.ID_Empleado} className="py-2 px-1 hover:bg-gray-100 rounded">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-800">{emp.Nombre}</span>
                          {emp.Nombre_Departamento && (
                            <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                              {emp.Nombre_Departamento}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* People Leads */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  People Leads ({employeesByNivel.peopleLeads.length})
                </h4>
                <div className="max-h-32 overflow-y-auto">
                  <ul className="divide-y divide-gray-200">
                    {employeesByNivel.peopleLeads.map(pl => (
                      <li key={pl.ID_People_Lead} className="py-2 px-1 hover:bg-gray-100 rounded">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-800">{pl.nombre_People_Lead}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Capability Leads */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  Capability Leads ({employeesByNivel.capabilityLeads.length})
                </h4>
                <div className="max-h-32 overflow-y-auto">
                  <ul className="divide-y divide-gray-200">
                    {employeesByNivel.capabilityLeads.map(cl => (
                      <li key={cl.ID_CapabilityLead} className="py-2 px-1 hover:bg-gray-100 rounded">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-800">{cl.nombre_capabilityLead}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              className={`w-full py-2 px-4 rounded-md font-medium text-white transition-colors ${
                canSubmit 
                  ? "bg-purple-600 hover:bg-purple-700 shadow-md"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={() =>
                canSubmit &&
                onSubmit({
                  discussion,
                  nivel,
                  fechaInicio,
                  fechaFinal,
                  employeesByNivel: employeesByNivel!,
                })
              }
              disabled={!canSubmit}
            >
              Crear Talent Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}