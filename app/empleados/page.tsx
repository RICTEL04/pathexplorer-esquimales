"use client"; // Asegura que se ejecuta en el cliente

import { useEffect, useState } from "react";
import { getEmpleados } from "@/lib/empleadoService";

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
      <h1>Lista de Empleados</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {empleados.map((empleado) => (
          <li key={empleado.ID_Empleado}>
            <strong>{empleado.Nombre}</strong> - {empleado.Rol}
            <ul>
              {empleado.Certificados.length > 0 ? (
                empleado.Certificados.map((cert) => (
                  <li key={cert.ID_Certificado}>
                    📜 {cert.Nombre} - Emitido el {cert.Fecha_caducidad}
                  </li>
                ))
              ) : (
                <li>Sin certificados</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
