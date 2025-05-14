"use client";
import Sidebar from "@/components/sidebar";
import { BookOpen, Users, Home, Ratio, Boxes, Album } from "lucide-react"; // Import Home icon

const routes = [
  { href: "/admin", label: "Inicio", Icon: Home }, // Root route
  { href: "/admin/cursos", label: "Administrar Cursos", Icon: BookOpen },
  { href: "/admin/empleados", label: "Perfiles de Empleados", Icon: Users },
  { href: "/admin/departamento", label: "Administrar Capabilities", Icon: Ratio },
  { href: "/admin/habilidades", label: "Administrar Habilidades", Icon: Boxes },
  { href: "/admin/leads", label: "Administrar People leads", Icon: Album },
];

export default function CapabilityLeadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar routes={routes} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}