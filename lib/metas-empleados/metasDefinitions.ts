// metasDefinitions.ts
export interface Empleado {
  ID_Empleado: string;
  Nombre: string;
  // Otros campos de empleado que puedas necesitar
}

export interface Revisor_Meta {
  ID_Revisor: string;
  ID_EmpleadoRevisor: string;   
  ID_meta: string;
  ID_Empleado: string;
  Retroalimentacion: string | null;
  Nombre: string; // Nombre del revisor (de la tabla Empleados)
}

export interface Meta {
  ID_meta: string;
  Nombre: string;
  Tipo_Meta: string;
  Plazo: string;
  Descripcion: string;
  Fecha_Inicio: Date;
  Fecha_limite: Date;
  ID_Empleado: string;
  Registrada: boolean;
  Estado: string;
  Self_Reflection?: string | null;
  Revisores: Revisor_Meta[]; // Lista de revisores asociados
}

export default Meta;