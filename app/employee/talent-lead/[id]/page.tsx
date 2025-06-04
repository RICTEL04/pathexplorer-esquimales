// /app/employee/talent.lead/[id]/page.tsx
'use client';

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { fetchSession } from "@/lib/metas-empleados/apiCallsMetas";
import { getTalentLeadIdForEmployee, getTalentDiscussionCompleta } from "@/lib/talent-discussions/talent_lead/TalendLeadAPICalls";
import { getEmployeesByNivel } from "@/lib/talent-discussions/talent_lead/TalendLeadAPICalls";
import { fetchReportsForEmployee } from "@/lib/talent-discussions/talent_lead/TalendLeadAPICalls";

// Importar los componentes de estado
import TalentDiscussionPendiente from "./states/TalentDiscussionPendiente";
import TalentDiscussionCancelada from "./states/TalentDiscussionCancelada";
import TalentDiscussionEnProgreso from "./states/TalentDiscussionEnProgreso";
import TalentDiscussionFinalizada from "./states/TalentDiscussionFinalizada";

export default function TalentLeadTDWithID() {
    const params = useParams();
    const id = params?.id as string;
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [ID_TalentLead, setID_TalentLead] = useState<string | null>(null);
    const [TalentDiscussionFullData, setTalentDiscussionFullData] = useState<any>(null);
    const [TalentDiscussionBaseEmployees, setTalentDiscussionBaseEmployees] = useState<any>(null);

    // Función para cargar todos los datos (puede ser llamada tras cualquier acción)
    const loadAllData = useCallback(async () => {
        setLoading(true);
        try {
            const session2 = await fetchSession(setLoading);
            setSession(session2);

            if (session2?.user?.id) {
                const ID_TalentLead2 = await getTalentLeadIdForEmployee(setLoading, session2.user.id);
                if (ID_TalentLead2) {
                    setID_TalentLead(ID_TalentLead2);
                    const TalendDiscussionData = await getTalentDiscussionCompleta(setLoading, id);
                    setTalentDiscussionFullData(TalendDiscussionData);
                    if (TalendDiscussionData?.talent_discussion) {

                        // Si está en progreso, obtener reportes para cada empleado
                        if (TalendDiscussionData?.talent_discussion?.Estado === 'En Progreso') {
                            const employeesWithReports = await Promise.all(
                                (TalendDiscussionData.employees ?? []).map(async (emp: any) => {
                                    const reportes = await fetchReportsForEmployee(emp.ID_Empleado);
                                    // reportes es un array de { name, url }
                                    console.log("ID_Empleado:", emp.ID_Empleado, "Reportes:", reportes);
                                    return {
                                        ...emp,
                                        Reportes: reportes // Asigna el array directamente
                                    };
                                })
                            );
                            setTalentDiscussionFullData({
                                ...TalendDiscussionData,
                                employees: employeesWithReports
                            });
                        } else {
                            setTalentDiscussionFullData(TalendDiscussionData);
                            if (TalendDiscussionData?.talent_discussion) {
                                const TalentDiscussionBaseEmployeesData = await getEmployeesByNivel(setLoading, TalendDiscussionData.talent_discussion.Nivel);
                                setTalentDiscussionBaseEmployees(TalentDiscussionBaseEmployeesData);
                            }
                        }

                    }
                }
            }
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadAllData();
    }, [loadAllData]);

    // Header con información de la Talent Discussion
    const renderHeader = () => {
        if (!TalentDiscussionFullData?.talent_discussion) return null;

        const td = TalentDiscussionFullData.talent_discussion;
        return (
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{td.Discussion}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <p><span className="font-semibold text-gray-600">Nivel:</span> {td.Nivel}</p>
                        <p><span className="font-semibold text-gray-600">Estado:</span>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                td.Estado === 'Finalizada' ? 'bg-green-100 text-green-800' :
                                td.Estado === 'En Progreso' ? 'bg-blue-100 text-blue-800' :
                                td.Estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                td.Estado === 'Cancelada' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {td.Estado}
                            </span>
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p><span className="font-semibold text-gray-600">Talent Lead:</span> {td.Nombre_Talent_Lead}</p>
                        <p><span className="font-semibold text-gray-600">Fecha Inicio:</span> {td.Fecha_Inicio?.toLocaleDateString() || '-'}</p>
                    </div>
                    <div className="space-y-2">
                        <p><span className="font-semibold text-gray-600">ID:</span> {td.ID_Talent_Discussion}</p>
                        <p><span className="font-semibold text-gray-600">Fecha Final:</span> {td.Fecha_Final?.toLocaleDateString() || '-'}</p>
                    </div>
                </div>
            </div>
        );
    };

    // Renderizar componente según el estado
    const renderStateComponent = () => {
        if (!TalentDiscussionFullData?.talent_discussion) return null;

        const estado = TalentDiscussionFullData.talent_discussion.Estado;
        const commonProps = {
            id,
            loading,
            setLoading,
            TalentDiscussionFullData,
            TalentDiscussionBaseEmployees,
            loadAllData
        };

        switch (estado) {
            case 'Pendiente':
                return <TalentDiscussionPendiente {...commonProps} />;
            case 'Cancelada':
                return <TalentDiscussionCancelada {...commonProps} />;
            case 'En Progreso':
                 return <TalentDiscussionEnProgreso {...commonProps} />;
             case 'Finalizada':
                 return <TalentDiscussionFinalizada {...commonProps} />;
            default:
                return (
                    <div className="text-center py-8">
                        <p className="text-gray-600">Estado no reconocido: {estado}</p>
                    </div>
                );
        }
    };

    if (loading && !TalentDiscussionFullData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {renderHeader()}
            {renderStateComponent()}
        </div>
    );
}