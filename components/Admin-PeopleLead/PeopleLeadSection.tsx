import { PeopleLead, Empleado } from "@/app/admin/leads/page";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { set } from "zod";

interface PeopleLeadsSectionProps {
  loading: boolean;
  peopleLeads: PeopleLead[];
  onOpenEmployeeModal: () => void;
  selectedPeopleLead: PeopleLead | null;
  setSelectedPeopleLead: (lead: PeopleLead) => void;
  setReloadAssigned: (reload: boolean) => void;
}

export default function PeopleLeadsSection({
  loading,
  peopleLeads,
  onOpenEmployeeModal,
  selectedPeopleLead,
  setSelectedPeopleLead,
  setReloadAssigned
}: PeopleLeadsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [empleadosLoading, setEmpleadosLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const filteredPeopleLeads = peopleLeads.filter(lead =>
    lead.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.Rol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.Departamento?.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  const unassignEmpleado = async (empleadoId: string) => {
    setEmpleadosLoading(true);
    const { error } = await supabase
      .from("Empleado")
      .update({ ID_PeopleLead: null })
      .eq("ID_Empleado", empleadoId);
    if (error) {
      console.error("Error unassigning empleado:", error);
    }
    setReload(prev => !prev); // Trigger reload to refresh data
    setReloadAssigned(!reload); // Trigger reload in PeopleLeadsSection
    setEmpleadosLoading(false);
  };

  // Fetch empleados automatically when selectedPeopleLead changes
  useEffect(() => {
    const fetchEmpleadosByPeopleLead = async () => {
      if (!selectedPeopleLead) {
        setEmpleados([]);
        return;
      }
      setEmpleadosLoading(true);
      const { data, error } = await supabase
        .from("Empleado")
        .select("*")
        .eq("ID_PeopleLead", selectedPeopleLead.ID_PeopleLead);

      if (error) {
        console.error("Error fetching empleados by People Lead:", error);
        setEmpleados([]);
      } else {
        setEmpleados(data || []);
      }
      setEmpleadosLoading(false);
    };
    fetchEmpleadosByPeopleLead();
  }, [selectedPeopleLead, reload]);

  return (
    <div className="flex flex-row h-[75vh] bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Left: Scrollable cards */}
      <div className="flex flex-col w-1/3 pr-2">
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Buscar People Leads..."
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
            style={{ pointerEvents: "none" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col gap-4 overflow-y-scroll overflow-x-hidden" style={{ maxHeight: "calc(75vh - 3rem)" }}>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            filteredPeopleLeads.map((lead) => (
              <div
                key={lead.ID_Empleado}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedPeopleLead?.ID_Empleado === lead.ID_Empleado
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                onClick={() => setSelectedPeopleLead(lead)}
              >
                <div className="flex items-center mb-2">
                  <div className="bg-purple-100 text-purple-800 rounded-full p-2 mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {lead.Nombre}
                    </h3>
                    <p className="text-sm text-gray-600">{lead.Rol}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {lead.Departamento?.Nombre || "Sin departamento"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Right: Details and associated employees */}
      <div className="flex flex-col w-2/3 pl-2">
        {selectedPeopleLead ? (
          <div className="h-full flex flex-col items-center justify-start bg-gradient-to-br from-white via-purple-50 to-fuchsia-50 rounded-2xl shadow-lg p-8 w-full">
            {/* Avatar grande */}
            <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-4xl font-bold shadow-lg mb-4 border-4 border-white">
              {selectedPeopleLead.Nombre ? selectedPeopleLead.Nombre[0] : "?"}
            </div>
            {/* Info principal */}
            <h2 className="text-2xl font-bold mb-1 text-gray-800">{selectedPeopleLead.Nombre}</h2>
            <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full mb-2 font-medium">
              {selectedPeopleLead.Rol}
            </span>
            <span className="inline-block bg-fuchsia-100 text-fuchsia-800 text-xs px-2 py-0.5 rounded mb-4">
              {selectedPeopleLead.Departamento?.Nombre || "Sin departamento"}
            </span>
            {/* IDs */}
            <div className="flex flex-col items-center mb-4">
              <span className="text-xs text-gray-400">ID People Lead: <span className="font-mono">{selectedPeopleLead.ID_PeopleLead}</span></span>
              <span className="text-xs text-gray-400">ID Empleado: <span className="font-mono">{selectedPeopleLead.ID_Empleado}</span></span>
            </div>
            {/* Empleados asignados */}
            <div className="w-full mt-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Empleados asignados</h3>
              {empleadosLoading ? (
                <div className="text-gray-500">Cargando empleados...</div>
              ) : empleados.length > 0 ? (
                <ul className="w-full max-h-48 overflow-y-auto custom-scrollbar space-y-2">
                  {empleados.map((emp) => (
                    <li key={emp.ID_Empleado} className="flex items-center justify-between bg-white rounded-lg shadow-sm px-3 py-2 border border-gray-100 hover:border-purple-200 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg border-2 border-purple-200">
                          {emp.Nombre ? emp.Nombre[0] : "?"}
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">{emp.Nombre}</span>
                          <span className="block text-xs text-gray-500">{emp.Rol}</span>
                        </div>
                      </div>
                      <button
                        className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition ml-2"
                        onClick={() => unassignEmpleado(emp.ID_Empleado)}
                      >
                        Desasignar
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-400">No hay empleados asignados.</div>
              )}
            </div>
            {/* Botón para asignar */}
            <button
              className="mt-6 px-5 py-2 text-white rounded-lg shadow bg-gradient-to-r from-violet-700 to-fuchsia-600 hover:from-violet-800 hover:to-fuchsia-700 transition"
              onClick={onOpenEmployeeModal}
            >
              Asignar Empleados a People Lead
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-lg">Selecciona un People Lead para ver los detalles</p>
          </div>
        )}
      </div>
    </div>
  );
}