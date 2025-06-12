"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"; // Import the User type from Supabase
import { supabase } from "@/lib/supabase";
import { Empleado, CapabilityLead, DeliveryLead, getEmpleados, Proyecto, Metas } from "@/lib/empleadoService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Star, ArrowBigUpDash, CalendarClock, Goal } from "lucide-react";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import { Tooltip as TooltipComponent } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


// Componentes reutilizables
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white shadow-md rounded-md ${className}`}>{children}</div>;
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function Progress({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full ${className}`}
    >
      {children}
    </span>
  );
}

const fetchAvatarURL = async (employeeID: string | null): Promise<string | null> => {
  if (!employeeID) return null;

  const bucketName = "profile-pictures";
  const basePath = `${employeeID}/perfil`;
  
  try {
    // 1. Listar archivos en el directorio para encontrar la imagen real
    const { data: files, error } = await supabase.storage
      .from(bucketName)
      .list(`${employeeID}`, {
        limit: 1,
        search: 'perfil'
      });

    if (error || !files || files.length === 0) {
      console.log('No se encontró archivo de avatar:', error?.message);
      return null;
    }

    // Obtener el nombre real del archivo (con extensión)
    const actualFileName = files[0].name;
    const fullFilePath = `${employeeID}/${actualFileName}`;

    // 2. Obtener URL firmada (temporal) para acceder al archivo
    const { data: signedUrl } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fullFilePath, 3600); // URL válida por 1 hora

    if (!signedUrl?.signedUrl) {
      console.log('No se pudo generar URL firmada');
      return null;
    }

    console.log('Avatar encontrado:', signedUrl.signedUrl);
    return signedUrl.signedUrl;
    
  } catch (error) {
    console.error('Error verificando avatar:', error);
    return null;
  }
};

// Función para obtener roles del usuario
const fetchUserRoles = async (userId: string) => {
  try {
    const { data: peopleLeadData } = await supabase
      .from("People_lead")
      .select("*")
      .eq("ID_Empleado", userId)
      .single();

    const { data: capabilityLeadData } = await supabase
      .from("Capability_Lead")
      .select("*")
      .eq("ID_Empleado", userId)
      .single();

    const { data: deliveryLeadData } = await supabase
      .from("Delivery_Lead")
      .select("*")
      .eq("ID_Empleado", userId)
      .single();

    const { data: talentLeadData } = await supabase
      .from("Talent_Lead")
      .select("*")
      .eq("ID_Empleado", userId)
      .single();



    return {
      peopleLead: !!peopleLeadData,
      capabilityLead: !!capabilityLeadData,
      deliveryLead: !!deliveryLeadData,
      talentLead: !!talentLeadData,
    };
  } catch (error) {
    console.error("Error fetching user roles:", error);
    return {
      peopleLead: false,
      capabilityLead: false,
      deliveryLead: false,
      talentLead: false,
    };
  }
};

const fetchCargabilidad = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from("Empleado")
      .select("Cargabilidad")
      .eq("ID_Empleado", userId)
      .single();

    if (error || !data) {
      console.error("Error fetching cargabilidad:", error);
      return 0;
    }
    return data.Cargabilidad ?? 0;
  } catch (error) {
    console.error("Error in fetchCargabilidad:", error);
    return 0;
  }
};



export default function EmployeeDashboard() {

  const [assignedProjects, setAssignedProjects] = useState<any[]>([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado>();
  const [deliveryLead, setDeliveryLead] = useState<DeliveryLead>();
  const [metasEmpleados, setMetasEmpleados] = useState<Metas[]>([]);
  const [selectedEmpleado2, setSelectedEmpleado2] = useState<Empleado | null>(null);
  const [capabilityLead, setCapabilityLead] = useState<CapabilityLead>();
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState({
    peopleLead: false,
    capabilityLead: false,
    deliveryLead: false,
    talentLead: false,
  });
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [cargabilidad, setCargabilidad] = useState<number>(0);

  // Nuevo efecto para cargar el avatar del usuario logueado
  useEffect(() => {
  const fetchAvatarAndCargabilidad = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;
    if (userId) {
      const url = await fetchAvatarURL(userId);
      setAvatarUrl(url);
      const cargabilidadValue = await fetchCargabilidad(userId);
      setCargabilidad(cargabilidadValue);
    }
  };
  fetchAvatarAndCargabilidad();
}, []);

  useEffect(() => {
    const fetchUserAndData = async () => {
      setLoading(true);
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("Error fetching session:", sessionError);
          throw sessionError;
        }

        const userId = sessionData.session?.user.id;
        if (!userId) {
          console.warn("User ID is undefined");
          return;
        }

        setUser(sessionData.session?.user ?? null);

        // Fetch user roles
        try {
          const userRoles = await fetchUserRoles(userId);
          setRoles(userRoles);
        } catch (error) {
          console.error("Error fetching user roles:", error);
          throw error;
        }

        // Fetch employees
        try {
          const empleadosData = await getEmpleados();
          const empleadosMapped = empleadosData.map((empleado) => ({
            ...empleado,
          }));
          setEmpleados(empleadosMapped);

          const empleadoLogueado = empleadosMapped.find((empleado: any) => empleado.ID_Empleado === userId);
          setSelectedEmpleado(empleadoLogueado);


          const metas = empleadosData.flatMap((empleado) => empleado.Metas || []);
          setMetasEmpleados(metas);

          const firstEmpleadoWithMetas = empleadosData.find((empleado) => empleado.Metas && empleado.Metas.length > 0);
          setSelectedEmpleado2(firstEmpleadoWithMetas || null);
        } catch (error) {
          console.error("Error fetching employees:", error);
          throw error;
        }


      } catch (error) {
        console.error("Error in fetchUserAndData:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchUserAndData();
  }, []);

  useEffect(() => {
    // Fetch delivery and capability lead data
    if (selectedEmpleado) {
      try {
        const deliveryLeadData = selectedEmpleado.Delivery_Lead;
        if (deliveryLeadData) {
          setDeliveryLead(Array.isArray(deliveryLeadData) ? deliveryLeadData[0] : deliveryLeadData);
        }

      } catch (error) {
        console.error("Error fetching delivery lead data:", error);
        throw error;
      }
    }
  }, [selectedEmpleado]);


  useEffect(() => {
    if (selectedEmpleado) {
      try {
        const capabilityLeadData = selectedEmpleado.Capability_Lead;
        if (capabilityLeadData) {
          setCapabilityLead(Array.isArray(capabilityLeadData) ? capabilityLeadData[0] : capabilityLeadData);
        }
      } catch (error) {
        console.error("Error fetching capability lead data:", error);
      }
    }
  }, [selectedEmpleado]);

  useEffect(() => {
    console.log("Updated Delivery Lead Data:", deliveryLead);
    console.log("Updated Delivery Lead Projects:", deliveryLead?.Proyectos);
  }, [deliveryLead]);

  useEffect(() => {
    console.log("Updated Capability Lead Data:", capabilityLead);
  }, [capabilityLead]);

  useEffect(() => {
    if (selectedEmpleado) {
      console.log("Selected Empleado:", selectedEmpleado);
      console.log(selectedEmpleado?.Delivery_Lead)
    }
  }, [selectedEmpleado]);


  // Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // Null check
  if (!selectedEmpleado) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-500 text-lg">No se encontró información del empleado.</span>
      </div>
    );
  }

  // Datos para la gráfica de proyectos por año
  const workData = Object.entries(
    selectedEmpleado.Empleado_Proyectos.flatMap((puesto) => puesto.Proyectos || [])
      .filter((proyecto) => proyecto.fecha_fin) // Filtrar proyectos con fecha de fin
      .reduce((acc: Record<string, number>, proyecto) => {
        const year = new Date(proyecto.fecha_fin).getFullYear(); // Obtener el año de la fecha de fin
        acc[year] = (acc[year] || 0) + 1; // Incrementar el contador para el año
        return acc;
      }, {})
  )
    .map(([year, count]) => ({ year, tasks: count })) // Convertir a formato de gráfico
    .sort((a, b) => Number(a.year) - Number(b.year)); // Ordenar por año

  // Datos para la gráfica de estado de certificados
  const courseData = [
    { name: "Activos", value: selectedEmpleado.Certificados.filter((c) => c.Verificacion).length, color: "#4ade80" },
    { name: "Pendientes", value: selectedEmpleado.Certificados.filter((c) => c.Verificacion === null).length, color: "#f87171" },
  ];


  const empleadosAsignados = empleados.filter((empleado) => {
    // Verificar si el empleado logueado tiene un ID_Departamento válido
    const departamentoLogueado = capabilityLead


      ? capabilityLead.ID_Departamento
      : "No disponible";

    // Comparar el ID_Departamento del empleado con el del empleado logueado
    return empleado.ID_Departamento === departamentoLogueado;
  });







  const empleadosSinProyectos = empleados.filter(
    (empleado) => !empleado.Empleado_Proyectos || empleado.Empleado_Proyectos.length === 0
  );

  const empleadosConProyectos = empleados.filter(
    (empleado) => empleado.Empleado_Proyectos.length > 0
  );

  const proyectosAsignadosActivos = (deliveryLead?.Proyectos ?? []).filter(
  (proy) => proy.Status?.toLowerCase() !== "done"
);

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-[#f8fafc] via-[#f3e8ff] to-[#e0e7ff]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* Perfil del empleado */}
        <Card className="shadow-xl rounded-2xl border border-purple-100 bg-gradient-to-r from-white via-purple-50 to-white transition-transform hover:scale-[1.01] duration-200">
  <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-8">
    {/* Avatar estilo AvatarSection.tsx */}
    <div className="flex flex-col items-center justify-center w-40">
      <div
        className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-visible border-4 border-purple-200 shadow-xl bg-gradient-to-br from-purple-200 to-purple-100 flex items-center justify-center"
        style={{ boxShadow: '0 0 0 6px rgba(168,85,247,0.10)' }}
      >
        {/* SVG de progreso circular mejorado */}
        <svg
          className="absolute -top-5 -left-5 w-[144px] h-[144px] md:w-[180px] md:h-[180px] z-0 pointer-events-none"
          viewBox="0 0 90 90"
        >
          <defs>
            <linearGradient id="carga-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#f59e42" />
            </linearGradient>
            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              {/* @ts-ignore */}
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Fondo gris */}
          <circle
            cx="45"
            cy="45"
            r="36"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="7"
          />
          {/* Progreso con gradiente y glow */}
          <circle
            cx="45"
            cy="45"
            r="36"
            fill="none"
            stroke="url(#carga-gradient)"
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 36}
            strokeDashoffset={
              2 * Math.PI * 36 * (1 - Math.min(Math.max(cargabilidad, 0), 100) / 100)
            }
            strokeLinecap="butt"
            style={{
              transition: 'stroke-dashoffset 0.5s',
              transform: 'rotate(90deg)',
              transformOrigin: '45px 45px'
            }}
            filter="url(#glow)"
          />
        </svg>
        {/* Avatar */}
        <div className="relative w-full h-full z-10">
          <img
            src={avatarUrl || "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"}
            alt={selectedEmpleado.Nombre}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
      </div>
      {/* Número de cargabilidad debajo del avatar */}
      <div className="w-full flex justify-center mt-2">
        <span className="text-sm font-semibold text-violet-600 bg-violet-50 px-3 py-0.5 rounded-full shadow-sm">
          Cargabilidad: {Math.round(cargabilidad)}%
        </span>
      </div>
    </div>
    {/* Info principal */}
    <div className="text-center flex-1">
      <h2 className="text-3xl font-bold text-purple-900">{selectedEmpleado.Nombre}</h2>
      <p className="text-lg text-purple-700 mt-1">{selectedEmpleado.Rol}</p>
    </div>
    <div className="flex-shrink-0">
      <Badge className="text-lg px-5 py-2 bg-purple-100 text-purple-800 border border-purple-200 shadow">
        Contratado: {selectedEmpleado.FechaContratacion}
      </Badge>
    </div>
  </CardContent>
</Card>

        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Certificados totales */}
          <Card className="shadow-xl rounded-2xl h-44 bg-gradient-to-br from-purple-100 to-white hover:scale-105 transition-transform duration-200 border border-purple-200">
            <CardContent className="flex items-center space-x-6 p-8 h-full">
              <div className="flex-shrink-0 bg-purple-200 rounded-full p-4 shadow-lg">
                <Star className="w-10 h-10 text-purple-700" />
              </div>
              <div>
                <h2 className="text-5xl font-extrabold text-purple-700">{selectedEmpleado.Certificados.length}</h2>
                <p className="text-lg text-purple-900 font-medium">Certificados totales</p>
              </div>
            </CardContent>
          </Card>
          {/* Metas activas */}
          <Card className="shadow-lg rounded-2xl h-44 bg-gradient-to-br from-green-100 to-white transition-transform hover:scale-105 duration-200">
            <CardContent className="flex items-center space-x-4 p-8 h-full">
              <div className="flex-shrink-0 bg-green-200 rounded-full p-4 shadow-lg">
                <Goal className="w-10 h-10 text-green-700" />
              </div>
              <div>
                <h2 className="text-5xl font-extrabold text-green-700">
                  {metasEmpleados.filter((meta) => meta.Plazo === "Activa").length}
                </h2>
                <p className="text-lg text-green-900 font-medium">Metas activas</p>
              </div>
            </CardContent>
          </Card>
          {/* Nivel del empleado */}
          <Card className="shadow-lg rounded-2xl h-44 bg-gradient-to-br from-blue-100 to-white transition-transform hover:scale-105 duration-200">
            <CardContent className="flex items-center justify-center space-x-4 p-8 h-full">
              <div className="flex-shrink-0 bg-blue-200 rounded-full p-4 shadow-lg">
                <ArrowBigUpDash className="w-10 h-10 text-blue-700" />
              </div>
              <div>
                <h2 className="text-5xl font-extrabold text-blue-700">{selectedEmpleado.Nivel}</h2>
                <p className="text-lg text-blue-900 font-medium">Nivel del empleado</p>
              </div>
            </CardContent>
          </Card>
          {/* Tiempo de antigüedad */}
          <Card className="shadow-lg rounded-2xl h-44 bg-gradient-to-br from-yellow-100 to-white transition-transform hover:scale-105 duration-200">
            <CardContent className="flex items-center space-x-4 p-8 h-full">
              <div className="flex-shrink-0 bg-yellow-200 rounded-full p-4 shadow-lg">
                <CalendarClock className="w-10 h-10 text-yellow-700" />
              </div>
              <div>
                <h2 className="text-5xl font-extrabold text-yellow-700">
                  {Math.floor((new Date().getTime() - new Date(selectedEmpleado.FechaContratacion).getTime()) / (1000 * 60 * 60 * 24 * 365))} años
                </h2>
                <p className="text-lg text-yellow-900 font-medium">Antigüedad</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sección de Metas y Estado de Certificados */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Metas de empleados */}
          {roles.peopleLead && (
            <Card className="col-span-2 shadow-lg rounded-2xl border border-green-100 bg-gradient-to-br from-white via-green-50 to-white hover:scale-[1.01] transition-transform duration-200">
              <CardContent>
                <h3 className="text-2xl font-bold mb-6 text-green-900 flex items-center gap-2">
                  <Goal className="w-6 h-6 text-green-500" /> Metas de empleados
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lista de empleados con metas */}
                  <div className="border-r pr-6 h-[220px] overflow-y-auto custom-scrollbar">
                    <h4 className="text-md font-semibold mb-3 text-green-700">Lista de empleados</h4>
                    <ul className="space-y-2 max-h-64 overflow-y-auto">
                      {empleados
                        .filter((empleado) => empleado.Metas && empleado.Metas.length > 0)
                        .map((empleado) => (
                          <li
                            key={empleado.ID_Empleado}
                            className={`cursor-pointer p-2 hover:bg-green-50 rounded-md ${selectedEmpleado2?.ID_Empleado === empleado.ID_Empleado ? "bg-green-100" : ""}`}
                            onClick={() => setSelectedEmpleado2(empleado)}
                          >
                            <span className="text-sm text-gray-800">{empleado.Nombre}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/* Detalles de metas del empleado seleccionado */}
                  <div className="pl-6 h-[220px] overflow-y-auto custom-scrollbar">
                    <h4 className="text-md font-semibold mb-3 text-green-700">Detalles de metas</h4>
                    {selectedEmpleado2 && selectedEmpleado2.Metas && selectedEmpleado2.Metas.length > 0 ? (
                      <ul className="space-y-4">
                        {selectedEmpleado2.Metas.map((meta) => (
                          <li key={meta.ID_meta} className="p-4 bg-gray-100 rounded-md">
                            <h5 className="text-sm font-semibold">{meta.Nombre}</h5>
                            <p className="text-sm text-gray-600 mt-1">{meta.Descripcion}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              <strong>Tipo:</strong> {meta.Tipo_Meta}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              <strong>Plazo:</strong> {meta.Plazo}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              <strong>Fecha Límite:</strong> {new Date(meta.Fecha_limite).toLocaleDateString()}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">Selecciona un empleado para ver sus metas.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Estado de Certificados */}
          <Card className="shadow-xl rounded-2xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-emerald-100 hover:scale-[1.01] transition-transform duration-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Estado de Certificados</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={courseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {courseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sección de empleados y proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Empleados asignados */}
          {roles.capabilityLead && (
            <Card className="shadow-xl rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-blue-100 hover:scale-[1.01] transition-transform duration-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
                  <span>Empleados asignados a tu departamento</span>
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                    {empleadosAsignados.length}
                  </span>
                </h3>
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <span className="text-sm font-semibold text-gray-600 w-1/2">Nombre</span>
                  <span className="text-sm font-semibold text-gray-600 w-1/4 text-center">Rol</span>
                  <span className="text-sm font-semibold text-gray-600 w-1/4 text-center">Estado</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {empleadosAsignados.length > 0 ? (
                    <ul className="space-y-2">
                      {empleadosAsignados.map((empleado) => (
                        <li key={empleado.ID_Empleado} className="flex items-center justify-between">
                          <span className="text-sm text-gray-800 w-1/2 truncate overflow-hidden whitespace-nowrap">
                            {empleado.Nombre}
                          </span>
                          <span className="text-sm text-gray-600 w-1/4 text-center">
                            {empleado.Rol}
                          </span>
                          <Badge className="text-xs bg-green-100 text-green-800 w-1/4 text-center">
                            Activo
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No tienes empleados asignados a tu departamento.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empleados sin proyectos */}
          {roles.capabilityLead && (
            <Card className="shadow-xl rounded-2xl border border-pink-100 bg-gradient-to-br from-white via-pink-50 to-pink-100 hover:scale-[1.01] transition-transform duration-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
                  <span>Empleados sin proyectos asignados</span>
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                    {empleadosSinProyectos.length}
                  </span>
                </h3>
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <span className="text-sm font-semibold text-gray-600 w-1/2">Nombre</span>
                  <span className="text-sm font-semibold text-gray-600 w-1/4 text-center">Tiempo sin proyecto</span>
                  <span className="text-sm font-semibold text-gray-600 w-1/4 text-center">Estado</span>
                </div>
                <div className="max-h-42 overflow-y-auto">
                  {empleadosSinProyectos.length > 0 ? (
                    <ul className="space-y-2">
                      {empleadosSinProyectos.map((empleado) => {
                        const lastProjectEndDate = empleado.Empleado_Proyectos
                          ?.flatMap((empleadoProyecto) => empleadoProyecto.Proyectos.map((proyecto) => new Date(proyecto.fecha_fin)))
                          .filter((date) => !isNaN(date.getTime()))
                          .sort((a, b) => b.getTime() - a.getTime())[0];
                        const baseDate = lastProjectEndDate || new Date(empleado.FechaContratacion);
                        const timeWithoutProject = Math.floor((new Date().getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
                        return (
                          <li key={empleado.ID_Empleado} className="flex items-center justify-between">
                            <TooltipProvider>
                              <TooltipComponent>
                                <TooltipTrigger asChild>
                                  <span className="text-sm text-gray-600 truncate block w-32">
                                    {empleado.Nombre}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {empleado.Nombre}
                                </TooltipContent>
                              </TooltipComponent>
                            </TooltipProvider>
                            <span className="text-sm text-gray-600 w-1/4 text-center">
                              {timeWithoutProject} días
                            </span>
                            <Badge className="text-xs bg-red-100 text-red-800 w-1/4 text-center">Sin proyecto</Badge>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-gray-600">Todos los empleados están asignados a proyectos.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empleados con proyectos */}
          {roles.capabilityLead && (
            <Card className="shadow-xl rounded-2xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50 to-indigo-100 hover:scale-[1.01] transition-transform duration-200 overflow-visible relative">
              <CardContent className="p-6 overflow-visible relative">
                <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
                  <span>Empleados con proyectos asignados</span>
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                    {empleadosConProyectos.length}
                  </span>
                </h3>
                <div className="border-b pb-2 mb-2">
                  <ul className="flex items-center w-full">
                    <li className="text-sm font-semibold text-gray-600 flex-1 text-left">Nombre</li>
                    <li className="text-sm font-semibold text-gray-600 flex-1 text-center">Proyectos actuales</li>
                    <li className="text-sm font-semibold text-gray-600 flex-1 text-center">Estado</li>
                  </ul>
                </div>
                <div className="max-h-42 overflow-y-auto">
                  {empleadosConProyectos.length > 0 ? (
                    <ul className="space-y-2">
                      {empleadosConProyectos.map((empleado) => {
                        const allProjects = empleado.Empleado_Proyectos
                          ?.flatMap((empleadoProyecto) => empleadoProyecto.Proyectos)
                          .filter((p) => !!p && !!p.Nombre);
                        const uniqueProjects = allProjects
                          ? allProjects.filter(
                              (proj, idx, arr) =>
                                arr.findIndex((p) => p.ID_Proyecto === proj.ID_Proyecto) === idx
                            )
                          : [];
                        return (
                          <li key={empleado.ID_Empleado} className="flex items-center justify-between w-full">
                            <div className="flex-1 text-left">
                              <TooltipProvider>
                                <TooltipComponent>
                                  <TooltipTrigger asChild>
                                    <span className="text-sm text-gray-600 truncate block w-32">
                                      {empleado.Nombre}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {empleado.Nombre}
                                  </TooltipContent>
                                </TooltipComponent>
                              </TooltipProvider>
                            </div>
                            <div className="flex-1 text-center">
                              <TooltipProvider>
                                <TooltipComponent>
                                  <TooltipTrigger asChild>
                                    <span className="text-sm text-gray-600 truncate block w-32">
                                      {uniqueProjects.length > 0
                                        ? uniqueProjects.map((p) => p.Nombre).join(", ")
                                        : "Sin proyecto"}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {uniqueProjects.length > 0
                                      ? uniqueProjects.map((p) => p.Nombre).join(", ")
                                      : "Sin proyecto"}
                                  </TooltipContent>
                                </TooltipComponent>
                              </TooltipProvider>
                            </div>
                            <div className="flex-1 text-center">
                              <Badge className="text-xs bg-green-100 text-green-800 w-full text-center">
                                Activo
                              </Badge>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-gray-600">Ningún empleado tiene proyectos asignados.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sección de proyectos para Delivery Lead */}
        {roles.deliveryLead && proyectosAsignadosActivos.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Empleados Asignados a Proyectos */}
    <Card className="shadow-xl rounded-2xl border border-green-100 bg-gradient-to-br from-white via-green-50 to-green-100 hover:scale-[1.01] transition-transform duration-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Empleados Asignados a Proyectos</h3>
        <div className="space-y-2 h-[250px] overflow-y-auto flex flex-col">
          {proyectosAsignadosActivos.map((proyecto: Proyecto, index: number) => (
            <div key={index} className="mb-6">
              <h4 className="text-xl font-bold">{proyecto.Nombre}</h4>
              <p className="text-sm text-gray-600 mt-2">{proyecto.Descripcion}</p>
              <div className="mt-4">
                <h5 className="text-md font-semibold mb-2">Empleados:</h5>
                <ul className="space-y-2">
                  {empleadosConProyectos
                    .filter((empleado) => {
                      const proyectosEmpleado = empleado.Empleado_Proyectos.flatMap((puesto) => puesto.Proyectos);
                      const isMatch = proyectosEmpleado.some((proyectoEmpleado) => proyectoEmpleado.ID_Proyecto === proyecto.ID_Proyecto);
                      return isMatch;
                    })
                    .map((empleado, empIndex) => (
                      <li key={empIndex} className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">{empleado.Nombre}</span>
                        <Badge className="text-xs bg-green-100 text-green-800">{empleado.Rol}</Badge>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    {/* Proyectos Asignados */}
    <Card className="shadow-xl rounded-2xl border border-purple-100 bg-gradient-to-br from-white via-purple-50 to-purple-100 hover:scale-[1.01] transition-transform duration-200">
      <CardContent className="flex flex-col h-full p-6">
        <h3 className="text-lg font-semibold mb-4">Proyectos Asignados</h3>
        <div className="mb-4 flex-grow">
          <h4 className="text-xl font-bold">{proyectosAsignadosActivos[currentProjectIndex]?.Nombre}</h4>
          <p className="text-sm text-gray-600 mt-2">
            {proyectosAsignadosActivos[currentProjectIndex]?.Descripcion}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Estado:</strong> {proyectosAsignadosActivos[currentProjectIndex]?.Status}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Fecha de inicio:</strong> {proyectosAsignadosActivos[currentProjectIndex]?.fecha_inicio ? new Date(proyectosAsignadosActivos[currentProjectIndex]?.fecha_inicio).toLocaleDateString() : ""}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Fecha de fin:</strong> {proyectosAsignadosActivos[currentProjectIndex]?.fecha_fin ? new Date(proyectosAsignadosActivos[currentProjectIndex]?.fecha_fin).toLocaleDateString() : ""}
          </p>
        </div>
        <div className="flex justify-center space-x-4 ">
          {proyectosAsignadosActivos.map((_: Proyecto, index: number) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full ${index === currentProjectIndex
                ? "text-white"
                : "bg-gray-200 text-gray-800"
                }`}
              style={index === currentProjectIndex ? { backgroundColor: "#8b36db" } : {}}
              onClick={() => setCurrentProjectIndex(index)}
            >
              Proyecto {index + 1}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)}

        {/* Gráfica de proyectos por año */}
        <Card className="col-span-full shadow-xl rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-white mt-8">
          <CardContent>
            <h3 className="text-2xl font-bold mb-6 text-blue-900">Proyectos por año</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#8b36db" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}