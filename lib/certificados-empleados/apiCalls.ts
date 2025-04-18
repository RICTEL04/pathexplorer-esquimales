import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
