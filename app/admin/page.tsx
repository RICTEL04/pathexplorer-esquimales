"use client";
import Sidebar from "@/components/sidebar";
import { BookOpen, Users, Map } from "lucide-react"; // Import the Map icon

const routes = [
  { href: "/admin/cursos", label: "Cursos", Icon: BookOpen },
  { href: "/admin/empleados", label: "Empleados", Icon: Users },
  { href: "/admin/path", label: "Path", Icon: Map }, // New route added
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar routes={routes} />
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-gray-800 text-2xl font-bold">Dashboard de Administrador</h1>
        <p className="text-gray-600">Selecciona una opción en la barra lateral.</p>
      </main>
    </div>
  );
}