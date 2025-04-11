import React from "react";
import CertificationsRow from "./CertificationsRow";
import { useState } from "react";
import certification from "@/lib/certificados-empleados/definitions";

interface CertificationsTableProps {
    certifications: certification[];
    setModalOpen: (open: boolean) => void;
    setModalType: (type: "view") => void;
    setSelectedCertification: (certification: number) => void;
}

export default function CertificationsTable({ certifications, setModalOpen, setModalType, setSelectedCertification }: CertificationsTableProps) {

    const handleSave = (updatedCertification: certification) => {
        // Logic to save the updated certification data
        console.log("Updated Certification:", updatedCertification);
    };

    const [isEditing, setIsEditing] = useState(false);
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-md shadow-md overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Fecha</th>
                    <th className="px-6 py-3">Estatus</th>
                    <th className="px-6 py-3"></th>
                </tr>
            </thead>
            <tbody className="bg-white border-b border-gray-200">
                {certifications.map((certification, index) => (
                    <tr
                        key={certification.id}
                        className="hover:bg-gray-100 cursor-pointer"
                        onDoubleClick={() => {setModalOpen(true); setModalType("view"); setSelectedCertification(index)}} // Open modal on double-click
                    >
                        <CertificationsRow
                            certification={certification}
                            onSave={handleSave}
                        />
                    </tr>
                ))}
            </tbody>
        </table>
    );
}