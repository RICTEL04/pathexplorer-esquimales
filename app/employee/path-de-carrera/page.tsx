"use client";

import CoursesTable from "@/components/Cursos/CursosTable";
import { fetchSession } from "@/lib/certificados-empleados/apiCalls";
import { fetchCoursesData } from "@/lib/cursos-empleado/apiCalls";
import { course } from "@/lib/cursos-empleado/definitions";
import { useState, useEffect, use } from "react";

export default function PathDeCarreraPage() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<course[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const session = await fetchSession(setLoading);
        if (session) {
          const data = await fetchCoursesData(session.user.id, setLoading);
          if (data) {
            setCourses(data);
            console.log("Courses data:", data);
          }
        }
      }
      catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [])

  return (
    <div>
      <h1 className="text-gray-800 text-2xl font-bold mb-4">Talent Discussions</h1>
      <p className="text-gray-600">Aquí puedes gestionar las discusiones de talento.</p>
      {/* Add your content for Talent Discussions here */}
      <CoursesTable courses={courses} />
    </div>
  );
}