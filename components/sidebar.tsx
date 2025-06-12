"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, ChevronDown, ChevronRight, LogOut, User, Waypoints } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Modal, Button } from "antd"; // Agrega esto si usas Ant Design

interface Route {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  subRoutes?: Route[];
}

interface SidebarProps {
  routes: Route[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ routes, isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false); // Nuevo estado
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setSessionExpired(true);
        setUserId(null);
      } else {
        setUserId(session.user.id ?? null);
      }
    };

    getSession();

    // Escucha eventos de expiración de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setSessionExpired(true);
        setUserId(null);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setIsAdmin(false);
        return;
      }
      const userId = session.user.id;
      const { data: adminData } = await supabase
        .from("Administrador")
        .select("*")
        .eq("id", userId)
        .single();
      setIsAdmin(!!adminData);
    };
    checkAdmin();
  }, []);

  const toggleDropdown = (label: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const isActive = (href: string, subRoutes?: Route[]) => {
    if (pathname === href) return true;
    if (subRoutes) {
      return pathname ? subRoutes.some(route => pathname.startsWith(route.href)) : false;
    }
    return false;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <Modal
        open={sessionExpired}
        closable={false}
        footer={null}
        centered
        styles={{
          mask: { background: "rgba(44, 44, 84, 0.25)" },
          body: {
            borderRadius: 20,
            padding: "40px 32px",
            background: "linear-gradient(135deg, #f5f3ff 0%, #fff 100%)",
            boxShadow: "0 12px 40px rgba(124,58,237,0.18)",
            minWidth: 340,
            minHeight: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }
        }}
      >
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-200 to-purple-400 mb-5 shadow-lg">
            <LogOut className="w-10 h-10 text-purple-700" />
          </div>
          <h2 className="text-3xl font-extrabold text-purple-700 mb-2 tracking-tight text-center">Sesión expirada</h2>
          <p className="text-gray-700 mb-8 text-center text-base leading-relaxed max-w-xs">
            Tu sesión ha expirado.<br />
            Por seguridad, vuelve a ingresar al sitio para continuar.
          </p>
          <Button
            type="primary"
            size="large"
            style={{
              background: "linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%)",
              borderRadius: 12,
              fontWeight: 700,
              width: 200,
              fontSize: 18,
              boxShadow: "0 4px 16px rgba(124,58,237,0.13)"
            }}
            onClick={() => router.push("/")}
          >
            Ir al inicio
          </Button>
        </div>
      </Modal>
      <div
        className={`fixed top-1 left-0 h-screen bg-white shadow-md p-4 flex flex-col justify-between no-scrollbar z-40 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"
          }`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div>
          <div className="flex items-center gap-2 mt-17">
            <button
              className="p-2 rounded-md text-black bg-purple-600 hover:bg-purple-700 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="w-5 h-5" color="white" />
            </button>
            {isSidebarOpen && (
              <>
                <span className="ml-4 text-lg font-bold bg-gradient-to-r from-violet-800 to-fuchsia-700 bg-clip-text text-transparent">
                  {(() => {
                    if (pathname?.startsWith("/employee/capability-lead")) return "Capability Lead";
                    if (pathname?.startsWith("/employee/delivery-lead")) return "Delivery Lead";
                    if (pathname?.startsWith("/employee/people-lead")) return "People Lead";
                    if (pathname?.startsWith("/employee/talent-lead")) return "Talent Lead";
                    if (pathname?.startsWith("/employee")) return "Empleado";
                    if (pathname?.startsWith("/admin")) return "Administrador";
                    return "";
                  })()}
                </span>
                {isAdmin && (
                  <button
                    className="ml-2 p-1 rounded-full bg-gradient-to-r from-fuchsia-100 to-violet-100 hover:from-fuchsia-200 hover:to-violet-200 transition"
                    onClick={() => {
                      if (pathname?.startsWith("/admin")) {
                        router.push("/employee");
                      } else {
                        router.push("/admin");
                      }
                    }}
                    title={
                      pathname?.startsWith("/admin")
                        ? "Cambiar a vista de empleado"
                        : "Cambiar a vista de administrador"
                    }
                  >
                    <Waypoints className="w-5 h-5 text-fuchsia-700" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Contenedor scrollable solo para rutas */}
          <div
            className={`transition-all ${
              isSidebarOpen
                ? "max-h-[calc(100vh-260px)] overflow-y-auto pr-1 no-scrollbar" // Ajusta el valor según el alto de tu header/logo y bloque inferior
                : ""
            }`}
          >
            <nav className="space-y-1 mt-1">
              {routes.map(({ href, label, Icon, subRoutes }) => (
                <div key={label} className="flex flex-col">
                  <div className="flex items-center">
                    {subRoutes ? (
                      <button
                        type="button"
                        onClick={() => toggleDropdown(label)}
                        className={`flex-1 flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 text-left transition-colors
              ${isActive(href, subRoutes)
                            ? "bg-gray-300 font-bold text-purple-600"
                            : "text-gray-800"
                          }`}
                      >
                        <Icon
                          className={`w-5 h-5 transition-colors ${
                            isActive(href, subRoutes) ? "text-purple-600" : "text-gray-800"
                          }`}
                        />
                        {isSidebarOpen && label}
                      </button>
                    ) : (
                      <Link
                        href={href}
                        className={`flex-1 flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 transition-colors
              ${isActive(href)
                            ? "bg-gray-300 font-bold text-purple-600"
                            : "text-gray-800"
                          }`}
                      >
                        <Icon
                          className={`w-5 h-5 transition-colors ${
                            isActive(href) ? "text-purple-600" : "text-gray-800"
                          }`}
                        />
                        {isSidebarOpen && label}
                      </Link>
                    )}

                    {isSidebarOpen && subRoutes && (
                      <button
                        onClick={() => toggleDropdown(label)}
                        className="p-1 rounded-md hover:bg-gray-200"
                      >
                        {expandedItems[label] ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {isSidebarOpen && subRoutes && expandedItems[label] && (
                    <div className="ml-6 mt-1 space-y-1">
                      {subRoutes.map((subRoute) => (
                        <Link
                          key={subRoute.href}
                          href={subRoute.href}
                          className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 text-sm transition-colors
              ${pathname === subRoute.href
                            ? "bg-gray-200 font-medium text-purple-600"
                            : "text-gray-600"
                          }`}
                        >
                          <subRoute.Icon
                            className={`w-4 h-4 transition-colors ${
                              pathname === subRoute.href ? "text-purple-600" : "text-gray-600"
                            }`}
                          />
                          {subRoute.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Bloque fijo inferior */}
        <div className="mt-4 border-t pt-4 space-y-2 bg-white">
          {userId && (
            <Link
              href={
                pathname && pathname.startsWith("/admin")
                  ? `/admin/perfil/${userId}`
                  : `/employee/perfil/${userId}`
              }
              className="flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-gray-200"
            >
              <User className="w-5 h-5" /> {isSidebarOpen && "Ver perfil"}
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors w-full"
          >
            <LogOut className="w-5 h-5 transition-colors group-hover:text-red-600" />
            {isSidebarOpen && "Cerrar sesión"}
          </button>
        </div>
      </div>
    </>
  );
}