"use client";
import Link from "next/link";
import Image from "next/image";
import '@/app/login/login.css';
import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
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
        router.replace("/employee");
      } else if (userRoles.deliveryLead) {
        router.replace("/employee"); // Cambiado de "/capability-lead" a "/delivery-lead"
      } else if (userRoles.peopleLead) {
        router.replace("/employee"); // Cambiado de "/capability-lead" a "/people-lead"
      } else if (userRoles.talentLead) {
        router.replace("/employee"); // Cambiado de "/capability-lead" a "/talent-lead"
      } else {
        router.replace("/employee");
      }
  
    } catch (err) {
      setError("Error durante el proceso de login");
      console.error(err);
    }
  };

  // Fondo de estrellas animadas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Solo corre en cliente
    if (!canvasRef.current) return;

    // --- Lógica de estrellas adaptada ---
    type Star = { x: number; y: number; z: number; };
    const STAR_COLOR = "#fff";
    const STAR_SIZE = 3;
    const STAR_MIN_SCALE = 0.2;
    const OVERFLOW_THRESHOLD = 50;
    const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let scale = 1;
    let width: number;
    let height: number;
    let stars: Star[] = [];
    let pointerX: number | null = null, pointerY: number | null = null;
    let velocity = { x: -0.7, y: -0.7, tx: 0, ty: 0, z: 0.0005 };
    let touchInput = false;
    let animationId: number;

    function generate() {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: 0,
        y: 0,
        z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
      }));
    }

    function placeStar(star: Star) {
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    }

    function recycleStar(star: Star) {
      let direction = "z";
      let vx = Math.abs(velocity.x);
      let vy = Math.abs(velocity.y);
      if (vx > 1 || vy > 1) {
        let axis;
        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? "h" : "v";
        } else {
          axis = Math.random() < vy / (vx + vy) ? "v" : "h";
        }
        if (axis === "h") {
          direction = velocity.x > 0 ? "l" : "r";
        } else {
          direction = velocity.y > 0 ? "t" : "b";
        }
      }
      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
      if (direction === "z") {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      } else if (direction === "l") {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "r") {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "t") {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      } else if (direction === "b") {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
      }
    }

    function resize() {
      scale = window.devicePixelRatio || 1;
      width = window.innerWidth * scale;
      height = window.innerHeight * scale;
      canvas.width = width;
      canvas.height = height;
      stars.forEach(placeStar);
    }

    function step() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      update();
      render();
      animationId = requestAnimationFrame(step);
    }

    function update() {
      velocity.tx *= 0.96;
      velocity.ty *= 0.96;
      // Mantén la velocidad base negativa para que siempre tienda a la esquina superior izquierda
      velocity.x = -0.7 + (velocity.tx - velocity.x) * 0.1;
      velocity.y = -0.7 + (velocity.ty - velocity.y) * 0.1;
      stars.forEach((star) => {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;
        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      });
    }

    function render() {
      if (!context) return;
      stars.forEach((star) => {
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = STAR_COLOR;
        context.moveTo(star.x, star.y);
        let tailX = velocity.x * 2;
        let tailY = velocity.y * 2;
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;
        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
      });
    }

    function movePointer(x: number, y: number) {
      if (pointerX === null || pointerY === null) {
        pointerX = x;
        pointerY = y;
        return;
      }
      let ox = x - pointerX;
      let oy = y - pointerY;
      velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
      velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
      pointerX = x;
      pointerY = y;
    }

    function onMouseMove(event: MouseEvent) {
      touchInput = false;
      movePointer(event.clientX, event.clientY);
    }

    function onTouchMove(event: TouchEvent) {
      event.preventDefault();
      touchInput = true;
      movePointer(event.touches[0].clientX, event.touches[0].clientY);
    }

    function onMouseLeave() {
      pointerX = null;
      pointerY = null;
    }

    generate();
    resize();
    step();

    window.addEventListener("resize", resize);
    // Cambia estos:
    // canvas.addEventListener("mousemove", onMouseMove);
    // canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    // canvas.addEventListener("touchend", onMouseLeave);
    // canvas.addEventListener("mouseleave", onMouseLeave);

    // Por estos:
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onMouseLeave);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      // canvas.removeEventListener("mousemove", onMouseMove);
      // canvas.removeEventListener("touchmove", onTouchMove);
      // canvas.removeEventListener("touchend", onMouseLeave);
      // canvas.removeEventListener("mouseleave", onMouseLeave);

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseLeave);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="login">
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      />
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