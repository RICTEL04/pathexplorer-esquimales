"use client";
import Sidebar from "@/components/sidebar";
import { BookOpen, Users, Map } from "lucide-react"; // Import the Map icon

const routes = [
  { href: "/capability-lead/cursos", label: "Cursos", Icon: BookOpen },
  { href: "/capability-lead/empleados", label: "Empleados", Icon: Users },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar routes={routes} />
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-gray-800 text-2xl font-bold">Dashboard de Capability Lead</h1>
        <p className="text-gray-600">Selecciona una opción en la barra lateral.</p>
      </main>
    </div>
  );
}