//app/talent-lead/[id]/states/TalentDiscussionEnProgreso.tsx
import React, { useState } from 'react';
import PeopleLeadCardEnProgreso from '@/components/Talent_Discussions/Talent_Lead/PeopleLeadCardEnProgreso';
import EmployeeModal from '@/components/Talent_Discussions/Talent_Lead/EmployeeModal';  
import { cambiar_estado_talent_discussion } from '@/lib/talent-discussions/talent_lead/TalendLeadAPICalls';
interface TalentDiscussionEnProgresoProps {
    id: string;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    TalentDiscussionFullData: any;
    loadAllData: () => Promise<void>;
}

export default function TalentDiscussionEnProgreso({
    id,
    loading,
    setLoading,
    TalentDiscussionFullData,
    loadAllData
}: TalentDiscussionEnProgresoProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

    // Crear un mapa de ID_CapabilityLead a nombre_capabilityLead usando capability_leads
    console.log("TalentDiscussionFullData:", TalentDiscussionFullData);

    const allEvaluated = (TalentDiscussionFullData.employees ?? []).every(
        (emp: any) =>
            emp.TD_Employee_Requests &&
            emp.TD_Employee_Requests.Estado !== "Pendiente"
    );

    const validEmployees = (TalentDiscussionFullData.employees ?? []).filter(
        (emp: any) => emp.TD_Employee_Requests?.Estado !== "No Asignado"
    );


    // Handler para finalizar la Talent Discussion
    const handleFinalizar = async () => {
        if (!TalentDiscussionFullData.talent_discussion?.ID_Talent_Discussion) return;
        setLoading(true);
        await cambiar_estado_talent_discussion(
            setLoading,
            TalentDiscussionFullData.talent_discussion.ID_Talent_Discussion,
            "Finalizada"
        );
        await loadAllData();
        setLoading(false);
    };

    // Agrupar empleados por People Lead y asignar capability_lead_name
    const peopleLeadIdToEmployees: Record<string, any[]> = {};
        validEmployees.forEach((emp: any) => {
            if (emp.ID_People_Lead) {
                if (!peopleLeadIdToEmployees[emp.ID_People_Lead]) {
                    peopleLeadIdToEmployees[emp.ID_People_Lead] = [];
                }
                peopleLeadIdToEmployees[emp.ID_People_Lead].push(emp);
            }
    });

    console.log("TalentDiscussionFullData.employees:", TalentDiscussionFullData.employees);
    return (
        <div className="flex flex-col gap-4">
            {/* Botón para finalizar si todos han sido evaluados */}
            {allEvaluated && (
                <button
                    className="self-end mb-4 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                    onClick={handleFinalizar}
                    disabled={loading}
                >
                    Finalizar Talent Discussion
                </button>
            )}
            {(TalentDiscussionFullData.people_leads ?? [])
                .filter((pl: any) => (peopleLeadIdToEmployees[pl.people_lead.ID_People_Lead] ?? []).length > 0)
                .map((pl: any) => (
                    <PeopleLeadCardEnProgreso
                        key={pl.people_lead.ID_People_Lead}
                        peopleLead={pl}
                        employees={peopleLeadIdToEmployees[pl.people_lead.ID_People_Lead] ?? []}
                        onEmployeeClick={(emp) => {
                            setSelectedEmployee(emp);
                            setModalOpen(true);
                        }}
                    />
                ))}
            
            {selectedEmployee && selectedEmployee.TD_Employee_Requests?.Estado === "Pendiente" && (
                <EmployeeModal
                    open={modalOpen}
                    employee={selectedEmployee}
                    onClose={() => setModalOpen(false)}
                    setLoading={setLoading}
                    loadAllData={loadAllData}
                />
            )}
        </div>
    );
}