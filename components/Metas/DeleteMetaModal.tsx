import { useState } from 'react';
import { deleteMeta } from '@/lib/metas-empleados/apiCallsMetas';
import { Meta } from '@/lib/metas-empleados/metasDefinitions';

interface DeleteMetaModalProps {
  isOpen: boolean; 
  onClose: () => void;
  employeeID: string;
  onMetaDeleted: () => void;
  metaToDelete: Meta | null; // ID de la meta a eliminar
}

export default function DeleteMetaModal({
  isOpen,
  onClose,
  employeeID,
  onMetaDeleted,
  metaToDelete
}: DeleteMetaModalProps) {

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  if (!isOpen) return null;

  const handleDelete = async () => {
    if (metaToDelete?.ID_meta && employeeID === metaToDelete.ID_Empleado) {
      try {
        setLoading(true);
        await deleteMeta(metaToDelete.ID_meta);
        onMetaDeleted();
        onClose();
      } catch (error) {
        console.error("Error deleting meta:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Eliminar Meta</h2>
        <p>¿Estás seguro de que deseas eliminar esta meta?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className={`bg-red-600 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}