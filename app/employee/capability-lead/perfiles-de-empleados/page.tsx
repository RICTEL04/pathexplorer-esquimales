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

  useEffect(() => {
    const fetchCapabilityLead = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      if (!session || !session.user) {
        console.error("No session found, user not authenticated");
        return null;
      }
      const { data, error } = await supabase
        .from("Capability_Lead")
        .select("ID_Departamento")
        .eq("ID_Empleado", session.user.id)
        .single();
      if (error) {
        console.error("Error fetching Capability Lead:", error);
        return null;
      }
      if (data) {
        setIdDepartamento(data.ID_Departamento);
        return data.ID_Departamento;
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
        .eq("ID_Departamento", departamentoId);
      if (!error && data) {
        setEmployees(data);
      }
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  if (loading) return <div className="p-8">Cargando perfiles...</div>;

  return (
    <div className="flex flex-row h-[90vh] p-8 w-full max-w-none mx-0">
      {/* Left: Scrollable employee cards */}
      <div className="flex flex-col gap-4 w-1/3 pr-2">
        <h1 className="text-3xl font-bold mb-6">Perfiles de Empleados</h1>
        <div className="overflow-y-scroll overflow-x-hidden">
          {employees.length === 0 ? (
            <p className="text-gray-600">No hay empleados registrados.</p>
          ) : (
            employees.map((empleado: any) => (
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