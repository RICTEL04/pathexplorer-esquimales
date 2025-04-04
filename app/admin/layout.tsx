"use client";
import Sidebar from "@/components/sidebar";
import { BookOpen, Users, Home } from "lucide-react"; // Import Home icon

const routes = [
  { href: "/admin", label: "Inicio", Icon: Home }, // Root route
  { href: "/admin/validarCursos ", label: "Validar Cursos", Icon: BookOpen },
  { href: "/admin/empleados", label: "Perfiles de Empleados", Icon: Users },
];

export default function CapabilityLeadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar routes={routes} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}