'use client';
import HistorialProyectos from "@/components/Historial-Proyectos/HistorialProyectos";
import { selectEmpleado } from "@/lib/autoevaluacion-empleado/apiCalls";
import { getUserId } from "@/lib/getUserId";
import { getProyectosTerminados } from "@/lib/historial-proyectos/apiCalls";
import { ProyectoTerminado } from "@/lib/historial-proyectos/definitions";
import { useEffect, useState } from "react";


export default function ProyectosHistorial() {
  const [evaluaciones, setEvaluaciones] = useState<ProyectoTerminado[]>([]);

  // Fetch the logged-in user's ID
  useEffect(() => {
    const fetchUser = async () => {
      const id = await getUserId();
      if (id) {
        try {
          const data = await getProyectosTerminados(id);
          console.log("data", data);
          if (data) {
            console.log("Empleado data:", data);
            setEvaluaciones(data);
          }
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="h-full bg-gray-100">
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4">Historial de Proyectos</h1>
        <HistorialProyectos projects={evaluaciones} />
      </div>
    </div>
  );
}