import React from "react";
import CertificationsCard from "./CertificationsCard";
import certification from "@/lib/certificados-empleados/definitions";
import CertificationView from "./CertificationView";

interface CertificationsCardsProps {
    certifications: certification[];
}

export default function CertificationsCards({
    certifications,
}: CertificationsCardsProps) {
    const [selectedCertification, setSelectedCertification] = React.useState<number>(0);

    const handleSave = (updatedCertification: certification) => {
        // Logic to save the updated certification data
        console.log("Updated Certification:", updatedCertification);
    }

    return (
        <div className="flex flex-row h-[75vh]">
            <div className="flex flex-col gap-4 w-1/3 pr-2 overflow-y-scroll overflow-x-hidden">
                {certifications.map((certification, index) => (
                    <CertificationsCard
                        key={certification.id}
                        certification={certification}
                        onSave={handleSave}
                        setSelectedCertification={setSelectedCertification}
                        index={index}
                    />
                ))}
            </div>
            <div className="flex flex-col w-2/3 pl-2">
                <CertificationView documentUrl={certifications[selectedCertification].Documento} />
            </div>
        </div>

    );
}