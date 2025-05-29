import certification from "@/lib/certificados-empleados/definitions";
import React, { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";

interface CertificationCardProps {
    certification: certification;
    onSave: (updatedCertification: certification) => void;
}

function CertificationsRow({ certification, onSave }: CertificationCardProps) {
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
        <>
        {!isEditing ? (
            <>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{certification.Nombre}</td>
                <td className="px-6 py-4">{certification.Fecha_caducidad}</td>
                <td className="px-6 py-4">{certification.Verificacion === true ? "Aprobado" : certification.Verificacion === false ? "Rechazado" : "Pendiente"}</td>
                <td className="px-6 py-4">
                    <button className="text-blue-500 hover:underline" onClick={() => handleEdit()}>Editar</button>
                </td>
            </>
        ) : (
            <>
                <td colSpan={4}>
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
                        onClick={() => handleSave()}
                    >
                        Save
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </td>
            </>
        )}
        </>
    );
}

export default CertificationsRow;