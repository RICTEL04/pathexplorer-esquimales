export function EmpleadoCard({ planeado, actual }: { planeado: any, actual: any }) {
    // Lógica de estado actual
    let estado = "No asignado";
    let estadoColor = "gray";
    
    if (actual?.TD_Employee_Requests) {
        estado = actual.TD_Employee_Requests.Estado;
        estadoColor = {
            "Aprobada": "green",
            "Rechazada": "red",
            "Pendiente": "yellow",
            "No Asignado": "gray"
        }[estado] || "gray";
    } else if (actual) {
        estado = "Pendiente de request";
        estadoColor = "blue";
    }

    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{planeado.Nombre ?? ""}</h3>
                    <p className="text-sm text-gray-600">{planeado.Rol ?? ""}</p>
                    <div className="mt-2 flex items-center">
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full mr-2">
                            Nivel {planeado.Nivel}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                            {planeado.Nombre_Departamento ?? ""}
                        </span>
                    </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full bg-${estadoColor}-100 text-${estadoColor}-800`}>
                    {estado}
                </span>
            </div>
            
            {actual?.TD_Employee_Requests && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Solicitud:</span> {actual.TD_Employee_Requests.Descripcion ?? ""}
                    </p>
                    {actual.TD_Employee_Requests.Resultado && (
                        <p className="text-sm text-gray-700 mt-1">
                            <span className="font-semibold">Respuesta:</span> {actual.TD_Employee_Requests.Resultado ?? ""}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export function PeopleLeadCard({ planeado, actual }: { planeado: any, actual: any }) {
    // Lógica de estado actual
    type EstadoType = "Asignados" | "Pendiente" | "No asignados" | "Rechazado";
    let estado: EstadoType = (actual?.Estado as EstadoType) || "No asignado";
    let estadoColor = {
        "Asignados": "green",
        "Pendiente": "yellow",
        "No asignados": "gray",
        "Rechazado": "red"
    }[estado] || "gray";

    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{planeado.nombre_People_Lead}</h3>
                    <p className="text-sm text-gray-600">People Lead</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full bg-${estadoColor}-100 text-${estadoColor}-800`}>
                    {estado}
                </span>
            </div>
            
            {actual && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">ID TD:</span> {actual.ID_TD_PeopleLead}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                        <span className="font-semibold">Actualizado:</span> {new Date().toLocaleDateString()}
                    </p>
                </div>
            )}
        </div>
    );
}

export function CapabilityLeadCard({ planeado, actual }: { planeado: any, actual: any }) {
    const estado = actual ? "Asignado" : "No asignado";
    const estadoColor = actual ? "green" : "gray";

    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{planeado.nombre_capabilityLead}</h3>
                    <p className="text-sm text-gray-600">Capability Lead</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full bg-${estadoColor}-100 text-${estadoColor}-800`}>
                    {estado}
                </span>
            </div>
            
            {actual && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">ID TD:</span> {actual.ID_TD_Capability_Lead}
                    </p>
                </div>
            )}
        </div>
    );
}