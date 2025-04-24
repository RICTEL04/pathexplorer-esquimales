// components/AddressSection.tsx
import React, { useState, useEffect } from 'react';
import { Direccion } from '@/lib/employeeService';

interface AddressSectionProps {
  address: Direccion | null;
  editable?: boolean;
  onSave?: (newAddress: Direccion) => Promise <void>;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  address = null,
  editable = false,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localAddress, setLocalAddress] = useState<Direccion>({
    Num_Casa: null,
    Calle: null,
    Ciudad: null,
    Estado: null,
    Pais: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializar con los datos actuales
  useEffect(() => {
    if (address) {
      setLocalAddress(address);
    } else {
      setLocalAddress({
        Num_Casa: null,
        Calle: null,
        Ciudad: null,
        Estado: null,
        Pais: null
      });
    }
  }, [address]);

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
    // Volver a los valores originales
    if (address) {
      setLocalAddress(address);
    } else {
      setLocalAddress({
        Num_Casa: null,
        Calle: null,
        Ciudad: null,
        Estado: null,
        Pais: null
      });
    }
    setIsEditing(false);
    setError(null);
  };

  const formatAddress = (addr: Direccion | null) => {
    if (!addr) return 'No hay información de dirección';
    
    const parts = [
      addr.Num_Casa,
      addr.Calle,
      addr.Ciudad,
      addr.Estado,
      addr.Pais
    ].filter(Boolean);
    
    return parts.length > 0 
      ? parts.join(', ')
      : 'No hay información de dirección';
  };

  return (
    <div className="mt-4">
      {isEditing ? (
        <div className="space-y-4 bg-white p-4 rounded-lg shadow">
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Número de casa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de casa
              </label>
              <input
                type="text"
                value={localAddress.Num_Casa || ''}
                onChange={(e) => handleInputChange('Num_Casa', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Ej: 123"
              />
            </div>

            {/* Calle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calle
              </label>
              <input
                type="text"
                value={localAddress.Calle || ''}
                onChange={(e) => handleInputChange('Calle', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Ej: Av. Principal"
              />
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ciudad
              </label>
              <input
                type="text"
                value={localAddress.Ciudad || ''}
                onChange={(e) => handleInputChange('Ciudad', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Ej: Ciudad de México"
              />
            </div>

            {/* Estado */}
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

            {/* País */}
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

          {/* Botones de acción */}
          <div className="flex justify-end gap-2 mt-4">
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
        <div className="flex items-start justify-around">
          <div className="bg-blue-50 p-4 rounded-lg flex-1">
            <p className="text-gray-800 bg">
              {formatAddress(localAddress)}
            </p>

          </div>
          
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className="ml-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Editar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressSection;