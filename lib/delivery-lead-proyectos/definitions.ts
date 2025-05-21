
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
  ID_Proyecto: string;
  Nombre: string;
  Descripcion: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  Status: string;
  ID_DeliveryLead: string;
  ID_Cliente?: string;
  isReviewed?: boolean;
  cargabilidad?: number;
  roles?: {
    puesto: string;
    cantidad: number;
  }[];
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