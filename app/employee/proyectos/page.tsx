"use client";

import React, { useState, useEffect } from "react";
import { getProyectos } from "@/lib/getProyectos";
import { getUserId } from "@/lib/getUserId";
import { getEmpleadosSinAutoevaluacion, selectEmpleado } from "@/lib/autoevaluacion-empleado/apiCalls";
import SelfReviewModal from "@/components/Autoevaluacion/SelfReviewModal";
import { Employee, ProjectJson } from "@/lib/delivery-lead-proyectos/definitions";
import SuggestedProjectsColumn from "@/components/Proyectos-Empleado/SuggestedProjectsColumn";
import CurrentProjectsColumn from "@/components/Proyectos-Empleado/CurrentProjectsColumn";
import { EmployeeFullData } from "@/lib/employeeService";

export default function ProyectosPage() {
  const [empleado, setEmpleado] = useState<EmployeeFullData | null>(null);

  const [selfReviewModalOpen, setSelfReviewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectJson | null>(null);

  // Fetch the logged-in user's ID
  useEffect(() => {
    const fetchUser = async () => {
      const id = await getUserId();
      if (id) {
        try {
          const data = await selectEmpleado(id);
          console.log("data", data);
          if (data) {
            console.log("Empleado data:", data);
            setEmpleado(data);
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
      {/* Review Modal */}
      {selfReviewModalOpen && selectedProject && empleado && (
        <SelfReviewModal
          onClose={() => setSelfReviewModalOpen(false)}
          selectedProject={selectedProject}
          employee={empleado}
        />
      )}
      {/* Main content */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Suggested Projects */}
          <SuggestedProjectsColumn
            empleado={empleado}
          />

          {/* Right column - Current Projects */}
          <CurrentProjectsColumn
            empleado={empleado}
            setSelfReviewModalOpen={setSelfReviewModalOpen}
            setSelectedProject={setSelectedProject}
          />
        </div>
      </div>
    </div>
  );
}