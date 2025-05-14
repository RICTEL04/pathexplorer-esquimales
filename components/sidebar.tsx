"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, ChevronDown, ChevronRight, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Route {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  subRoutes?: Route[];
}

interface SidebarProps {
  routes: Route[];
}

export default function Sidebar({ routes }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserId(session?.user.id ?? null);
    };

    getSession();
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
      return subRoutes.some(route => pathname.startsWith(route.href));
    }
    return false;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-md p-4 flex flex-col justify-between z-40 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              className="p-2 rounded-md bg-violet-800 text-white"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {isSidebarOpen && (
              <div className="flex items-center gap-2">
                <img
                  src="/imagenes/Accenture-logo.png"
                  alt="Accenture"
                  className="h-10 w-auto"
                />
              </div>
            )}
          </div>

          <nav className="space-y-1">
            {routes.map(({ href, label, Icon, subRoutes }) => (
              <div key={label} className="flex flex-col">
                <div className="flex items-center">
                  <Link
                    href={href}
                    className={`text-gray-800 flex-1 flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 ${
                      isActive(href, subRoutes) ? "bg-gray-300 font-bold" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5" /> {isSidebarOpen && label}
                  </Link>

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
                        className={`text-gray-600 flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 text-sm ${
                          pathname === subRoute.href ? "bg-gray-200 font-medium" : ""
                        }`}
                      >
                        <subRoute.Icon className="w-4 h-4" /> {subRoute.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-4 border-t pt-4 space-y-2">
          {userId && (
            <Link
              href={`/employee/perfil/${userId}`}
              className="flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-gray-200"
            >
              <User className="w-5 h-5" /> {isSidebarOpen && "Ver perfil"}
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-gray-200 w-full"
          >
            <LogOut className="w-5 h-5" /> {isSidebarOpen && "Cerrar sesión"}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`${isSidebarOpen ? "ml-64" : "ml-16"} transition-all duration-300 w-full p-6`}>
        {/* Aquí va tu contenido */}
      </main>
    </div>
  );
}
