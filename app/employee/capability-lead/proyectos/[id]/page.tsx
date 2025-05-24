"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Pencil, Trash2 } from "lucide-react";
import EmployeeCard from "@/components/EmployeeCard";
import type { Role } from "./types";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState<any>({});

  const [project, setProject] = useState<any | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [allEmployees, setAllEmployees] = useState<any[]>([]);
  const [empleadosInProyecto, setEmpleadosInProyecto] = useState<any[]>([]);

  const [newRole, setNewRole] = useState("");
  const fetchProject = async () => {
      const { data, error } = await supabase
        .from("Proyectos")
        .select("*")
        .eq("ID_Proyecto", id)
        .single();
      if (!error) {
        setProject(data);
        setEditValues(data);
      }
    };
    const fetchRoles = async () => {
      const { data, error } = await supabase
        .from("Roles")
        .select("*")
        .eq("Proyecto_id", id);
      if (!error) setRoles(data);
    };


    const fetchMatchingFromEmpleadoProyecto = async () => {
      // 1. Get ALL assigned employee IDs from Empleado_Proyectos (no project filter)
      const { data: allMatches, error: allMatchesError } = await supabase
        .from("Empleado_Proyectos")
        .select("ID_Empleado");

      if (allMatchesError || !allMatches) {
        setAllEmployees([]);
        return;
      }

      // Get all assigned IDs (may have duplicates, so use Set for uniqueness)
      const assignedIds = Array.from(new Set(allMatches.map((item: any) => item.ID_Empleado)));

      // 2. Get all employees NOT in the assigned list
      let allEmployees: any[] = [];
      if (assignedIds.length > 0) {
        const { data: empleadosNoAsignados, error: errorNoAsignados } = await supabase
          .from("Empleado")
          .select("*")
          .not("ID_Empleado", "in", `(${assignedIds.map(id => `"${id}"`).join(",")})`);
        allEmployees = !errorNoAsignados && empleadosNoAsignados ? empleadosNoAsignados : [];
      } else {
        // If no assigned, all employees are available
        const { data: empleadosTodos, error: errorTodos } = await supabase
          .from("Empleado")
          .select("*");
        allEmployees = !errorTodos && empleadosTodos ? empleadosTodos : [];
      }
      setAllEmployees(allEmployees);

      // 3. (Optional) If you still want to fetch assigned employees for this project:
      const { data: matches, error } = await supabase
        .from("Empleado_Proyectos")
        .select("ID_Empleado")
        .eq("ID_Proyecto", id);

      if (error || !matches) {
        setEmpleadosInProyecto([]);
        return;
      }

      const ids = matches.map((item: any) => item.ID_Empleado);

      let empleadosInProyecto: any[] = [];
      if (ids.length > 0) {
        const { data: empleados, error: empleadosError } = await supabase
          .from("Empleado")
          .select("*")
          .in("ID_Empleado", ids);

        empleadosInProyecto = !empleadosError && empleados ? empleados : [];
      }
      setEmpleadosInProyecto(empleadosInProyecto);
    };

  useEffect(() => {
    fetchProject();
    fetchRoles();
    fetchMatchingFromEmpleadoProyecto();
  }, [id]);
  if (!project) return <div className="p-8">Cargando...</div>;

  

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que deseas eliminar este proyecto?")) return;
    const { error } = await supabase
      .from("Proyectos")
      .delete()
      .eq("ID_Proyecto", id);
    if (!error) {
      router.push("../proyectos");
      alert("El proyecto se ha eliminado correctamente");
    } else {
      alert("Error al eliminar el proyecto");
    }
  };

  const handleEditChange = (field: string, value: string) => {
    setEditValues({ ...editValues, [field]: value });
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("Proyectos")
      .update({
        Nombre: editValues.Nombre,
        Descripcion: editValues.Descripcion,
        fecha_inicio: editValues.fecha_inicio,
        fecha_fin: editValues.fecha_fin,
      })
      .eq("ID_Proyecto", id);
    if (!error) {
      setProject(editValues);
      setEditing(false);
      alert("Proyecto actualizado");
    } else {
      alert("Error al actualizar el proyecto");
    }
  };

  const handleAddRole = async () => {
    if(!newRole.trim()) return;
    const {error, data} = await supabase
      .from("Roles")
      .insert([{role_name: newRole, Proyecto_id: id}]);
    if (!error) {
    setNewRole("");
    fetchRoles();
    } else {
      alert("Error al agregar el rol");
    }
  }

  const handleDeleteRole = async (roleId: string) => {
    const {error} = await supabase
      .from("Roles")
      .delete()
      .eq("id", roleId);
    if(!error){
      fetchRoles();
    } else {
      alert("Error al eliminar el rol");
    }
  } 


  const moveToAllEmployees = async (employee: any) => {
    // Remove from Empleado_Proyectos in DB
    await supabase
      .from("Empleado_Proyectos")
      .delete()
      .eq("ID_Empleado", employee.ID_Empleado)
      .eq("ID_Proyecto", id);

    // Calculate new cargabilidad_num
    const proyectoCargabilidad = project.cargabilidad_num || 0;
    const empleadoCargabilidad = employee.cargabilidad_num || 0;
    // Subtract, but don't go below 0
    const newCargabilidadNum = Math.max(empleadoCargabilidad - proyectoCargabilidad, 0);
    const newCargabilidadStr = `${newCargabilidadNum}%`;

    // Update in DB
    await supabase
      .from("Empleado")
      .update({
        cargabilidad_num: newCargabilidadNum,
        Cargabilidad: newCargabilidadStr,
      })
      .eq("ID_Empleado", employee.ID_Empleado);

    // Update UI state
    employee.cargabilidad_num = newCargabilidadNum;
    employee.Cargabilidad = newCargabilidadStr;

    setEmpleadosInProyecto(prev => prev.filter(e => e.ID_Empleado !== employee.ID_Empleado));
    setAllEmployees(prev => [...prev, employee]);
  };

  const moveToProyecto = async (employee: any) => {
    // Insert into Empleado_Proyectos in DB
    await supabase
      .from("Empleado_Proyectos")
      .insert([{ ID_Empleado: employee.ID_Empleado, ID_Proyecto: id }]);

    // Calculate new cargabilidad_num
    const proyectoCargabilidad = project.cargabilidad_num || 0;
    const empleadoCargabilidad = employee.cargabilidad_num || 0;
    const newCargabilidadNum = empleadoCargabilidad + proyectoCargabilidad;

    // Optionally, update the Cargabilidad string (e.g., "50%")
    const newCargabilidadStr = `${Math.min(newCargabilidadNum, 100)}%`;

    // Update in DB
    await supabase
      .from("Empleado")
      .update({
        cargabilidad_num: newCargabilidadNum,
        Cargabilidad: newCargabilidadStr,
      })
      .eq("ID_Empleado", employee.ID_Empleado);

    // Update in UI state
    employee.cargabilidad_num = newCargabilidadNum;
    employee.Cargabilidad = newCargabilidadStr;

    setAllEmployees(prev => prev.filter(e => e.ID_Empleado !== employee.ID_Empleado));
    setEmpleadosInProyecto(prev => [...prev, employee]);
  };

  return (
    <div className="p-8 w-full max-w-none mx-0">
      <h1>{}</h1>
      <button onClick={() => router.back()} className="mb-4 text-blue-600">&larr; Volver</button>
      <div className="flex justify-between items-center mb-4">
        {editing ? (
          <input
            type="text"
            value={editValues.Nombre}
            onChange={e => handleEditChange("Nombre", e.target.value)}
            className="text-3xl font-bold border p-1 rounded w-full mr-4"
          />
        ) : (
          <h1 className="text-3xl font-bold">{project.Nombre}</h1>
        )}
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                Guardar
              </button>
              <button
                onClick={() => { setEditing(false); setEditValues(project); }}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition flex items-center gap-2"
              >
                <Pencil className="w-4 h-4" />
                Editar  
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar Proyecto
              </button>
            </>
          )}
        </div>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Descripción:</span>{" "}
        {editing ? (
          <textarea
            value={editValues.Descripcion}
            onChange={e => handleEditChange("Descripcion", e.target.value)}
            className="border p-1 rounded w-full"
          />
        ) : (
          project.Descripcion
        )}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Fecha de Inicio:</span>{" "}
        {editing ? (
          <input
            type="date"
            value={editValues.fecha_inicio}
            onChange={e => handleEditChange("fecha_inicio", e.target.value)}
            className="border p-1 rounded"
          />
        ) : (
          project.fecha_inicio
        )}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Fecha de Fin:</span>{" "}
        {editing ? (
          <input
            type="date"
            value={editValues.fecha_fin}
            onChange={e => handleEditChange("fecha_fin", e.target.value)}
            className="border p-1 rounded"
          />
        ) : (
          project.fecha_fin
        )}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Roles:</span>
        <ul className="list-disc ml-6">
          {roles.length === 0 ? (
            <li>No hay roles registrados para este proyecto.</li>
          ) : (
            roles.map((role) => (
              <li key={role.id} className="flex items-center gap-2">
                <span>{role.role_name}</span>
                {editing && (
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-red-600 hover:underline text-xs"
                    title="Eliminar rol"
                  >
                    Eliminar
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
        {editing && (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={newRole}
              onChange={e => setNewRole(e.target.value)}
              placeholder="Nuevo rol"
              className="border p-1 rounded"
            />
            <button
              onClick={handleAddRole}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Agregar rol
            </button>
          </div>
        )}
      </div>

      

      <div className="flex gap-8 mb-8 items-start">
        <div className="flex-1">
          <span className="font-semibold text-lg block mb-2">Empleados en este proyecto:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {empleadosInProyecto.length === 0 ? (
              <p className="text-gray-600">No hay empleados asignados a este proyecto.</p>
            ) : (
              empleadosInProyecto.map((empleado: any) => (
                <EmployeeCard
                  key={empleado.ID_Empleado}
                  employee={empleado}
                  editing={editing}
                  onSwitchList={() => moveToAllEmployees(empleado)}
                />
              ))
            )}
          </div>
        </div>
        <div className="flex-1">
          <span className="font-semibold text-lg block mb-2">Empleados disponibles:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allEmployees.length === 0 ? (
              <p className="text-gray-600">No hay empleados disponibles.</p>
            ) : (
              allEmployees.map((empleado: any) => (
                <EmployeeCard
                  key={empleado.ID_Empleado}
                  employee={empleado}
                  editing={editing}
                  onSwitchList={() => moveToProyecto(empleado)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
