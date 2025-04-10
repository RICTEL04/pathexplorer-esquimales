import React from "react";
import CertificationsRow from "./CertificationsRow";
import { useState } from "react";

interface CertificationsTableProps {
    certifications: any[];
    setModalOpen: (open: boolean) => void;
    setModalType: (type: "view") => void;
}

interface certification {
    Nombre: string;
    Fecha_caducidad: string;
    Verificacion: boolean | null;
    id: string;
}

export default function CertificationsTable({ certifications, setModalOpen, setModalType }: CertificationsTableProps) {

    const handleSave = (updatedCertification: certification) => {
        // Logic to save the updated certification data
        console.log("Updated Certification:", updatedCertification);
    };
    
    const [tempValues, setTempValues] = useState({
            Nombre: certifications[0]?.Nombre || "",
            Fecha_caducidad: certifications[0]?.Fecha_caducidad || "",
        });

    const handleCancel = (certification : any) => {
        setTempValues({
            Nombre: certification.Nombre,
            Fecha_caducidad: certification.Fecha_caducidad,
        }); // Reset to original values
        setIsEditing(false);
    };

    // Handle input changes for editing
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTempValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEdit = (certification: any) => {
        setTempValues({
            Nombre: certification.Nombre,
            Fecha_caducidad: certification.Fecha_caducidad,
        });
        setIsEditing(true);
    }

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
                {certifications.map((certification) => (
                    <tr
                        key={certification.id}
                        className="hover:bg-gray-100 cursor-pointer"
                        onDoubleClick={() => {setModalOpen(true); setModalType("view");}} // Open modal on double-click
                    >
                        <CertificationsRow
                            certification={certification}
                            setModalOpen={setModalOpen}
                            onSave={handleSave}
                        />
                    </tr>
                ))}
            </tbody>
        </table>
    );
}