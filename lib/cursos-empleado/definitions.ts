export interface course {
    Nombre: string;
    Fecha_fin_curso: string;
    link: string;
    ID_Habilidad: string;
    skill: skill;
}

export interface skill {
    ID_Habilidad: string;
    Tipo: string;
    Descripcion: string;
}