"use client";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/certificados-empleados/apiCalls";
import CertificationsTable from "@/components/Certificaciones/CertificationsTable";
import CertificationsCards from "@/components/Certificaciones/CertificationsCards";
import { Menu, LayoutGrid } from "lucide-react";
import UploadCertificadoForm from "@/components/Certificaciones/CertificationsUpload";
import CertificationView from "@/components/Certificaciones/CertificationView";
import certification from "@/lib/certificados-empleados/definitions";
import { fetchSession } from "@/lib/certificados-empleados/apiCalls"; // Assuming fetchSession is defined here

export default function CertificacionesPage() {
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [modalType, setModalType] = useState<"upload" | "view" | "edit">("view");
    const [certifications, setCertifications] = useState<certification[]>([]);
    const [selectedCertification, setSelectedCertification] = useState<number>(0);
    const [viewMode, setViewMode] = useState<"cards" | "table">("table");

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const session = await fetchSession(setLoading);
                if (session) {
                    const data = await fetchData(session.user.id, setLoading);
                    if (data) {
                        setCertifications(data);
                    }
                }
                
                // Update session state at the end
                setSession(session);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
    
        loadData();
    }, []);
    

    return (
        <div className="container h-3/4">
            {modalOpen && (
                <div className="fixed inset-0 z-10 w-screen flex justify-center items-center">
                    <div className="bg-zinc-300 rounded-lg shadow-lg p-6 w-3/4 h-3/4">
                        <button className="text-blue-500 hover:underline" onClick={() => setModalOpen(false)}>Cerrar</button>
                        {modalType === "upload" && session && (
                            <UploadCertificadoForm
                                ID_Empleado={session.user.id}
                            />
                        )}
                        {modalType === "view" && certifications[selectedCertification] && (
                            <CertificationView documentUrl={certifications[selectedCertification].Documento} />
                        )}
                    </div>
                </div>
            )}
            <h1 className="text-gray-800 text-2xl font-bold mb-4">Certificaciones</h1>
            <p className="text-gray-600">Aquí puedes gestionar tus certificaciones.</p>

            <div className="flex justify-between">
                {/* Toggle Switch for View Modes */}
                <div className="mb-4 flex items-center">
                    <div className="relative w-20 h-10 bg-gray-200 rounded-full cursor-pointer"
                        onClick={() => setViewMode(viewMode === "table" ? "cards" : "table")}
                    >
                        <div className={`absolute top-0 left-0 w-10 h-10 bg-blue-500 rounded-full transition-transform duration-300 ${viewMode === "table" ? "translate-x-0" : "translate-x-10"}`}>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                                {viewMode === "table" ? <Menu /> : <LayoutGrid />}
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => { setModalOpen(true); setModalType("upload"); }}
                >
                    Upload
                </button>
            </div>
            {loading && <p>Cargando...</p>}

            {/* Render the appropriate view */}
            {viewMode === "table" ? (
                <CertificationsTable certifications={certifications} setModalOpen={setModalOpen} setModalType={setModalType} setSelectedCertification={setSelectedCertification} />
            ) : (
                <CertificationsCards certifications={certifications} />
            )}
        </div>
    );
}