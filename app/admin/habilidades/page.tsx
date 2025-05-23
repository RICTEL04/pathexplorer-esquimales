"use client"
import { useState, useEffect } from 'react';
import {supabase}  from '@/lib/supabase';


type Habilidad = {
  ID_Habilidad: string;
  Nombre: string;
  ID_Categoria: string;
};

type Categoria = {
  id: string;
  Nombre_categoria: string;
};

export default function SkillsManager() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [habilidades, setHabilidades] = useState<Habilidad[]>([]);
  const [nuevaCategoriaNombre, setNuevaCategoriaNombre] = useState('');
  
  // Estados para los modales
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddHabilidadModal, setShowAddHabilidadModal] = useState(false);
  const [showAddCategoriaModal, setShowAddCategoriaModal] = useState(false);
  const [currentCategoriaId, setCurrentCategoriaId] = useState('');
  const [nuevaHabilidadNombre, setNuevaHabilidadNombre] = useState('');
  
  const [itemToDelete, setItemToDelete] = useState<{
    type: 'categoria' | 'habilidad';
    id: string;
    name: string;
  } | null>(null);

   // Estados para la búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{
    categorias: Categoria[];
    habilidades: Habilidad[];
  }>({ categorias: [], habilidades: [] });
  const [isSearching, setIsSearching] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    fetchCategorias();
    fetchHabilidades();
  }, []);

  // Efecto para manejar la búsqueda
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const term = searchTerm.toLowerCase().trim();

    const filteredCategorias = categorias.filter(cat =>
      cat.Nombre_categoria.toLowerCase().includes(term)
    );

    const filteredHabilidades = habilidades.filter(h =>
      h.Nombre.toLowerCase().includes(term)
    );

    // Obtener todas las habilidades de las categorías encontradas
    const habilidadesDeCategoriasEncontradas = habilidades.filter(h =>
      filteredCategorias.some(c => c.id === h.ID_Categoria)
    );

    const todasHabilidadesUnicas = [...new Map(
      [...filteredHabilidades, ...habilidadesDeCategoriasEncontradas]
        .map(h => [h.ID_Habilidad, h])
    ).values()];

    setSearchResults({
      categorias: filteredCategorias,
      habilidades: todasHabilidadesUnicas
    });
  }, [searchTerm, categorias, habilidades]);

  const fetchCategorias = async () => {
    const { data, error } = await supabase
      .from('Categorias_habilidades')
      .select('*');
    
    if (!error && data) {
      setCategorias(data);
    }
  };

  const fetchHabilidades = async () => {
    const { data, error } = await supabase
      .from('Habilidades')
      .select('*');
    
    if (!error && data) {
      setHabilidades(data);
    }
  };

  const agregarCategoria = async () => {
    if (nuevaCategoriaNombre.trim() === '') return;
    
    const nuevaCategoria = {
      Nombre_categoria: nuevaCategoriaNombre.trim(),
    };
    
    const { data, error } = await supabase
      .from('Categorias_habilidades')
      .insert(nuevaCategoria)
      .select();
    
    if (!error && data) {
      setCategorias([...categorias, data[0]]);
      setNuevaCategoriaNombre('');
      setShowAddCategoriaModal(false);
    }
  };

  const abrirAgregarHabilidadModal = (categoriaId: string) => {
    setCurrentCategoriaId(categoriaId);
    setShowAddHabilidadModal(true);
    setNuevaHabilidadNombre('');
  };

  const agregarHabilidad = async () => {
    if (nuevaHabilidadNombre.trim() === '') return;
    
    const nuevaHabilidad = {
      Nombre: nuevaHabilidadNombre.trim(),
      ID_Categoria: currentCategoriaId,
    };
    
    const { data, error } = await supabase
      .from('Habilidades')
      .insert(nuevaHabilidad)
      .select();
    
    if (!error && data) {
      setHabilidades([...habilidades, data[0]]);
      setShowAddHabilidadModal(false);
    }
  };

  const confirmarEliminacion = (type: 'categoria' | 'habilidad', id: string, name: string) => {
    setItemToDelete({ type, id, name });
    setShowConfirmModal(true);
  };

  const eliminarCategoria = async (id: string) => {
  try {
    // 1. Obtener todas las habilidades de esta categoría (solo necesitamos los IDs)
    const { data: habilidadesData, error: errorHabilidades } = await supabase
      .from('Habilidades')
      .select('ID_Habilidad')
      .eq('ID_Categoria', id);

    if (errorHabilidades) throw errorHabilidades;

    const habilidadesIds = habilidadesData?.map(h => h.ID_Habilidad) || [];

    // 2. Eliminar referencias en Historial_Habilidades
    if (habilidadesIds.length > 0) {
      const { error: errorHistorial } = await supabase
        .from('Historial_Habilidades')
        .delete()
        .in('ID_Habilidad', habilidadesIds);

      if (errorHistorial) throw errorHistorial;
    }

    // 3. Eliminar las habilidades de la categoría
    const { error: errorDeleteHabilidades } = await supabase
      .from('Habilidades')
      .delete()
      .eq('ID_Categoria', id);

    if (errorDeleteHabilidades) throw errorDeleteHabilidades;

    // 4. Finalmente eliminar la categoría
    const { error: errorDeleteCategoria } = await supabase
      .from('Categorias_habilidades')
      .delete()
      .eq('id', id);

    if (errorDeleteCategoria) throw errorDeleteCategoria;

    // Actualizar el estado local
    setCategorias(categorias.filter(cat => cat.id !== id));
    setHabilidades(habilidades.filter(h => h.ID_Categoria !== id));
    
    return true;
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    return false;
  }
};

  const eliminarHabilidad = async (id: string) => {
    const { error: errorRelacion } = await supabase
    .from('Historial_Habilidades')
    .delete()
    .eq('ID_Habilidad', id);

  if (errorRelacion) {
    console.error('Error al eliminar relaciones:', errorRelacion.message);
    return;
  }

    const { error } = await supabase
      .from('Habilidades')
      .delete()
      .eq('ID_Habilidad', id);
    
    if (!error) {
      setHabilidades(habilidades.filter(h => h.ID_Habilidad !== id));
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'categoria') {
      await eliminarCategoria(itemToDelete.id);
    } else {
      await eliminarHabilidad(itemToDelete.id);
    }

    setShowConfirmModal(false);
    setItemToDelete(null);
  };

  const cancelarEliminacion = () => {
    setShowConfirmModal(false);
    setItemToDelete(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Habilidades</h1>
        </div>
        <button
          onClick={() => setShowAddCategoriaModal(true)}
          className="bg-violet-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nueva Categoria
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar categorías o habilidades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
          />
          <svg
            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>
      {/* Resultados de búsqueda - MODIFICADO */}
      {isSearching && (
        <div className="mb-8 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Resultados de búsqueda para "{searchTerm}"</h2>
          
          {searchResults.categorias.length === 0 && searchResults.habilidades.length === 0 ? (
            <p className="text-gray-500">No se encontraron resultados</p>
          ) : (
            <>
              {/* Categorías encontradas */}
              {searchResults.categorias.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Categorías encontradas ({searchResults.categorias.length})</h3>
                  <div className="space-y-4">
                    {searchResults.categorias.map(categoria => {
                      const habilidadesDeCategoria = habilidades.filter(h => h.ID_Categoria === categoria.id);
                      return (
                        <div key={categoria.id} className="border rounded-lg overflow-hidden">
                          <div className="flex justify-between items-center p-3 bg-gray-50 border-b">
                            <h4 className="font-medium">{categoria.Nombre_categoria}</h4>
                            <button
                              onClick={() => confirmarEliminacion('categoria', categoria.id, categoria.Nombre_categoria)}
                              className="px-2 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                            >
                              Eliminar categoría
                            </button>
                          </div>
                          
                          <div className="p-3">
                            {habilidadesDeCategoria.length === 0 ? (
                              <p className="text-gray-500 text-sm">No hay habilidades en esta categoría</p>
                            ) : (
                              <>
                                <p className="text-sm text-gray-600 mb-2">Habilidades en esta categoría:</p>
                                <ul className="space-y-2">
                                  {habilidadesDeCategoria.map(habilidad => (
                                    <li key={habilidad.ID_Habilidad} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                                      <span>{habilidad.Nombre}</span>
                                      <button
                                        onClick={() => confirmarEliminacion('habilidad', habilidad.ID_Habilidad, habilidad.Nombre)}
                                        className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                      >
                                        Eliminar
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Habilidades encontradas (que no pertenecen a categorías encontradas) */}
              {searchResults.habilidades.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Habilidades encontradas ({searchResults.habilidades.length})
                  </h3>
                  <ul className="space-y-2">
                    {searchResults.habilidades.map(habilidad => {
                      // Solo mostrar habilidades cuyas categorías no aparecieron en los resultados
                      if (searchResults.categorias.some(c => c.id === habilidad.ID_Categoria)) {
                        return null;
                      }
                      return (
                        <li key={habilidad.ID_Habilidad} className="p-2 hover:bg-gray-50 rounded flex justify-between items-center">
                          <div>
                            <span>{habilidad.Nombre}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              ({categorias.find(c => c.id === habilidad.ID_Categoria)?.Nombre_categoria})
                            </span>
                          </div>
                          <button
                            onClick={() => confirmarEliminacion('habilidad', habilidad.ID_Habilidad, habilidad.Nombre)}
                            className="px-2 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                          >
                            Eliminar
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
      {/* Lista de categorías y habilidades (solo se muestra cuando no hay búsqueda) */}
      {!isSearching && (
        <div className="space-y-6">
          {categorias.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No hay categorías creadas aún</p>
          ) : (
            categorias.map(categoria => (
              <div key={categoria.id} className="border rounded-lg overflow-hidden">
                <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
                  <h3 className="text-lg font-medium">{categoria.Nombre_categoria}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => abrirAgregarHabilidadModal(categoria.id)}
                      className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    >
                      + Habilidad
                    </button>
                    <button
                      onClick={() => confirmarEliminacion('categoria', categoria.id, categoria.Nombre_categoria)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  {habilidades.filter(h => h.ID_Categoria === categoria.id).length === 0 ? (
                    <p className="text-gray-500">No hay habilidades en esta categoría</p>
                  ) : (
                    <ul className="space-y-2">
                      {habilidades
                        .filter(h => h.ID_Categoria === categoria.id)
                        .map(habilidad => (
                          <li key={habilidad.ID_Habilidad} className="flex justify-between items-center p-2 hover:bg-gray-50">
                            <span>{habilidad.Nombre}</span>
                            <button
                              onClick={() => confirmarEliminacion('habilidad', habilidad.ID_Habilidad, habilidad.Nombre)}
                              className="px-2 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                            >
                              Eliminar
                            </button>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal para agregar categorías */}
      {showAddCategoriaModal && (
        <div className="fixed inset-0 bg-gray-700/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Agregar Nueva Categoría</h3>
            <div className="mb-4">
              <input
                type="text"
                value={nuevaCategoriaNombre}
                onChange={(e) => setNuevaCategoriaNombre(e.target.value)}
                placeholder="Nombre de la categoría"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && agregarCategoria()}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddCategoriaModal(false);
                  setNuevaCategoriaNombre('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={agregarCategoria}
                disabled={!nuevaCategoriaNombre.trim()}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  nuevaCategoriaNombre.trim()
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar habilidades */}
      {showAddHabilidadModal && (
        <div className="fixed inset-0 bg-gray-700/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              Agregar habilidad a: {categorias.find(c => c.id === currentCategoriaId)?.Nombre_categoria}
            </h3>
            <div className="mb-4">
              <input
                type="text"
                value={nuevaHabilidadNombre}
                onChange={(e) => setNuevaHabilidadNombre(e.target.value)}
                placeholder="Nombre de la habilidad"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && agregarHabilidad()}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddHabilidadModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={agregarHabilidad}
                disabled={!nuevaHabilidadNombre.trim()}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  nuevaHabilidadNombre.trim()
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {showConfirmModal && itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirmar eliminación</h3>
            <p className="mb-6">
              ¿Estás seguro que deseas eliminar {itemToDelete.type === 'categoria' ? 'la categoría' : 'la habilidad'}{' '}
              <span className="font-bold">"{itemToDelete.name}"</span>?
              {itemToDelete.type === 'categoria' && (
                <span className="block mt-2 text-red-500">
                  ¡Esto también eliminará todas las habilidades asociadas a esta categoría!
                </span>
              )}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelarEliminacion}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}