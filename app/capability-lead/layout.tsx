"use client";
import Sidebar from "@/components/sidebar";
import { BookOpen, Users, Home } from "lucide-react"; // Import Home icon

const routes = [
  { href: "/capability-lead", label: "Inicio", Icon: Home }, // Root route
  { href: "/capability-lead/validar-cursos", label: "Validar Cursos", Icon: BookOpen },
  { href: "/capability-lead/perfiles-de-empleados", label: "Perfiles de Empleados", Icon: Users },
];

export default function CapabilityLeadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar routes={routes} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}