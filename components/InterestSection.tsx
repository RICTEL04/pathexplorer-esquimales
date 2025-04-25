//components/InterestSection.tsx
import React, { useState } from 'react';

interface InterestSectionProps {
  title: string;
  items: string[];
  color?: 'blue' | 'green' | 'purple';
  editable?: boolean;
  onItemsChange?: (newItems: string[]) => void;
  maxItemWidth?: string;
}

const InterestSection: React.FC<InterestSectionProps> = ({
  title,
  items = [],
  color = 'blue',
  editable = false,
  onItemsChange,
  maxItemWidth = '200px'
}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [localItems, setLocalItems] = useState(items);
  

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-800 dark:text-blue-200',
      btn: 'bg-blue-500 hover:bg-blue-600'
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-800 dark:text-green-200',
      btn: 'bg-green-500 hover:bg-green-600'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-800 dark:text-purple-200',
      btn: 'bg-purple-500 hover:bg-purple-600'
    },
  };

  const handleAddItem = () => {
    if (newItem.trim() && !localItems.includes(newItem.trim())) {
      const updatedItems = [...localItems, newItem.trim()];
      setLocalItems(updatedItems);
      setNewItem('');
    }
  };

  const handleRemoveItem = (itemToRemove: string) => {
    const updatedItems = localItems.filter(item => item !== itemToRemove);
    setLocalItems(updatedItems);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onItemsChange) {
      onItemsChange(localItems);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setLocalItems(items);
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
          <div className="flex flex-wrap gap-2">
            {localItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${colorClasses[color].bg} ${colorClasses[color].text} px-3 py-1 rounded-full`}
                style={{ maxWidth: maxItemWidth }}
              >
                <span className="truncate flex-1">{item}</span>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 flex-shrink-0"
                  aria-label={`Eliminar ${item}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder={`Añadir ${title.toLowerCase()}`}
              aria-label={`Añadir nuevo ${title.toLowerCase()}`}
            />
            <button
              onClick={handleAddItem}
              className={`px-4 py-2 ${colorClasses[color].btn} text-white rounded hover:opacity-90 transition-opacity`}
            >
              Agregar
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {localItems.length > 0 ? (
            localItems.map((item, index) => (
              <div
                key={index}
                className={`px-3 py-1 text-sm rounded-full ${colorClasses[color].bg} ${colorClasses[color].text} flex items-center`}
                style={{ maxWidth: maxItemWidth }}
                title={item} 
              >
                <span className="truncate">{item}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No hay {title.toLowerCase()} disponibles
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InterestSection;