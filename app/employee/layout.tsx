"use client";
import { useEffect, useState } from 'react';
import Sidebar from "@/components/sidebar";
import { Home, Briefcase, Award, TrendingUp, User, Target } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Rutas estáticas que no dependen de la sesión
const staticRoutes = [
  { href: "/employee", label: "Inicio", Icon: Home },
  { href: "/employee/proyectos", label: "Proyectos", Icon: Briefcase },
  { href: "/employee/certificaciones", label: "Certificaciones", Icon: Award },
  { href: "/employee/path-de-carrera", label: "Path de Carrera", Icon: TrendingUp },
  { href: "/employee/objetivos", label: "Objetivos", Icon: Target },
];

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const [routes, setRoutes] = useState([...staticRoutes, { href: "/employee/perfil/loading", label: "Perfil", Icon: User }]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user.id) {
          setRoutes([
            ...staticRoutes,
            { href: `/employee/perfil/${session.user.id}`, label: "Perfil", Icon: User }
          ]);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        // Mantener la ruta de loading o mostrar un estado de error
        setRoutes([
          ...staticRoutes,
          { href: "/employee/perfil/error", label: "Perfil", Icon: User }
        ]);
      }
    };

    fetchSession();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar routes={routes} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}