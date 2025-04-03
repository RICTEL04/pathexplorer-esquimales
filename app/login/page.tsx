import Link from "next/link";
import Image from "next/image";
import './login.css';
import backgroundImage from './Imagenes/milad.jpg';
import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";

export default function Home() {
  return (
    <div className="login">
      <div className="fondo"></div>
      <div className="cubo1"></div>
      <div className="cubo2"></div>
      <div className="cubo3"></div>
      <div className="contenedor">
        <form action="">
          <p className="thick" style={{ fontFamily: "system-ui", fontSize: 48 }}>Login</p>
          <p className="thin" style={{ fontFamily: "system-ui", fontSize: 15 }}>Inicia sesión para continuar</p>
          <div className="input-container">
            <FaUser className="icon" />
            <input type="text" placeholder="Usuario" />
          </div>
          <div className="input-container">
            <FaLock className="icon" />
            <input type="password" placeholder="Contraseña" />
          </div>
          <button type="submit">Sign in</button>
          
          {/* Use Link instead of <a> */}
          <Link href="/recuperacion" style={{ fontSize: 15, padding: 15, fontFamily: "system-ui" }}>
            ¿Se te olvidó tu contraseña? Skill issue.
          </Link>
        </form>
      </div>
    </div>
  );
}
