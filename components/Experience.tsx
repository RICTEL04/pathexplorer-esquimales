'use client';
import { useState, useEffect } from 'react';
import { useExperienceModal } from '@/context/ModalContext';
import { supabase } from '@/lib/supabase';
import { Experience } from '@/context/ModalContext';

interface ExperienceSectionProps {
  userId: string;
}

export default function ExperienceSection({ userId }: ExperienceSectionProps) {
  const { openModal, isOpen } = useExperienceModal();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const experiencesPerPage = 3;
  const [refreshFlag, setRefreshFlag] = useState(0);

  // Llama a fetchExperiences cada vez que refreshFlag cambie
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);

        if (!userId) {
          setLoading(false);
          return;
        }

        // 2. Obtener historial laboral
        const { data: historyData, error: historyError } = await supabase
          .from('Historial')
          .select('*')
          .eq('ID_Empleado', userId)
          .order('Fecha_inicio', { ascending: false });

        if (historyError) throw historyError;
        if (!historyData || historyData.length === 0) {
          setExperiences([]);
          setLoading(false);
          return;
        }

        // 3. Obtener habilidades para cada experiencia
        const experiencesWithSkills = await Promise.all(
          historyData.map(async (exp) => {
            // Obtener habilidades asociadas
            const { data: skillsData, error: skillsError } = await supabase
              .from('Historial_Habilidades')
              .select('ID_Habilidad, nivel')
              .eq('ID_Historial', exp.id);

            if (skillsError) throw skillsError;

            // Obtener detalles de cada habilidad
            let skills: { id: string; name: string; level: "beginner" | "intermediate" | "expert" }[] = [];

            // Helper to map string to allowed level
            const mapLevel = (nivel: string): "beginner" | "intermediate" | "expert" => {
              switch (nivel) {
                case "beginner":
                case "intermediate":
                case "expert":
                  return nivel;
                default:
                  return "beginner";
              }
            };

            if (skillsData && skillsData.length > 0) {
              skills = await Promise.all(
                skillsData.map(async (skill) => {
                  const { data: habilidadData, error: habilidadError } = await supabase
                    .from('Habilidades')
                    .select('Nombre')
                    .eq('ID_Habilidad', skill.ID_Habilidad)
                    .single();

                  if (habilidadError || !habilidadData) {
                    console.warn(`Habilidad ${skill.ID_Habilidad} no encontrada`);
                    return {
                      id: skill.ID_Habilidad,
                      name: 'Habilidad desconocida',
                      level: mapLevel(skill.nivel)
                    };
                  }

                  return {
                    id: skill.ID_Habilidad,
                    name: habilidadData.Nombre,
                    level: mapLevel(skill.nivel)
                  };
                })
              );
            }

            return {
              id: exp.id,
              position: exp.NombrePosition,
              company: exp.NombreEmpresa,
              startDate: exp.Fecha_inicio,
              endDate: exp.Fecha_final,
              description: exp.Descripcion,
              currentJob: !!exp.Currentjob,
              skills: skills
            };
          })
        );

        setExperiences(experiencesWithSkills);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [refreshFlag, userId]);

  // Cuando el modal se cierra, incrementa refreshFlag para recargar datos
  useEffect(() => {
    if (!isOpen) {
      setRefreshFlag((f) => f + 1);
    }
  }, [isOpen]);

  // Calcular experiencias a mostrar
  const indexOfLast = currentPage * experiencesPerPage;
  const indexOfFirst = indexOfLast - experiencesPerPage;
  const currentExperiences = experiences.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(experiences.length / experiencesPerPage);

  // Si cambian las experiencias, volver a la primera página
  useEffect(() => {
    setCurrentPage(1);
  }, [experiences.length]);

  const removeExperience = async (id: string) => {
    try {
      // 1. Eliminar las habilidades asociadas primero
      const { error: skillsError } = await supabase
        .from('Historial_Habilidades')
        .delete()
        .eq('ID_Historial', id);
      
      if (skillsError) throw skillsError;
      
      // 2. Eliminar la experiencia
      const { error } = await supabase
        .from('Historial')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // 3. Actualizar el estado local
      setExperiences(experiences.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error('Error deleting experience:', error);
      alert('No se pudo eliminar la experiencia');
    }
  };

  const formatDateRange = (start: string, end: string | null, current: boolean) => {
    try {
      const startDate = new Date(start);
      const endDate = end ? new Date(end) : null;

      const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
      const startStr = startDate.toLocaleDateString('es-MX', options);
      const endStr = current ? 'actualidad' : endDate?.toLocaleDateString('es-MX', options) || '';

      const diffInMonths = current
        ? (new Date().getFullYear() - startDate.getFullYear()) * 12 +
          (new Date().getMonth() - startDate.getMonth())
        : endDate
        ? (endDate.getFullYear() - startDate.getFullYear()) * 12 +
          (endDate.getMonth() - startDate.getMonth())
        : 0;

      const years = Math.floor(diffInMonths / 12);
      const months = diffInMonths % 12;

      let durationStr = '';
      if (years > 0) durationStr += `${years} ${years === 1 ? 'año' : 'años'}`;
      if (months > 0)
        durationStr += `${years > 0 ? ' ' : ''}${months} ${months === 1 ? 'mes' : 'meses'}`;

      return `${startStr} - ${endStr} · ${durationStr}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Fecha no disponible';
    }
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-md p-6 mb-6">Cargando experiencias...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Experiencia Laboral</h2>
        <button
          onClick={() => openModal('create')}
          className="text-purple-600 hover:text-blue-800 font-medium"
        >
          + Añadir experiencia
        </button>
      </div>

      <div className="space-y-6">
        {experiences.length === 0 ? (
          <p className="text-gray-500">No hay experiencias registradas</p>
        ) : (
          currentExperiences.map((exp) => (
            <div 
              key={exp.id} 
              className="border-b border-gray-200 pb-6 last:border-0 group cursor-pointer hover:bg-gray-50 transition-colors p-4 rounded-lg"
              onClick={() => openModal('view', exp)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {formatDateRange(exp.startDate, exp.endDate, exp.currentJob)}
                  </p>
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500 mb-1">Aptitudes:</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill.id}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm"
                          >
                            {skill.name} ({skill.level})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            ←
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}