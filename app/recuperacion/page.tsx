import Link from "next/link";
import "./recuperacion.css";
import SendEmailButton from "../../components/enviar-email";

export default function Recuperacion() {
  return (
    <div className="recovery-container">
      <div className="recovery-box">
        <h2>Recuperar Contraseña</h2>
        <p>Ingresa tu correo electrónico para recibir un enlace de recuperación.</p>
        <input type="email" placeholder="Correo electrónico" />
        <button>Enviar</button>
        <Link href="/login" className="back-link">Volver al inicio</Link>
      </div>
      <div>
      <h1>Enviar Email</h1>
      <SendEmailButton />
    </div>
    </div>
  );
}
