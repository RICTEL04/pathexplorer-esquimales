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
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                onClick={() => setSelectedPeopleLead(lead)}
              >
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 text-blue-800 rounded-full p-2 mr-3">
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
          <div className="h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedPeopleLead.Nombre}</h2>
            <p className="text-lg text-gray-600 mb-2">{selectedPeopleLead.Rol}</p>
            <p className="text-md text-gray-500 mb-2">
              Departamento: {selectedPeopleLead.Departamento?.Nombre || "Sin departamento"}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              ID People Lead: {selectedPeopleLead.ID_PeopleLead}
            </p>
            <p className="text-sm text-gray-500">
              ID Empleado: {selectedPeopleLead.ID_Empleado}
            </p>
            {/* Always show empleados assigned to this People Lead */}
            <div className="w-full mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Empleados asignados</h3>
              {empleadosLoading ? (
                <div className="text-gray-500">Cargando empleados...</div>
              ) : empleados.length > 0 ? (
                <ul className="w-full max-h-48 overflow-y-scroll">
                  {empleados.map((emp) => (
                    <div className="flex items-center justify-between" key={emp.ID_Empleado}>
                      <li key={emp.ID_Empleado} className="border-b py-1 text-gray-700">
                        {emp.Nombre} - {emp.Rol}
                      </li>
                      <button
                        className="text-red-500 hover:text-red-700 pl-2"
                        onClick={() => unassignEmpleado(emp.ID_Empleado)}
                      >
                        Desasignar
                      </button>
                    </div>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-400">No hay empleados asignados.</div>
              )}
            </div>
            {/* Existing button for modal */}
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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