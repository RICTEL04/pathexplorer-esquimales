import { aplicarEmpleadoProyecto } from "@/lib/aplicarEmpleadoProyecto";
import { EmployeeFullData } from "@/lib/employeeService";
import { Proyecto, getProyectos } from "@/lib/getProyectosIA"; // Asegúrate de ajustar la ruta correcta
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function SuggestedProjectsColumn({
  empleado,
}: {
  empleado: EmployeeFullData | null;
}) {
  const [proyectosSugeridos, setProyectosSugeridos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!empleado) return;

    const fetchProyectosSugeridos = async () => {
      setLoading(true);
      try {
        // Obtener todos los proyectos existentes
        const proyectosExistentes = await getProyectos();

        // Preparar datos para el recomendador IA
        const skills = [
          ...(empleado.hardSkills?.map((skill) => skill.Descripcion) || []),
          ...(empleado.softSkills?.map((skill) => skill.Descripcion) || []),
        ];
        const intereses = empleado.intereses?.map((i) => i.Descripcion) || [];
        const metas = ["Crecimiento profesional", "Desarrollo de habilidades"]; // Ajusta según sea necesario

        const body = {
          metas,
          habilidades: skills,
          intereses,
          proyectos: proyectosExistentes, // Enviar los proyectos existentes a la IA
        };

        console.log("Body para recomendador IA:", body);

        // Llamar al recomendador IA
        const response = await fetch("/api/ProjectRecommender", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error("Error al obtener proyectos sugeridos");

        const data = await response.json();

        // Procesar proyectos sugeridos
        const proyectosDetalle = data.suggestedProjects.map((proyecto: any) => ({
          ID_Proyecto: proyecto.ID_Proyecto,
          Nombre: proyecto.Nombre,
          Descripcion: proyecto.Descripcion,
          Status: proyecto.Status,
          fecha_inicio: proyecto.fecha_inicio,
          fecha_fin: proyecto.fecha_fin,
        }));

        setProyectosSugeridos(proyectosDetalle);
      } catch (error) {
        console.error("Error al obtener proyectos sugeridos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectosSugeridos();
  }, [empleado]);

  const handleAplicar = async (proyectoId: string) => {
    if (!empleado?.ID_Empleado) {
      console.error("User ID is not available.");
      return;
    }

    const success = await aplicarEmpleadoProyecto(empleado.ID_Empleado, proyectoId);

    if (success) {
      alert("Aplicación exitosa al proyecto.");
    } else {
      alert("Hubo un error al aplicar al proyecto.");
    }
    window.location.reload();
  };

  return (
    <div className="lg:col-span-2">
      <h2 className="text-2xl text-black font-bold">Proyectos sugeridos</h2>
      <div className="space-y-4 overflow-y-scroll no-scrollbar mt-4 h-[80vh]">
        {loading ? (
          <p className="text-gray-600">Cargando proyectos sugeridos...</p>
        ) : proyectosSugeridos.length === 0 ? (
          <p className="text-gray-600">No hay proyectos sugeridos por ahora.</p>
        ) : (
          proyectosSugeridos.map((proyecto) => (
            <div
              key={proyecto.ID_Proyecto}
              className="bg-white rounded-lg border border-gray-200 p-4 relative"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-black font-bold">{proyecto.Nombre}</h3>
                  <p className="text-gray-600 mt-2">{proyecto.Descripcion}</p>
                  <p className="text-gray-600 text-sm mt-1">Estado: {proyecto.Status}</p>
                  {proyecto.fecha_inicio && (
                    <p className="text-gray-600 text-sm mt-1">
                      Fecha de inicio: {new Date(proyecto.fecha_inicio).toLocaleDateString()}
                    </p>
                  )}
                  {proyecto.fecha_fin && (
                    <p className="text-gray-600 text-sm mt-1">
                      Fecha de fin: {new Date(proyecto.fecha_fin).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleAplicar(proyecto.ID_Proyecto)}
                  className="bg-purple-600 hover:bg-purple-800 text-white px-4 py-1 rounded flex items-center gap-1 transition-all"
                >
                  Aplicar <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
