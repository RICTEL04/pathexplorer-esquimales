import React, { useState } from 'react';

type TableProps<T> = {
  columns: {
    key: keyof T;
    label: string;
    width?: string;
    render?: (value: any, row: T) => React.ReactNode;
    align?: 'left' | 'center' | 'right';
  }[];
  data: T[];
  rowsPerPage?: number;
  showPaginationControls?: boolean;
  emptyState?: React.ReactNode;
  onRowClick?: (row: T) => void;
  className?: string;
};

const CardTable = <T,>({ 
  columns, 
  data, 
  rowsPerPage = 3,
  showPaginationControls = true,
  emptyState,
  onRowClick,
  className = ''
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calcular datos paginados
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  // Definimos anchos para las columnas
  const gridTemplateColumns = columns.map(col => 
    col.width || 'minmax(150px, 1fr)'
  ).join(' ');

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

  // Render para contenido vacío
  if (data.length === 0) {
    return emptyState ? (
      <div className={`text-center py-8 ${className}`}>
        {emptyState}
      </div>
    ) : (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        No hay datos disponibles
      </div>
    );
  }

  return (
    <div className={`space-y-4 w-full ${className}`}>
      {/* Contenedor principal con scroll horizontal */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* Contenedor con ancho fijo basado en columnas */}
        <div style={{ width: 'fit-content', minWidth: '100%' }}>
          {/* Encabezados */}
          <div 
            className="hidden md:grid px-4 py-3 bg-gray-50 rounded-t-lg border-b border-gray-200"
            style={{
              gridTemplateColumns,
              gap: '1rem'
            }}
          >
            {columns.map((col) => (
              <div 
                key={col.key as string}
                className={`text-sm font-semibold text-gray-700 truncate ${
                  col.align === 'center' ? 'text-center' : 
                  col.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Filas */}
          <div className="space-y-2">
            {paginatedData.map((item, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all ${
                  onRowClick ? 'cursor-pointer hover:border-purple-300' : ''
                }`}
                style={{
                  gridTemplateColumns,
                  gap: '1rem'
                }}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((col) => (
                  <div 
                    key={col.key as string}
                    className={`min-w-0 ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}`}
                  >
                    {/* Label para móvil */}
                    <div className="md:hidden text-xs font-medium text-gray-500 mb-1 truncate">
                      {col.label}
                    </div>
                    {/* Contenido */}
                    <div 
                      className="text-sm text-gray-800 truncate w-full"
                      title={col.render ? undefined : String(item[col.key])}
                    >
                      {col.render ? col.render(item[col.key], item) : String(item[col.key])}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Paginación */}
      {showPaginationControls && data.length > rowsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-2 gap-4">
          <div className="text-sm text-gray-600">
            Mostrando <span className="font-medium">{startIndex + 1}</span>-<span className="font-medium">{Math.min(endIndex, data.length)}</span> de <span className="font-medium">{data.length}</span>
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
              {/* Botón primera página */}
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

              {/* Páginas cercanas */}
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

              {/* Botón última página */}
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

export default CardTable;