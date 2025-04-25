// components/AddressSection.tsx
import React, { useState, useEffect } from 'react';
import { Direccion } from '@/lib/employeeService';
import { FiEdit2 } from 'react-icons/fi';

interface AddressSectionProps {
  label?: string;
  address: Direccion | null;
  editable?: boolean;
  onSave?: (newAddress: Direccion) => Promise<void>;
  hideLabel?: boolean;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  label = 'Dirección',
  address = null,
  editable = false,
  onSave,
  hideLabel = false
}) => {
  const [isEditing, setIsEditing] = useState(address === null);
  const [localAddress, setLocalAddress] = useState<Direccion>({
    Estado: null,
    Pais: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      setLocalAddress(address);
      setIsEditing(false);
    } else {
      setLocalAddress({
        Estado: null,
        Pais: null
      });
      if (editable) {
        setIsEditing(true);
      }
    }
  }, [address, editable]);

  const handleInputChange = (field: keyof Direccion, value: string) => {
    setLocalAddress(prev => ({
      ...prev,
      [field]: value || null
    }));
  };

  const handleSave = async () => {
    if (!onSave) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await onSave(localAddress);
      setIsEditing(false);
    } catch (err) {
      setError('Error al guardar la dirección. Por favor intenta nuevamente.');
      console.error('Error saving address:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (address) {
      setLocalAddress(address);
      setIsEditing(false);
    } else {
      setLocalAddress({
        Estado: null,
        Pais: null
      });
      setIsEditing(false);
    }
    setError(null);
  };

  const formatAddress = (addr: Direccion | null) => {
    if (!addr) return 'No especificado';
    
    const parts = [
      addr.Estado,
      addr.Pais
    ].filter(Boolean);
    
    return parts.length > 0 
      ? parts.join(', ')
      : 'No especificado';
  };

  if (!isEditing && address === null) {
    return (
      <div className="w-full">
        {!hideLabel && (
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-bold text-gray-700">
              {label}
            </label>
            {editable && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-blue-600 transition-colors ml-2"
                aria-label={`Agregar ${label.toLowerCase()}`}
              >
                <FiEdit2 size={16} />
              </button>
            )}
          </div>
        )}
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-gray-400 italic">
            No especificado
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
    {!hideLabel && (
      <div className="flex items-center gap-1 mb-1"> {/* Cambiado a gap-1 y items-center */}
        <label className="block text-sm font-bold text-gray-700">
          {label}
        </label>
        {editable && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-blue-600 transition-colors"
            aria-label={`Editar ${label.toLowerCase()}`}
          >
            <FiEdit2 size={16} />
          </button>
        )}
      </div>
    )}

      {isEditing ? (
        <div className="space-y-4 bg-white p-4 rounded-lg shadow">
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <input
                type="text"
                value={localAddress.Estado || ''}
                onChange={(e) => handleInputChange('Estado', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Ej: CDMX"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                País
              </label>
              <input
                type="text"
                value={localAddress.Pais || ''}
                onChange={(e) => handleInputChange('Pais', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Ej: México"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-gray-800">
            {formatAddress(localAddress)}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressSection;