"use client";

import CoursesCards from "@/components/Cursos/CursosCards";
import { fetchData, fetchSession } from "@/lib/certificados-empleados/apiCalls";
import { fetchCoursesData } from "@/lib/cursos-empleado/apiCalls";
import { course } from "@/lib/cursos-empleado/definitions";
import { useState, useEffect, use } from "react";
import { EmployeeFullData } from "@/lib/employeeService";
import { getEmployeeFullData } from '@/lib/employeeService';
import certification from "@/lib/certificados-empleados/definitions";

export default function PathDeCarreraPage() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<course[]>([]);
  const [certifications, setCertifications] = useState<certification[]>([]);
  const [employee, setEmployee] = useState<EmployeeFullData>();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const session = await fetchSession(setLoading);
        if (session) {
          const coursesData = await fetchCoursesData(session.user.id, setLoading);
          if (coursesData) {
            setCourses(coursesData);
          }
          const certificationsData = await fetchData(session.user.id, setLoading);
          if (certificationsData) {
            setCertifications(certificationsData);
          }
          const employeeData = await getEmployeeFullData(session.user.id);
          if (employeeData) {
            setEmployee(employeeData);
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
      <h1 className="text-gray-800 text-2xl font-bold mb-4">Path de Carrera</h1>
      <p className="text-gray-600">Aquí podrás ver cursos disponibles.</p>
      {/* Add your content for Talent Discussions here */}
      {employee && <CoursesCards courses={courses} employee={employee} certifications={certifications} />}
    </div>
  );
}