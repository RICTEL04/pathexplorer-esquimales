"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewProjectPage() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [roles, setRoles] = useState([{ role: "", quantity: 1 }]);
  const router = useRouter();

  const handleRoleChange = (index: number, field: string, value: string | number) => {
    const updatedRoles = [...roles];
    updatedRoles[index] = { ...updatedRoles[index], [field]: value };
    setRoles(updatedRoles);
  };

  const addRole = () => setRoles([...roles, { role: "", quantity: 1 }]);
  const removeRole = (index: number) => setRoles(roles.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: proyecto, error: proyectoError } = await supabase
      .from("Proyectos")
      .insert({
        Nombre: projectName,
        Descripcion: description,
        fecha_inicio: startDate,
        fecha_fin: endDate,
      })
      .select()
      .single();
    if (proyectoError) {
      alert("Error al crear el proyecto");
      return;
    }
    const rolesData = roles.map((role) => ({
      role_name: role.role,
      Proyecto_id: proyecto.ID_Proyecto,
    }));
    const { error: rolesError } = await supabase.from("Roles").insert(rolesData);
    if (rolesError) {
      alert("Error al agregar roles");
      return;
    }
    router.push("../proyectos"); // Go back to project list
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nuevo Proyecto</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Nombre del Proyecto</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div className="flex gap-4">
          <div>
            <label className="block mb-1">Fecha de Inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Fecha de Fin</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Roles</label>
          {roles.map((role, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Rol"
                value={role.role}
                onChange={(e) => handleRoleChange(idx, "role", e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <input
                type="number"
                min={1}
                value={role.quantity}
                onChange={(e) => handleRoleChange(idx, "quantity", Number(e.target.value))}
                className="w-20 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <button type="button" onClick={() => removeRole(idx)} className="text-red-500">Eliminar</button>
            </div>
          ))}
          <button type="button" onClick={addRole} className="text-blue-600">Agregar Rol</button>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            Crear Proyecto
          </button>
        </div>
      </form>
    </div>
  );
}