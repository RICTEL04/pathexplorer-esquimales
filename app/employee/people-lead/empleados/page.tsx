"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EmployeeCard from "@/components/EmployeeCard";
import EmployeeProfile from "@/components/CapabilityLead/EmployeeProfile";

export default function EmployeeProfilesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [idDepartamento, setIdDepartamento] = useState<string | null>(null);
  const [search, setSearch] = useState(""); // Nuevo estado para búsqueda

  useEffect(() => {
    const fetchCapabilityLead = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      if (!session || !session.user) {
        console.error("No session found, user not authenticated");
        return null;
      }
      const { data, error } = await supabase
        .from("People_lead")
        .select("ID")
        .eq("ID_Empleado", session.user.id)
        .single();
      if (error) {
        console.error("Error fetching Capability Lead:", error);
        return null;
      }
      if (data) {
        setIdDepartamento(data.ID);
        return data.ID;
      }
      return null;
    };

    const fetchEmployees = async () => {
      const departamentoId = await fetchCapabilityLead();
      if (!departamentoId) {
        console.error("ID_Departamento is not set, cannot fetch employees");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("Empleado")
        .select("*")
        .eq("ID_PeopleLead", departamentoId);
      if (!error && data) {
        setEmployees(data);
      }
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  // Filtrar empleados solo por nombre o ID empleado
  const filteredEmployees = employees.filter((empleado) => {
    const searchLower = search.toLowerCase();
    return (
      (empleado.Nombre && empleado.Nombre.toLowerCase().includes(searchLower)) ||
      (empleado.ID_Empleado && empleado.ID_Empleado.toLowerCase().includes(searchLower))
    );
  });

  if (loading) return <div className="p-8">Cargando perfiles...</div>;

  return (
    <div className="flex flex-row h-[90vh] p-4 w-full max-w-none mx-0">
      {/* Left: Scrollable employee cards */}
      <div className="flex flex-col gap-4 w-1/3 pr-2">
        <h1 className="text-3xl font-bold mb-6">Perfiles de Empleados</h1>
        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por nombre o ID empleado"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <div className="overflow-y-scroll overflow-x-hidden">
          {filteredEmployees.length === 0 ? (
            <p className="text-gray-600">No hay empleados registrados.</p>
          ) : (
            filteredEmployees.map((empleado: any) => (
              <div
                key={empleado.ID_Empleado}
                className={`border rounded-lg my-4 cursor-pointer transition-all duration-200 ${selectedEmployee?.ID_Empleado === empleado.ID_Empleado
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                onClick={() => setSelectedEmployee(empleado)}
              >
                <EmployeeCard employee={empleado} />
              </div>
            ))
          )}
        </div>
      </div>
      {/* Right: Employee profile/details */}
      <div className="flex flex-col w-2/3 pl-2">
        {selectedEmployee ? (
          <EmployeeProfile id={selectedEmployee.ID_Empleado} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-lg">Selecciona un empleado para ver su perfil</p>
          </div>
        )}
      </div>
    </div>
  );
}