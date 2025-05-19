"use client";
import { useState, useEffect } from "react";
import MetaCards from "@/components/Metas/MetaCards";
import Meta from "@/lib/metas-empleados/metasDefinitions";
import { fetchSession, fetchMetas, fetchMetasAsRevisor } from "@/lib/metas-empleados/apiCallsMetas";
import AddMetaModal from '@/components/Metas/AddMetaModal';
import DeleteMetaModal from "@/components/Metas/DeleteMetaModal";
import RevisorMetaCards from "@/components/Metas/RevisorMetaCards";
import FilteredMetaCards from "@/components/Metas/FilteredMetaCards";

export default function ObjetivosPage() {
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [metaToEdit, setMetaToEdit] = useState<Meta | null>(null);

  const [session, setSession] = useState<any>(null);

  const [mostrarDelete, setMostrarDelete] = useState<boolean>(false);
  const [metaToDelete, setMetaToDelete] = useState<Meta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [metas, setMetas] = useState<Meta[]>([]);
  const [metasRevisor, setMetasRevisor] = useState<Meta[]>([]);


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

  const handleDeleteMeta = (meta: Meta): void => {
    setMetaToDelete(meta);
    setMostrarDelete(true);
  }

  const handleEditMeta = (meta: Meta): void => {
    setMetaToEdit(meta);
    setMostrarFormulario(true);
  };

  const handleSuccess = async (): Promise<void> => {
    if (!session) return;
    
    try {
      const session2 = await fetchSession(setLoading);
      setSession(session2);
      
      if (session2?.user?.id) {
        const metasActualizadas = await fetchMetas(session2.user.id, setLoading);
        if (metasActualizadas) {
          setMetas(metasActualizadas);
          categorizarMetas(metasActualizadas);
        }
      }
    } catch (error) {
      console.error("Error updating metas:", error);
    }
  };
  
  const handleSuccessRevision = async (): Promise<void> => {
    if (!session) return;
    
    try {
      const session2 = await fetchSession(setLoading);
      setSession(session2);
      
      if (session2?.user?.id) {
        const metasRevisorActualizadas = await fetchMetasAsRevisor(session2.user.id, setLoading);
        if(metasRevisorActualizadas) {
          setMetasRevisor(metasRevisorActualizadas);
        }
      }
    } catch (error) {
      console.error("Error updating reviewer metas:", error);
    }
  };

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        setLoading(true);
        const session2 = await fetchSession(setLoading);
        setSession(session2);
        
        if (session2?.user?.id) {
          const metasData = await fetchMetas(session2.user.id, setLoading);
          if (metasData) {
            setMetas(metasData);
            categorizarMetas(metasData);
          }

          const metasRevisorData = await fetchMetasAsRevisor(session2.user.id, setLoading);
          if (metasRevisorData) {
            setMetasRevisor(metasRevisorData);
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const categorizarMetas = (metas: Meta[]): void => {
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

  // If no session after loading is complete, show login message
  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <p className="text-red-500 font-bold">No se ha podido cargar la sesión de usuario</p>
        <p className="mt-2">Por favor, intente recargar la página o iniciar sesión nuevamente.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-gray-800 text-2xl font-bold mb-2">Objetivos</h1>
        <p className="text-gray-600">Aquí puedes gestionar tus objetivos.</p>
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setMostrarFormulario(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Agregar Meta
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sección principal de metas */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">

          {/* Categorías de Metas */}
          <div className="bg-purple-400 rounded-lg shadow-md p-4">
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

          {/* Sección de filtros de metas - Reemplaza al historial de metas */}
          <FilteredMetaCards 
            metas={metas}
            onEdit={handleEditMeta}
            onDelete={handleDeleteMeta}
          />
        </div>

        {/* Sección lateral - Metas como Revisor */}
        <div className="w-full lg:w-1/4 bg-purple-400 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Metas como Revisor</h2>
          <div className="overflow-y-auto max-h-[calc(120vh)]">
            <RevisorMetaCards
              metas={metasRevisor}
              onMetaRevisor={handleSuccessRevision}
              employeeID={session.user.id}
            />
          </div>
        </div>
      </div>

      {/* Modales */}
      {mostrarFormulario && session && (
        <AddMetaModal
          isOpen={mostrarFormulario}
          employeeID={session.user.id}
          onClose={() => {
            setMostrarFormulario(false);
            setMetaToEdit(null);
          }}
          onMetaAdded={handleSuccess}
          metaToEdit={metaToEdit}
        />
      )}

      {mostrarDelete && session && (
        <DeleteMetaModal
          isOpen={mostrarDelete}
          onClose={() => {setMostrarDelete(false); setMetaToDelete(null);}}
          employeeID={session.user.id}
          onMetaDeleted={handleSuccess}
          metaToDelete={metaToDelete}
        />
      )}
    </div>
  );
}