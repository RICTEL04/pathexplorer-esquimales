// /app/employee/talent-lead/[id]/states/TalentDiscussionFinalizada.tsx

import { EmpleadoCard, PeopleLeadCard, CapabilityLeadCard } from "@/components/Talent_Discussions/Talent_Lead/TalentDiscussionMatchingCards";

interface TalentDiscussionFinalizadaProps {
    id: string;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    TalentDiscussionFullData: any;
    TalentDiscussionBaseEmployees: any;
    loadAllData: () => Promise<void>;
}

export default function TalentDiscussionFinalizada({
    id,
    loading,
    setLoading,
    TalentDiscussionFullData,
    TalentDiscussionBaseEmployees,
    loadAllData
}: TalentDiscussionFinalizadaProps) {

    // Solo datos actuales/finales de la TalentDiscussion
    const currentEmployees = TalentDiscussionFullData?.employees ?? [];
    const currentPeopleLeads = TalentDiscussionFullData?.people_leads ?? [];
    const currentCapabilityLeads = TalentDiscussionFullData?.capability_leads ?? [];

    return (
        <>
            {/* Banner informativo para estado finalizado */}
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <h3 className="text-green-800 font-medium">Talent Discussion Finalizada</h3>
                        <p className="text-green-600 text-sm mt-1">
                            Esta Talent Discussion ha sido completada. Los datos finales se muestran en modo de solo lectura.
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid de columnas - Solo lectura con datos finales */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna Empleados */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden opacity-75">
                    <div className="bg-gradient-to-r from-green-500 to-green-700 p-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Empleados Finales ({currentEmployees.length})
                        </h2>
                        <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Completado
                            </span>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                        {currentEmployees.map((emp: any) => (
                            <EmpleadoCard
                                key={emp.ID_Empleado}
                                planeado={null}
                                actual={emp}
                            />
                        ))}
                        {currentEmployees.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p>No hay empleados registrados en esta Talent Discussion</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Columna People Leads */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden opacity-75">
                    <div className="bg-gradient-to-r from-green-500 to-green-700 p-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            People Leads Finales ({currentPeopleLeads.length})
                        </h2>
                        <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Completado
                            </span>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                        {currentPeopleLeads.map((pl: any) => (
                            <PeopleLeadCard
                                key={pl.td_people_lead?.ID_TD_People_Lead || pl.people_lead?.ID_People_Lead}
                                planeado={null}
                                actual={pl.td_people_lead}
                            />
                        ))}
                        {currentPeopleLeads.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p>No hay People Leads registrados en esta Talent Discussion</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Columna Capability Leads */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden opacity-75">
                    <div className="bg-gradient-to-r from-green-500 to-green-700 p-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Capability Leads Finales ({currentCapabilityLeads.length})
                        </h2>
                        <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Completado
                            </span>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                        {currentCapabilityLeads.map((cl: any) => (
                            <CapabilityLeadCard
                                key={cl.td_capability_lead?.ID_TD_CapabilityLead || cl.capability_lead?.ID_CapabilityLead}
                                planeado={null}
                                actual={cl.td_capability_lead}
                            />
                        ))}
                        {currentCapabilityLeads.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p>No hay Capability Leads registrados en esta Talent Discussion</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}