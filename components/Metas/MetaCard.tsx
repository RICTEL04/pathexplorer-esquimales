import { useState } from 'react';
import {Meta, Revisor_Meta}from "@/lib/metas-empleados/metasDefinitions";

export default function MetaCard({ meta, onEdit, onDelete }: { meta: Meta; onEdit?: (meta: Meta) => void, onDelete?: (meta: Meta) => void }) {
  const [showDetails, setShowDetails] = useState(false);
  const showDelete = meta.Estado != "Completada" && meta.Estado != "Cancelada";
  const showEdit = meta.Self_Reflection == null;

  const formatDate = (date: Date | null) => {
    if (!date) return 'Fecha no disponible';
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getEstadoStyles = (estado: string | null) => {
    switch(estado) {
      case 'Completada': return 'bg-green-100 text-green-800';
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Atrasada': return 'bg-red-100 text-red-800';
      case 'Cancelada': return 'bg-red-100 text-gray-800';
      case null: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleDetails = (e: React.MouseEvent) => {
    // Evita que el clic en el botón de edición active el modal
    if ((e.target as HTMLElement).closest('button')) return;
    setShowDetails(!showDetails);
  };

  return (
    <>
      {/* Tarjeta principal (clickeable) - Ahora más compacta */}
      <div 
        onClick={toggleDetails}
        className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer h-48"
      >
        <div className="p-3 h-full flex flex-col">
          <div className="flex justify-between items-start gap-1">

            <div className="flex items-center gap-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${getEstadoStyles(meta.Estado ?? "sin estado")} whitespace-nowrap`}>
                {meta.Estado}
              </span>
              {onEdit && (showEdit) && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(meta);
                  }}
                  className="p-1 text-gray-500 hover:text-purple-500 transition-colors"
                  aria-label="Editar meta"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}

              {onDelete && (showDelete) && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(meta);
                  }}
                  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="Editar meta"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 011-1h4a1 1 0 011 1m-7 0h8" />
                  </svg>
                </button>
              )}

            </div>
          </div>
                    
          <div className="mt-2 grid grid-cols-1 gap-1 text-xs">
            <h3 className="text-base font-semibold text-gray-800 truncate flex-1">
            {meta.Nombre ?? 'Sin nombre'}
            </h3>
            <div className="truncate">
              <span className="font-medium text-gray-700">Tipo:</span>
              <span className="ml-1 text-gray-600 truncate">{meta.Tipo_Meta}</span>
            </div>

            {/* 
             <div className="truncate">
              <span className="font-medium text-gray-700">Plazo:</span>
              <span className="ml-1 text-gray-600 truncate">{meta.Plazo}</span>
            </div>
            */}

            <div className="truncate">
              <span className="font-medium text-gray-700">Límite:</span>
              <span className="ml-1 text-gray-600 truncate">{formatDate(meta.Fecha_limite ?? null)}</span>
            </div>
          </div>

          {meta.Self_Reflection && (
            <div className="mt-1 pt-1 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-medium text-gray-700">Auto-reflexión:</h4>
              </div>
              <p className="text-xs text-gray-600 mt-1 italic line-clamp-2">
                "{meta.Self_Reflection}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles - Sin cambios */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{meta.Nombre}</h2>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <span className={`text-sm px-3 py-1 rounded-full ${getEstadoStyles(meta.Estado ?? "sin estado")}`}>
                  {meta.Estado}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">Descripción completa:</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-line">{meta.Descripcion}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Tipo:</h3>
                    <p className="text-gray-600 mt-1">{meta.Tipo_Meta}</p>
                  </div>
                  {/* 
                  <div>
                    <h3 className="font-medium text-gray-700">Plazo:</h3>
                    <p className="text-gray-600 mt-1">{meta.Plazo}</p>
                  </div>
                  */}
                  <div>
                    <h3 className="font-medium text-gray-700">Fecha de inicio:</h3>
                    <p className="text-gray-600 mt-1">{formatDate(meta.Fecha_Inicio ?? null)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Fecha límite:</h3>
                    <p className="text-gray-600 mt-1">{formatDate(meta.Fecha_limite ?? null)}</p>
                  </div>
                  {/* 
                  <div>
                    <h3 className="font-medium text-gray-700">Registrada:</h3>
                    <p className="text-gray-600 mt-1">
                      {meta.Registrada ? '✅ Sí' : '❌ No'}
                    </p>
                  </div>
                  */}

                </div>

                {/* Sección de Revisores mejorada */}
                {meta.Revisores && meta.Revisores.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-700">Revisores:</h3>
                    <ul className="mt-2 space-y-4">
                      {meta.Revisores.map((revisor, index) => (
                        <li key={index} className="text-gray-600">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                            <span className="font-medium min-w-[120px]">{revisor.Nombre}:</span>
                            {revisor.Retroalimentacion ? (
                              <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                                <p className="whitespace-pre-wrap break-words">
                                  {revisor.Retroalimentacion}
                                </p>
                              </div>
                            ) : (
                              <span className="text-gray-400 italic">Sin retroalimentación</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}


                {meta.Self_Reflection && (
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-700">Auto-reflexión:</h3>
                    <p className="text-gray-600 mt-1 italic whitespace-pre-line">"{meta.Self_Reflection}"</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                >
                  Cerrar
                </button>
                {onEdit && showEdit && (
                  <button
                    onClick={() => {
                      setShowDetails(false);
                      onEdit(meta);
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                  >
                    Editar Meta
                  </button>
                )}

                {onDelete && showDelete && (
                  <button
                    onClick={() => {
                      setShowDetails(false);
                      onDelete(meta);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Borrar Meta
                  </button>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}