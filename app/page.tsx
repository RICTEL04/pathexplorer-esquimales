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
  const [roles, setRoles] = useState({
    peopleLead: false,
    capabilityLead: false,
    deliveryLead: false,
    talentLead: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpia errores previos
  
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        setError(error.message);
        return;
      }
  
      const userId = data.user?.id;
      console.log("Usuario loggeado con ID:", userId);
  
      // Realizar todas las consultas en paralelo para mejor rendimiento
      const [
        { data: peopleLeadData },
        { data: capabilityLeadData },
        { data: deliveryLeadData },
        { data: talentLeadData },
        { data: adminData }
      ] = await Promise.all([
        supabase.from('People_lead').select('*').eq('ID_Empleado', userId).single(),
        supabase.from('Capability_Lead').select('*').eq('ID_Empleado', userId).single(),
        supabase.from('Delivery_Lead').select('*').eq('ID_Empleado', userId).single(),
        supabase.from('Talent_Lead').select('*').eq('ID_Empleado', userId).single(),
        supabase.from('Administrador').select('*').eq('id', userId).single()
      ]);
  
      console.log("Admin:", adminData);
      console.log("Delivery:", deliveryLeadData);
      console.log("Capability:", capabilityLeadData);
  
      // Determinar los roles
      const userRoles = {
        peopleLead: !!peopleLeadData,
        capabilityLead: !!capabilityLeadData,
        deliveryLead: !!deliveryLeadData,
        talentLead: !!talentLeadData,
        admin: !!adminData
      };
  
      setRoles(userRoles);
  
      // Redirigir basado en los roles (usamos los valores recién calculados, no el estado)
      if (userRoles.admin) {
        router.replace("/admin");
      } else if (userRoles.capabilityLead) {
        router.replace("/capability-lead");
      } else if (userRoles.deliveryLead) {
        router.replace("/delivery-lead"); // Cambiado de "/capability-lead" a "/delivery-lead"
      } else if (userRoles.peopleLead) {
        router.replace("/people-lead"); // Cambiado de "/capability-lead" a "/people-lead"
      } else if (userRoles.talentLead) {
        router.replace("/talent-lead"); // Cambiado de "/capability-lead" a "/talent-lead"
      } else {
        router.replace("/empleados");
      }
  
    } catch (err) {
      setError("Error durante el proceso de login");
      console.error(err);
    }
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
            ¿Se te olvidó tu contraseña?
          </Link>
        </form>
      </div>
    </div>
  );
}