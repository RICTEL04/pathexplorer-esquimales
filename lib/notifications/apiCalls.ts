import { supabase } from "../supabase";
import { Notification } from "@/components/Notificaciones/NotificationsButton";

export async function fetchNotificationsByEmployee(employeeId: string) {
    const { data, error } = await supabase
        .from('Notificaciones')
        .select('*')
        .eq('ID_Empleado', employeeId)
        .order('created_at', { ascending: false });

    console.log("Fetched notifications:", data);
    if (error) throw error;
    const notifications = data.map((notification: any) => ({
        ID: notification.id,
        ID_Empleado: notification.ID_Empleado,
        Titulo: notification.Titulo,
        Descripcion: notification.Desc,
        Fecha: notification.created_at ? notification.created_at.split('T')[0] : "", // Format date as YYYY-MM-DD
    })) as Notification[];
    return notifications;
}