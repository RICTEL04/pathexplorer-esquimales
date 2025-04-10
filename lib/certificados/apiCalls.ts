import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export async function fetchData(employeeID: string, setLoading: (loading: boolean) => void, setError: (error: unknown) => void) {
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
        setError(error);
    }
    finally {
        setLoading(false);
    }
    return data;
}