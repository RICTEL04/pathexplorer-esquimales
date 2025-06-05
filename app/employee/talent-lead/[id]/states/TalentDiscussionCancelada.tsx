// /app/employee/talent-lead/[id]/states/TalentDiscussionCancelada.tsx

import { EmpleadoCard, PeopleLeadCard, CapabilityLeadCard } from "@/components/Talent_Discussions/Talent_Lead/TalentDiscussionMatchingCards";

interface TalentDiscussionCanceladaProps {
    id: string;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    TalentDiscussionFullData: any;
    TalentDiscussionBaseEmployees: any;
    loadAllData: () => Promise<void>;
}

export default function TalentDiscussionCancelada({
    id,
    loading,
    setLoading,
    TalentDiscussionFullData,
    TalentDiscussionBaseEmployees,
    loadAllData
}: TalentDiscussionCanceladaProps) {

    // --- MATCHING LOGIC (Solo para mostrar datos) ---
    const baseEmployees = TalentDiscussionBaseEmployees?.employees ?? [];
    const currentEmployees = TalentDiscussionFullData?.employees ?? [];
    const basePeopleLeads = TalentDiscussionBaseEmployees?.peopleLeads ?? [];
    const currentPeopleLeads = TalentDiscussionFullData?.people_leads ?? [];
    const baseCapabilityLeads = TalentDiscussionBaseEmployees?.capabilityLeads ?? [];
    const currentCapabilityLeads = TalentDiscussionFullData?.capability_leads ?? [];

    // Helper para encontrar el actual correspondiente
    const findActualEmployee = (planeado: any) => {
        return currentEmployees.find((e: any) => e.ID_Empleado === planeado.ID_Empleado) || null;
    };

    const findActualPeopleLead = (planeado: any) => {
        return currentPeopleLeads.find((pl: any) => pl.people_lead.ID_People_Lead === planeado.ID_People_Lead)?.td_people_lead || null;
    };

    const findActualCapabilityLead = (planeado: any) => {
        return currentCapabilityLeads.find((cl: any) => cl.capability_lead.ID_CapabilityLead === planeado.ID_CapabilityLead)?.td_capability_lead || null;
    };

    return (
        <>
            {/* Banner informativo para estado cancelado */}
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                        <h3 className="text-red-800 font-medium">Talent Discussion Cancelada</h3>
                        <p className="text-red-600 text-sm mt-1">
                            Esta Talent Discussion ha sido cancelada. Los datos se muestran en modo de solo lectura.
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid de columnas - Solo lectura */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna Empleados */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden opacity-75">
                    <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Empleados ({baseEmployees.length})
                        </h2>
                        <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Solo lectura
                            </span>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                        {baseEmployees.map((emp: any) => (
                            <EmpleadoCard
                                key={emp.ID_Empleado}
                                planeado={emp}
                                actual={findActualEmployee(emp)}
                            />
                        ))}
                    </div>
                </div>

                {/* Columna People Leads */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden opacity-75">
                    <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            People Leads ({basePeopleLeads.length})
                        </h2>
                        <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Solo lectura
                            </span>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                        {basePeopleLeads.map((pl: any) => (
                            <PeopleLeadCard
                                key={pl.ID_People_Lead}
                                planeado={pl}
                                actual={findActualPeopleLead(pl)}
                            />
                        ))}
                    </div>
                </div>

                {/* Columna Capability Leads */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden opacity-75">
                    <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Capability Leads ({baseCapabilityLeads.length})
                        </h2>
                        <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Solo lectura
                            </span>
                        </div>
                    </div>
                    <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                        {baseCapabilityLeads.map((cl: any) => (
                            <CapabilityLeadCard
                                key={cl.ID_CapabilityLead}
                                planeado={cl}
                                actual={findActualCapabilityLead(cl)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}