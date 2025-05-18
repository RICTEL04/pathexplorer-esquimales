"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("Proyectos")
        .select("*")
        .eq("ID_Proyecto", id)
        .single();
      if (!error) setProject(data);
    };
    const fetchRoles = async () => {
      const { data, error } = await supabase
        .from("Roles")
        .select("*")
        .eq("Proyecto_id", id);
      if (!error) setRoles(data);
    };
    fetchProject();
    fetchRoles();
  }, [id]);

  if (!project) return <div className="p-8">Cargando...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={() => router.back()} className="mb-4 text-blue-600">&larr; Volver</button>
      <h1 className="text-3xl font-bold mb-2">{project.Nombre}</h1>
      <p className="mb-2"><span className="font-semibold">Descripción:</span> {project.Descripcion}</p>
      <p className="mb-2"><span className="font-semibold">Fecha de Inicio:</span> {project.fecha_inicio}</p>
      <p className="mb-2"><span className="font-semibold">Fecha de Fin:</span> {project.fecha_fin}</p>
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
      {/* Aquí puedes agregar la lógica para asignar empleados */}
    </div>
  );
}