// components/StringEditor.tsx
import React, { useState, useEffect } from 'react';

interface StringEditorProps {
  value: string;
  label: string;
  editable?: boolean;
  onSave?: (newValue: string) => Promise<void>;
  placeholder?: string;
  inputType?: 'text' | 'textarea';
}

const StringEditor: React.FC<StringEditorProps> = ({
  value = '',
  label,
  editable = false,
  onSave,
  placeholder = '',
  inputType = 'text'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sincronizar con el valor externo cuando cambie
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
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
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
              className="w-full p-2 border rounded"
              placeholder={placeholder}
              rows={3}
            />
          ) : (
            <input
              type={inputType}
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder={placeholder}
            />
          )}

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors disabled:opacity-50 text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 text-sm"
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className={`p-2 ${value ? 'text-gray-800' : 'text-gray-400 italic'}`}>
            {value || `No hay ${label.toLowerCase()}`}
          </p>
          
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className="ml-2 px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm"
            >
              Editar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StringEditor;