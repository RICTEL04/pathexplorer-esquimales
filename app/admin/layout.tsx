"use client";
import Sidebar from "@/components/sidebar";
import { BookOpen, Users, Home, Ratio, Boxes, Album, Folders, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const routes = [
  { href: "/admin", label: "Inicio", Icon: Home },
  { href: "/admin/cursos", label: "Administrar Cursos", Icon: BookOpen },
  { href: "/admin/empleados", label: "Perfiles de Empleados", Icon: Users },
  { href: "/admin/departamento", label: "Administrar Capabilities", Icon: Ratio },
  { href: "/admin/habilidades", label: "Administrar Habilidades", Icon: Boxes },
  { href: "/admin/leads", label: "Administrar People leads", Icon: Album },
  { href: "/admin/proyectos", label: "Administrar Proyectos", Icon: Folders },
];

function AccessDeniedModal({ show }: { show: boolean }) {
  const router = useRouter();
  if (!show) return null;

  const handleRedirect = () => {
    router.replace("/employee");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300"
      onClick={handleRedirect}
      style={{ cursor: "pointer" }}
    >
      <div
        className="bg-white p-10 rounded-xl shadow-2xl border border-gray-200 flex flex-col items-center animate-fade-in"
        onClick={e => e.stopPropagation()}
        style={{ cursor: "default" }}
      >
        <div className="bg-red-100 rounded-full p-3 mb-4">
          <AlertTriangle className="text-red-500 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold mb-2 text-gray-800">Acceso denegado</h2>
        <p className="mb-6 text-gray-600 text-center">
          No tienes acceso a este sitio.<br />
          Si crees que esto es un error, contacta a tu administrador.
        </p>
        <button
          className="px-6 py-2 bg-red-600 hover:bg-red-700 transition text-white font-semibold rounded-lg shadow"
          onClick={handleRedirect}
        >
          Ir a inicio
        </button>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95);}
          to { opacity: 1; transform: scale(1);}
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease;
        }
      `}</style>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session?.user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      const userId = session.user.id;
      // Cambia 'Admins' y 'ID_Empleado' por el nombre real de tu tabla y columna de admins
      const { data: adminData } = await supabase
        .from("Administrador")
        .select("*")
        .eq("id", userId)
        .single();

      setIsAdmin(!!adminData);
      setLoading(false);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [loading, isAdmin]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

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
              <AccessDeniedModal show={showModal} />
              {!showModal && children}
            </main>
            </div>
    </div>
  );
}