import React from "react";
import CursosCard from "./CursosCard"; // Reutilizamos el componente existente

interface Course {
  id: string;
  nombre: string;
  descripcion: string | null;
  link: string | null;
  relevancia: number;
}

interface RecommendedCoursesCardsProps {
  courses: Course[];
}

const RecommendedCoursesCards: React.FC<RecommendedCoursesCardsProps> = ({ courses }) => {
  return (
    <div className="flex flex-col gap-4"> {/* Cambiado a flex-col para 1x1 */}
      {courses.map((course) => (
        <CursosCard
          key={course.id}
          course={{
            ID_Curso: course.id,
            Nombre: course.nombre,
            Descripcion: course.descripcion ?? "",
            link: course.link ?? "",
            Fecha_fin_curso: "", // Proveer un valor predeterminado si no existe
            skills: [], // Proveer un array vacío para evitar errores
          }}
        />
      ))}
    </div>
  );
};

export default RecommendedCoursesCards;