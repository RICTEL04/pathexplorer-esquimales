"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Pencil, Trash2 } from "lucide-react";
import { getCapabilityLead } from "@/lib/capabilityLead";
import DraggableList from "@/components/DraggableList";
import type { Project, Role, Employee, MappedEmployee } from "./types";
import { mapEmployeeData, mapAllEmployeeData } from "./mappers";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState<any>({});

  const [project, setProject] = useState<Project | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

  const [draggedEmployee, setDraggedEmployee] = useState<any | null>(null);
  const [isOverAssigned, setIsOverAssigned] = useState(false);
  const [isOverAvailable, setIsOverAvailable] = useState(false);
  

  useEffect(() => {
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
    const fetchEmployees = async () => {
      const { data: assigned, error } = await supabase
        .from("Empleado_Proyectos")
        .select("ID_Empleado")
        .eq("ID_Proyecto", id);

      if (!error && assigned) {
        // Extract just the IDs
        const ids = assigned.map((item: any) => item.Empleado_id);

        if (ids.length === 0) {
          setEmployees([]);
          return;
        }

        // Now fetch the employee details for those IDs
        const { data: employeesData, error: empError } = await supabase
          .from("Empleado")
          .select("*")
          .in("ID_Empleado", ids);

        if (!empError && employeesData) {
          setEmployees(employeesData);
        } else {
          setEmployees([]);
        }
      } else {
        setEmployees([]);
      }
    };
    const fetchAllEmployees = async () => {
      try {
        const rawData = await getCapabilityLead();
        // Mapea los datos igual que en perfiles-de-empleados
        const data = rawData.map((item: any) => ({
          ID_Empleado: item.ID_Empleado,
          Nombre: item.Nombre,
          Rol: item.Rol,
          Nivel: item.Nivel,
          FechaContratacion: item.FechaContratacion,
          FechaUltNivel: item.FechaUltNivel,
          Puesto_proyecto: item.Puesto_proyecto?.[0] || null,
        }));
        setAllEmployees(data);
      } catch (err) {
        setAllEmployees([]);
      }
    };

    fetchProject();
    fetchRoles();
    fetchEmployees();
    fetchAllEmployees();
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

  // Get IDs of assigned employees to avoid duplicates
  const assignedIds = new Set(employees.map((item: any) => item.Empleado?.ID_Empleado));

  const assignedEmployees: MappedEmployee[] = employees.map(e => mapEmployeeData(e, project));
  const availableEmployees: MappedEmployee[] = allEmployees
    .filter(emp => !assignedIds.has(emp.ID_Empleado))
    .map(mapAllEmployeeData);

  // Drag handlers
  const handleDragStart = (employee: any) => setDraggedEmployee(employee);


    const handleDropAssigned = () => {
    if (
      draggedEmployee &&
      availableEmployees.find((e) => e.id === draggedEmployee.id)
    ) {
      // Move from available to assigned
      setEmployees((prev: any[]) => [
        ...prev,
        {
          Empleado: {
            ID_Empleado: draggedEmployee.id,
            Nombre: draggedEmployee.name,
            Rol: draggedEmployee.position,
            Nivel: draggedEmployee.level,
            FechaContratacion: draggedEmployee.companyEntryDate,
            FechaUltNivel: draggedEmployee.timeOnLevel,
          },
          Puesto: draggedEmployee.project,
          created_at: draggedEmployee.activeProjectStartDate,
        },
      ]);
      setAllEmployees((prev: any[]) =>
        prev.filter((e: any) => e.ID_Empleado !== draggedEmployee.id)
      );
    }
    setDraggedEmployee(null);
    setIsOverAssigned(false);
  };

  const handleDropAvailable = () => {
    if (
      draggedEmployee &&
      assignedEmployees.find((e) => e.id === draggedEmployee.id)
    ) {
      // Move from assigned to available
      setAllEmployees((prev: any[]) => [
        ...prev,
        {
          ID_Empleado: draggedEmployee.id,
          Nombre: draggedEmployee.name,
          Rol: draggedEmployee.position,
          Nivel: draggedEmployee.level,
          FechaContratacion: draggedEmployee.companyEntryDate,
          FechaUltNivel: draggedEmployee.timeOnLevel,
          Puesto_proyecto: null,
        },
      ]);
      setEmployees((prev: any[]) =>
        prev.filter(
          (e: any) => e.Empleado?.ID_Empleado !== draggedEmployee.id
        )
      );
    }
    setDraggedEmployee(null);
    setIsOverAvailable(false);
  };

  const canDragAndDrop = editing;


  return (
    <div className="p-8 w-full max-w-none mx-0">
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
              <li key={role.id}>{role.role_name}</li>
            ))
          )}
        </ul>
      </div>

      <div className="flex gap-8 mb-8 items-start">
        <div className="flex-1">
          <span className="font-semibold text-lg block mb-2">Empleados en este proyecto:</span>
          <DraggableList
            employees={assignedEmployees}
            onDragStart={canDragAndDrop ? handleDragStart : () => {}}
            onDrop={canDragAndDrop ? handleDropAssigned : () => {}}
            onDragOver={canDragAndDrop ? () => setIsOverAssigned(true) : () => {}}
            isOver={isOverAssigned && canDragAndDrop}
            draggableEnabled={canDragAndDrop}
          />
          {assignedEmployees.length === 0 && (
            <p className="text-gray-600 mt-2">No hay empleados asignados a este proyecto.</p>
          )}
        </div>
        <div className="flex-1">
          <span className="font-semibold text-lg block mb-2">Todos los empleados:</span>
          <DraggableList
            employees={availableEmployees}
            onDragStart={canDragAndDrop ? handleDragStart : () => {}}
            onDrop={canDragAndDrop ? handleDropAvailable : () => {}}
            onDragOver={canDragAndDrop ? () => setIsOverAvailable(true) : () => {}}
            isOver={isOverAvailable && canDragAndDrop}
            draggableEnabled={canDragAndDrop}
          />
          {availableEmployees.length === 0 && (
            <p className="text-gray-600 mt-2">No hay empleados registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}