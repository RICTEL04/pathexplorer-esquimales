import { usePathname } from "next/navigation";
import { NotificationsButton } from "./Notificaciones/NotificationsButton";

// components/Header.tsx
export default function Header() {
  const pathname = usePathname();
  const link =
    (pathname ?? "").startsWith("/admin") ? "/admin" : "/employee";

  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center z-50 fixed top-0 left-0 border-b border-gray-200">
      <a href={link} className="flex items-center space-x-3 group">
        <img
          src="/PathExplorer_logo.png"
          alt="PathExplorer Logo"
          className="h-13 w-auto transition-transform group-hover:scale-105"
          style={{ maxHeight: 48 }}
        />
      </a>
      <div className="flex items-center space-x-4">
        <NotificationsButton />
        <div className="text-gray-700 font-medium text-base">Bienvenido</div>
      </div>
    </header>
  );
}
