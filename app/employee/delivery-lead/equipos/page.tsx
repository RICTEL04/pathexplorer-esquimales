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
  const [projectsWithEmployees, setProjectsWithEmployees] = useState<any[]>([]);
  const [openProject, setOpenProject] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectsAndEmployees = async () => {
      setLoading(true);
      // 1. Obtener usuario actual
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      if (!session || !session.user) {
        setLoading(false);
        return;
      }
      // 2. Obtener el ID del Delivery Lead
      const { data: empleadoData, error: empleadoError } = await supabase
        .from("Delivery_Lead")
        .select("ID_DeliveryLead")
        .eq("ID_Empleado", session.user.id)
        .single();
      if (empleadoError || !empleadoData) {
        setLoading(false);
        return;
      }
      const deliveryLeadId = empleadoData.ID_DeliveryLead;

      // 3. Obtener proyectos del Delivery Lead
      const { data: proyectos, error: proyectosError } = await supabase
        .from("Proyectos")
        .select("ID_Proyecto, Nombre, Status")
        .eq("ID_DeliveryLead", deliveryLeadId);
      if (proyectosError || !proyectos) {
        setLoading(false);
        return;
      }

      // 4. Para cada proyecto, obtener empleados
      const proyectosConEmpleados = [];
      for (const proyecto of proyectos) {
        // Puestos del proyecto
        const { data: puestos } = await supabase
          .from("Puesto_proyecto")
          .select("id")
          .eq("ID_Proyecto", proyecto.ID_Proyecto);
        if (!puestos || puestos.length === 0) {
          proyectosConEmpleados.push({ ...proyecto, empleados: [] });
          continue;
        }
        const puestosIds = puestos.map((p: any) => p.id);

        // Personas en esos puestos
        const { data: puestoPersonas } = await supabase
          .from("Puesto_persona")
          .select("ID_Empleado")
          .in("ID_Puesto", puestosIds);
        if (!puestoPersonas || puestoPersonas.length === 0) {
          proyectosConEmpleados.push({ ...proyecto, empleados: [] });
          continue;
        }
        const empleadosIds = puestoPersonas.map((pp: any) => pp.ID_Empleado);

        // Info de empleados
        const { data: empleados } = await supabase
          .from("Empleado")
          .select("*")
          .in("ID_Empleado", empleadosIds);

        proyectosConEmpleados.push({
          ...proyecto,
          empleados: empleados || [],
        });
      }
      setProjectsWithEmployees(proyectosConEmpleados);
      setLoading(false);
    };

    fetchProjectsAndEmployees();
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
      {/* Left: Proyectos y empleados */}
      <div className="flex flex-col gap-4 w-1/3 pr-2">
        <h1 className="text-3xl font-bold mb-6">Equipos por Proyecto</h1>
        <input
          type="text"
          placeholder="Buscar por nombre de proyecto o empleado"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <div className="overflow-y-scroll overflow-x-hidden no-scrollbar">
          {projectsWithEmployees.length === 0 ? (
            <p className="text-gray-600">No hay proyectos registrados.</p>
          ) : (
            projectsWithEmployees
              .filter((proyecto: any) => {
                const searchLower = search.toLowerCase();
                const matchProyecto = proyecto.Nombre && proyecto.Nombre.toLowerCase().includes(searchLower);
                const matchEmpleado = proyecto.empleados.some(
                  (empleado: any) =>
                    (empleado.Nombre && empleado.Nombre.toLowerCase().includes(searchLower)) ||
                    (empleado.ID_Empleado && empleado.ID_Empleado.toLowerCase().includes(searchLower))
                );
                return matchProyecto || matchEmpleado;
              })
              .map((proyecto: any) => {
                const esActual = proyecto.Status && proyecto.Status.toLowerCase() !== "done";
                return (
                  <div
                    key={proyecto.ID_Proyecto}
                    className={`mb-4 border rounded-lg shadow-sm transition-all
                      ${esActual ? "border-blue-500 ring-2 ring-blue-200" : ""}
                    `}
                  >
                    <button
                      className={`w-full flex flex-col items-start justify-between px-4 py-2 font-semibold bg-gray-100 hover:bg-blue-100 rounded-t-lg transition-colors
                        ${esActual ? "bg-blue-50" : ""}
                      `}
                      onClick={() => setOpenProject(openProject === proyecto.ID_Proyecto ? null : proyecto.ID_Proyecto)}
                    >
                      {/* Letrero de estado */}
                      <span className={`mb-1 text-xs font-bold px-2 py-0.5 rounded 
                        ${esActual ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"}`}>
                        {esActual ? "Proyecto actual" : "Proyecto finalizado"}
                      </span>
                      <span className="flex items-center gap-2 w-full">
                        {esActual && (
                          <span title="Proyecto actual" className="text-blue-600">
                            ●
                          </span>
                        )}
                        <span className="truncate">{proyecto.Nombre}</span>
                        <span className="ml-2 text-xs bg-blue-200 text-blue-800 rounded-full px-2 py-0.5">{proyecto.empleados.length}</span>
                      </span>
                    </button>
                    <div
                      className={`transition-all duration-300 overflow-hidden ${openProject === proyecto.ID_Proyecto ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      {openProject === proyecto.ID_Proyecto && (
                        <div className="p-2 bg-white rounded-b-lg border-t">
                          {proyecto.empleados.length === 0 ? (
                            <p className="text-gray-500">No hay empleados en este proyecto.</p>
                          ) : (
                            proyecto.empleados
                              .filter((empleado: any) => {
                                const searchLower = search.toLowerCase();
                                if (proyecto.Nombre && proyecto.Nombre.toLowerCase().includes(searchLower)) {
                                  return true;
                                }
                                return (
                                  (empleado.Nombre && empleado.Nombre.toLowerCase().includes(searchLower)) ||
                                  (empleado.ID_Empleado && empleado.ID_Empleado.toLowerCase().includes(searchLower))
                                );
                              })
                              .map((empleado: any, idx: number) => (
                                <div
                                  key={empleado.ID_Empleado}
                                  className={`flex items-center gap-3 border-b last:border-b-0 py-2 px-2 cursor-pointer transition-all duration-200 rounded-lg
                                    ${selectedEmployee?.ID_Empleado === empleado.ID_Empleado
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-transparent hover:border-blue-300 hover:bg-blue-50"
                                    }`}
                                  onClick={() => setSelectedEmployee(empleado)}
                                >
                                  {empleado.Foto ? (
                                    <img src={empleado.Foto} alt={empleado.Nombre} className="w-8 h-8 rounded-full object-cover border" />
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold border">
                                      {empleado.Nombre ? empleado.Nombre[0] : "?"}
                                    </div>
                                  )}
                                  <div className="flex flex-col">
                                    <span className="font-medium">{empleado.Nombre}</span>
                                  </div>
                                </div>
                              ))
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
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