export interface DeliveryLead {
    ID_DeliveryLead: string;
    ID_Empleado: string;
}

export interface Employee {
    ID_Empleado: string;
    Nombre: string;
    Rol: string;
    isReviewed: boolean;
}

export interface ProjectJson {
    ID_Proyecto: number;
    Nombre: string;
    Status: string;
    // Agrega aquí las propiedades que llegan de Supabase
    ID_DeliveryLead: string;
    Cliente?: string;
    ID_Cliente?: number;
    Fecha_Inicio?: string;
    Fecha_Fin?: string;
    Rol?: string;
    Descripcion?: string;
    // ...otras propiedades si existen...
}

export interface Review {
    ID_Empleado: string;
    ID_Proyecto: string;
    ID_DeliveryLead: string;
    Calificacion: number;
    Fortalezas: string;
    Areas_Mejora: string;
    esAutoevaluacion?: boolean;
}