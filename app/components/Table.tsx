import React from 'react';

type TableProps<T> = {
  columns: { key: keyof T; label: string; width?: string }[];
  data: T[];
  maxRowsBeforeScroll?: number;
};

const CardTable = <T,>({ 
  columns, 
  data, 
  maxRowsBeforeScroll = 3
}: TableProps<T>) => {
  const shouldScrollVertically = data.length > maxRowsBeforeScroll;
  const rowHeight = 72;
  const maxHeight = shouldScrollVertically 
    ? `${maxRowsBeforeScroll * rowHeight + 48}px`
    : 'auto';

  // Definimos anchos fijos para las columnas
  const gridTemplateColumns = columns.map(col => 
    col.width || '150px' // Ancho fijo por defecto
  ).join(' ');

  return (
    <div className="space-y-2 w-full">
      {/* Contenedor principal con scroll horizontal */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        {/* Contenedor con ancho fijo basado en columnas */}
        <div style={{ width: 'fit-content', minWidth: '100%' }}>
          {/* Encabezados */}
          <div 
            className="hidden md:grid px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-t-lg"
            style={{
              gridTemplateColumns,
              gap: '1rem'
            }}
          >
            {columns.map((col) => (
              <div 
                key={col.key as string}
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate"
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Filas */}
          <div 
            className={`space-y-2 ${shouldScrollVertically ? 'overflow-y-auto' : ''}`}
            style={{ maxHeight }}
          >
            {data.map((item, rowIndex) => (
              <div
                key={rowIndex}
                className="grid p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                style={{
                  gridTemplateColumns,
                  gap: '1rem'
                }}
              >
                {columns.map((col) => (
                  <div 
                    key={col.key as string}
                    className="min-w-0" // Crucial para el truncado
                  >
                    {/* Label para móvil */}
                    <div className="md:hidden text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 truncate">
                      {col.label}
                    </div>
                    {/* Contenido */}
                    <div 
                      className="text-sm text-gray-800 dark:text-gray-200 truncate w-full"
                      title={String(item[col.key])}
                    >
                      {String(item[col.key])}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTable;