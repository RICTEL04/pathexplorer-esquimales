"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

export default function Recuperacion() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      setError("");
    }
  }, [accessToken]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setMessage("Contraseña actualizada exitosamente.");
      setTimeout(() => router.push("/"), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center w-80">
        <h2 className="text-xl font-semibold text-purple-600 mb-2">
          Cambiar contraseña
        </h2>
        <p className="text-gray-600 text-sm mb-4">Confirma tu nueva contraseña.</p>

        <form onSubmit={handleResetPassword} className="space-y-3">
          <input
            className="text-gray-800 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="text"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            className="text-gray-800 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="text"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition"
          >
            Confirmar
          </button>
        </form>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {message && <p className="text-green-600 text-sm mt-2">{message}</p>}

        <Link href="/login" className="text-blue-500 text-sm mt-3 block hover:underline">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
