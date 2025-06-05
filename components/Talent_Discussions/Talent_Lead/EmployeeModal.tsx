import { useState } from "react";
import { actualizarTD_Employee_Request } from "@/lib/talent-discussions/talent_lead/TalendLeadAPICalls";
import { Switch, Label, Button } from "@/components/ui/uiTDEmployeeModal";
import { X, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface EmployeeModalProps {
  open: boolean;
  employee: {
    Nombre: string;
    Rol: string;
    Nivel: string;
    Nombre_CapabilityLead: string;
    Reportes?: Array<{ name: string; url: string }>;
    TD_Employee_Requests: {
      ID_TD_Employee_Request: string;
      Descripcion: string;
      Estado: string;
      Resultado: string;
    };
  } | null;
  onClose: () => void;
  setLoading?: (loading: boolean) => void;
  loadAllData?: () => Promise<void>;
}

export default function EmployeeModal({
  open,
  employee,
  onClose,
  setLoading,
  loadAllData
}: EmployeeModalProps) {
    const [estado, setEstado] = useState<string>(employee?.TD_Employee_Requests?.Estado === "Aprobada" ? "Aprobada" : "Rechazada");
    const [resultado, setResultado] = useState<string>(employee?.TD_Employee_Requests?.Resultado || "");
    const [selectedReport, setSelectedReport] = useState<{name: string; url: string} | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setSelectedReport(null);
    }, [employee, loadAllData]);

    console.log("Employee", employee);
    console.log("Employee ID:", employee?.TD_Employee_Requests?.ID_TD_Employee_Request);
    console.log("Submitting request with estado:", estado, "and resultado:", resultado);

    const handleSubmit = async () => {
        if (!employee?.TD_Employee_Requests?.ID_TD_Employee_Request || !resultado) return;
        setSubmitting(true);

        if (setLoading){
            await actualizarTD_Employee_Request(
                setLoading,
                employee.TD_Employee_Requests.ID_TD_Employee_Request,
                estado,
                resultado
            );
        }

        
        setSubmitting(false);
        if (loadAllData) await loadAllData();
        onClose();
    };

    if (!open || !employee) return null;

    const reportes = Array.isArray(employee.Reportes) ? employee.Reportes : [];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b p-6 sticky top-0 bg-white rounded-t-lg">
            <h2 className="text-2xl font-bold text-gray-800">{employee.Nombre}</h2>
            <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar modal"
            >
                <X size={24} />
            </button>
            </div>
            
            {/* Contenido */}
            <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-8">
                {/* Información del empleado */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">Información del Empleado</h3>
                <div className="grid grid-cols-1 gap-2">
                    <p className="flex justify-between">
                    <span className="font-medium text-gray-600">Rol:</span> 
                    <span className="text-gray-800">{employee.Rol}</span>
                    </p>
                    <p className="flex justify-between">
                    <span className="font-medium text-gray-600">Nivel:</span> 
                    <span className="text-gray-800">{employee.Nivel}</span>
                    </p>
                    <p className="flex justify-between">
                    <span className="font-medium text-gray-600">Capability Lead:</span> 
                    <span className="text-gray-800">{employee.Nombre_CapabilityLead}</span>
                    </p>
                </div>
                </div>

                {/* Documentos del Empleado */}
                <div className="bg-white border border-gray-200 rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="font-semibold text-xl text-gray-800">Resumen de desempeño</h3>
                </div>
                
                {reportes.length > 0 ? (
                    <div className="flex h-[500px]"> {/* Aumenté la altura aquí */}
                    {/* Lista de reportes */}
                    <div className="w-80 p-4 border-r border-gray-200 overflow-y-auto bg-gray-50">
                        <h4 className="font-medium text-gray-700 mb-3">Documentos Disponibles</h4>
                        <ul className="space-y-2">
                        {reportes.map((rep) => (
                            <li key={rep.name}>
                            <button
                                onClick={() => setSelectedReport(rep)}
                                className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors ${
                                selectedReport?.name === rep.name 
                                    ? "bg-purple-100 text-purple-700 border border-purple-200" 
                                    : "bg-white hover:bg-gray-100 border border-gray-200"
                                }`}
                            >
                                <span className="truncate text-sm font-medium">{rep.name}</span>
                                <ChevronRight size={16} className={selectedReport?.name === rep.name ? "text-blue-500" : "text-gray-400"} />
                            </button>
                            </li>
                        ))}
                        </ul>
                    </div>
                    
                    {/* Vista previa del reporte seleccionado */}
                    <div className="flex-1 p-4 overflow-hidden">
                        {selectedReport ? (
                        <div className="h-full flex flex-col">
                            <div className="mb-4 pb-3 border-b border-gray-200">
                            <h4 className="font-semibold text-lg text-gray-800">{selectedReport.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">Vista previa del documento</p>
                            </div>
                            <div className="flex-1 border-2 border-gray-200 rounded-lg overflow-hidden shadow-inner bg-white">
                            <iframe
                                src={selectedReport.url}
                                title={selectedReport.name}
                                className="w-full h-full"
                                frameBorder="0"
                            />
                            </div>
                        </div>
                        ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                                </svg>
                            </div>
                            <p className="text-lg font-medium text-gray-500">Selecciona un documento</p>
                            <p className="text-sm text-gray-400 mt-1">Elige un documento de la lista para previsualizarlo</p>
                            </div>
                        </div>
                        )}
                    </div>
                    </div>
                ) : (
                    <div className="h-48 flex items-center justify-center">
                    <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-4 text-gray-300">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 002 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-500 mb-2">No hay documentos disponibles</h4>
                        <p className="text-gray-400">Este empleado no tiene documentos asociados</p>
                    </div>
                    </div>
                )}
                </div>

                {/* Sección de evaluación en dos columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Columna 1: Estado de la solicitud */}
                    <div className="bg-white border flex-row border-gray-200 p-6 rounded-lg">
                        <div className="flex flex-col gap-2 mb-4">
                        <span className="font-semibold text-gray-700">Petición:</span>
                        <div
                            className="font-semibold text-gray-800 bg-gray-50 border border-gray-200 overflow-y-auto overflow-x-hidden p-4 rounded-lg h-32 whitespace-pre-line break-words"
                        >
                            {employee.TD_Employee_Requests.Descripcion}
                        </div>
                        </div>
                        <Label htmlFor="approval-switch" className="font-semibold text-gray-800 mb-4 block text-lg">
                            Estado de la Solicitud
                        </Label>
                        <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <span className={`text-sm font-medium ${estado === "Rechazada" ? "text-red-600" : "text-gray-400"}`}>
                            Rechazada
                            </span>
                            <Switch
                            checked={estado === "Aprobada"}
                            onCheckedChange={(checked: boolean) => setEstado(checked ? "Aprobada" : "Rechazada")}
                            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                            />
                            <span className={`text-sm font-medium ${estado === "Aprobada" ? "text-green-600" : "text-gray-400"}`}>
                            Aprobada
                            </span>
                        </div>
                    </div>

                    {/* Columna 2: Comentarios de Evaluación */}
                    <div className="bg-white border border-gray-200 p-6 rounded-lg">
                        <Label htmlFor="result" className="font-semibold text-gray-800 mb-4 block text-lg">
                            Comentarios de Evaluación
                        </Label>
                        <textarea
                            id="result"
                            className="w-full border border-gray-300 rounded-lg p-4 h-40 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            value={resultado}
                            onChange={(e) => setResultado(e.target.value)}
                            placeholder="Agrega tus comentarios detallados sobre la evaluación del empleado..."
                        />
                    </div>
                </div>
            </div>
            </div>



            {/* Footer con botones */}
            <div className="flex justify-end gap-4 p-6 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-lg z-10">
            <Button 
                variant="outline" 
                onClick={onClose}
                disabled={submitting}
                className="px-6 py-2 relative z-20"
            >
                Cancelar
            </Button>
            <Button 
                onClick={handleSubmit}
                disabled={!resultado || submitting}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2 relative z-20"
            >
                {submitting ? "Guardando..." : "Guardar cambios"}
            </Button>
            </div>


        </div>
        </div>
    );
}