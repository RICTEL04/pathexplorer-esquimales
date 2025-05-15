"use client";
import MetaCards from "@/components/Metas/MetaCards";
import Meta from "@/lib/metas-empleados/metasDefinitions";
import { useState, useEffect } from "react";
import { fetchSession, fetchMetas, updateMeta, insertMeta } from "@/lib/metas-empleados/apiCallsMetas";
import AddMetaModal from '@/components/Metas/AddMetaModal';
import { EmployeeFullData } from "@/lib/employeeService";
import { getEmployeeFullData } from '@/lib/employeeService';

export default function ObjetivosPage() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loading, setLoading] = useState(true);
  const [metas, setMetas] = useState<Meta[]>([]);
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

  const handleSuccess = async () => {
    // Recargar las metas después de crear una nueva
    const session = await fetchSession(setLoading);
    if (session) {
      const metasActualizadas = await fetchMetas(session.user.id, setLoading);
      if (metasActualizadas) {
        setMetas(metasActualizadas);
        categorizarMetas(metasActualizadas);
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
      proyecto: metas.filter(meta => meta.Tipo_Meta.toLowerCase().includes('proyecto') ),
      colaborador: metas.filter(meta => meta.Tipo_Meta.toLowerCase().includes('colaborador/empleado') ),
      certificacion: metas.filter(meta => meta.Tipo_Meta.toLowerCase().includes('curso/certificacion') ),
      otro: metas.filter(meta => meta.Tipo_Meta.toLowerCase().includes('otro') ),
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
    <div className="flex flex-col h-screen max-h-screen overflow-hidden p-4 gap-4">
      <h1 className="text-gray-800 text-2xl font-bold mb-4">Objetivos</h1>
      <p className="text-gray-600">Aquí puedes gestionar tus objetivos.</p>

      <button 
        onClick={() => setMostrarFormulario(true)}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Agregar Meta
      </button>

      {/* Sección superior (Categorías de Metas) */}
      <div className="flex-[3] bg-yellow-200 rounded-lg shadow-md overflow-y-auto p-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Capability */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center  ">Capability</h2>
            <MetaCards 
              metas={metasFiltradas.capability}
              tituloTipo="Capability"
            />
          </div>

          {/* Proyectos */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Proyectos</h2>
            <MetaCards 
              metas={metasFiltradas.proyecto} 
              tituloTipo="Proyectos"
            />
          </div>

          {/* Colaborador/Empleado */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Colaborador/Empleado</h2>
            <MetaCards 
              metas={metasFiltradas.colaborador} 
              tituloTipo="Colaborador/Empleado"
            />
          </div>

          {/* Cursos/Certificaciones */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Cursos/Certificaciones</h2>
            <MetaCards 
              metas={metasFiltradas.certificacion} 
              tituloTipo="Cursos/Certificaciones"
            />
          </div>

          {/* Otros */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center ">Otros</h2>
            <MetaCards 
              metas={metasFiltradas.otro} 
              tituloTipo="Otros"
            />
          </div>
        </div>


        
      </div>

      {/* Sección inferior (azul) */}
      <div className="flex-[2] bg-blue-200 rounded-lg shadow-md overflow-x-auto">
        <div className="flex space-x-4 p-4 min-w-max">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-64 h-full p-4 bg-blue-100 rounded-lg">
              Card {index + 1}
            </div>
          ))}
        </div>
      </div>

      {mostrarFormulario && (
        <AddMetaModal
          isOpen={mostrarFormulario}
          employeeID={employee?.ID_Empleado ?? ""}
          onClose={() => setMostrarFormulario(false)}
          onMetaAdded={handleSuccess}
        />
      )}


    </div>

  );
}