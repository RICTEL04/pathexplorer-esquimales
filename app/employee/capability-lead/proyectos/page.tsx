"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ProjectJson {
  ID_Proyecto: string;
  Nombre: string;
  Descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
}

export default function ProyectosPage() {
  const [projects, setProjects] = useState<ProjectJson[]>([]);
  const [employeeCounts, setEmployeeCounts] = useState<{ [key: string]: number}>({});
  const router = useRouter();

  useEffect(() => {
    const fetchProjectsAndCounts = async () => {
      const { data: projectsData, error } = await supabase
        .from("Proyectos")
        .select("*")
        .order("ID_Proyecto", { ascending: false });
      if (!error && projectsData){
        setProjects(projectsData);

        //Fetch counts for all projects
        const { data: countsData, error: countsError } = await supabase 
          .from("Empleado_Proyectos")
          .select("ID_Proyecto", { count: "exact", head: false });
        
        // Map for ID_Proyecto -> count
        const countsMap: {[key: string]: number} = {};
        if(!countsError && countsData){
          countsData.forEach((row: any) => {
            countsMap[row.ID_Proyecto] = (countsMap[row.ID_Proyecto] || 0) + 1;
          });
        }
        setEmployeeCounts(countsMap);
      } 
        
    };


    fetchProjectsAndCounts();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-gray-800 text-4xl font-bold mb-2">Proyectos</h1>
          <p className="text-gray-600">Aquí puedes gestionar los proyectos.</p>
        </div>
        <button
          onClick={() => router.push("./proyectos/new")}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Proyecto</span>
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Proyectos</h2>
        {projects.length === 0 ? (
          <p className="text-gray-600">No hay proyectos disponibles.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.ID_Proyecto}
              className="bg-white rounded-lg border border-gray-200 p-4 mb-4 cursor-pointer hover:shadow-lg transition"
              onClick={() => router.push(`./proyectos/${project.ID_Proyecto}`)}
            >
              <h3 className="text-black font-bold">{project.Nombre}</h3>
              <p className="text-gray-600 text-sm">{project.Descripcion}</p>
              <p className="text-gray-600 mt-2">Fecha de Inicio: {project.fecha_inicio}</p>
              <p className="text-gray-600 mt-2">Fecha de Fin: {project.fecha_fin}</p>
              <p className="text-purple-700 mt-2 font-semibold">
                Empleados asignados: {employeeCounts[project.ID_Proyecto] || 0}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}