"use client";

import '@/app/admin/validarCursos/validarCursos.css';

import { useEffect, useState } from "react";
import { getEmpleados } from "@/lib/empleadoService";
import { updateCertificado } from "@/lib/empleadoUpdate";

interface Certificado {
  ID_Certificado: string;
  Nombre: string;
  Fecha_caducidad: string;
  Verificacion: boolean;
  Descripcion: string;
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
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null);
  const [selectedCertificado, setSelectedCertificado] = useState<Certificado | null>(null);
  const [descripcion, setDescripcion] = useState<string>("");
  const [verificacion, setVerificacion] = useState<boolean>(false);

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

  const handleCertificadoSelect = (cert: Certificado) => {
    setSelectedCertificado(cert);
    setDescripcion(cert.Descripcion);
    setVerificacion(cert.Verificacion);
  };

  const handleUpdateCertificado = async () => {
    if (selectedCertificado) {
      try {
        await updateCertificado(selectedCertificado.ID_Certificado, verificacion, descripcion);
        alert("Certificado actualizado correctamente.");
        setSelectedCertificado(null); // Cerrar el formulario
        window.location.reload(); // Recargar los datos
      } catch (error) {
        console.error("Error al actualizar el certificado:", error);
        alert("Hubo un error al actualizar el certificado.");
      }
    }
  };

  const closePopup = () => {
    setSelectedEmpleado(null);
    setSelectedCertificado(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Empleados</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid-container">
        {empleados
          .filter((empleado) => empleado.Certificados.length > 0)
          .map((empleado) => (
            <div
              key={empleado.ID_Empleado}
              className="card"
              onClick={() => setSelectedEmpleado(empleado)} // Mostrar popup al hacer clic
              style={{ cursor: "pointer" }}
            >
              <h2 className="card-title">{empleado.Nombre}</h2>
              <p className="card-role">Rol: {empleado.Rol}</p>
              <p className="card-certificates">
                Certificados: 📜 {empleado.Certificados.length}
              </p>
            </div>
          ))}
      </div>

      {selectedEmpleado && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="popup-title">
              Certificados de {selectedEmpleado.Nombre}
            </h2>

            <table className="popup-table">
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Fecha de caducidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {selectedEmpleado.Certificados.map((cert) => (
                  <tr key={cert.ID_Certificado}>
                    <td><strong>{cert.Nombre}</strong></td>
                    <td>{cert.Fecha_caducidad}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleCertificadoSelect(cert)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="popup-close-button" onClick={closePopup}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {selectedCertificado && (
        <div className="popup-overlay" onClick={() => setSelectedCertificado(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="popup-title">Editar Certificado</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateCertificado(); }}>
              <div className="form-group">
                <label >Descripción:</label>
                <textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="verificacion">Verificación:</label>
                <input
                  id="verificacion"
                  type="checkbox"
                  checked={verificacion}
                  onChange={(e) => setVerificacion(e.target.checked)}
                  className="form-checkbox"
                />
              </div>
              <button type="submit" className="save-button">
                Guardar
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setSelectedCertificado(null)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}