import React, { useState, useEffect } from "react";
import { getEmployeesByNivel } from "@/lib/talent-discussions/talent_lead/TalendLeadAPICalls";
import { EmployeesByNivelResult, employeeForTalentDiscussion, PeopleLeadSmallData, capabilityLeadSmallData } from "@/lib/talent-discussions/talentDiscussionDefinitions";
import { User, Users, Shield, UserCheck, UserX } from "lucide-react";
interface TalentDiscussionFormProps {
  onClose: () => void;
  onSubmit: (data: {
    discussion: string;
    nivel: string;
    fechaInicio: string;
    fechaFinal: string;
    employees: employeeForTalentDiscussion[];
    peopleLeads: PeopleLeadSmallData[];
    capabilityLeads: capabilityLeadSmallData[];
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

  // Nuevo estado para búsqueda y selección
  const [search, setSearch] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<employeeForTalentDiscussion[]>([]);

  useEffect(() => {
    if (!nivel) {
      setEmployeesByNivel(null);
      setFetchError(null);
      setSelectedEmployees([]);
      return;
    }
    setLoading(true);
    setFetchError(null);
    getEmployeesByNivel(() => {}, nivel)
      .then(result => {
        setEmployeesByNivel(result);
        setSelectedEmployees([]); // Limpiar selección al cambiar nivel
        if (
          result.employees.length === 0 ||
          result.peopleLeads.length === 0 ||
          result.capabilityLeads.length === 0
        ) {
          setFetchError("No hay empleados, people leads o capability leads para este nivel.");
        }
      })
      .catch(() => setFetchError("Error al obtener empleados."))
      .finally(() => setLoading(false));
  }, [nivel]);

  // Lógica de fechas válidas
  const handleFechaInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFechaInicio(value);
    if (fechaFinal && value > fechaFinal) setFechaFinal(value);
  };
  const handleFechaFinalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFechaFinal(value);
    if (fechaInicio && value < fechaInicio) setFechaInicio(value);
  };
  const fechasValidas = fechaInicio && fechaFinal && fechaInicio <= fechaFinal;

  // Filtrar empleados por búsqueda y que no estén ya seleccionados
  const filteredEmployees = (employeesByNivel?.employees ?? [])
    .filter(emp =>
      emp.Nombre.toLowerCase().includes(search.toLowerCase()) &&
      !selectedEmployees.some(sel => sel.ID_Empleado === emp.ID_Empleado)
    );

  // Agregar empleado seleccionado
  const handleAddEmployee = (emp: employeeForTalentDiscussion) => {
    setSelectedEmployees(prev => [...prev, emp]);
  };

  // Quitar empleado de la lista seleccionada
  const handleRemoveEmployee = (id: string) => {
    setSelectedEmployees(prev => prev.filter(emp => emp.ID_Empleado !== id));
  };

  // Obtener PeopleLeads y CapabilityLeads únicos de los empleados seleccionados
  const selectedPeopleLeads: PeopleLeadSmallData[] = [];
  const selectedCapabilityLeads: capabilityLeadSmallData[] = [];
  selectedEmployees.forEach(emp => {
    if (
      emp.ID_People_Lead &&
      !selectedPeopleLeads.some(pl => pl.ID_People_Lead === emp.ID_People_Lead)
    ) {
      selectedPeopleLeads.push({
        ID_People_Lead: emp.ID_People_Lead,
        nombre_People_Lead: emp.Nombre_People_Lead ?? "Nombre no encontrado",
      });
    }
    if (
      emp.ID_CapabilityLead &&
      !selectedCapabilityLeads.some(cl => cl.ID_CapabilityLead === emp.ID_CapabilityLead)
    ) {
      selectedCapabilityLeads.push({
        ID_CapabilityLead: emp.ID_CapabilityLead,
        nombre_capabilityLead: emp.Nombre_CapabilityLead ?? "Nombre no encontrado",
      });
    }
  });

  const canSubmit =
    discussion &&
    nivel &&
    fechasValidas &&
    selectedEmployees.length > 0 &&
    selectedPeopleLeads.length > 0 &&
    selectedCapabilityLeads.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Crear Evaluacion de Desempeño</h2>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Inicio año fiscal</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={fechaInicio}
                onChange={handleFechaInicioChange}
              />
            </div>

            {/* Fecha Final */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Final año fiscal</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={fechaFinal}
                onChange={handleFechaFinalChange}
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

          {/* Buscador y selección de empleados */}
          {employeesByNivel && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Agregar empleados a evaluar</span>
              </h3>
              
              {/* Buscador */}
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Buscar empleado..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  disabled={loading}
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Lista de empleados disponibles */}
              <div className="max-h-60 overflow-y-auto border rounded-lg bg-gray-50 shadow-inner">
                <ul className="divide-y divide-gray-200">
                  {filteredEmployees.map(emp => (
                    <li key={emp.ID_Empleado} className="group hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{emp.Nombre}</p>
                            <p className="text-xs text-gray-500">{emp.Rol} • {emp.Nombre_Departamento}</p>
                          </div>
                        </div>
                        <button
                          className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-xs transition-all flex items-center gap-1"
                          onClick={() => handleAddEmployee(emp)}
                          disabled={selectedEmployees.some(sel => sel.ID_Empleado === emp.ID_Empleado)}
                        >
                          <UserCheck className="w-3 h-3" />
                          <span>Agregar</span>
                        </button>
                      </div>
                    </li>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <li className="px-4 py-3 text-center text-gray-500 text-sm">
                      {search ? "No se encontraron empleados" : "Busca empleados para agregar"}
                    </li>
                  )}
                </ul>
              </div>

              {/* Sección de seleccionados - Diseño tipo cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Empleados seleccionados */}
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                  <div className="bg-blue-50 px-4 py-2 border-b flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-blue-800">
                      Empleados <span className="text-blue-600">({selectedEmployees.length})</span>
                    </h4>
                  </div>
                  <div className="max-h-60 overflow-y-auto p-2">
                    {selectedEmployees.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedEmployees.map(emp => (
                          <li key={emp.ID_Empleado} className="bg-blue-50/50 rounded-md p-2 flex items-center justify-between">
                            <div className="flex items-center gap-2 truncate">
                              <User className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="truncate text-sm">{emp.Nombre}</span>
                            </div>
                            <button
                              onClick={() => handleRemoveEmployee(emp.ID_Empleado)}
                              className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                              title="Quitar empleado"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-4 text-gray-400 text-sm">
                        <UserX className="w-5 h-5 mx-auto mb-1" />
                        <p>No hay empleados seleccionados</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* People Leads */}
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                  <div className="bg-green-50 px-4 py-2 border-b flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <h4 className="font-medium text-green-800">
                      People Leads <span className="text-green-600">({selectedPeopleLeads.length})</span>
                    </h4>
                  </div>
                  <div className="max-h-60 overflow-y-auto p-2">
                    {selectedPeopleLeads.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedPeopleLeads.map(pl => (
                          <li key={pl.ID_People_Lead} className="bg-green-50/50 rounded-md p-2 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="truncate text-sm">{pl.nombre_People_Lead}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-4 text-gray-400 text-sm">
                        <UserX className="w-5 h-5 mx-auto mb-1" />
                        <p>No hay People Leads</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Capability Leads */}
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                  <div className="bg-purple-50 px-4 py-2 border-b flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <h4 className="font-medium text-purple-800">
                      Capability Leads <span className="text-purple-600">({selectedCapabilityLeads.length})</span>
                    </h4>
                  </div>
                  <div className="max-h-60 overflow-y-auto p-2">
                    {selectedCapabilityLeads.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedCapabilityLeads.map(cl => (
                          <li key={cl.ID_CapabilityLead} className="bg-purple-50/50 rounded-md p-2 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-purple-600 flex-shrink-0" />
                            <span className="truncate text-sm">{cl.nombre_capabilityLead}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-4 text-gray-400 text-sm">
                        <UserX className="w-5 h-5 mx-auto mb-1" />
                        <p>No hay Capability Leads</p>
                      </div>
                    )}
                  </div>
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
                  employees: selectedEmployees,
                  peopleLeads: selectedPeopleLeads,
                  capabilityLeads: selectedCapabilityLeads,
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