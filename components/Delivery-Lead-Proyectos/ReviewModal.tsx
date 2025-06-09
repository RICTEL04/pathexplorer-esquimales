import React, { useEffect, useState } from "react";
import { fetchEmployeesByProject, insertReview } from "@/lib/delivery-lead-proyectos/apiCalls";
import { Employee } from "@/lib/delivery-lead-proyectos/definitions";
import { sleep } from "openai/core.mjs";

export default function ReviewModal({
  onClose,
  selectedProject,
}: {
  onClose: () => void;
  selectedProject: any;
}) {
  const [empleados, setEmpleados] = useState<Employee[]>([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Employee | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [strengths, setStrengths] = useState<string>("");
  const [improvement, setImprovement] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmpleados = async () => {
      await sleep(500);
      if (selectedProject?.ID_Proyecto) {
        try {
          const data = await fetchEmployeesByProject(selectedProject.ID_Proyecto);
          const filteredData = data.filter((empleado) => !empleado.isReviewed);
          setEmpleados(filteredData);
          if (filteredData.length === 0) {
            onClose();
            window.location.reload();
          }
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      }
    };
    fetchEmpleados();
  }, [selectedProject, selectedEmpleado]);

    useEffect(() => {
        if (rating > 0 && strengths.trim() !== "" && improvement.trim() !== "") {
        setSubmitDisabled(false);
        } else {
        setSubmitDisabled(true);
        }
    }, [rating, strengths, improvement]);

  const handleStarClick = (star: number) => setRating(star);

  const handleBack = () => {
    setSelectedEmpleado(null);
    setRating(0);
    setStrengths("");
    setImprovement("");
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || strengths.trim() === "" || improvement.trim() === "") {
      setError("Por favor, califica y llena ambos campos de comentarios.");
      return;
    }
    setError("");
    if (!selectedEmpleado || !selectedEmpleado.ID_Empleado) {
      setError("Empleado no seleccionado.");
      return;
    }
    insertReview({
      ID_Empleado: selectedEmpleado.ID_Empleado,
      ID_Proyecto: selectedProject.ID_Proyecto,
      ID_DeliveryLead: selectedProject.ID_DeliveryLead,
      Calificacion: rating,
      Fortalezas: strengths,
      Areas_Mejora: improvement,
    });
    handleBack();
  };

  if (!selectedProject) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {selectedEmpleado ? "Evaluar Empleado" : "Empleados del Proyecto"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-xl font-bold"
          >
            ×
          </button>
        </div>
        {selectedEmpleado ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{selectedEmpleado.Nombre}</h3>
              <p className="text-gray-700 mb-1">Rol: {selectedEmpleado.Rol}</p>
              <p className="text-gray-500 text-sm mb-4">ID: {selectedEmpleado.ID_Empleado}</p>
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Calificación:</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className="focus:outline-none"
                  >
                    <span className={star <= rating ? "text-yellow-400 text-3xl" : "text-gray-300 text-3xl"}>
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium" htmlFor="strengths">
                Fortalezas:
              </label>
              <textarea
                id="strengths"
                className="w-full border rounded p-2"
                rows={4}
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                placeholder="Escribe tus comentarios aquí..."
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium" htmlFor="improvement">
                Áreas de Mejora:
              </label>
              <textarea
                id="improvement"
                className="w-full border rounded p-2"
                rows={4}
                value={improvement}
                onChange={(e) => setImprovement(e.target.value)}
                placeholder="Escribe tus comentarios aquí..."
              />
            </div>
            {error && (
              <div className="mb-4 text-red-600 font-medium">{error}</div>
            )}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
              >
                Volver
              </button>
              <button
                type="submit"
                className={`px-4 py-2 bg-violet-700 hover:bg-violet-800 text-white rounded transition-all ${submitDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                disabled={
                  rating === 0 ||
                  strengths.trim() === "" ||
                  improvement.trim() === ""
                }
              >
                Enviar Evaluación
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {empleados.map((empleado) => (
              <div
                key={empleado.ID_Empleado}
                className="border rounded-lg p-4 shadow hover:bg-violet-50 cursor-pointer transition"
                onClick={() => setSelectedEmpleado(empleado)}
              >
                <h3 className="text-lg font-semibold">{empleado.Nombre}</h3>
                <p className="text-gray-700">Rol: {empleado.Rol}</p>
                <p className="text-gray-500 text-sm">ID: {empleado.ID_Empleado}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}