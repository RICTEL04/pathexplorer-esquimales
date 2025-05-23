import { supabase } from "../supabase";
import { Evaluacion, ProyectoTerminado } from "./definitions";

type RawRecord = {
    ID_Proyecto: string;
    Nombre: string;
    ID_Cliente: string | null;
    Descripcion: string;
    ID_DeliveryLead: string;
    fecha_inicio: string;
    fecha_fin: string;
    isAutoevaluacion: boolean;
    Fortalezas: string;
    Area_Mejora: string;
    Calificacion: number;
};


export async function getProyectosTerminados(empleadoID: string) {
    // Call a function named 'my_function' with parameters
    const { data, error } = await supabase.rpc('select_proyectos_terminados_empleado', {
        p_id_empleado: empleadoID,
    });
    if (error) {
        console.error("Error calling function:", error);
    }
    return data ? mapToProyectosTerminados(data as RawRecord[]) : [];
}

function mapToProyectosTerminados(data: RawRecord[]): ProyectoTerminado[] {
    data.sort((a, b) => Number(a.isAutoevaluacion) - Number(b.isAutoevaluacion));
    const proyectosMap = new Map<string, ProyectoTerminado>();

    data.forEach((record) => {
        const id = record.ID_Proyecto;
        if (!proyectosMap.has(id)) {
            proyectosMap.set(id, {
                ID_Proyecto: id,
                Nombre: record.Nombre,
                ID_Cliente: record.ID_Cliente,
                Descripcion: record.Descripcion,
                ID_DeliveryLead: record.ID_DeliveryLead,
                fecha_inicio: record.fecha_inicio,
                fecha_fin: record.fecha_fin,
                ID_Empleado: (record as any).ID_Empleado ?? "", // Add this line, adjust as needed
                Evaluacion: null,
                AutoEvaluacion: null,
            });
        }
        const evaluacion: Evaluacion = {
            Fortalezas: record.Fortalezas,
            Areas_Mejora: record.Area_Mejora,
            Calificacion: record.Calificacion,
        };
        if (record.isAutoevaluacion) {
            proyectosMap.get(id)!.AutoEvaluacion = evaluacion;
        } else {
            proyectosMap.get(id)!.Evaluacion = evaluacion;
        }
    });
    const proyectosTerminados = Array.from(proyectosMap.values());
    return proyectosTerminados;
}
