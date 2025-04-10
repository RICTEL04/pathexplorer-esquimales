import React from "react";
import CertificationsCard from "./CertificationsCard";

interface CertificationsCardsProps {
    certifications: any[];
    setModalOpen: (open: boolean) => void;
}

export default function CertificationsCards({ 
    certifications, 
    setModalOpen,
}: CertificationsCardsProps) {

    const handleSave = (updatedCertification: any) => {
        // Logic to save the updated certification data
        console.log("Updated Certification:", updatedCertification);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((certification) => (
                <CertificationsCard
                    key={certification.id}
                    certification={certification}
                    setModalOpen={setModalOpen}
                    onSave={handleSave}
                />
            ))}
        </div>
    );
}