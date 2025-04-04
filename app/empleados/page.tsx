import { getEmpleados } from '@/lib/empleadoService';

export default async function EmpleadosPage() {
  let empleados = [];
  try {
    empleados = await getEmpleados(); 
  } catch (error) {
    console.error('Error fetching empleados:', error);
  }

  return (
    <div>
      <h1>Lista de Empleados</h1>
      <ul>
  {empleados.map((empleado) => (
    <li key={empleado.ID_Empleado}>
      <strong>{empleado.Nombre}</strong> - {empleado.Rol} 
      <ul>
        {empleado.Certificados && empleado.Certificados.length > 0 ? (
          empleado.Certificados.map((cert) => (
            <li key={cert.ID_Certificado}>
              📜 {cert.Nombre} - Emitido el {cert.Fecha_caducidad}
            </li>
          ))
        ) : (
          <li>Sin certificados</li>
        )}
      </ul>
    </li>
  ))}
</ul>

    </div>
  );
}