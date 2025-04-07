"use client"; // Asegura que se ejecuta en el cliente

import '@/app/admin/validarCursos/validarCursos.css';

import { useEffect, useState } from "react";
import { getEmpleados } from "@/lib/empleadoService";
import { deleteCertificado } from "@/lib/borrarCertificado";

interface Certificado {
  ID_Certificado: string;
  Nombre: string;
  Fecha_caducidad: string;
}

interface Empleado {
  ID_Empleado: string;
  Nombre: string;
  Rol: string;
  Certificados: Certificado[];
}

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmpleado, setSelectedEmpleado] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const data: Empleado[] = await getEmpleados();
        setEmpleados(data);
      } catch (err) {
        console.error("Error fetching empleados:", err);
        setError("No se pudieron cargar los empleados.");
      }
    };
    fetchEmpleados();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Empleados</h1>

      {error && <p className="text-red-500">{error}</p>}

      <table className="tablaCursos">
        <thead>
          <tr>
            <th className="titulo">NOMBRE</th>
            <th className="titulo">ROL</th>
            <th className="titulo">CERTIFICADOS</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr
              key={empleado.ID_Empleado}
              className="rat"
              onClick={() =>
                setSelectedEmpleado(
                  selectedEmpleado === empleado.ID_Empleado ? null : empleado.ID_Empleado
                )
              }
            >
              <td className="cuerpo">{empleado.Nombre}</td>
              <td className="cuerpo">{empleado.Rol}</td>
              <td className="cuerpo2">
                {empleado.Certificados.length > 0
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
              ?.Certificados.map((cert: Certificado) => (
                <li key={cert.ID_Certificado} className="mt-2">
                  📜 <strong>{cert.Nombre}</strong> - Expira el {cert.Fecha_caducidad}
                  <button
                    onClick={async () => {
                      try {
                        await deleteCertificado(cert.ID_Certificado); // Call the deleteCertificado method
                        window.location.reload(); // Reload the page
                      } catch (error) {
                        console.error("Error deleting certificado:", error);
                      }
                    }}
                    className="ml-4 bg-red-500 text-white py-1 px-3 rounded">
                    Eliminar
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
