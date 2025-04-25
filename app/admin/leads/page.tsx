"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Empleado {
  ID_Empleado: string;
  Nombre: string;
  Rol: string;
  Departamento: { Nombre: string; Descripcion: string }[];
  FechaContratacion: string;
  Nivel: string;
}

interface PeopleLead {
  ID_Empleado: string;
  Nombre: string;
  Rol: string;
  Departamento: { Nombre: string; Descripcion: string }[];
}

const AdminEmpleadosLeadPage: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [peopleLeads, setPeopleLeads] = useState<PeopleLead[]>([]);
  const [selectedPeopleLead, setSelectedPeopleLead] = useState<PeopleLead | null>(null);
  const [selectedEmpleados, setSelectedEmpleados] = useState<string[]>([]);

  // Obtener empleados sin un ID_PeopleLead asignado
  const fetchEmpleadosSinPeopleLead = async () => {
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
        .is("ID_PeopleLead", null); // Filtrar empleados sin People Lead asignado

      if (error) throw error;

      setEmpleados(data || []);
    } catch (error) {
      console.error("Error al obtener empleados sin People Lead:", error);
    }
  };

  // Obtener la lista de People Leads
  const fetchPeopleLeads = async () => {
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
        `);

      if (error) throw error;

      // Transformar los datos para ajustarlos a la estructura de PeopleLead
      const leads = data?.map((lead: any) => ({
        ID_Empleado: lead.ID_Empleado,
        Nombre: lead.Empleado?.Nombre || "N/A",
        Rol: lead.Empleado?.Rol || "N/A",
        Departamento: lead.Empleado?.Departamento || [],
      }));

      console.log("People Leads obtenidos:", leads); // Debug para verificar los datos obtenidos

      setPeopleLeads(leads || []);
    } catch (error) {
      console.error("Error al obtener People Leads:", error);
    }
  };

  // Asignar empleados seleccionados al People Lead
  const handleAsignarEmpleados = async () => {
    if (!selectedPeopleLead) {
      alert("Por favor, selecciona un People Lead primero.");
      return;
    }

    try {
      // Verificar si el ID del People Lead existe en la tabla People_lead
      const { data: peopleLeadExists, error: checkError } = await supabase
        .from("People_lead")
        .select("ID, ID_Empleado") // Seleccionar ambas columnas
        .eq("ID_Empleado", selectedPeopleLead.ID_Empleado) // Filtrar por ID_Empleado
        .single();

      if (checkError || !peopleLeadExists) {
        alert("El People Lead seleccionado no existe en la tabla People_lead.");
        return;
      }

      // Actualizar los empleados con el ID_PeopleLead
      const updates = selectedEmpleados.map((empleadoId) => ({
        ID_Empleado: empleadoId,
        ID_PeopleLead: peopleLeadExists.ID, // Usar el ID (clave primaria) del People Lead
      }));

      // Agregar un console.log para verificar los datos que se están enviando
      console.log("Datos enviados a upsert:", updates);

      const { error } = await supabase
        .from("Empleado")
        .upsert(updates, { onConflict: "ID_Empleado" }); // Actualizar empleados con el ID_PeopleLead

      if (error) throw error;

      alert("Empleados asignados correctamente.");
      setSelectedEmpleados([]);
      fetchEmpleadosSinPeopleLead(); // Recargar la lista de empleados
    } catch (error) {
      console.error("Error al asignar empleados:", error);
      alert("Hubo un error al asignar los empleados.");
    }
  };

  // Manejar selección de empleados
  const handleSelectEmpleado = (empleadoId: string) => {
    setSelectedEmpleados((prev) =>
      prev.includes(empleadoId)
        ? prev.filter((id) => id !== empleadoId) // Deseleccionar si ya está seleccionado
        : [...prev, empleadoId] // Seleccionar si no está seleccionado
    );
  };

  // Manejar selección de People Lead
  const handleSelectPeopleLead = (peopleLead: PeopleLead) => {
    setSelectedPeopleLead(peopleLead);
  };

  useEffect(() => {
    fetchEmpleadosSinPeopleLead();
    fetchPeopleLeads();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administrar Empleados de People Lead</h1>

      {/* Tabla de People Leads */}
      <h2 className="text-xl font-bold mb-4">Lista de People Leads</h2>
      <table className="min-w-full bg-white border border-gray-200 mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Rol</th>
            <th className="px-4 py-2 border-b">Departamento</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {peopleLeads.map((lead) => (
            <tr key={lead.ID_Empleado}>
              <td className="px-4 py-2 border-b">{lead.Nombre}</td>
              <td className="px-4 py-2 border-b">{lead.Rol}</td>
              <td className="px-4 py-2 border-b">
                {lead.Departamento[0]?.Nombre || "N/A"}
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleSelectPeopleLead(lead)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Seleccionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mostrar el People Lead seleccionado */}
      {selectedPeopleLead ? (
        <div className="mb-4 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-bold">People Lead Seleccionado:</h2>
          <p>Nombre: {selectedPeopleLead.Nombre}</p>
          <p>Rol: {selectedPeopleLead.Rol}</p>
          <p>
            Departamento:{" "}
            {selectedPeopleLead.Departamento && selectedPeopleLead.Departamento.length > 0
              ? selectedPeopleLead.Departamento[0].Nombre
              : "N/A"}
          </p>
        </div>
      ) : (
        <p className="text-gray-600 mb-4">Selecciona un People Lead desde la tabla principal.</p>
      )}

      {/* Tabla de empleados sin People Lead */}
      <h2 className="text-xl font-bold mb-4">Empleados sin People Lead</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Seleccionar</th>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Rol</th>
            <th className="px-4 py-2 border-b">Departamento</th>
            <th className="px-4 py-2 border-b">Fecha de Contratación</th>
            <th className="px-4 py-2 border-b">Nivel</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.ID_Empleado}>
              <td className="px-4 py-2 border-b text-center">
                <input
                  type="checkbox"
                  checked={selectedEmpleados.includes(empleado.ID_Empleado)}
                  onChange={() => handleSelectEmpleado(empleado.ID_Empleado)}
                />
              </td>
              <td className="px-4 py-2 border-b">{empleado.Nombre}</td>
              <td className="px-4 py-2 border-b">{empleado.Rol}</td>
              <td className="px-4 py-2 border-b">
                { "N/A"}
              </td>
              <td className="px-4 py-2 border-b">{empleado.FechaContratacion}</td>
              <td className="px-4 py-2 border-b">{empleado.Nivel}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para asignar empleados */}
      <div className="mt-4">
        <button
          onClick={handleAsignarEmpleados}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={selectedEmpleados.length === 0 || !selectedPeopleLead}
        >
          Asignar Empleados al People Lead
        </button>
      </div>
    </div>
  );
};

export default AdminEmpleadosLeadPage;