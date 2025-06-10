"use client";
import Sidebar from "@/components/sidebar";
import { BookOpen, Users, Home, Ratio, Boxes, Album, Folders } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";

const routes = [
  { href: "/admin", label: "Inicio", Icon: Home }, // Root route
  { href: "/admin/cursos", label: "Administrar Cursos", Icon: BookOpen },
  { href: "/admin/empleados", label: "Perfiles de Empleados", Icon: Users },
  { href: "/admin/departamento", label: "Administrar Capabilities", Icon: Ratio },
  { href: "/admin/habilidades", label: "Administrar Habilidades", Icon: Boxes },
  { href: "/admin/leads", label: "Administrar People leads", Icon: Album },
  { href: "/admin/proyectos", label: "Administrar Proyectos", Icon: Folders },
];

export default function CapabilityLeadLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Hover detection area - only visible when sidebar is closed */}
      {!isSidebarOpen && (
        <div 
          onMouseEnter={() => setIsSidebarOpen(true)}
          className="fixed inset-y-0 left-0 z-30 w-16 h-full bg-transparent"
        />
      )}
      
      <Sidebar 
        routes={routes} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />

      
      
      <div className="flex-1 flex flex-col pt-12">
              <Header />
              <main 
              className={`flex-1 p-6 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              {children}
            </main>
            </div>
    </div>
  );
}