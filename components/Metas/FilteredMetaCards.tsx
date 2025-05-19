import { useState, useEffect } from 'react';
import MetaCard from './MetaCard';
import { Meta } from '@/lib/metas-empleados/metasDefinitions';

interface FilteredMetaCardsProps {
  metas: Meta[];
  onEdit?: (meta: Meta) => void;
  onDelete?: (meta: Meta) => void;
}

type FiltersType = {
  tipos: string[];
  plazos: string[];
  estados: string[];
  registrada: boolean | null;
  ordenamiento: 'reciente' | 'antigua' | 'limite';
};

export default function FilteredMetaCards({ 
  metas,
  onEdit,
  onDelete
}: FilteredMetaCardsProps) {
  const [filteredMetas, setFilteredMetas] = useState<Meta[]>([]);
  const [filters, setFilters] = useState<FiltersType>({
    tipos: [],
    plazos: [],
    estados: [],
    registrada: null,
    ordenamiento: 'reciente'
  });

  // Extraer valores únicos para los filtros
  const tiposUnicos = [...new Set(metas.map(meta => meta.Tipo_Meta))];
  const plazosUnicos = [...new Set(metas.map(meta => meta.Plazo))];
  const estadosUnicos = [...new Set(metas.map(meta => meta.Estado))];

  // Función para aplicar los filtros
  useEffect(() => {
    let metasFiltradas = [...metas];
    
    // Filtrar por tipo de meta
    if (filters.tipos.length > 0) {
      metasFiltradas = metasFiltradas.filter(meta => 
        filters.tipos.includes(meta.Tipo_Meta)
      );
    }
    
    // Filtrar por plazo
    if (filters.plazos.length > 0) {
      metasFiltradas = metasFiltradas.filter(meta => 
        filters.plazos.includes(meta.Plazo)
      );
    }
    
    // Filtrar por estado
    if (filters.estados.length > 0) {
      metasFiltradas = metasFiltradas.filter(meta => 
        filters.estados.includes(meta.Estado ?? '')
      );
    }
    
    // Filtrar por registrada
    if (filters.registrada !== null) {
      metasFiltradas = metasFiltradas.filter(meta => 
        meta.Registrada === filters.registrada
      );
    }
    
    // Ordenar las metas
    metasFiltradas.sort((a, b) => {
      if (filters.ordenamiento === 'reciente') {
        return new Date(b.Fecha_Inicio || 0).getTime() - new Date(a.Fecha_Inicio || 0).getTime();
      } else if (filters.ordenamiento === 'antigua') {
        return new Date(a.Fecha_Inicio || 0).getTime() - new Date(b.Fecha_Inicio || 0).getTime();
      } else if (filters.ordenamiento === 'limite') {
        return new Date(a.Fecha_limite || 0).getTime() - new Date(b.Fecha_limite || 0).getTime();
      }
      return 0;
    });
    
    setFilteredMetas(metasFiltradas);
  }, [metas, filters]);

  // Toggle para un filtro
  const toggleFilter = (tipo: keyof FiltersType, valor: any): void => {
    setFilters(prevFilters => {
      if (tipo === 'registrada') {
        // Para registrada, alternar entre true, false y null
        if (prevFilters.registrada === valor) {
          return { ...prevFilters, registrada: null };
        } else {
          return { ...prevFilters, registrada: valor };
        }
      } else if (tipo === 'ordenamiento') {
        // Para ordenamiento, simplemente actualizar el valor
        return { ...prevFilters, ordenamiento: valor };
      } else {
        // Para arrays (tipos, plazos, estados)
        const array = prevFilters[tipo as 'tipos' | 'plazos' | 'estados'];
        if (array.includes(valor)) {
          return { ...prevFilters, [tipo]: array.filter(item => item !== valor) };
        } else {
          return { ...prevFilters, [tipo]: [...array, valor] };
        }
      }
    });
  };

  // Cambiar el ordenamiento
  const cambiarOrdenamiento = (orden: 'reciente' | 'antigua' | 'limite'): void => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ordenamiento: orden
    }));
  };

  // Resetear todos los filtros
  const resetearFiltros = (): void => {
    setFilters({
      tipos: [],
      plazos: [],
      estados: [],
      registrada: null,
      ordenamiento: 'reciente'
    });
  };

  return (
    <div className="bg-blue-50 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filtros de Metas</h2>
        <button 
          onClick={resetearFiltros}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
        >
          Resetear Filtros
        </button>
      </div>
      
      {/* Barra de filtros */}
      <div className="flex flex-col space-y-4 mb-6">
        {/* Filtro por tipo */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tipo de Meta:</h3>
          <div className="flex flex-wrap gap-2">
            {tiposUnicos.map((tipo, index) => (
              <button
                key={index}
                onClick={() => toggleFilter('tipos', tipo)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filters.tipos.includes(tipo)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>
        
        {/* Filtro por plazo */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Plazo:</h3>
          <div className="flex flex-wrap gap-2">
            {plazosUnicos.map((plazo, index) => (
              <button
                key={index}
                onClick={() => toggleFilter('plazos', plazo)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filters.plazos.includes(plazo)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {plazo}
              </button>
            ))}
          </div>
        </div>
        
        {/* Filtro por estado */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Estado:</h3>
          <div className="flex flex-wrap gap-2">
            {estadosUnicos.map((estado, index) => (
              estado && (
                <button
                  key={index}
                  onClick={() => toggleFilter('estados', estado)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filters.estados.includes(estado)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {estado}
                </button>
              )
            ))}
          </div>
        </div>
        
        {/* Filtro por registrada */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Registrada:</h3>
          <div className="flex gap-2">
            <button
              onClick={() => toggleFilter('registrada', true)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.registrada === true
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sí
            </button>
            <button
              onClick={() => toggleFilter('registrada', false)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.registrada === false
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              No
            </button>
          </div>
        </div>
        
        {/* Ordenamiento */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Ordenar por:</h3>
          <div className="flex gap-2">
            <button
              onClick={() => cambiarOrdenamiento('reciente')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.ordenamiento === 'reciente'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Más reciente
            </button>
            <button
              onClick={() => cambiarOrdenamiento('antigua')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.ordenamiento === 'antigua'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Más antigua
            </button>
            <button
              onClick={() => cambiarOrdenamiento('limite')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.ordenamiento === 'limite'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fecha límite
            </button>
          </div>
        </div>
      </div>
      
      {/* Resultados filtrados */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-700">Resultados: {filteredMetas.length} metas</h3>
        </div>
        
        {filteredMetas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMetas.map((meta, index) => (
              <div key={index} className="h-48">
                <MetaCard
                  meta={meta}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No se encontraron metas con los filtros seleccionados
          </div>
        )}
      </div>
    </div>
  );
}