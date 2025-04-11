import React from "react";

interface CertificationViewProps {
    documentUrl: string; // Supabase public URL for the PDF
}

function CertificationView({ documentUrl }: CertificationViewProps) {
    return (
            <div className="bg-white rounded-lg shadow-lg p-6 w-full h-full">
                {documentUrl ? (
                    <iframe
                        src={documentUrl}
                        className="w-full h-full border rounded overflow-y-clip"
                        title="Certification Document"
                        style={{ border: "none" }}
                        
                    ></iframe>
                ) : (
                    <p className="text-red-500">No document available to display.</p>
                )}
            </div>
    );
}

export default CertificationView;