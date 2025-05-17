"use client";
import { useState, useEffect } from "react";
import MetaCards from "@/components/Metas/MetaCards";
import Meta from "@/lib/metas-empleados/metasDefinitions";
import { fetchSession, fetchMetas, fetchMetasAsRevisor } from "@/lib/metas-empleados/apiCallsMetas";
import AddMetaModal from '@/components/Metas/AddMetaModal';
import { EmployeeFullData } from "@/lib/employeeService";
import { getEmployeeFullData } from '@/lib/employeeService';
import DeleteMetaModal from "@/components/Metas/DeleteMetaModal";
import RevisorMetaCards from "@/components/Metas/RevisorMetaCards";

export default function ObjetivosPage() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);


  const [metaToEdit, setMetaToEdit] = useState<Meta | null>(null);
  const [mostrarDelete, setMostrarDelete] = useState(false);
  const [metaToDelete, setMetaToDelete] = useState<Meta | null>(null);


  const [loading, setLoading] = useState(true);
  const [metas, setMetas] = useState<Meta[]>([]);
  const [metasRevisor, setMetasRevisor] = useState<Meta[]>([]);
  const [employee, setEmployee] = useState<EmployeeFullData>();
  const [metasFiltradas, setMetasFiltradas] = useState<{
    capability: Meta[];
    proyecto: Meta[];
    colaborador: Meta[];
    certificacion: Meta[];
    otro: Meta[];
  }>({
    capability: [],
    proyecto: [],
    colaborador: [],
    certificacion: [],
    otro: []
  });

  const handleDeleteMeta = (meta: Meta) => {
    setMetaToDelete(meta);
    setMostrarDelete(true);
  }

  const handleEditMeta = (meta: Meta) => {
    setMetaToEdit(meta);
    setMostrarFormulario(true);
  };

  const handleSuccess = async () => {
    const session = await fetchSession(setLoading);
    if (session) {
      const metasActualizadas = await fetchMetas(session.user.id, setLoading);
      if (metasActualizadas) {
        setMetas(metasActualizadas);
        categorizarMetas(metasActualizadas);
      }
    }
  };
  
  const handleSuccessRevision = async () => {
    const session = await fetchSession(setLoading);
    if (session) {
      const metasRevisorActualizadas = await fetchMetasAsRevisor(session.user.id, setLoading);

      if(metasRevisorActualizadas) {
        setMetasRevisor(metasRevisorActualizadas);
      }

    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const session = await fetchSession(setLoading);

        if (session) {
          const metasData = await fetchMetas(session.user.id, setLoading);
          if (metasData) {
            setMetas(metasData);
            categorizarMetas(metasData);
          }
          const employeeData = await getEmployeeFullData(session.user.id);
          if (employeeData) {
            setEmployee(employeeData);
          }

          const metasRevisorData = await fetchMetasAsRevisor(session.user.id, setLoading);
          if (metasRevisorData) {
            setMetasRevisor(metasRevisorData);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const categorizarMetas = (metas: Meta[]) => {
    const categorias = {
      capability: metas.filter(meta => meta.Tipo_Meta.toLowerCase().includes('capability')),
      proyecto: metas.filter(meta => meta.Tipo_Meta.toLowerCase().includes('proyecto')),
      colaborador: metas.filter(meta => meta.Tipo_Meta.toLowerCase().includes('colaborador/empleado')),
      certificacion: metas.filter(meta => meta.Tipo_Meta.toLowerCase().includes('curso/certificacion')),
      otro: metas.filter(meta => meta.Tipo_Meta.toLowerCase().includes('otro')),
    };
    setMetasFiltradas(categorias);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando metas...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-gray-800 text-2xl font-bold mb-2">Objetivos</h1>
        <p className="text-gray-600">Aquí puedes gestionar tus objetivos.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sección principal de metas */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setMostrarFormulario(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Agregar Meta
            </button>
          </div>

          {/* Categorías de Metas */}
          <div className="bg-purple-500 rounded-lg shadow-md p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {/* Capability */}
              <div className="bg-white rounded-lg shadow p-3">
                <h2 className="text-sm font-semibold text-gray-800 mb-2 text-center">Capability</h2>
                <div className="overflow-y-auto max-h-64">
                  <MetaCards 
                    metas={metasFiltradas.capability}
                    tituloTipo="Capability"
                    onEdit={handleEditMeta}
                    onDelete={handleDeleteMeta}
                  />
                </div>
              </div>

              {/* Proyectos */}
              <div className="bg-white rounded-lg shadow p-3">
                <h2 className="text-sm font-semibold text-gray-800 mb-2 text-center">Proyectos</h2>
                <div className="overflow-y-auto max-h-64">
                  <MetaCards 
                    metas={metasFiltradas.proyecto} 
                    tituloTipo="Proyectos"
                    onEdit={handleEditMeta}
                    onDelete={handleDeleteMeta}
                  />
                </div>
              </div>

              {/* Colaborador/Empleado */}
              <div className="bg-white rounded-lg shadow p-3">
                <h2 className="text-sm font-semibold text-gray-800 mb-2 text-center">Colaborador</h2>
                <div className="overflow-y-auto max-h-64">
                  <MetaCards 
                    metas={metasFiltradas.colaborador} 
                    tituloTipo="Colaborador/Empleado"
                    onEdit={handleEditMeta}
                    onDelete={handleDeleteMeta}
                  />
                </div>
              </div>

              {/* Cursos/Certificaciones */}
              <div className="bg-white rounded-lg shadow p-3">
                <h2 className="text-sm font-semibold text-gray-800 mb-2 text-center">Certificaciones</h2>
                <div className="overflow-y-auto max-h-64">
                  <MetaCards 
                    metas={metasFiltradas.certificacion} 
                    tituloTipo="Cursos/Certificaciones"
                    onEdit={handleEditMeta}
                    onDelete={handleDeleteMeta}
                  />
                </div>
              </div>

              {/* Otros */}
              <div className="bg-white rounded-lg shadow p-3">
                <h2 className="text-sm font-semibold text-gray-800 mb-2 text-center">Otros</h2>
                <div className="overflow-y-auto max-h-64">
                  <MetaCards 
                    metas={metasFiltradas.otro} 
                    tituloTipo="Otros"
                    onEdit={handleEditMeta}
                    onDelete={handleDeleteMeta}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sección de tarjetas horizontales */}
          <div className="bg-blue-50 rounded-lg shadow-md p-4">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Historial de metas</h2>
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-2 min-w-max">
                {Array.from({ length: 20 }).map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-64 p-4 bg-white rounded-lg shadow">
                    <h3 className="font-medium">Card {index + 1}</h3>
                    <p className="text-sm text-gray-600">Información adicional</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sección lateral - Metas como Revisor */}
        <div className="w-full lg:w-1/4 bg-purple-200 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Metas como Revisor</h2>
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            <RevisorMetaCards
              metas={metasRevisor}
              onMetaRevisor={handleSuccessRevision}
              employeeID={employee?.ID_Empleado ?? ""}
            />
          </div>
        </div>
      </div>

      {/* Modales */}
      {mostrarFormulario && (
        <AddMetaModal
          isOpen={mostrarFormulario}
          employeeID={employee?.ID_Empleado ?? ""}
          onClose={() => {
            setMostrarFormulario(false);
            setMetaToEdit(null);
          }}
          onMetaAdded={handleSuccess}
          metaToEdit={metaToEdit}
        />
      )}

      {mostrarDelete && (
        <DeleteMetaModal
          isOpen={mostrarDelete}
          onClose={() => {setMostrarDelete(false); setMetaToDelete(null);}}
          employeeID={employee?.ID_Empleado ?? ""}
          onMetaDeleted={handleSuccess}
          metaToDelete={metaToDelete}
        />
      )}
    </div>
  );
}