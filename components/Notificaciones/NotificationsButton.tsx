import { fetchNotificationsByEmployee } from "@/lib/notifications/apiCalls";
import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";

export interface Notification {
    ID: number;
    ID_Empleado: string;
    Titulo: string;
    Descripcion: string;
    Fecha: string;
}

export const NotificationsButton = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error || !session?.user) {
                    console.error("No session found or error fetching session:", error);
                    return;
                }
                if (session?.user) {
                    const data = await fetchNotificationsByEmployee(session.user.id);
                    setNotifications(data);
                } else {
                    setNotifications([]);
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }
        fetchNotifications();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        if (!open) return;
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="relative p-2 text-gray-600 hover:text-gray-800"
                onClick={() => setOpen((prev) => !prev)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 22a2 2 0 002-2H8a2 2 0 002 2zm6-6V9a6 6 0 10-12 0v7l-2 2v1h16v-1l-2-2z"
                    />
                </svg>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {notifications.length}
                </span>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-80 max-h-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="p-4 border-b font-semibold text-gray-700">
                        Notificaciones
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-gray-500 text-sm text-center">
                                No tienes notificaciones.
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <div key={n.ID} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
                                    <div className="font-medium text-gray-800">{n.Titulo}</div>
                                    <div className="text-gray-600 text-sm">{n.Descripcion}</div>
                                    <div className="text-gray-400 text-xs mt-1">{new Date(n.Fecha).toLocaleString()}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}