// components/ViewExperienceModal.tsx
'use client';

import { useExperienceModal, Experience } from '@/context/ModalContext';
import { FiX, FiEdit, FiTrash2 } from 'react-icons/fi';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ViewExperienceModal() {
  const { 
    isOpen, 
    mode, 
    experienceData, 
    closeModal, 
    openModal,
    resetModal
  } = useExperienceModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (!isOpen || mode !== 'view') return null;

  // Type guard para asegurarnos que tenemos un Experience completo
  const isCompleteExperience = (data: any): data is Experience => {
    return data.id !== undefined;
  };

  if (!isCompleteExperience(experienceData)) return null;

  const experience = experienceData;

  const handleEdit = () => {
    openModal('edit', experience);
  };

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta experiencia?')) {
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      // 1. Eliminar las habilidades asociadas primero
      const { error: skillsError } = await supabase
        .from('Historial_Habilidades')
        .delete()
        .eq('ID_Historial', experience.id);
      
      if (skillsError) throw skillsError;
      
      // 2. Eliminar la experiencia
      const { error } = await supabase
        .from('Historial')
        .delete()
        .eq('id', experience.id);
      
      if (error) throw error;
      
      // 3. Cerrar el modal y refrescar los datos
      closeModal();
      resetModal();
      router.refresh(); // Esto recargará la página para mostrar los cambios
    } catch (err) {
      console.error('Error al eliminar la experiencia:', err);
      setError('No se pudo eliminar la experiencia. Por favor intenta nuevamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {experience.position}
              </h2>
              <h3 className="text-xl text-gray-700 mt-1">
                {experience.company}
              </h3>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              {new Date(experience.startDate).toLocaleDateString()} -{' '}
              {experience.currentJob
                ? 'Presente'
                : experience.endDate 
                  ? new Date(experience.endDate).toLocaleDateString()
                  : 'No especificado'}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Descripción
            </h4>
            <p className="text-gray-700 whitespace-pre-line">
              {experience.description}
            </p>
          </div>

          {experience.skills && experience.skills.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Habilidades
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm"
                  >
                    {skill.name} ({skill.level})
                  </span>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <FiEdit className="mr-2" />
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}