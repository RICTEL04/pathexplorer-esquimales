import certification from "@/lib/certificados-empleados/definitions";
import React, { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";

interface CertificationCardProps {
    certification: certification;
    onSave: (updatedCertification: any) => void; // Callback for saving changes
    setSelectedCertification: (id: number) => void; // Callback to set selected certification
    index: number;
}

function CertificationCard({ certification, onSave, setSelectedCertification, index }: CertificationCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValues, setTempValues] = useState({
        Nombre: certification.Nombre,
        Fecha_caducidad: certification.Fecha_caducidad,
    });

    // Change card state to editing mode
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Pass updated data to parent
    const handleSave = () => {
        onSave({ ...certification, ...tempValues });
        setIsEditing(false);
    };

    const handleCancel = () => {
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

    return (
        <div className="bg-white text-gray-500 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow hover:bg-gray-200 cursor-pointer">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="Nombre"
                        value={tempValues.Nombre}
                        onChange={handleChange}
                        className="w-full border rounded p-2 mb-2"
                    />
                    <input
                        type="date"
                        name="Fecha_caducidad"
                        value={tempValues.Fecha_caducidad}
                        onChange={handleChange}
                        className="w-full border rounded p-2 mb-2"
                    />
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div onClick={() => setSelectedCertification(index)}>
                    <h3 className="text-lg font-bold text-gray-800">{certification.Nombre}</h3>
                    <p className="text-gray-600">Fecha Caducidad: {certification.Fecha_caducidad}</p>
                    <div className="text-gray-600 mb-2">
                        Estatus: {certification.Verificacion === true
                            ? "Verificado"
                            : certification.Verificacion === false
                            ? "Rechazado"
                            : "Procesando"}
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                        <button
                            className="text-blue-500 hover:underline flex items-center"
                            onClick={handleEdit}
                        >
                            <FaEdit className="mr-1" /> Editar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CertificationCard;