"use client";

import '@/app/employee/people-lead/validarCursos/validarCursos.css';

import { useEffect, useState } from "react";
import { getEmpleados } from "@/lib/empleadoService";
import { updateCertificado } from "@/lib/empleadoUpdate";
import { Certificate } from 'crypto';
import { supabase } from "@/lib/supabase";
import React from 'react';

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
  const [denyVerification, setDenyVerification] = useState<boolean>(false);
  const [idpeoplelead, setIdPeoplelead] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("option1"); // Default sort option

  useEffect(() => {
      const fetchCapabilityLead = async () => {
        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData?.session;
        if (!session || !session.user) {
          console.error("No session found, user not authenticated");
          return null;
        }
        const { data, error } = await supabase
          .from("People_lead")
          .select("ID")
          .eq("ID_Empleado", session.user.id)
          .single();
        if (error) {
          console.error("Error fetching Capability Lead:", error);
          return null;
        }
        if (data) {
          setIdPeoplelead(data.ID);
          return data.ID;
        }
        return null;
      };
      fetchCapabilityLead();
    }, []);

  // Este useEffect depende de idpeoplelead
  useEffect(() => {
    if (!idpeoplelead) return; // Solo ejecuta si ya tienes el id
    const fetchEmpleados = async () => {
      try {
        const data: Empleado[] = await getEmpleados(idpeoplelead);
        setEmpleados(data);
      } catch (err) {
        console.error("Error fetching empleados:", err);
        setError("No se pudieron cargar los empleados.");
      }
    };
    fetchEmpleados();
  }, [idpeoplelead]);


  const sortedEmpleados = [...empleados].sort((a, b) => {
    if (sortOption === "option1") {
      return a.Nombre.localeCompare(b.Nombre); // Ordenar por nombre
    } else if (sortOption === "option2") {
      return (
        b.Certificados.filter((cert) => cert.Verificacion === null).length -
        a.Certificados.filter((cert) => cert.Verificacion === null).length
      ); // Ordenar por número de certificados pendientes
    } else if (sortOption === "option3") {
      return a.Rol.localeCompare(b.Rol); // Ordenar por rol
    }
    return 0;
  });

  const dropdown = document.querySelector('.dropdown');
  const dropdownContent = document.querySelector('.dropdown-content') as HTMLElement | null;
  if (dropdown && dropdownContent) {
    dropdown.addEventListener('mouseover', () => {
      if (dropdownContent) dropdownContent.style.display = 'block';
    });
    dropdown.addEventListener('mouseleave', () => {
      if (dropdownContent) dropdownContent.style.display = 'none';
    });
  }

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

  const handleDenyVerification = async (certId: string) => {
    try {
      await updateCertificado(certId, false, "Verificación negada");
      alert("La verificación ha sido negada correctamente.");
      setExpandedCertificado(null);
      window.location.reload();
    } catch (error) {
      console.error("Error al negar la verificación:", error);
      alert("Hubo un error al negar la verificación.");
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

        {/* Menú desplegable para ordenar */}
        <div className="select-box">
        <select className='manejar-dropdown'
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)} 
        >
          <option value="option1">Nombre</option>
          <option value="option2">Número de Certificados</option>
          <option value="option3">Rol</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid-container">
        {empleados.length === 0 ||
        empleados.filter(
          (empleado) =>
            empleado.Certificados.length > 0 &&
            empleado.Certificados.some((cert) => cert.Verificacion === null)
        ).length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full py-16">
            <div className="flex flex-col items-center justify-center w-full">
              
              <span className="text-lg font-semibold text-gray-500 mb-1 text-center">
                No hay certificados por validar
              </span>
              <span className="text-sm text-gray-400 text-center">
                Todos los certificados han sido revisados o aún no hay registros.
              </span>
            </div>
          </div>
        ) : (
          empleados
            .filter(
              (empleado) =>
                empleado.Certificados.length > 0 &&
                empleado.Certificados.some((cert) => cert.Verificacion === null)
            )
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
                  Certificados: 📜{" "}
                  {empleado.Certificados.filter((cert) => cert.Verificacion === null).length}
                </p>
              </div>
            ))
        )}
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
                      <React.Fragment key={cert.ID_Certificado}>
                        <tr>
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
                              onClick={() => {
                                setExpandedCertificado(null);
                                setDenyVerification(false);
                                handleCertificadoExpand(cert);

                              }}
                            >
                              {expandedCertificado === cert.ID_Certificado ? "Cerrar" : "Editar"}
                            </button>
                          </td>
                        </tr>
                        {expandedCertificado === cert.ID_Certificado && (
                          <tr className="dropdown-row">
                            <td colSpan={3}>
                              {!denyVerification ? (
                                <div className="button-group">
                                  <button
                                    className="negar-boton"
                                    onClick={() => {
                                      setDenyVerification(true);
                                      setVerificacion(false); // Establece el valor de verificacion en false
                                    }}
                                  >
                                    Negar Certificado
                                  </button>
                                  <button
                                    className="continuar-boton"
                                    onClick={() => {
                                      setDenyVerification(true);
                                      setVerificacion(true); // Establece el valor de verificacion en true
                                    }}
                                  >
                                    Validar Certificado
                                  </button>
                                </div>
                              ) : (
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    handleUpdateCertificado(cert.ID_Certificado);
                                  }}
                                >
                                  <div className="form-group">
                                    <label htmlFor={`descripcion-${cert.ID_Certificado}`}>Retroalimentación:</label>
                                    <textarea
                                      id={`descripcion-${cert.ID_Certificado}`}
                                      value={descripcion}
                                      onChange={(e) => setDescripcion(e.target.value)}
                                      className="form-input"
                                    />
                                  </div>
                                  <button type="submit" className="save-button">
                                    Guardar
                                  </button>
                                  <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => {
                                      setExpandedCertificado(null);
                                      setDenyVerification(false);
                                    }}
                                  >
                                    Cancelar
                                  </button>
                                </form>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
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
