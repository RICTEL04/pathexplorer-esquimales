
export interface ProyectoTerminado {
    ID_Proyecto: string;
    ID_Empleado: string;
    ID_Cliente: string | null;
    Nombre: string;
    Descripcion: string;
    ID_DeliveryLead: string;
    fecha_inicio: string;
    fecha_fin: string;
    Evaluacion: Evaluacion | null;
    AutoEvaluacion: Evaluacion | null;
}

export interface Evaluacion{
    Fortalezas: string;
    Areas_Mejora: string;
    Calificacion: number;
}