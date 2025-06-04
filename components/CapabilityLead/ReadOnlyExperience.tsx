'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import React from 'react';
import { createPortal } from 'react-dom';

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  currentJob: boolean;
  skills: { id: string; name: string; level: "beginner" | "intermediate" | "expert" }[];
}

interface ReadOnlyExperienceProps {
  userId: string;
}

export default function ReadOnlyExperience({ userId }: ReadOnlyExperienceProps) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const experiencesPerPage = 3;
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);

        if (!userId) {
          setLoading(false);
          return;
        }

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

        const experiencesWithSkills = await Promise.all(
          historyData.map(async (exp) => {
            const { data: skillsData, error: skillsError } = await supabase
              .from('Historial_Habilidades')
              .select('ID_Habilidad, nivel')
              .eq('ID_Historial', exp.id);

            let skills: { id: string; name: string; level: "beginner" | "intermediate" | "expert" }[] = [];

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
                  const { data: habilidadData } = await supabase
                    .from('Habilidades')
                    .select('Nombre')
                    .eq('ID_Habilidad', skill.ID_Habilidad)
                    .single();

                  return {
                    id: skill.ID_Habilidad,
                    name: habilidadData?.Nombre || 'Habilidad desconocida',
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
  }, [userId]);

  // Pagination
  const indexOfLast = currentPage * experiencesPerPage;
  const indexOfFirst = indexOfLast - experiencesPerPage;
  const currentExperiences = experiences.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(experiences.length / experiencesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [experiences.length]);

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

  // Modal component
  const ExperienceModal = ({
    experience,
    onClose,
  }: {
    experience: Experience;
    onClose: () => void;
  }) => {
    // Prevent background scroll when modal is open
    useEffect(() => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }, []);

    // Render modal at the end of body using portal
    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Cerrar"
          >
            ×
          </button>
          <h3 className="text-xl font-bold mb-2">{experience.position}</h3>
          <p className="text-gray-700 mb-1">{experience.company}</p>
          <p className="text-gray-500 text-sm mb-2">
            {formatDateRange(experience.startDate, experience.endDate, experience.currentJob)}
          </p>
          {experience.skills && experience.skills.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Aptitudes:</p>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
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
          {experience.description && (
            <div className="mb-2">
              <p className="text-gray-600 text-sm">{experience.description}</p>
            </div>
          )}
        </div>
      </div>,
      typeof window !== 'undefined' ? document.body : (null as any)
    );
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow-md p-6 mb-6">Cargando experiencias...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Experiencia Laboral</h2>
      <div className="space-y-6">
        {experiences.length === 0 ? (
          <p className="text-gray-500">No hay experiencias registradas</p>
        ) : (
          currentExperiences.map((exp) => (
            <div
              key={exp.id}
              className="border-b border-gray-200 pb-6 last:border-0 group transition-colors p-4 rounded-lg cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setSelectedExperience(exp);
                setIsModalOpen(true);
              }}
              tabIndex={0}
              role="button"
              aria-label={`Ver detalles de ${exp.position} en ${exp.company}`}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedExperience(exp);
                  setIsModalOpen(true);
                }
              }}
            >
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
                {exp.description && (
                  <div className="mt-2">
                    <p className="text-gray-600 text-sm">{exp.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
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

      {/* Modal */}
      {isModalOpen && selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}