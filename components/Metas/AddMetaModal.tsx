import { useState } from 'react';
import { insertMeta } from '@/lib/metas-empleados/apiCallsMetas';
import { Meta } from '@/lib/metas-empleados/metasDefinitions';
import AddMetaForm from './AddMetaForm';

interface MetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeID: string;
  onMetaAdded: () => void;
  metaToEdit?: Meta | null; // Nueva prop para la meta a editar
}

export default function AddMetaModal({ 
  isOpen, 
  onClose, 
  employeeID, 
  onMetaAdded,
  metaToEdit // Recibimos la meta a editar (opcional)
}: MetaModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (newMeta: Meta) => {
    try {
      setLoading(true);
      // Usamos upsertMeta que maneja tanto insert como update
      await insertMeta({
        ...newMeta,
        ID_meta: metaToEdit?.ID_meta ?? null // Pasamos el ID si estamos editando
      });
      onMetaAdded();
      onClose();
    } catch (err) {
      console.error("Error al guardar la meta:", err);
      setError("No se pudo guardar la meta. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-full overflow-y-auto p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-500 font-medium">Guardando...</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <AddMetaForm
            employeeID={employeeID}
            onSubmit={handleSubmit}
            onCancel={onClose}
            metaToEdit={metaToEdit} // Pasamos la meta a editar al formulario
          />
        </div>
      </div>
    </div>
  );
}