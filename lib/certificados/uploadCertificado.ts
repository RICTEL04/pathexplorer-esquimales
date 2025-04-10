import { supabase } from "../supabase";

export async function uploadCertificado(
    ID_Empleado: string,
    NombreCertificado: string,
    Fecha: string,
    Documento: File
) {
    console.log("Upload data:", {
        ID_Empleado,
        NombreCertificado,
        Fecha,
        Documento,
    });
    // Step 1: Upload the PDF to the Supabase storage bucket
    const bucketName = "documentos"; // Replace with your bucket name
    const filePath = `${ID_Empleado}/${Documento.name}`; // Define a unique path for the file

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, Documento, {
            contentType: Documento.type,
            upsert: true, // Overwrite if the file already exists
        });

    if (uploadError) {
        console.error("Error uploading file:", uploadError.message);
        return { success: false, error: uploadError.message };
    }

    // Step 2: Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

    const publicUrl = publicUrlData?.publicUrl;
    console.log("Public URL:", publicUrl);

    if (!publicUrl) {
        console.error("Error generating public URL for the file.");
        return { success: false, error: "Failed to generate public URL." };
    }

    // Step 3: Insert the file info into the Supabase table
    const { data, error } = await supabase
        .from("Certificados")
        .insert({
            Nombre: NombreCertificado,
            Fecha_caducidad: Fecha,
            ID_Empleado: ID_Empleado,
            documento: publicUrl, // Store the public URL in the "documento" column
        });

    if (error) {
        console.error("Error inserting data into the table:", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data };
}