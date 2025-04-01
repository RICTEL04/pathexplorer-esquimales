"use client"
import Link from "next/link";
import { Menu, Users, BookOpen } from "lucide-react";
import { useState } from "react";

export default function sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
          <Menu />
        </button>
        <nav className="space-y-4">
          <Link href="/admin/cursos" className="text-gray-800 flex items-center gap-2 p-2 rounded-md hover:bg-gray-200">
            <BookOpen /> {isSidebarOpen && "Cursos"}
          </Link>
          <Link href="/admin/empleados" className="text-gray-800 flex items-center gap-2 p-2 rounded-md hover:bg-gray-200">
            <Users /> {isSidebarOpen && "Empleados"}
          </Link>
        </nav>
      </aside>
    );
  }