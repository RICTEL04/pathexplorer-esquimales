import React, { useState, useEffect } from 'react';
import { Direccion } from '@/lib/employeeService';

interface AddressSectionProps {
  address: Direccion | null;
  editable?: boolean;
  onSave?: (newAddress: Direccion) => Promise<void>;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  address = null,
  editable = false,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(address === null); // Inicia en modo edición si no hay dirección
  const [localAddress, setLocalAddress] = useState<Direccion>({
    Estado: null,
    Pais: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializar con los datos actuales
  useEffect(() => {
    if (address) {
      setLocalAddress(address);
      setIsEditing(false); // Asegurarse de no estar en modo edición si recibimos una dirección
    } else {
      setLocalAddress({
        Estado: null,
        Pais: null
      });
      if (editable) {
        setIsEditing(true); // Entrar automáticamente en modo edición si no hay dirección
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
      // Si no había dirección previa, simplemente limpiamos
      setLocalAddress({
        Estado: null,
        Pais: null
      });
      setIsEditing(false);
    }
    setError(null);
  };

  const formatAddress = (addr: Direccion | null) => {
    if (!addr) return 'No hay información de dirección disponible';
    
    const parts = [
      addr.Estado,
      addr.Pais
    ].filter(Boolean);
    
    return parts.length > 0 
      ? parts.join(', ')
      : 'No hay información de dirección disponible';
  };

  // Si no hay dirección y no estamos editando, mostrar solo el botón para agregar
  if (!isEditing && address === null) {
    return (
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="bg-blue-50 p-4 rounded-lg flex-1">
            <p className="text-gray-400 italic">
              No hay información de dirección disponible
            </p>
          </div>
          
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Agregar dirección
            </button>
          )}
        </div>
      </div>
    );
  }

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
        <div className="flex items-start justify-between">
          <div className="bg-blue-50 p-4 rounded-lg flex-1">
            <p className="text-gray-800">
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