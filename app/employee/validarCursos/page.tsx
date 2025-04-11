"use client";

import '@/app/employee/validarCursos/validarCursos.css';

import { useEffect, useState } from "react";
import { getEmpleados } from "@/lib/empleadoService";
import { updateCertificado } from "@/lib/empleadoUpdate";
import { Certificate } from 'crypto';

interface Certificado {
  ID_Certificado: string;
  Nombre: string;
  Fecha_caducidad: string;
  Verificacion: boolean;
  Descripcion: string;
  Documento: string;
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
  const [expandedCertificado, setExpandedCertificado] = useState<string | null>(null); 
  const [descripcion, setDescripcion] = useState<string>("");
  const [verificacion, setVerificacion] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {rol
        const data: Empleado[] = await getEmpleados();
        setEmpleados(data);
      } catch (err) {
        console.error("Error fetching empleados:", err);
        setError("No se pudieron cargar los empleados.");
      }
    };
    fetchEmpleados();
  }, []);

  const handleCertificadoExpand = (cert: Certificado) => {
    if (expandedCertificado === cert.ID_Certificado) {
      
      setExpandedCertificado(null);
    } else {
      
      setExpandedCertificado(cert.ID_Certificado);
      setDescripcion(cert.Descripcion);
      setVerificacion(cert.Verificacion);
    }
  };

  const handleUpdateCertificado = async (certId: string) => {
    try {
      await updateCertificado(certId, verificacion, descripcion);
      alert("Certificado actualizado correctamente.");
      setExpandedCertificado(null); 
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar el certificado:", error);
      alert("Hubo un error al actualizar el certificado.");
    }
  };

  const closePopup = () => {
    setSelectedEmpleado(null);
    setExpandedCertificado(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Certificados Pendientes</h1>
      <p className="mb-4">Haz clic en un empleado para ver sus certificados pendientes.</p>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid-container">
        {empleados
          .filter((empleado) => empleado.Certificados.length > 0 && empleado.Certificados.some((cert) => cert.Verificacion === null))
          .map((empleado) => (
            <div
              key={empleado.ID_Empleado}
              className="card"
              onClick={() => setSelectedEmpleado(empleado)}
              style={{ cursor: "pointer" }}
            >
              <h2 className="card-title">{empleado.Nombre}</h2>
              <p className="card-role">Rol: {empleado.Rol}</p>
              <p className="card-certificates">
                Certificados: 📜 {empleado.Certificados.filter((cert) => cert.Verificacion === null).length}
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
            <div className="popup-scroll">
              <table className="popup-table">
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Documento</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEmpleado.Certificados
                  .filter((cert => cert.Verificacion === null))
                  .map((cert) => (
                    <>
                      <tr key={cert.ID_Certificado}>
                        <td><strong>{cert.Nombre}</strong></td>
                        <td>
                          <button
                            className="document-button"
                            onClick={() => window.open(cert.Documento, '_blank')}
                          >
                            Ver Documento
                          </button>
                        </td>
                        <td>
                          <button
                            className="edit-button"
                            onClick={() => handleCertificadoExpand(cert)}
                          >
                            {expandedCertificado === cert.ID_Certificado ? "Cerrar" : "Editar"}
                          </button>
                        </td>
                      </tr>
                      {expandedCertificado === cert.ID_Certificado && (
                        <tr className="dropdown-row">
                          <td colSpan={3}>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateCertificado(cert.ID_Certificado);
                              }}
                            >
                              <div className="form-group">
                                <label htmlFor={`descripcion-${cert.ID_Certificado}`}>Descripción:</label>
                                <textarea
                                  id={`descripcion-${cert.ID_Certificado}`}
                                  value={descripcion}
                                  onChange={(e) => setDescripcion(e.target.value)}
                                  className="form-input"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor={`verificacion-${cert.ID_Certificado}`}>Verificación:</label>
                                <input
                                  id={`verificacion-${cert.ID_Certificado}`}
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
                                onClick={() => setExpandedCertificado(null)}
                              >
                                Cancelar
                              </button>
                            </form>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="popup-close-button" onClick={closePopup}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}