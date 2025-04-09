"use client";
import Sidebar from "@/components/sidebar";
import { Home, User, Users, Folder, MessageCircle } from "lucide-react"; // Import MessageCircle icon

const routes = [
  { href: "/capability-lead", label: "Inicio", Icon: Home }, // Restored Home route
  { href: "/capability-lead/proyectos", label: "Proyectos", Icon: Folder }, // Proyectos as its own route
  { href: "/capability-lead/perfiles-de-empleados", label: "Perfiles de Empleados", Icon: Users },
  { href: "/capability-lead/talent-discussions", label: "Talent Discussions", Icon: MessageCircle }, // New Talent Discussions route
  { href: "/capability-lead/perfil", label: "Perfil", Icon: User  }
];

export default function CapabilityLeadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar routes={routes} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}