"use client"; // Asegura que se ejecuta en el cliente

import { useEffect, useState } from "react";
import { getEmpleados } from "@/lib/empleadoService";
import { deleteCertificado } from "@/lib/borrarCertificado";

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmpleado, setSelectedEmpleado] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const data = await getEmpleados();
        setEmpleados(data);
      } catch (err) {
        console.error("Error fetching empleados:", err);
        setError("No se pudieron cargar los empleados.");
      }
    };
    fetchEmpleados();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Empleados</h1>

      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Rol</th>
            <th className="py-2 px-4 border">Certificados</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr
              key={empleado.ID_Empleado}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                setSelectedEmpleado(
                  selectedEmpleado === empleado.ID_Empleado ? null : empleado.ID_Empleado
                )
              }
            >
              <td className="py-2 px-4 border font-semibold">{empleado.Nombre}</td>
              <td className="py-2 px-4 border">{empleado.Rol}</td>
              <td className="py-2 px-4 border text-center">
                {empleado.Certificados && empleado.Certificados.length > 0
                  ? `📜 ${empleado.Certificados.length}`
                  : "❌ Sin certificados"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

 
      {selectedEmpleado && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold">
            Certificados de {empleados.find((e) => e.ID_Empleado === selectedEmpleado)?.Nombre}
          </h2>
          <ul className="list-disc ml-6">
            {empleados
              .find((e) => e.ID_Empleado === selectedEmpleado)
              ?.Certificados.map((cert) => (
                <li key={cert.ID_Certificado} className="mt-2">
                  📜 <strong>{cert.Nombre}</strong> - Expira el {cert.Fecha_caducidad}
                    <button onClick={() => deleteCertificado(cert.ID_Certificado)} 
                    className="mt-4 bg-red-500 text-white py-4 px-8 rounded">
                    </button>
                </li>
              ))}
          </ul>
            
            
        </div>
      )}
    </div>
  );
}
