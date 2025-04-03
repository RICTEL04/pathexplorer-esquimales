"use client";
import Link from "next/link";
import { useState } from "react";
import "./recuperacion.css";
import { supabase } from "@/lib/supabase";

export default function Recuperacion() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Detectar la URL actual
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

    // Definir la URL de redirección
    const redirectUrl =
      baseUrl === "http://localhost:3000"
        ? "http://localhost:3000/reset-password"
        : `${baseUrl}/reset-password`; // <- Aquí usamos correctamente el template literal

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      setMessage("Error al enviar el enlace");
    } else {
      setMessage("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
    }
  };

  return (
    <div className="recovery-container">
      <div className="recovery-box">
        <h2 className="text-purple-600">Recuperar Contraseña</h2>
        <p>Ingresa tu correo electrónico para recibir un enlace de recuperación.</p>
        
        <form onSubmit={handleReset}>
          <input
            className="text-gray-800"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </form>

        {message && <p className="text-sm mt-2">{message}</p>}

        <Link href="/login" className="back-link">Volver al inicio</Link>
      </div>
    </div>
  );
}
