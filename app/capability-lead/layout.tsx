"use client";
import Sidebar from "@/components/sidebar";
import { Home, Users, User, Folder, MessageCircle } from "lucide-react"; // Import MessageCircle icon
import {supabase } from "@/lib/supabase"

const { data: { session } } = await supabase.auth.getSession();

const routes = [
  { href: "/capability-lead", label: "Inicio", Icon: Home }, // Restored Home route
  { href: "/capability-lead/proyectos", label: "Proyectos", Icon: Folder }, // Proyectos as its own route
  { href: "/capability-lead/perfiles-de-empleados", label: "Perfiles de Empleados", Icon: Users },
  { href: "/capability-lead/talent-discussions", label: "Talent Discussions", Icon: MessageCircle }, // New Talent Discussions route
  { href: "/capability-lead/perfil/" + session?.user.id, label: "Perfil" , Icon: User}
];

export default function CapabilityLeadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar routes={routes} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}