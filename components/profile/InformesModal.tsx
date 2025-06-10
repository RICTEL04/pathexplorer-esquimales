import React from "react";
import { Informe } from "@/./lib/employeeService";
import { useState } from "react";
import { ChevronRight, X } from "lucide-react";

interface InformesModalProps {
  open: boolean;
  onClose: () => void;
  informes: Informe[];
}

const InformesModal: React.FC<InformesModalProps> = ({ open, onClose, informes }) => {
  const [selectedReport, setSelectedReport] = useState<Informe | null>(null);
  
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-[90%] h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">Documentos del Empleado</h3>
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Lista de documentos */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-medium text-gray-700">Documentos Disponibles</h4>
            </div>
            <div className="flex-1 overflow-y-auto">
              {informes.length > 0 ? (
                <ul className="space-y-2 p-4">
                  {informes.map((rep) => (
                    <li key={rep.id}>
                      <button
                        onClick={() => setSelectedReport(rep)}
                        className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-all ${
                          selectedReport?.id === rep.id
                            ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                            : "bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="truncate text-sm font-medium">{rep.id}</span>
                        <ChevronRight 
                          size={18} 
                          className={
                            selectedReport?.id === rep.id 
                              ? "text-blue-500" 
                              : "text-gray-400"
                          } 
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 text-gray-300">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 002 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-gray-500 mb-2">No hay documentos</h4>
                    <p className="text-gray-400 text-sm">Este empleado no tiene documentos asociados</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vista previa del documento */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {selectedReport ? (
              <>
                <div className="p-4 border-b border-gray-200">
                  <h4 className="font-semibold text-lg text-gray-800">{selectedReport.id}</h4>
                  <p className="text-sm text-gray-500 mt-1">Visualizando documento</p>
                </div>
                <div className="flex-1 p-4 overflow-hidden">
                  <div className="w-full h-full rounded-lg border-2 border-gray-200 bg-white shadow-inner overflow-hidden">
                    <iframe
                      src={selectedReport.name}
                      title={selectedReport.id}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 text-gray-300">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-500 mb-2">Selecciona un documento</h4>
                  <p className="text-gray-400 text-sm">Elige un documento de la lista para previsualizarlo</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformesModal;