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
  ordenamiento: 'fecha_inicio_r' | 'fecha_inicio_a' | 'fecha_limite_r'| 'fecha_limite_a';
  searchText: string; 
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
    ordenamiento: 'fecha_inicio_r', // Cambiado a 'fecha_inicio' para mayor claridad
    searchText: '' // Inicializado como string vacío
  });
  const [activeFilterSection, setActiveFilterSection] = useState<string | null>('tipos');

  // Extraer valores únicos para los filtros
  const tiposUnicos = [...new Set(metas.map(meta => meta.Tipo_Meta))];
  const plazosUnicos = [...new Set(metas.map(meta => meta.Plazo))];
  const estadosUnicos = [...new Set(metas.map(meta => meta.Estado))];

  // Función para aplicar los filtros
  useEffect(() => {
    let metasFiltradas = [...metas];
    
    // Filtrar por texto de búsqueda
    if (filters.searchText.trim() !== '') {
      const searchTerm = filters.searchText.toLowerCase().trim();
      metasFiltradas = metasFiltradas.filter(meta => 
        (meta.Nombre?.toLowerCase().includes(searchTerm))
      );
    }
    
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
      if (filters.ordenamiento === 'fecha_inicio_r') {
        return new Date(b.Fecha_Inicio || 0).getTime() - new Date(a.Fecha_Inicio || 0).getTime();
      } else if (filters.ordenamiento === 'fecha_inicio_a') {
        return new Date(a.Fecha_Inicio || 0).getTime() - new Date(b.Fecha_Inicio || 0).getTime();
      } else if (filters.ordenamiento === 'fecha_limite_r') {
        return new Date(b.Fecha_limite || 0).getTime() - new Date(a.Fecha_limite || 0).getTime();
      }else if (filters.ordenamiento === 'fecha_limite_a') {
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
      } else if (tipo === 'searchText') {
        // Para el texto de búsqueda, actualizar el valor
        return { ...prevFilters, searchText: valor };
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

  // Manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilters(prevFilters => ({
      ...prevFilters,
      searchText: e.target.value
    }));
  };

  // Cambiar el ordenamiento
  const cambiarOrdenamiento = (orden: 'fecha_inicio_r' | 'fecha_inicio_a' | 'fecha_limite_r' | 'fecha_limite_a'): void => {
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
      ordenamiento: 'fecha_inicio_r',
      searchText: ''
    });
    setActiveFilterSection(null);
  };

  // Contar filtros activos por sección
  const contarFiltrosActivos = (seccion: string) => {
    switch(seccion) {
      case 'tipos':
        return filters.tipos.length;
      case 'plazos':
        return filters.plazos.length;
      case 'estados':
        return filters.estados.length;
      case 'registrada':
        return filters.registrada !== null ? 1 : 0;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filtros de Metas</h2>
        <button 
          onClick={resetearFiltros}
          className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition"
        >
          Resetear Filtros
        </button>
      </div>
      
      {/* Barra de búsqueda de texto */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={filters.searchText}
            onChange={handleSearchChange}
            placeholder="Buscar por texto..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {filters.searchText && (
            <button 
              onClick={() => setFilters(prev => ({ ...prev, searchText: '' }))}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      {/* Barra de filtros horizontal */}
      <div className="mb-6">
        {/* Selector de tipo de filtro */}
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() => setActiveFilterSection(activeFilterSection === 'tipos' ? null : 'tipos')}
            className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center
              ${activeFilterSection === 'tipos' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
            }
          >
            Tipo
            {contarFiltrosActivos('tipos') > 0 && (
              <span className="ml-1 bg-white text-purple-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {contarFiltrosActivos('tipos')}
              </span>
            )}
          </button>
          
          {/* 
          <button
            onClick={() => setActiveFilterSection(activeFilterSection === 'plazos' ? null : 'plazos')}
            className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center
              ${activeFilterSection === 'plazos' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
            }
          >
            Plazo
            {contarFiltrosActivos('plazos') > 0 && (
              <span className="ml-1 bg-white text-purple-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {contarFiltrosActivos('plazos')}
              </span>
            )}
          </button> 
          */}

          
          <button
            onClick={() => setActiveFilterSection(activeFilterSection === 'estados' ? null : 'estados')}
            className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center
              ${activeFilterSection === 'estados' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
            }
          >
            Estado
            {contarFiltrosActivos('estados') > 0 && (
              <span className="ml-1 bg-white text-purple-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {contarFiltrosActivos('estados')}
              </span>
            )}
          </button>
          {/* 
          
          <button
            onClick={() => setActiveFilterSection(activeFilterSection === 'registrada' ? null : 'registrada')}
            className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center
              ${activeFilterSection === 'registrada' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
            }
          >
            Registrada
            {contarFiltrosActivos('registrada') > 0 && (
              <span className="ml-1 bg-white text-purple-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {contarFiltrosActivos('registrada')}
              </span>
            )}
          </button>
          
          */}

          
          <div className="border-l border-gray-300 ml-1 mr-1"></div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Ordenar:</span>
            <button
              onClick={() => cambiarOrdenamiento('fecha_inicio_r')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.ordenamiento === 'fecha_inicio_r'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fecha Inicio Reciente
            </button>
            <button
              onClick={() => cambiarOrdenamiento('fecha_inicio_a')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.ordenamiento === 'fecha_inicio_a'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fecha Inicio Antigua
            </button>
            <button
              onClick={() => cambiarOrdenamiento('fecha_limite_r')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.ordenamiento === 'fecha_limite_r'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fecha Limite Reciente
            </button>

                        <button
              onClick={() => cambiarOrdenamiento('fecha_limite_a')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filters.ordenamiento === 'fecha_limite_a'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fecha Limite Antigua
            </button>

          </div>
        </div>
        
        {/* Opciones de filtro según selección */}
        {activeFilterSection && (
          <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200 mb-3">
            {activeFilterSection === 'tipos' && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Tipo de Meta:</h3>
                <div className="flex flex-wrap gap-2">
                  {tiposUnicos.map((tipo, index) => (
                    <button
                      key={index}
                      onClick={() => toggleFilter('tipos', tipo)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        filters.tipos.includes(tipo)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {tipo}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {activeFilterSection === 'plazos' && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Plazo:</h3>
                <div className="flex flex-wrap gap-2">
                  {plazosUnicos.map((plazo, index) => (
                    <button
                      key={index}
                      onClick={() => toggleFilter('plazos', plazo)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        filters.plazos.includes(plazo)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {plazo}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {activeFilterSection === 'estados' && (
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
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {estado}
                      </button>
                    )
                  ))}
                </div>
              </div>
            )}
            
            {activeFilterSection === 'registrada' && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Registrada:</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFilter('registrada', true)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      filters.registrada === true
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => toggleFilter('registrada', false)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      filters.registrada === false
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Resultados filtrados */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-700">Resultados: {filteredMetas.length} metas</h3>
        </div>
        <div className="w-full overflow-y-auto max-h-96">   
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
    </div>
  );
}