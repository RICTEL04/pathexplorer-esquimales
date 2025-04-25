import React, { useState, useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi';

interface StringEditorProps {
  value: string;
  label: string;
  editable?: boolean;
  onSave?: (newValue: string) => Promise<void>;
  placeholder?: string;
  inputType?: 'text' | 'textarea';
  className?: string;
  hideLabel?: boolean;
}

const StringEditor: React.FC<StringEditorProps> = ({
  value = '',
  label,
  editable = false,
  onSave,
  placeholder = '',
  inputType = 'text',
  className = '',
  hideLabel = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSave = async () => {
    if (!onSave) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await onSave(localValue);
      setIsEditing(false);
    } catch (err) {
      setError('Error al guardar los cambios. Por favor intenta nuevamente.');
      console.error('Error saving:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setLocalValue(value);
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className={`w-full ${className}`}>
        {!hideLabel && (
        <div className="flex items-center gap-1 mb-1"> {/* Cambiado a gap-1 y items-center */}
            <label className="block text-sm font-bold text-gray-700">
            {label}
            </label>
            {editable && !isEditing && (
            <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-blue-600 transition-colors"
                aria-label={`Editar ${label}`}
            >
                <FiEdit2 size={16} />
            </button>
            )}
        </div>
        )}
      
      {isEditing ? (
        <div className="space-y-2">
          {error && (
            <div className="p-2 bg-red-100 text-red-800 rounded text-sm">
              {error}
            </div>
          )}

          {inputType === 'textarea' ? (
            <textarea
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={placeholder}
              rows={4}
            />
          ) : (
            <input
              type={inputType}
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={placeholder}
            />
          )}

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className={`break-words ${value ? 'text-gray-800' : 'text-gray-400 italic'}`}>
            {value || `No hay ${label.toLowerCase()}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default StringEditor;