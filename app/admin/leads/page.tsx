"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import PeopleLeadsSection from "@/components/Admin-PeopleLead/PeopleLeadSection";
import EmployeeSection from "@/components/Admin-PeopleLead/EmployeeSection";

export interface Empleado {
  ID_Empleado: string;
  Nombre: string;
  Rol: string;
  Departamento?: { Nombre: string; Descripcion: string };
  FechaContratacion: string;
  Nivel: string;
}

export interface PeopleLead {
  ID_Empleado: string;
  ID_PeopleLead: string;
  Nombre: string;
  Rol: string;
  Departamento?: { Nombre: string; Descripcion: string };
}

const AdminEmpleadosLeadPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [peopleLeads, setPeopleLeads] = useState<PeopleLead[]>([]);
  const [selectedPeopleLead, setSelectedPeopleLead] = useState<PeopleLead | null>(null);
  const [selectedEmpleados, setSelectedEmpleados] = useState<string[]>([]);
  const [loading, setLoading] = useState({
    empleados: true,
    leads: true,
    asignando: false
  });
  // State to reload assigned employees in PeopleLeadsSection
  const [reloadAssigned, setReloadAssigned] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  const fetchEmpleadosSinPeopleLead = async () => {
    setLoading(prev => ({ ...prev, empleados: true }));
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

      setEmpleados(
        (data || []).map((empleado: any) => ({
          ...empleado,
          Departamento: empleado.Departamento
            ? {
              Nombre: empleado.Departamento.Nombre,
              Descripcion: empleado.Departamento.Descripcion,
            }
            : undefined,
        }))
      );
    } catch (error) {
      console.error("Error al obtener empleados sin People Lead:", error);
    } finally {
      setLoading(prev => ({ ...prev, empleados: false }));
    }
  };

  const fetchPeopleLeads = async () => {
    setLoading(prev => ({ ...prev, leads: true }));
    try {
      const { data, error } = await supabase
        .from("People_lead")
        .select(`
          ID_Empleado,
          ID,
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
        ID_PeopleLead: lead.ID,
        Nombre: lead.Empleado?.Nombre || "N/A",
        Rol: lead.Empleado?.Rol || "N/A",
        Departamento: lead.Empleado?.Departamento || [],
      }));

      setPeopleLeads(leads || []);
      console.log("People Leads obtenidos:", leads);
    } catch (error) {
      console.error("Error al obtener People Leads:", error);
    } finally {
      setLoading(prev => ({ ...prev, leads: false }));
    }
  };

  const handleAsignarEmpleados = async () => {
    if (!selectedPeopleLead) {
      alert("Por favor, selecciona un People Lead primero.");
      return;
    }

    setLoading(prev => ({ ...prev, asignando: true }));
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
      // Force reload assigned employees in PeopleLeadsSection
      setSelectedPeopleLead({ ...selectedPeopleLead }); // <--- This triggers useEffect in PeopleLeadsSection

    } catch (error) {
      console.error("Error al asignar empleados:", error);
      alert("Hubo un error al asignar los empleados.");
    } finally {
      setLoading(prev => ({ ...prev, asignando: false }));
      setShowEmployeeModal(false);
    }
  };

  useEffect(() => {
    fetchEmpleadosSinPeopleLead();
    fetchPeopleLeads();
  }, [reloadAssigned]);
  useEffect(() => {
    const session = supabase.auth.getSession();
    session.then(({ data }) => {
      if (data.session) {
        setUserId(data.session.user.id);
      } else {
        console.error("No hay sesión activa.");
      }
    }).catch((error) => {
      console.error("Error al obtener la sesión:", error);
    });
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Administración de Empleados y People Leads</h1>
      <PeopleLeadsSection
        loading={loading.leads}
        peopleLeads={peopleLeads}
        onOpenEmployeeModal={() => setShowEmployeeModal(true)}
        selectedPeopleLead={selectedPeopleLead}
        setSelectedPeopleLead={setSelectedPeopleLead}
        setReloadAssigned={setReloadAssigned}
      />
      {/* Modal for empleados sin People Lead */}
      {showEmployeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/30 bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => { setShowEmployeeModal(false), setSelectedEmpleados([]) }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Asignar Empleados</h2>
            <EmployeeSection
              loading={loading.empleados}
              empleados={empleados.filter(empleado => { return empleado.ID_Empleado !== selectedPeopleLead?.ID_Empleado })}
              selectedEmpleados={selectedEmpleados}
              setSelectedEmpleados={setSelectedEmpleados}
              reloadAssigned={reloadAssigned}
            />
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAsignarEmpleados}
                disabled={selectedEmpleados.length === 0 || !selectedPeopleLead || loading.asignando}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${selectedEmpleados.length === 0 || !selectedPeopleLead
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        </div>
      )}
    </div>
  );
};

export default AdminEmpleadosLeadPage;