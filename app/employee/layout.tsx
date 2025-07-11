"use client";
import Sidebar from "@/components/sidebar";
import { Home, Briefcase, Award, TrendingUp, User, Target, Users, Folder, MessageCircle, BrainCircuit, BringToFront, Album, Diamond, AlertTriangle} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";

function AccessDeniedModal({ show }: { show: boolean }) {
  const router = useRouter();
  if (!show) return null;

  // Handler para cerrar/redirigir desde cualquier parte del modal
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
        onClick={e => e.stopPropagation()} // Evita que el click en el modal cierre el modal
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

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState({
    peopleLead: false,
    capabilityLead: false,
    deliveryLead: false,
    talentLead: false
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session?.user) {
        console.error("No session found or error fetching session:", error);
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      // Realizar todas las consultas en paralelo para mejor rendimiento
      const [
        { data: peopleLeadData },
        { data: capabilityLeadData },
        { data: deliveryLeadData },
        { data: talentLeadData }
      ] = await Promise.all([
        supabase.from('People_lead').select('*').eq('ID_Empleado', userId).single(),
        supabase.from('Capability_Lead').select('*').eq('ID_Empleado', userId).single(),
        supabase.from('Delivery_Lead').select('*').eq('ID_Empleado', userId).single(),
        supabase.from('Talent_Lead').select('*').eq('ID_Empleado', userId).single()
      ]);

      // Determinar los roles
      const userRoles = {
        peopleLead: !!peopleLeadData,
        capabilityLead: !!capabilityLeadData,
        deliveryLead: !!deliveryLeadData,
        talentLead: !!talentLeadData,
      };
      
      setRoles(userRoles);

      // Rutas base que todos los usuarios tienen
      const baseRoutes = [
        { href: "/employee", label: "Inicio", Icon: Home },
        { href: "/employee/proyectos", label: "Proyectos", Icon: Briefcase },
        { href: "/employee/certificaciones", label: "Certificaciones", Icon: Award },
        { href: "/employee/path-de-carrera", label: "Path de Carrera", Icon: TrendingUp },
        { href: "/employee/objetivos", label: "Metas", Icon: Target },
      ];

      // Rutas específicas por rol
      const roleSpecificRoutes = [];

      if (userRoles.capabilityLead) {
        roleSpecificRoutes.push({
          href: "/employee/capability-lead",
          label: "Capability lead",
          Icon: BrainCircuit,
          subRoutes: [
            { href: "/employee/capability-lead/proyectos", label: "Proyectos capability", Icon: Folder },
            { href: "/employee/capability-lead/perfiles-de-empleados", label: "Perfiles de Capability", Icon: Users },
          ]
        });
      }

      if (userRoles.deliveryLead) {
        roleSpecificRoutes.push({
          href: "/employee/delivery-lead",
          label: "Delivery lead",
          Icon: BringToFront,
          subRoutes: [
            { href: "/employee/delivery-lead/proyectos", label: "Proyectos", Icon: Folder },
            { href: "/employee/delivery-lead/equipos", label: "Empleados equipos", Icon: Users },
          ]
        });
      }

      if (userRoles.peopleLead) {
        roleSpecificRoutes.push({
          href: "/employee/people-lead",
          label: "People lead",
          Icon: Album,
          subRoutes: [
            { href: "/employee/people-lead/validarCursos", label: "Validar certificados", Icon: Folder },
            { href: "/employee/people-lead/talent-discussions", label: "Talent Discussions", Icon: MessageCircle },
            { href: "/employee/people-lead/empleados", label: "Counselee", Icon: Users },
          ]
        });
      }

      if (userRoles.talentLead) {
        roleSpecificRoutes.push({
          href: "/employee/talent-lead",
          label: "Talent lead",
          Icon: Diamond
        });
      }

      // Combinar rutas base con las específicas por rol
      setRoutes([...baseRoutes, ...roleSpecificRoutes]);
      setLoading(false);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    // Si la ruta es /employee, nunca mostrar el modal
    if (pathname === "/employee") {
      setShowModal(false);
      return;
    }
    // Verifica acceso según la URL y los roles
    if (
      (pathname && pathname.includes("/employee/capability-lead") && !roles.capabilityLead) ||
      (pathname && pathname.includes("/employee/delivery-lead") && !roles.deliveryLead) ||
      (pathname && pathname.includes("/employee/people-lead") && !roles.peopleLead) ||
      (pathname && pathname.includes("/employee/talent-lead") && !roles.talentLead)
    ) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [pathname, roles]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div 
        onMouseEnter={() => setIsSidebarOpen(true)}
        className="fixed inset-y-0 left-0 z-40 w-16" // Área invisible para detectar hover
      />
      
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