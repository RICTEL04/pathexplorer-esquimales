import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import certification from "./definitions";

export async function fetchSession(setLoading: (loading: boolean) => void) {
    // Obtener la sesión actual
    const { data: { session } } = await supabase.auth.getSession();
    return session;
};



// This function fetches data from the Supabase database based on the employee ID provided.
export async function fetchData(employeeID: string, setLoading: (loading: boolean) => void) {
    let data = null;
    try {
        const response = await supabase
            .from("Certificados")
            .select("*")
            .eq("ID_Empleado", employeeID);

        data = response.data;
        if (response.error) {
            throw response.error;
        }
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
    finally {
        setLoading(false);
    }
    return data;
}

export async function updateCertificate(updatedData: certification) {
    try {
        const { data, error } = await supabase
            .from("Certificados")
            .update({
                Nombre: updatedData.Nombre,
                Fecha_caducidad: updatedData.Fecha_caducidad,
            })
            .eq("ID_Certificado", updatedData.ID_Certificado);

        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error("Error updating certificate:", error);
    }
}
