"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EmployeeCard from "@/components/EmployeeCard";

export default function EmployeeProfilesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase
        .from("Empleado")
        .select("*");
      if (!error && data) {
        setEmployees(data);
      }
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  if (loading) return <div className="p-8">Cargando perfiles...</div>;

  return (
    <div className="p-8 w-full max-w-none mx-0">
      <h1 className="text-3xl font-bold mb-6">Perfiles de Empleados</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {employees.length === 0 ? (
          <p className="text-gray-600">No hay empleados registrados.</p>
        ) : (
          employees.map((empleado: any) => (
            <EmployeeCard key={empleado.ID_Empleado} employee={empleado} />
          ))
        )}
      </div>
    </div>
  );
}