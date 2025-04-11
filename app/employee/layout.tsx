"use client";
import Sidebar from "@/components/sidebar";
import { Home, Briefcase, Award, TrendingUp, User, Target } from "lucide-react"; // Import the Target icon for Objetivos

const routes = [
  { href: "/employee", label: "Inicio", Icon: Home }, // Home route for Employee Dashboard
  { href: "/employee/proyectos", label: "Proyectos", Icon: Briefcase }, // Projects route with Briefcase icon
  { href: "/employee/certificaciones", label: "Certificaciones", Icon: Award }, // Certifications route
  { href: "/employee/path-de-carrera", label: "Path de Carrera", Icon: TrendingUp }, // Career Path route with TrendingUp icon
  { href: "/employee/objetivos", label: "Objetivos", Icon: Target }, // Objectives route with Target icon
  { href: "/employee/perfil", label: "Perfil", Icon: User }, // Profile route with User icon¨
  { href: "/employee/validarCursos", label: "Validar Cursos", Icon: User }, // Validate Courses route with User icon
];

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar routes={routes} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}