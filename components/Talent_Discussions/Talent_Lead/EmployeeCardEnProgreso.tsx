export default function EmployeeCardEnProgreso({ 
    employee, 
    onClick 
}: { 
    employee: any, 
    onClick: () => void 
}) {
    const hasReports = employee.Reportes?.length > 0;
    const hasBeenEvaluated = employee.TD_Employee_Requests?.Estado === "Aprobada" ||
                            employee.TD_Employee_Requests?.Estado === "Rechazada";
    const hasBeenAproved = employee.TD_Employee_Requests?.Estado === "Aprobada";
    
    return (
        <div
            className="w-full bg-white rounded-lg border p-4 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
            onClick={onClick}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold text-gray-800">{employee.Nombre}</p>
                    <p className="text-sm text-gray-600 mt-1">{employee.Rol}</p>
                    <p className="font-semibold text-gray-800">Capability Lead: {employee.Nombre_CapabilityLead} </p>
                    <div className="flex items-center mt-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                            'bg-green-100 text-green-800'
                        }`}>
                            Nivel: {employee.Nivel}
                        </span>
                    </div>
                </div>
                
                {/* Indicador de estado */}
                <div className={`flex-shrink-0 rounded-full p-1 ${
                    hasBeenEvaluated ? 
                                    (hasBeenAproved ? 
                                        'bg-green-100 text-green-600' : 
                                        'bg-red-100 text-red-600'
                                    ) :  
                                        'bg-yellow-100 text-yellow-600'
                                }`}>
                    {
                    
                        hasBeenEvaluated ? (
                            hasBeenAproved ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        )
                    }
                </div>
            </div>
            
            {hasReports && (
                <div className="mt-3 text-xs text-gray-500 flex items-center">
                    <span>{employee.Reportes.length} documento(s)</span>
                </div>
            )}
        </div>
    );
}