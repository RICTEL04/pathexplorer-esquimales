import { useState } from 'react';
import { Meta } from "@/lib/metas-empleados/metasDefinitions";
import { insertMeta, updateMetaRevision } from '@/lib/metas-empleados/apiCallsMetas';

export default function RevisorMetaCard({ meta, onMetaRevisor, employeeID }: { 
  meta: Meta; 
  onMetaRevisor?: () => void;
  employeeID?: string;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [retroalimentacion, setRetroalimentacion] = useState("");
  const [mostrarFormRetroalimentacion, setMostrarFormRetroalimentacion] = useState(false);
  const [retroalimentacionError, setRetroalimentacionError] = useState("");
  const thisRevisor = meta.Revisores.find(revisor => revisor.ID_EmpleadoRevisor === employeeID);
  
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
      case 'En progreso': return 'bg-blue-100 text-blue-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Atrasada': return 'bg-red-100 text-red-800';
      case 'Cancelada': return 'bg-gray-100 text-gray-800';
      case null: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleDetails = (e: React.MouseEvent) => {
    // Evita que el clic en el botón active el modal
    if ((e.target as HTMLElement).closest('button')) return;
    setShowDetails(!showDetails);
  };

  const handleSubmitRetroalimentacion = async () => {
    // Validar que la retroalimentación no esté vacía
    if (!retroalimentacion.trim()) {
      setRetroalimentacionError("La retroalimentación es obligatoria");
      return;
    }
      try {
        // Guardar cambios en la base de datos
        await updateMetaRevision(meta, "Completada", employeeID, retroalimentacion);
        
        // Cerrar formularios
        setMostrarFormRetroalimentacion(false);
        setShowDetails(false);
        
        // Actualizar lista de metas
        if (onMetaRevisor) onMetaRevisor();
      } catch (error) {
        console.error("Error al guardar retroalimentación:", error);
        setRetroalimentacionError("Error al guardar la retroalimentación. Inténtalo de nuevo.");
      }
    
  };

  return (
    <>
      {/* Tarjeta principal rediseñada con mejor responsividad */}
      <div
        onClick={toggleDetails}
        className="w-full bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer p-3 sm:p-4 relative"
      >
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h3 className="text-base font-semibold text-gray-800 line-clamp-1 pr-2">
              {meta.Nombre ?? 'Sin nombre'}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${getEstadoStyles(meta.Estado)}`}>
              {meta.Estado}
            </span>
          </div>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-1 text-sm">
            <div className="flex flex-col xs:flex-row xs:items-center">
              <span className="font-medium text-gray-700 mr-1">Empleado:</span>
              <span className="text-gray-600 line-clamp-1">{meta.NombreEmpleado}</span>
            </div>
            <div className="flex flex-col xs:flex-row xs:items-center">
              <span className="font-medium text-gray-700 mr-1">Tipo:</span>
              <span className="text-gray-600">{meta.Tipo_Meta}</span>
            </div>
            <div className="flex flex-col xs:flex-row xs:items-center">
              <span className="font-medium text-gray-700 mr-1">Plazo:</span>
              <span className="text-gray-600">{meta.Plazo}</span>
            </div>
            <div className="flex flex-col xs:flex-row xs:items-center">
              <span className="font-medium text-gray-700 mr-1">Límite:</span>
              <span className="text-gray-600">{formatDate(meta.Fecha_limite)}</span>
            </div>
          </div>
          
          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mt-1 gap-2">
            <span className={`text-xs ${meta.Registrada ? 'text-green-600' : 'text-red-600'}`}>
              {meta.Registrada ? '✅ Registrada' : '❌ Sin registrar'}
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(true);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800"
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>

      {/* Modal de detalles con acciones específicas para el revisor */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">{meta.Nombre}</h2>
                  <p className="text-sm text-indigo-600">Meta de: {meta.NombreEmpleado}</p>
                </div>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 self-end sm:self-start"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className={`text-sm px-3 py-1 rounded-full ${getEstadoStyles(meta.Estado ?? "sin estado")}`}>
                  {meta.Estado}
                </span>
                <span className={`text-sm px-3 py-1 rounded-full ${meta.Registrada ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {meta.Registrada ? 'Registrada' : 'Sin registrar'}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">Descripción completa:</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-line break-words">{meta.Descripcion}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Tipo:</h3>
                    <p className="text-gray-600 mt-1">{meta.Tipo_Meta}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Plazo:</h3>
                    <p className="text-gray-600 mt-1">{meta.Plazo}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Fecha de inicio:</h3>
                    <p className="text-gray-600 mt-1">{formatDate(meta.Fecha_Inicio ?? null)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Fecha límite:</h3>
                    <p className="text-gray-600 mt-1">{formatDate(meta.Fecha_limite ?? null)}</p>
                  </div>
                </div>

                {meta.Self_Reflection && (
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-700">Auto-reflexión del empleado:</h3>
                    <p className="text-gray-600 mt-1 italic whitespace-pre-line break-words">"{meta.Self_Reflection}"</p>
                  </div>
                )}

                {/* Sección para mostrar retroalimentaciones existentes */}
                {meta.Revisores.some(r => r.Retroalimentacion) && (
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-700">Retroalimentaciones anteriores:</h3>
                    <div className="mt-2 space-y-2">
                      {meta.Revisores
                        .filter(r => r.Retroalimentacion)
                        .map((revisor, idx) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm font-medium text-gray-700">{revisor.Nombre}:</p>
                            <p className="mt-1 text-gray-600 whitespace-pre-line break-words">{revisor.Retroalimentacion}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition w-full sm:w-auto"
                >
                  Cerrar
                </button>
                
                {!meta.Registrada && onMetaRevisor && (
                  <button
                    onClick={() => {
                      const updatedMeta = JSON.parse(JSON.stringify(meta)) as Meta;
                      updatedMeta.Registrada = true;
                      updatedMeta.Estado = "En progreso";
                      insertMeta(updatedMeta)
                        .then(() => {
                          setShowDetails(false);
                          if (onMetaRevisor) onMetaRevisor();
                        })
                        .catch(error => console.error("Error al registrar meta:", error));
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition w-full sm:w-auto"
                  >
                    Registrar Meta
                  </button>
                )}
                
                {meta.Registrada && onMetaRevisor && (
                  <button
                    onClick={() => {
                      setMostrarFormRetroalimentacion(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full sm:w-auto"
                  >
                  {(!thisRevisor?.Retroalimentacion && (meta.Estado == "Completada" || meta.Estado == "Cancelada")) ? 'Agregar Retroalimentación' : 'Marcar como Completada'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ingresar retroalimentación */}
      {mostrarFormRetroalimentacion && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-words pr-6">Retroalimentación para: {meta.Nombre}</h2>
                <button 
                  onClick={() => setMostrarFormRetroalimentacion(false)}
                  className="text-gray-500 hover:text-gray-700 flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <label 
                  htmlFor="retroalimentacion" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Retroalimentación (requerida):
                </label>
                <textarea
                  id="retroalimentacion"
                  value={retroalimentacion}
                  onChange={(e) => {
                    setRetroalimentacion(e.target.value);
                    if (e.target.value.trim()) setRetroalimentacionError("");
                  }}
                  placeholder="Ingresa tu retroalimentación sobre esta meta..."
                  className={`w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 ${
                    retroalimentacionError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                />
                {retroalimentacionError && (
                  <p className="mt-1 text-sm text-red-600">{retroalimentacionError}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                <button
                  onClick={() => setMostrarFormRetroalimentacion(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition w-full sm:w-auto order-2 sm:order-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitRetroalimentacion}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full sm:w-auto order-1 sm:order-2"
                >
                  Guardar y Completar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}