"use client";
import Link from "next/link";
import Image from "next/image";
import '@/app/login/login.css';
import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpia errores previos

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message); // Muestra el error exacto
      return;
    }

    router.replace("/admin"); // Redirige sin permitir volver atrás
  };

  return (
    <div className="login">
      <div className="fondo"></div>
      <div className="cubo1"></div>
      <div className="cubo2"></div>
      <div className="cubo3"></div>
      <div className="contenedor">
        <form className="form" onSubmit={handleLogin}>
          <p className="text-gray-800 thick" style={{ fontFamily: "system-ui", fontSize: 48 }}>Login</p>
          <p className="text-gray-700 thin" style={{ fontFamily: "system-ui", fontSize: 15 }}>Inicia sesión para continuar</p>
          
          {error && <p className="text-red-500">{error}</p>} {/* Muestra el error */}

          <div >
            <FaUser className="icon" />
            <input className="formInput" type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email" />
          </div>
          <div>
            <FaLock className="icon" />
            <input className="formInput" type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Contraseña" />
          </div>
          <button className="formButton" type="submit">Sign in</button>
          
          <Link href="/recuperacion" className="text-gray-700" style={{ fontSize: 15, padding: 15, fontFamily: "system-ui" }}>
            ¿Se te olvidó tu contraseña? Skill issue.
          </Link>
        </form>
      </div>
    </div>
  );
}