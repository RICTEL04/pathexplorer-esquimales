"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

interface Route {
  href: string;
  label: string;
  Icon: React.ComponentType;
}

interface SidebarProps {
  routes: Route[];
}

export default function Sidebar({ routes }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname(); // Get the current route

  return (
    <aside
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } bg-white p-4 shadow-md transition-all`}
    >
      <button
        className="mb-4 p-2 rounded-md bg-gray-800"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu color="white"/>
      </button>
      <nav className="space-y-4">
        {routes.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={`text-gray-800 flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 ${
              pathname === href ? "bg-gray-300 font-bold" : ""
            }`}
          >
            <Icon /> {isSidebarOpen && label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}