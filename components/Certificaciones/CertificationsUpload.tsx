import { uploadCertificado } from "@/lib/certificados-empleados/uploadCertificado";
import React, { useState } from "react";

interface UploadCertificadoFormProps {
    ID_Empleado: string; // Employee ID to associate the certificate with
}

export default function UploadCertificadoForm({ ID_Empleado }: UploadCertificadoFormProps) {
    const [NombreCertificado, setNombreCertificado] = useState("");
    const [Fecha, setFecha] = useState("");
    const [Documento, setDocumento] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDocumento(e.target.files[0]); // Capture the selected file
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!ID_Empleado || !NombreCertificado || !Fecha || !Documento) {
            setUploadStatus("Please fill in all fields and select a file.");
            return;
        }

        setUploadStatus("Uploading...");

        const result = await uploadCertificado(ID_Empleado, NombreCertificado, Fecha, Documento);

        if (result.success) {
            setUploadStatus("File uploaded successfully!");
        } else {
            setUploadStatus(`Error: ${result.error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="NombreCertificado" className="block text-sm font-medium text-gray-700">
                    Certificate Name
                </label>
                <input
                    type="text"
                    id="NombreCertificado"
                    value={NombreCertificado}
                    onChange={(e) => setNombreCertificado(e.target.value)}
                    className="mt-1 block w-full text-gray-500 border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div>
                <label htmlFor="Fecha" className="block text-sm font-medium text-gray-700">
                    Date
                </label>
                <input
                    type="date"
                    id="Fecha"
                    value={Fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="mt-1 block w-full text-gray-500 border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div>
                <label htmlFor="Documento" className="block text-sm font-medium text-gray-700">
                    Upload PDF
                </label>
                <input
                    type="file"
                    id="Documento"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-gray-500 border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Upload
            </button>
            {uploadStatus && <p className="mt-2 text-sm text-gray-600">{uploadStatus}</p>}
        </form>
    );
}

