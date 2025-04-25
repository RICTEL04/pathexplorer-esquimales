// components/SkillSection.tsx
import React, { useState, useEffect } from 'react';
import { getAllHardSkills, getAllSoftSkills, Habilidad } from '@/lib/employeeService';

interface SkillSectionProps {
  title: string;
  items: Habilidad[];
  type: 'soft' | 'hard';
  employeeId?: string;
  color?: 'blue' | 'green' | 'purple';
  editable?: boolean;
  onItemsChange?: (newItems: Habilidad[]) => void;
  maxItemWidth?: string;
}

const SkillSection: React.FC<SkillSectionProps> = ({
  title,
  items = [],
  type,
  employeeId,
  color = 'blue',
  editable = false,
  onItemsChange,
  maxItemWidth = '200px'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [allSkills, setAllSkills] = useState<Habilidad[]>([]);
  const [availableSkills, setAvailableSkills] = useState<Habilidad[]>([]);
  const [localItems, setLocalItems] = useState<Habilidad[]>(items);
  const [initialItems, setInitialItems] = useState<Habilidad[]>(items);
  const [isLoading, setIsLoading] = useState(false);

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-800 dark:text-blue-200',
      border: 'border-blue-200 dark:border-blue-700',
      btn: 'bg-blue-500 hover:bg-blue-600'
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-800 dark:text-green-200',
      border: 'border-green-200 dark:border-green-700',
      btn: 'bg-green-500 hover:bg-green-600'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-800 dark:text-purple-200',
      border: 'border-purple-200 dark:border-purple-700',
      btn: 'bg-purple-500 hover:bg-purple-600'
    },
  };

  // Reset local state when items prop changes
  useEffect(() => {
    setLocalItems(items);
    setInitialItems(items);
  }, [items]);

  // Fetch all skills from the database when editing starts
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        const response = await (type === 'soft' ? getAllSoftSkills() : getAllHardSkills());
        setAllSkills(response);
        
        // Filter out skills that are already selected
        const filtered = response.filter(skill => 
          !localItems.some(item => item.ID_Habilidad === skill.ID_Habilidad)
        );
        setAvailableSkills(filtered);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isEditing && editable) {
      fetchSkills();
    }
  }, [isEditing, editable, type, localItems]);

  const handleAddSkill = (skillToAdd: Habilidad) => {
    setLocalItems(prev => [...prev, skillToAdd]);
    setAvailableSkills(prev => prev.filter(skill => skill.ID_Habilidad !== skillToAdd.ID_Habilidad));
  };

  const handleRemoveSkill = (skillToRemove: Habilidad) => {
    setLocalItems(prev => prev.filter(item => item.ID_Habilidad !== skillToRemove.ID_Habilidad));
    setAvailableSkills(prev => [...prev, skillToRemove].sort((a, b) => a.Descripcion.localeCompare(b.Descripcion)));
  };

  const handleSave = () => {
    if (onItemsChange) {
      onItemsChange(localItems);
      setInitialItems(localItems);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalItems(initialItems);
    setIsEditing(false);
  };

  const hasChanges = () => {
    if (localItems.length !== initialItems.length) return true;
    return !localItems.every(item => 
      initialItems.some(initialItem => initialItem.ID_Habilidad === item.ID_Habilidad)
    );
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        
        {editable && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className={`
              px-4 py-2 sm:px-3 sm:py-1 
              rounded-md sm:rounded-lg 
              text-sm sm:text-base
              bg-gray-200 dark:bg-gray-700 
              text-gray-800 dark:text-white 
              hover:bg-gray-300 dark:hover:bg-gray-600 
              transition-colors
              w-full sm:w-auto
            `}
          >
            Editar {title.toLowerCase()}
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          {/* Selected skills */}
          <div className="flex flex-wrap gap-2">
            {localItems.length > 0 ? (
              localItems.map((item) => (
                <div
                  key={item.ID_Habilidad}
                  className={`px-3 py-1 rounded-full ${colorClasses[color].bg} ${colorClasses[color].text} flex items-center`}
                  style={{ maxWidth: maxItemWidth }}
                >
                  <span className="truncate">{item.Descripcion}</span>
                  <button
                    onClick={() => handleRemoveSkill(item)}
                    className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    aria-label={`Quitar ${item.Descripcion}`}
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">
                No hay {title.toLowerCase()} seleccionadas
              </p>
            )}
          </div>

          {/* Available skills */}
          <div className={`border rounded-lg p-4 ${colorClasses[color].border}`}>
            <h4 className="text-md font-medium mb-3 text-gray-700 dark:text-gray-300">
              Habilidades disponibles
            </h4>
            
            {isLoading ? (
              <p className="text-gray-500 dark:text-gray-400 italic">Cargando habilidades...</p>
            ) : availableSkills.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {availableSkills.map(skill => (
                  <div
                    key={skill.ID_Habilidad}
                    className={`p-3 rounded-lg transition-all ${
                      colorClasses[color].bg
                    } ${colorClasses[color].text} flex justify-between items-center`}
                  >
                    <span className="font-medium truncate" style={{ maxWidth: maxItemWidth }}>
                      {skill.Descripcion}
                    </span>
                    <button
                      onClick={() => handleAddSkill(skill)}
                      className="w-6 h-6 rounded-full bg-white text-green-500 flex items-center justify-center ml-2"
                      aria-label={`Agregar ${skill.Descripcion}`}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">
                No hay habilidades disponibles
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges()}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {localItems.length > 0 ? (
            localItems.map((item) => (
              <div
                key={item.ID_Habilidad}
                className={`px-3 py-1 rounded-full ${colorClasses[color].bg} ${colorClasses[color].text} flex items-center`}
                style={{ maxWidth: maxItemWidth }}
                title={item.Descripcion}
              >
                <span className="truncate">{item.Descripcion}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No hay {title.toLowerCase()} seleccionadas
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillSection;