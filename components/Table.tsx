import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Certificado } from '@/lib/employeeService';

interface CertificadoCardProps {
  certificados: {
    ID_Certificado: string;
    Nombre: string;
    Fecha_caducidad: string;
    Verificacion: string;
    Descripcion: string;
  }[];
  rowsPerPage?: number;
  showPaginationControls?: boolean;
  emptyState?: React.ReactNode;
  onCardClick?: (certificado: Certificado) => void;
  className?: string;
  cardClassName?: string;
  showFields?: {
    nombre?: boolean;
    fecha?: boolean;
    verificacion?: boolean;
    descripcion?: boolean;
  };
}

const CertificadoCard: React.FC<CertificadoCardProps> = ({
  certificados = [],
  rowsPerPage = 3,
  showPaginationControls = true,
  emptyState,
  onCardClick,
  className = '',
  cardClassName = 'bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md p-4',
  showFields = {
    nombre: true,
    fecha: true,
    verificacion: true,
    descripcion: true
  }
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate paginated data
  const totalPages = Math.ceil(certificados.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = certificados.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Empty state render
  if (certificados.length === 0) {
    return emptyState ? (
      <div className={`text-center py-8 ${className}`}>
        {emptyState}
      </div>
    ) : (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        No hay certificados disponibles
      </div>
    );
  }

  return (
    <div className={`space-y-4 w-full ${className}`}>
      {/* Carousel container */}
      <div className="relative">
        {/* Cards container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData.map((certificado) => (
            certificado && certificado.ID_Certificado && (
              <div
                key={certificado.ID_Certificado}
                className={`transition-all ${cardClassName} ${
                  onCardClick ? 'cursor-pointer hover:border-purple-300' : ''
                }`}
                onClick={() => onCardClick && onCardClick(certificado)}
              >
                {/* Card content */}
                <div className="space-y-3">
                  {/* Nombre */}
                  {showFields.nombre && certificado.Nombre && certificado.Nombre != undefined && (
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">Nombre</div>
                      <div className="text-sm font-semibold text-gray-800 break-words">
                        {certificado.Nombre}
                      </div>
                    </div>
                  )}

                  {/* Fecha de caducidad */}
                  {showFields.fecha && certificado.Fecha_caducidad && certificado.Fecha_caducidad != undefined && (
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">Fecha Límite</div>
                      <div className="text-sm text-gray-800 break-words">
                        {formatDate(certificado.Fecha_caducidad)}
                      </div>
                    </div>
                  )}

                  {/* Verificación */}
                  {showFields.verificacion && certificado.Verificacion != null && certificado.Verificacion != undefined && (
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">Verificado</div>
                      <div className="text-sm text-gray-800 break-words">
                        {(certificado.Verificacion.toString() === "true" ) ? "Si" : "No"}
                      </div>
                    </div>
                  )}

                  {/* Descripción */}
                  {showFields.descripcion && certificado.Descripcion && certificado.Descripcion != undefined && (
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">Descripción</div>
                      <div className="text-sm text-gray-600 break-words">
                        {certificado.Descripcion}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Navigation arrows */}
        {certificados.length > rowsPerPage && (
          <>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 rounded-full shadow-md bg-white text-gray-700 hover:bg-gray-100 transition-colors ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Previous page"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 rounded-full shadow-md bg-white text-gray-700 hover:bg-gray-100 transition-colors ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Next page"
            >
              <FiChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Pagination controls */}
      {showPaginationControls && certificados.length > rowsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-2 gap-4">
          <div className="text-sm text-gray-600">
            Mostrando <span className="font-medium">{startIndex + 1}</span>-<span className="font-medium">{Math.min(endIndex, certificados.length)}</span> de <span className="font-medium">{certificados.length}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label="Página anterior"
            >
              ←
            </button>
            
            <div className="flex items-center gap-1">
              {/* First page button */}
              {currentPage > 3 && totalPages > 5 && (
                <>
                  <button
                    onClick={() => goToPage(1)}
                    className="w-8 h-8 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    1
                  </button>
                  {currentPage > 4 && <span className="px-1">...</span>}
                </>
              )}

              {/* Nearby pages */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-8 h-8 rounded-md text-sm transition-colors ${
                      currentPage === pageNum 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-label={`Ir a página ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Last page button */}
              {currentPage < totalPages - 2 && totalPages > 5 && (
                <>
                  {currentPage < totalPages - 3 && <span className="px-1">...</span>}
                  <button
                    onClick={() => goToPage(totalPages)}
                    className="w-8 h-8 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label="Página siguiente"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificadoCard;