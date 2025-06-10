"use client";
import Sidebar from "@/components/sidebar";
import { Home, Briefcase, Award, TrendingUp, User, Target, Users, Folder, MessageCircle, BrainCircuit, BringToFront, Album, Diamond} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";

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
        {children}
      </main>
      </div>
    </div>
  );
}