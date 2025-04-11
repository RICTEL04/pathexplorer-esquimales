"use client";
import { useEffect, useState } from 'react';
import Sidebar from "@/components/sidebar";
import { Home, Users, User, Folder, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CapabilityLeadLayout({ children }: { children: React.ReactNode }) {
  const [routes, setRoutes] = useState([
    { href: "/capability-lead", label: "Inicio", Icon: Home },
    { href: "/capability-lead/proyectos", label: "Proyectos", Icon: Folder },
    { href: "/capability-lead/perfiles-de-empleados", label: "Perfiles de Empleados", Icon: Users },
    { href: "/capability-lead/talent-discussions", label: "Talent Discussions", Icon: MessageCircle },
    { href: "/capability-lead/perfil/loading", label: "Perfil", Icon: User } // Estado inicial
  ]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user.id) {
        setRoutes(prevRoutes => {
          const newRoutes = [...prevRoutes];
          const profileIndex = newRoutes.findIndex(route => route.label === "Perfil");
          if (profileIndex !== -1) {
            newRoutes[profileIndex] = {
              ...newRoutes[profileIndex],
              href: `/capability-lead/perfil/${session.user.id}`
            };
          }
          return newRoutes;
        });
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