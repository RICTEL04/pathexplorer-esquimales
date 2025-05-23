// components/EditExperienceModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { useExperienceModal } from '@/context/ModalContext';
import { FiX, FiCheck, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useSkillRefresh } from "@/context/SkillRefreshContext";

interface Habilidad {
  ID_Habilidad: string;
  Nombre: string;
  ID_Categoria: string;
}

interface Categoria {
  id: string;
  Nombre_categoria: string;
}

export default function EditExperienceModal() {
  const {
    isOpen,
    mode,
    experienceData,
    closeModal,
    resetModal,
    setExperienceData,
  } = useExperienceModal();

  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [habilidades, setHabilidades] = useState<Habilidad[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{
    categorias: Categoria[];
    habilidades: Habilidad[];
  }>({ categorias: [], habilidades: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  const { refreshSkills } = useSkillRefresh();

  // Cargar datos iniciales
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserId(session?.user.id ?? null);
    };

    getSession();
    
    const fetchData = async () => {
      setIsLoadingSkills(true);
      try {
        // Obtener categorías
        const { data: categoriasData, error: categoriasError } = await supabase
          .from('Categorias_habilidades')
          .select('*');
        
        if (categoriasError) throw categoriasError;
        setCategorias(categoriasData || []);

        // Obtener habilidades
        const { data: habilidadesData, error: habilidadesError } = await supabase
          .from('Habilidades')
          .select('*');
        
        if (habilidadesError) throw habilidadesError;
        setHabilidades(habilidadesData || []);
      } catch (error) {
        console.error('Error al cargar habilidades:', error);
      } finally {
        setIsLoadingSkills(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

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

  const handleAddSkill = (skill: string) => {
    if (skill.trim() && !experienceData.skills.some(s => s.name === skill.trim())) {
      const habilidad = habilidades.find(h => h.Nombre === skill.trim());
      if (!habilidad) return;

      setExperienceData(prev => ({
        ...prev,
        skills: [
          ...prev.skills,
          {
            id: habilidad.ID_Habilidad,
            name: habilidad.Nombre,
            level: 'beginner' as const
          }
        ]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setExperienceData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.name !== skillToRemove)
    }));
  };

  const updateSkillLevel = (skillName: string, newLevel: 'beginner' | 'intermediate' | 'expert') => {
    setExperienceData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.name === skillName ? { ...skill, level: newLevel } : skill
      )
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExperienceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setExperienceData(prev => ({
      ...prev,
      [name]: checked,
      ...(name === 'currentJob' && checked ? { endDate: null } : {})
    }));
  };

  const handleDeleteExperience = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta experiencia?')) {
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      // 1. Eliminar las habilidades asociadas
      const { error: skillsError } = await supabase
        .from('Historial_Habilidades')
        .delete()
        .eq('ID_Historial', experienceData.id);
      
      if (skillsError) throw skillsError;
      
      // 2. Eliminar la experiencia
      const { error } = await supabase
        .from('Historial')
        .delete()
        .eq('id', experienceData.id);
      
      if (error) throw error;
      
      // 3. Cerrar el modal y refrescar
      closeModal();
      resetModal();
      router.refresh();
      refreshSkills();
    } catch (err) {
      console.error('Error al eliminar la experiencia:', err);
      setError('No se pudo eliminar la experiencia. Por favor intenta nuevamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateExperience = async () => {
    if (!experienceData.position || !experienceData.company || !experienceData.startDate) {
      setError('Por favor completa los campos obligatorios (*)');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      // 1. Actualizar la experiencia en la tabla Historial
      const { error: updateError } = await supabase
        .from('Historial')
        .update({
          NombrePosition: experienceData.position,
          NombreEmpresa: experienceData.company,
          Fecha_inicio: experienceData.startDate,
          Fecha_final: experienceData.currentJob ? null : experienceData.endDate,
          Currentjob: experienceData.currentJob,
          Descripcion: experienceData.description,
        })
        .eq('id', experienceData.id);

      if (updateError) throw updateError;

      // 2. Eliminar todas las habilidades asociadas existentes
      const { error: deleteSkillsError } = await supabase
        .from('Historial_Habilidades')
        .delete()
        .eq('ID_Historial', experienceData.id);
      
      if (deleteSkillsError) throw deleteSkillsError;

      // 3. Agregar las nuevas habilidades
      if (experienceData.skills.length > 0) {
        const habilidadesInsert = experienceData.skills.map(skill => ({
          ID_Historial: experienceData.id,
          ID_Habilidad: skill.id,
          nivel: skill.level
        }));

        const { error: insertSkillsError } = await supabase
          .from('Historial_Habilidades')
          .insert(habilidadesInsert);

        if (insertSkillsError) throw insertSkillsError;
      }

      closeModal();
      resetModal();
      router.refresh();
      refreshSkills();
    } catch (err) {
      console.error('Error al actualizar la experiencia:', err);
      setError('Error al actualizar la experiencia. Por favor intenta nuevamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const SkillLevelIcon = ({ level }: { level: 'beginner' | 'intermediate' | 'expert' }) => {
    switch (level) {
      case 'beginner':
        return (
          <div className="flex items-center text-yellow-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        );
      case 'intermediate':
        return (
          <div className="flex items-center text-yellow-500">
            {[...Array(2)].map((_, i) => (
              <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        );
      case 'expert':
        return (
          <div className="flex items-center text-yellow-500">
            {[...Array(3)].map((_, i) => (
              <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // Ahora sí, después de los hooks:
  if (!isOpen || mode !== 'edit') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro */}
      <div 
        className="absolute inset-0 bg-gray-700/40 bg-opacity-50 transition-opacity"
        onClick={() => {
          closeModal();
          resetModal();
        }}
      ></div>
      
      {/* Contenido del modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all">
        {/* Encabezado */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h3 className="text-xl font-semibold text-gray-900">
            Editar experiencia
          </h3>
          <button
            onClick={() => {
              closeModal();
              resetModal();
            }}
            className="text-gray-400 hover:text-gray-500 rounded-full p-1 hover:bg-gray-100"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Cuerpo del modal */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Puesto */}
            <div className="sm:col-span-2">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Rol *
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={experienceData.position}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nombre rol"
                required
              />
            </div>

            {/* Empresa */}
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Proyecto *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={experienceData.company}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nombre Proyecto"
                required
              />
            </div>

            {/* Fecha de inicio */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de inicio *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={experienceData.startDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Fecha de finalización */}
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de finalización
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={experienceData.endDate ?? ''}
                onChange={handleInputChange}
                disabled={experienceData.currentJob}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="currentJob"
                  name="currentJob"
                  checked={experienceData.currentJob}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="currentJob" className="ml-2 text-sm text-gray-700">
                  Trabajo actual
                </label>
              </div>
            </div>

            {/* Descripción */}
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={experienceData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Describe tus responsabilidades y logros"
              ></textarea>
            </div>

            {/* Aptitudes */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Habilidades y Herramientas
              </label>
              
              {/* Barra de búsqueda */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar categorías o habilidades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                  />
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

              {/* Resultados de búsqueda */}
              {isSearching && (
                <div className="mb-6 bg-white rounded-lg shadow p-4 border border-gray-200">
                  <h2 className="text-lg font-semibold mb-4">Resultados de búsqueda para "{searchTerm}"</h2>
                  
                  {searchResults.categorias.length === 0 && searchResults.habilidades.length === 0 ? (
                    <p className="text-gray-500">No se encontraron resultados</p>
                  ) : (
                    <>
                      {/* Categorías encontradas */}
                      {searchResults.categorias.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-md font-medium mb-2">Categorías ({searchResults.categorias.length})</h3>
                          <div className="space-y-3">
                            {searchResults.categorias.map(categoria => {
                              const habilidadesDeCategoria = habilidades.filter(h => h.ID_Categoria === categoria.id);
                              return (
                                <div key={categoria.id} className="border rounded-lg overflow-hidden">
                                  <div className="p-3 bg-gray-50 border-b">
                                    <h4 className="font-medium">{categoria.Nombre_categoria}</h4>
                                  </div>
                                  
                                  <div className="p-3">
                                    {habilidadesDeCategoria.length === 0 ? (
                                      <p className="text-gray-500 text-sm">No hay habilidades en esta categoría</p>
                                    ) : (
                                      <ul className="space-y-2">
                                        {habilidadesDeCategoria.map(habilidad => (
                                          <li 
                                            key={habilidad.ID_Habilidad} 
                                            className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                                            onClick={() => handleAddSkill(habilidad.Nombre)}
                                          >
                                            <span>{habilidad.Nombre}</span>
                                            {experienceData.skills.some(s => s.name === habilidad.Nombre) ? (
                                              <span className="text-xs text-green-600">✓ agregada</span>
                                            ) : (
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleAddSkill(habilidad.Nombre);
                                                }}
                                                className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                                              >
                                                Agregar
                                              </button>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {/* Habilidades encontradas */}
                      {searchResults.habilidades.length > 0 && (
                        <div>
                          <h3 className="text-md font-medium mb-2">
                            Habilidades y Herramientas ({searchResults.habilidades.length})
                          </h3>
                          <ul className="space-y-2">
                            {searchResults.habilidades.map(habilidad => (
                              <li 
                                key={habilidad.ID_Habilidad} 
                                className="p-2 hover:bg-gray-50 rounded flex justify-between items-center cursor-pointer"
                                onClick={() => handleAddSkill(habilidad.Nombre)}
                              >
                                <div>
                                  <span>{habilidad.Nombre}</span>
                                  <span className="text-xs text-gray-500 ml-2">
                                    ({categorias.find(c => c.id === habilidad.ID_Categoria)?.Nombre_categoria})
                                  </span>
                                </div>
                                {experienceData.skills.some(s => s.name === habilidad.Nombre) ? (
                                  <span className="text-xs text-green-600">✓ agregada</span>
                                ) : (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddSkill(habilidad.Nombre);
                                    }}
                                    className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                                  >
                                    Agregar
                                  </button>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Habilidades seleccionadas */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Habilidades seleccionadas:</h4>
                {experienceData.skills.length > 0 ? (
                  <div className="space-y-2">
                    {experienceData.skills.map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-800">{skill.name}</span>
                        
                        <div className="flex items-center space-x-2">
                          <SkillLevelIcon level={skill.level} />
                          
                          <select
                            value={skill.level}
                            onChange={(e) => updateSkillLevel(
                              skill.name, 
                              e.target.value as 'beginner' | 'intermediate' | 'expert'
                            )}
                            className="text-xs border border-gray-300 rounded p-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="beginner">Principiante</option>
                            <option value="intermediate">Intermedio</option>
                            <option value="expert">Experto</option>
                          </select>
                          
                          <button
                            onClick={() => removeSkill(skill.name)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No has seleccionado ninguna habilidad</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pie del modal */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={handleDeleteExperience}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center disabled:bg-red-400"
          >
            {isDeleting ? (
              'Eliminando...'
            ) : (
              <>
                <FiTrash2 className="mr-2" />
                Eliminar
              </>
            )}
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => {
                closeModal();
                resetModal();
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleUpdateExperience}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center disabled:bg-blue-400"
            >
              {isSaving ? (
                'Guardando...'
              ) : (
                <>
                  <FiCheck className="mr-2" />
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}