import React from "react";
import CertificationsCard from "./CertificationsCard";
import certification from "@/lib/certificados-empleados/definitions";
import CertificationView from "./CertificationView";

interface CertificationsCardsProps {
    certifications: certification[];
    handleSave: (updatedCertification: certification) => void;
}

export default function CertificationsCards({
    certifications,
    handleSave,
}: CertificationsCardsProps) {
    const [selectedCertification, setSelectedCertification] = React.useState<number>(0);

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
                {certifications.length > 0 && certifications[selectedCertification] ? (
                    <CertificationView documentUrl={certifications[selectedCertification].Documento} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p className="text-lg">Selecciona una certificación para ver los detalles</p>
                    </div>
                )}
            </div>
        </div>

    );
}