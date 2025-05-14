"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Empleado {
  ID_Empleado: string;
  Nombre: string;
  Rol: string;
  Departamento?: { Nombre: string; Descripcion: string }[];
  FechaContratacion: string;
  Nivel: string;
}

interface PeopleLead {
  ID_Empleado: string;
  Nombre: string;
  Rol: string;
  Departamento?: { Nombre: string; Descripcion: string }[];
}

const AdminEmpleadosLeadPage: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [peopleLeads, setPeopleLeads] = useState<PeopleLead[]>([]);
  const [selectedPeopleLead, setSelectedPeopleLead] = useState<PeopleLead | null>(null);
  const [selectedEmpleados, setSelectedEmpleados] = useState<string[]>([]);
  const [loading, setLoading] = useState({
    empleados: true,
    leads: true,
    asignando: false
  });
  const [searchTerm, setSearchTerm] = useState({
    empleados: "",
    leads: ""
  });

  const fetchEmpleadosSinPeopleLead = async () => {
    setLoading(prev => ({...prev, empleados: true}));
    try {
      const { data, error } = await supabase
        .from("Empleado")
        .select(`
          ID_Empleado,
          Nombre,
          Rol,
          Departamento:ID_Departamento (
            Nombre,
            Descripcion
          ),
          FechaContratacion,
          Nivel
        `)
        .is("ID_PeopleLead", null)
        .order("Nombre", { ascending: true });

      if (error) throw error;

      setEmpleados(data || []);
    } catch (error) {
      console.error("Error al obtener empleados sin People Lead:", error);
    } finally {
      setLoading(prev => ({...prev, empleados: false}));
    }
  };

  const fetchPeopleLeads = async () => {
    setLoading(prev => ({...prev, leads: true}));
    try {
      const { data, error } = await supabase
        .from("People_lead")
        .select(`
          ID_Empleado,
          Empleado:ID_Empleado (
            Nombre,
            Rol,
            Departamento:ID_Departamento (
              Nombre,
              Descripcion
            )
          )
        `)
        .order("Empleado(Nombre)", { ascending: true });

      if (error) throw error;

      const leads = data?.map((lead: any) => ({
        ID_Empleado: lead.ID_Empleado,
        Nombre: lead.Empleado?.Nombre || "N/A",
        Rol: lead.Empleado?.Rol || "N/A",
        Departamento: lead.Empleado?.Departamento || [],
      }));

      setPeopleLeads(leads || []);
    } catch (error) {
      console.error("Error al obtener People Leads:", error);
    } finally {
      setLoading(prev => ({...prev, leads: false}));
    }
  };

  const handleAsignarEmpleados = async () => {
    if (!selectedPeopleLead) {
      alert("Por favor, selecciona un People Lead primero.");
      return;
    }

    setLoading(prev => ({...prev, asignando: true}));
    try {
      const { data: peopleLeadExists, error: checkError } = await supabase
        .from("People_lead")
        .select("ID, ID_Empleado")
        .eq("ID_Empleado", selectedPeopleLead.ID_Empleado)
        .single();

      if (checkError || !peopleLeadExists) {
        alert("El People Lead seleccionado no existe en la tabla People_lead.");
        return;
      }

      const updates = selectedEmpleados.map((empleadoId) => ({
        ID_Empleado: empleadoId,
        ID_PeopleLead: peopleLeadExists.ID,
      }));

      const { error } = await supabase
        .from("Empleado")
        .upsert(updates, { onConflict: "ID_Empleado" });

      if (error) throw error;

      alert("Empleados asignados correctamente.");
      setSelectedEmpleados([]);
      fetchEmpleadosSinPeopleLead();
    } catch (error) {
      console.error("Error al asignar empleados:", error);
      alert("Hubo un error al asignar los empleados.");
    } finally {
      setLoading(prev => ({...prev, asignando: false}));
    }
  };

  const handleSelectEmpleado = (empleadoId: string) => {
    setSelectedEmpleados((prev) =>
      prev.includes(empleadoId)
        ? prev.filter((id) => id !== empleadoId)
        : [...prev, empleadoId]
    );
  };

  const handleSelectPeopleLead = (peopleLead: PeopleLead) => {
    setSelectedPeopleLead(peopleLead);
  };

  const filteredEmpleados = empleados.filter(empleado =>
    empleado.Nombre.toLowerCase().includes(searchTerm.empleados.toLowerCase()) ||
    empleado.Rol.toLowerCase().includes(searchTerm.empleados.toLowerCase()) ||
    empleado.Nivel.toLowerCase().includes(searchTerm.empleados.toLowerCase())
  );

  const filteredPeopleLeads = peopleLeads.filter(lead =>
    lead.Nombre.toLowerCase().includes(searchTerm.leads.toLowerCase()) ||
    lead.Rol.toLowerCase().includes(searchTerm.leads.toLowerCase()) ||
    (lead.Departamento?.[0]?.Nombre.toLowerCase().includes(searchTerm.leads.toLowerCase()) ?? false)
  );

  useEffect(() => {
    fetchEmpleadosSinPeopleLead();
    fetchPeopleLeads();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Administración de Empleados y People Leads</h1>

      {/* Sección de People Leads */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">People Leads Disponibles</h2>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Buscar People Leads..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm.leads}
              onChange={(e) => setSearchTerm({...searchTerm, leads: e.target.value})}
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

        {loading.leads ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPeopleLeads.map((lead) => (
              <div
                key={lead.ID_Empleado}
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  selectedPeopleLead?.ID_Empleado === lead.ID_Empleado
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
                onClick={() => handleSelectPeopleLead(lead)}
              >
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 text-blue-800 rounded-full p-2 mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{lead.Nombre}</h3>
                    <p className="text-sm text-gray-600">{lead.Rol}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {lead.Departamento?.[0]?.Nombre || "Sin departamento"}
                  </span>
                </div>
                <button
                  className={`mt-3 w-full py-1 px-3 rounded-md text-sm font-medium ${
                    selectedPeopleLead?.ID_Empleado === lead.ID_Empleado
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {selectedPeopleLead?.ID_Empleado === lead.ID_Empleado
                    ? "Seleccionado"
                    : "Seleccionar"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* People Lead seleccionado */}
      {selectedPeopleLead && (
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">People Lead Seleccionado</h3>
              <div className="mt-2">
                <p className="text-gray-700">
                  <span className="font-medium">Nombre:</span> {selectedPeopleLead.Nombre}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Rol:</span> {selectedPeopleLead.Rol}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Departamento:</span>{" "}
                  {selectedPeopleLead.Departamento?.[0]?.Nombre || "N/A"}
                </p>
              </div>
            </div>
            <div className="bg-blue-100 text-blue-800 rounded-full p-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Sección de Empleados sin People Lead */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Empleados sin People Lead Asignado
            {selectedEmpleados.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {selectedEmpleados.length} seleccionados
              </span>
            )}
          </h2>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Buscar empleados..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm.empleados}
              onChange={(e) => setSearchTerm({...searchTerm, empleados: e.target.value})}
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

        {loading.empleados ? (
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seleccionar
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departamento
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Contratación
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nivel
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmpleados.map((empleado) => (
                  <tr
                    key={empleado.ID_Empleado}
                    className={`hover:bg-gray-50 ${
                      selectedEmpleados.includes(empleado.ID_Empleado) ? "bg-blue-50" : ""
                    }`}
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
                      {empleado.Departamento?.[0]?.Nombre || "N/A"}
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
        )}
      </div>

      {/* Botón de acción */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleAsignarEmpleados}
          disabled={selectedEmpleados.length === 0 || !selectedPeopleLead || loading.asignando}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            selectedEmpleados.length === 0 || !selectedPeopleLead
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }`}
        >
          {loading.asignando ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Asignando...
            </>
          ) : (
            <>
              <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Asignar {selectedEmpleados.length > 0 ? `(${selectedEmpleados.length})` : ""} empleados
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminEmpleadosLeadPage;