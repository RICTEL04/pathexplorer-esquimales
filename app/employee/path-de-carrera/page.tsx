"use client";

import { useState, useEffect } from "react";
import CoursesCards from "@/components/Cursos/CursosCards";
import RecommendedCoursesCards from "@/components/Cursos/RecommendedCoursesCards"; // Importa un nuevo componente para cursos recomendados
import { fetchData, fetchSession } from "@/lib/certificados-empleados/apiCalls";
import { fetchCoursesData } from "@/lib/cursos-empleado/apiCalls";
import { course } from "@/lib/cursos-empleado/definitions";
import { EmployeeFullData, Interes, Habilidad} from "@/lib/employeeService";
import { getEmployeeFullData } from "@/lib/employeeService";
import certification from "@/lib/certificados-empleados/definitions";

export default function PathDeCarreraPage() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<course[]>([]);
  const [certifications, setCertifications] = useState<certification[]>([]);
  const [employee, setEmployee] = useState<EmployeeFullData>();
  const [careerPath, setCareerPath] = useState<any>(null); // Para almacenar el path de carrera generado
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"careerPath" | "employeeData">("careerPath"); // Estado para controlar la sección activa
  const [currentPage, setCurrentPage] = useState(1); // Estado para la paginación
  const itemsPerPage = 5; // Número de cursos por página

  // Función para cambiar de sección
  const handleSectionChange = (section: "careerPath" | "employeeData") => {
    setActiveSection(section);
  };

  // Función para cambiar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Función para llamar a la API del servidor y generar el path de carrera
  const generateCareerPath = async (
    metas: string[],
    habilidades: Habilidad[],
    intereses: Interes[],
    todosLosCursos: { id: any; nombre: any; descripcion: any; link: any; fechaFin: any }[],
    cursosCompletados: { id: any; nombre: any; descripcion: any; link: any; fechaFin: any }[]
  ) => {
    try {
      const response = await fetch("/api/generateCareerPath", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metas, habilidades, intereses, todosLosCursos, cursosCompletados }),
      });
  
      if (!response.ok) {
        throw new Error("Error al generar el path de carrera");
      }
  
      const careerPathData = await response.json();
      return careerPathData;
    } catch (error) {
      console.error("Error al generar el path de carrera:", error);
      throw new Error("No se pudo generar el path de carrera. Por favor, inténtalo de nuevo.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const session = await fetchSession(setLoading);
        if (session) {
          const userId = session.user.id;

          // Fetch cursos, certificaciones y datos del empleado
          const coursesData = await fetchCoursesData(userId, setLoading);
          if (coursesData) {
            setCourses(coursesData);
          }
          const certificationsData = await fetchData(userId, setLoading);
          if (certificationsData) {
            setCertifications(certificationsData);
          }
          const employeeData = await getEmployeeFullData(userId);
          if (employeeData) {
            setEmployee(employeeData);
          }

          console.log("Employee Data:", employeeData);
          console.log("Courses Data:", coursesData);
          console.log("Certifications Data:", certificationsData);

          // *Filtrar y estructurar la información*
          const metas = [
            "Trabajar en proyectos innovadores",
          ];

          const habilidades = [
            ...(employeeData?.hardSkills || []),
            ...(employeeData?.softSkills || []),
          ];

          const intereses = employeeData?.intereses || [];

          const todosLosCursos = coursesData
            ? coursesData.map((curso: any) => ({
                id: curso.ID_Curso,
                nombre: curso.Nombre,
                descripcion: curso.Descripcion,
                link: curso.link,
                fechaFin: curso.Fecha_fin_curso,
              }))
            : [];

          const cursosCompletados = coursesData
            ? coursesData
                .filter((curso: any) => curso.Fecha_fin_curso !== null)
                .map((curso: any) => ({
                  id: curso.ID_Curso,
                  nombre: curso.Nombre,
                  descripcion: curso.Descripcion,
                  link: curso.link,
                  fechaFin: curso.Fecha_fin_curso,
                }))
            : [];

          console.log("Metas:", metas);
          console.log("Habilidades:", habilidades);
          console.log("Intereses:", intereses);
          console.log("Todos los cursos:", todosLosCursos);
          console.log("Cursos completados:", cursosCompletados);

          const careerPathData = await generateCareerPath(
            metas,
            habilidades,
            intereses,
            todosLosCursos,
            cursosCompletados
          );
          setCareerPath(careerPathData);
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Hubo un problema al cargar los datos. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Calcular los cursos para la página actual
  const paginatedCourses =
    careerPath?.sortedCourses?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  return (
    <div>
      <h1 className="text-gray-800 text-2xl font-bold mb-4">Path de Carrera</h1>
      <p className="text-gray-600 mb-4">Aquí podrás ver cursos disponibles y tu path de carrera sugerido.</p>

      {/* Botones para cambiar de sección */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleSectionChange("careerPath")}
          className={`px-4 py-2 rounded ${
            activeSection === "careerPath" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Path de Carrera
        </button>
        <button
          onClick={() => handleSectionChange("employeeData")}
          className={`px-4 py-2 rounded ${
            activeSection === "employeeData" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Datos del Empleado
        </button>
      </div>

      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Sección de Path de Carrera */}
      {!loading && activeSection === "careerPath" && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Path de Carrera Sugerido</h2>
          {careerPath ? (
            <>
              <p className="text-gray-700 mb-4">
                <strong>Carrera:</strong> {careerPath.careerPath}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pasos:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                {careerPath.steps.map((step: any, index: number) => (
                  <li key={index}>
                    <strong>{step.step}:</strong> {step.description}
                  </li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Recomendaciones:</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                {careerPath.recommendations.map((rec: string, index: number) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Cursos Recomendados:</h3>
              {paginatedCourses.length > 0 ? (
                <>
                  <RecommendedCoursesCards courses={paginatedCourses} />
                  <div className="flex justify-center mt-4">
                    {Array.from(
                      { length: Math.ceil(careerPath.sortedCourses.length / itemsPerPage) },
                      (_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-3 py-1 mx-1 rounded ${
                            currentPage === index + 1
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {index + 1}
                        </button>
                      )
                    )}
                  </div>
                </>
              ) : (
                <p className="text-gray-500">No hay cursos recomendados disponibles.</p>
              )}
            </>
          ) : (
            <p className="text-gray-500">Cargando cursos recomendados...</p>
          )}
        </div>
      )}

      {/* Sección de Datos del Empleado */}
      {!loading && activeSection === "employeeData" && employee && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Datos del Empleado</h2>
          <CoursesCards courses={courses} employee={employee} certifications={certifications} />
        </div>
      )}
    </div>
  );
}