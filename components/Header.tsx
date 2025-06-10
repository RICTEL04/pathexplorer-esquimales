import { NotificationsButton } from "./Notificaciones/NotificationsButton";

// components/Header.tsx
export default function Header() {
  return (
      <header className="w-full bg-white shadow p-4 flex justify-between items-center z-50 fixed top-0 left-0">
        <h1 className="text-2xl font-bold text-gray-800">Mi Aplicación</h1>
        <div className="flex items-center space-x-4">
          <NotificationsButton />
          <div className="text-gray-600">Bienvenido</div>
        </div>
      </header>
  );
}
