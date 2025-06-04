'use client';

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchSession } from "@/lib/metas-empleados/apiCallsMetas";
import { getTalentLeadIdForEmployee, getTalentDiscussionCompleta } from "@/lib/talent-discussions/talent_lead/TalendLeadAPICalls";
import { getEmployeesByNivel } from "@/lib/talent-discussions/talent_lead/TalendLeadAPICalls";
import { EmpleadoCard, PeopleLeadCard, CapabilityLeadCard } from "@/components/Talent_Discussions/Talent_Lead/TalentDiscussionMatchingCards";


export default function TalentLeadTDWithID() {
    const params = useParams();
    const id = params?.id as string;
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [ID_TalentLead, setID_TalentLead] = useState<string | null>(null);
    const [TalentDiscussionFullData, setTalentDiscussionFullData] = useState<any>(null);
    const [TalentDiscussionBaseEmployees, setTalentDiscussionBaseEmployees] = useState<any>(null);

    useEffect(() => {
        const loadData = async (): Promise<void> => {
            try {
                setLoading(true);
                const session2 = await fetchSession(setLoading);
                setSession(session2);
                
                if (session2?.user?.id) {
                    const ID_TalentLead2 = await getTalentLeadIdForEmployee(setLoading, session2.user.id);
                    if (ID_TalentLead2) {
                        setID_TalentLead(ID_TalentLead2);
                        const TalendDiscussionData = await getTalentDiscussionCompleta(setLoading, id);
                        setTalentDiscussionFullData(TalendDiscussionData);
                        if(TalendDiscussionData?.talent_discussion){
                            const TalentDiscussionBaseEmployeesData = await getEmployeesByNivel(setLoading, TalendDiscussionData.talent_discussion.Nivel);   
                            setTalentDiscussionBaseEmployees(TalentDiscussionBaseEmployeesData); 
                        }
                    }
                }
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {

                setLoading(false);
            }
        };
        
        loadData();
    }, []);

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
                                td.Estado === 'Completado' ? 'bg-green-100 text-green-800' :
                                td.Estado === 'En Progreso' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
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

    // --- MATCHING LOGIC ---
    const baseEmployees = TalentDiscussionBaseEmployees?.employees ?? [];
    const currentEmployees = TalentDiscussionFullData?.employees ?? [];
    const basePeopleLeads = TalentDiscussionBaseEmployees?.peopleLeads ?? [];
    const currentPeopleLeads = TalentDiscussionFullData?.people_leads ?? [];
    const baseCapabilityLeads = TalentDiscussionBaseEmployees?.capabilityLeads ?? [];
    const currentCapabilityLeads = TalentDiscussionFullData?.capability_leads ?? [];

    console.log("TalentDiscussionFullData", TalentDiscussionFullData);
    console.log("TalentDiscussionBaseEmployees", TalentDiscussionBaseEmployees);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {renderHeader()}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna Empleados */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Empleados ({baseEmployees.length})
                        </h2>
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
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-green-800 p-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            People Leads ({basePeopleLeads.length})
                        </h2>
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
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Capability Leads ({baseCapabilityLeads.length})
                        </h2>
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
        </div>
    );
}