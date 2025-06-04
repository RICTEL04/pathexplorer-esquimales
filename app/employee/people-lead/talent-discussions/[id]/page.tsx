"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchSession } from "@/lib/metas-empleados/apiCallsMetas";
import { Talent_Discussion, employeeForTalentDiscussion } from "@/lib/talent-discussions/talentDiscussionDefinitions";
import { getPeopleLeadIdForEmployee, getEmployeesByTalentDiscussionAndPeopleLead, getTalentDiscussionByIdAndPeopleLead, actualizarEstadoPeopleLeadYCrearRequests } from "@/lib/talent-discussions/people_lead/PeopleLeadAPICalls";
import { EmployeeCard } from "@/components/Talent_Discussions/People_Lead/EmployeeForTalentDiscussion";
import { crearEmployeeRequestConCapabilityLead } from "@/lib/talent-discussions/people_lead/PeopleLeadAPICalls";
import { ModalFormularioEmpleado } from "@/components/Talent_Discussions/People_Lead/ModalFormularioEmpleado";
import { ModalDetalleSolicitud } from "@/components/Talent_Discussions/People_Lead/ModalDetalleSolicitud";

function ConfirmModal({ open, onClose, onConfirm, count }: { open: boolean, onClose: () => void, onConfirm: () => void, count: number }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">¿Estás seguro?</h2>
                <p className="mb-4">Aún faltan <span className="font-bold">{count}</span> empleados por asignar solicitud. ¿Deseas continuar?</p>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancelar</button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Sí, continuar</button>
                </div>
            </div>
        </div>
    );
}

export default function TalentDiscussionWithID() {
    const params = useParams();
    const id = params?.id as string;
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [ID_PeopleLead, setID_PeopleLead] = useState<string | null>(null);
    const [TalentDiscussion, setTalentDiscussion] = useState<Talent_Discussion | null>(null);
    const [EmployeesByNivel, setEmployeesByNivel] = useState<employeeForTalentDiscussion[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<employeeForTalentDiscussion | null>(null);

    const [detalleModalOpen, setDetalleModalOpen] = useState(false);
    const [detalleEmployee, setDetalleEmployee] = useState<employeeForTalentDiscussion | null>(null);

    // Confirm modal state
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingIds, setPendingIds] = useState<string[]>([]);
    const [pendingEstado, setPendingEstado] = useState<string>("");

    const handleOpenDetalleModal = (employee: employeeForTalentDiscussion) => {
        setDetalleEmployee(employee);
        setDetalleModalOpen(true);
    };

    const handleOpenModal = (employee: employeeForTalentDiscussion) => {
        setSelectedEmployee(employee);
        setModalOpen(true);
    };

    const handleSubmitSolicitud = async (descripcion: string) => {
        if (!selectedEmployee || !TalentDiscussion) return;
        await crearEmployeeRequestConCapabilityLead(
            setLoading,
            selectedEmployee.ID_Empleado,
            TalentDiscussion.ID_Talent_Discussion,
            descripcion,
            selectedEmployee.ID_CapabilityLead,
        );
        if (ID_PeopleLead && TalentDiscussion) {
            const EmployeesByNivelData = await getEmployeesByTalentDiscussionAndPeopleLead(setLoading, ID_PeopleLead, TalentDiscussion.ID_Talent_Discussion);
            setEmployeesByNivel(EmployeesByNivelData);
        }
    };

    useEffect(() => {
        const loadData = async (): Promise<void> => {
            try {
                setLoading(true);
                const session2 = await fetchSession(setLoading);
                setSession(session2);

                if (session2?.user?.id) {
                    const ID_PeopleLead2 = await getPeopleLeadIdForEmployee(setLoading, session2.user.id);
                    if (ID_PeopleLead2) {
                        setID_PeopleLead(ID_PeopleLead2);
                        const TalentDiscussionData = await getTalentDiscussionByIdAndPeopleLead(setLoading, id, ID_PeopleLead2);
                        setTalentDiscussion(TalentDiscussionData);
                        if (TalentDiscussionData) {
                            const EmployeesByNivelData = await getEmployeesByTalentDiscussionAndPeopleLead(setLoading, ID_PeopleLead2, TalentDiscussionData.ID_Talent_Discussion);
                            setEmployeesByNivel(EmployeesByNivelData);
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

    if (!id) {
        return <div>ID no encontrado en la URL</div>;
    }

    const employeesSinSolicitud = EmployeesByNivel.filter(
        emp => !emp.TD_Employee_Requests || 
                emp.TD_Employee_Requests === undefined || 
                emp.TD_Employee_Requests === null ||
                emp.TD_Employee_Requests.Estado === "No Asignado" 
    );
    const employeesConSolicitud = EmployeesByNivel.filter(
        emp => emp.TD_Employee_Requests && 
               emp.TD_Employee_Requests != null && 
               emp.TD_Employee_Requests !== undefined &&
                emp.TD_Employee_Requests.Estado !== "No Asignado"
    );

    // Botón de asignación masiva
    const handleAsignarSolicitudes = () => {
        let estado = "";
        let ids: string[] = [];
        if (employeesSinSolicitud.length === 0 && employeesConSolicitud.length > 0) {
            estado = "Asignados";
            ids = [];
            ejecutarAsignacion(estado, ids);
        } else if (employeesSinSolicitud.length > 0 && employeesConSolicitud.length > 0) {
            estado = "Asignados";
            ids = employeesSinSolicitud.map(emp => emp.ID_Empleado);
            setPendingEstado(estado);
            setPendingIds(ids);
            setConfirmOpen(true);
        } else if (employeesSinSolicitud.length > 0 && employeesConSolicitud.length === 0) {
            estado = "No Asignados";
            ids = employeesSinSolicitud.map(emp => emp.ID_Empleado);
            setPendingEstado(estado);
            setPendingIds(ids);
            setConfirmOpen(true);
        }
    };

    const ejecutarAsignacion = async (estado: string, ids: string[]) => {
        if (!ID_PeopleLead || !TalentDiscussion) return;
        await actualizarEstadoPeopleLeadYCrearRequests(
            setLoading,
            ID_PeopleLead,
            TalentDiscussion.ID_Talent_Discussion,
            ids,
            estado
        );
        // Refrescar empleados
        const EmployeesByNivelData = await getEmployeesByTalentDiscussionAndPeopleLead(setLoading, ID_PeopleLead, TalentDiscussion.ID_Talent_Discussion);
        setEmployeesByNivel(EmployeesByNivelData);
        setConfirmOpen(false);
    };

    return (
        <div>
            <h1 className="text-gray-800 text-2xl font-bold mb-4">{TalentDiscussion?.Discussion || "Talent Discussion"}</h1>
            {TalentDiscussion && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p><span className="font-semibold">Nivel:</span> {TalentDiscussion.Nivel}</p>
                            <p><span className="font-semibold">Estado:</span> {TalentDiscussion.Estado}</p>
                            <p><span className="font-semibold">Estado (People Lead):</span> {TalentDiscussion.Estado_TD_People_Lead || "-"}</p>
                        </div>
                        <div>
                            <p><span className="font-semibold">Talent Lead:</span> {TalentDiscussion.Nombre_Talent_Lead}</p>
                            <p><span className="font-semibold">ID Talent Lead:</span> {TalentDiscussion.ID_Talent_Lead}</p>
                            <p><span className="font-semibold">Fecha Inicio:</span> {TalentDiscussion.Fecha_Inicio ? new Date(TalentDiscussion.Fecha_Inicio).toLocaleDateString() : "-"}</p>
                            <p><span className="font-semibold">Fecha Final:</span> {TalentDiscussion.Fecha_Final ? new Date(TalentDiscussion.Fecha_Final).toLocaleDateString() : "-"}</p>
                        </div>
                    </div>

                    { TalentDiscussion.Estado_TD_People_Lead === "Pendiente"&& (
                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
                                onClick={handleAsignarSolicitudes}
                                disabled={loading}
                            >
                                Asignar solicitudes masivamente
                            </button>
                        </div>
                    )}


                </div>
            )}
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[200px]">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Cargando información...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-lg font-semibold text-blue-700 mb-2">Sin Solicitud</h2>
                        {employeesSinSolicitud.length > 0 ? (

                            TalentDiscussion?.Estado_TD_People_Lead === "Pendiente" ? (
                                employeesSinSolicitud.map(emp => (
                                    <div key={emp.ID_Empleado} onClick={() => handleOpenModal(emp)} className="cursor-pointer">
                                        <EmployeeCard employee={emp} />
                                    </div>
                                ))
                            ):(
                                employeesSinSolicitud.map(emp => (
                                    <div key={emp.ID_Empleado} onClick={() => handleOpenDetalleModal(emp)} className="cursor-pointer">
                                        <EmployeeCard employee={emp} />
                                    </div>
                                ))     
                            )


                        ) : (
                            <div className="text-gray-500">No hay empleados sin solicitud.</div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-green-700 mb-2">Con Solicitud</h2>
                        {employeesConSolicitud.length > 0 ? (
                            employeesConSolicitud.map(emp => (
                                <div key={emp.ID_Empleado} onClick={() => handleOpenDetalleModal(emp)} className="cursor-pointer">
                                    <EmployeeCard employee={emp} />
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500">No hay empleados con solicitud.</div>
                        )}
                    </div>
                </div>
            )}

            <ModalDetalleSolicitud
                open={detalleModalOpen}
                onClose={() => setDetalleModalOpen(false)}
                employee={detalleEmployee}
            />

            <ModalFormularioEmpleado
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmitSolicitud}
            />

            <ConfirmModal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => ejecutarAsignacion(pendingEstado, pendingIds)}
                count={pendingIds.length}
            />
        </div>
    );
}