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
  const shouldScroll = data.length > maxRowsBeforeScroll;
  const rowHeight = 72;
  const maxHeight = shouldScroll 
    ? `${maxRowsBeforeScroll * rowHeight + 48}px`
    : 'auto';

  // Calculamos las columnas para el grid
  const gridTemplateColumns = columns.map(col => col.width || '1fr').join(' ');

  return (
    <div className="space-y-2">
      {/* Encabezados de columna - Desktop */}
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

      {/* Contenedor con scroll */}
      <div 
        className={`space-y-2 ${shouldScroll ? 'overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800' : ''}`}
        style={{ maxHeight }}
      >
        {data.map((item, rowIndex) => (
          <div
            key={rowIndex}
            className="grid w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            style={{
              gridTemplateColumns,
              gap: '1rem'
            }}
          >
            {columns.map((col) => (
              <div 
                key={col.key as string}
                className="min-w-0" // Important for truncation
              >
                {/* Mostrar label en reducido */}
                <div className="md:hidden text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {col.label}
                </div>
                <div 
                  className="text-sm text-gray-800 dark:text-gray-200 truncate"
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
  );
};

export default CardTable;