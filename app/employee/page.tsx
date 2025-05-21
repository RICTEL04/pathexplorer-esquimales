"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"; // Import the User type from Supabase
import { supabase } from "@/lib/supabase";
import { getEmpleados } from "@/lib/empleadoService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Star } from "lucide-react";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import { Tooltip as TooltipComponent } from "@/components/ui/tooltip";
import {TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import {getCapability} from "@/lib/capabilityServices";


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



export default function EmployeeDashboard() {
    interface Empleado {
    ID_Empleado: any;
    Nombre: any;
    Rol: any;
    Nivel: any;
    FechaContratacion: any;
    ID_Departamento: any;
    Certificados: {
      ID_Certificado: any;
      Nombre: any;
      Fecha_caducidad: any;
      Documento: any;
      Verificacion: boolean | null;
      Descripcion: any;
    }[];
    Puesto_proyecto: {
      id: any;
      created_at: any;
      Puesto: any;
      Proyectos: {
        ID_Proyecto: any;
        fecha_inicio: any;
        fecha_fin: any;
        Nombre: any;
        Descripcion: any;
      }[];
    }[];
    Capability_Lead: {
      ID_Empleado: any;
      ID_Departamento: any;
      ID_CapabilityLead: any;
      Departamento: {
        Nombre: any;
        Descripcion: any;
      }[];
    }[];
  }
  

  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState({
    peopleLead: false,
    capabilityLead: false,
    deliveryLead: false,
    talentLead: false,
  });
  

  useEffect(() => {
    const fetchUserAndData = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const userId = sessionData.session?.user.id;
        if (!userId) {
          console.warn("User ID is undefined");
          return;
        }

        setUser(sessionData.session?.user ?? null);

        // Obtener roles del usuario
        const userRoles = await fetchUserRoles(userId);
        setRoles(userRoles);

        // Obtener empleados y filtrar por el usuario logueado
        const empleadosData = await getEmpleados();
        const empleadosMapped = empleadosData.map((empleado) => ({
          ...empleado,
        }));

        const empleadoLogueado = empleadosMapped.find((empleado: any) => empleado.ID_Empleado === userId);

        setEmpleados(empleadosMapped);
        setSelectedEmpleado(empleadoLogueado ?? null);
      } catch (error) {
        console.error("Error fetching user or empleados:", error);
      }
    };
    

    fetchUserAndData();
  }, []);
  

  if (!selectedEmpleado) {
    return <div>Cargando datos...</div>;
  }



  // Datos para la gráfica de proyectos por año
  const workData = Object.entries(
    selectedEmpleado.Puesto_proyecto.flatMap((puesto) => puesto.Proyectos || [])
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

    console.log(empleados[2]?.ID_Departamento);

    const capabilityLead = empleados[2]?.Capability_Lead?.[0];
    console.log(capabilityLead?.ID_Departamento);
    

  const empleadosAsignados = empleados.filter((empleado) => {
    // Verificar si el empleado logueado tiene un ID_Departamento válido
                const departamentoLogueado = selectedEmpleado?.Capability_Lead
                  ? selectedEmpleado.Capability_Lead.ID_Departamento 
                  : "No disponible";

    // Comparar el ID_Departamento del empleado con el del empleado logueado
    return empleado.ID_Departamento === departamentoLogueado;
  });
  
  

  const empleadosSinProyectos = empleados.filter(
    (empleado) => !empleado.Puesto_proyecto || empleado.Puesto_proyecto.length === 0
  );

  const empleadosConProyectos = empleados.filter(
    (empleado) => empleado.Puesto_proyecto.length > 0
  );

  return (
    <div className="min-h-screen p-8">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {/* Perfil del empleado */}
        <Card className="col-span-full shadow-md rounded-sm">
          <CardContent className="flex items-center justify-between p-6">

            <div className="flex-shrink-0">
              <UserIcon className="w-12 h-12 text-gray-500" />
            </div>
        
            <div className="text-center">
              <h2 className="text-2xl font-semibold">{selectedEmpleado.Nombre}</h2>
              <p className="text-muted-foreground mt-1">{selectedEmpleado.Rol}</p>
            </div>
        
            <div className="flex-shrink-0">
              <Badge className="text-lg px-4 py-2">Contratado: {selectedEmpleado.FechaContratacion}</Badge>
            </div>
          </CardContent>
        </Card>

        

        {/* Información adicional basada en roles */}
        {roles.peopleLead && (
          <Card className="shadow-md rounded-sm">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Información de People Lead</h3>
              <p>Gyat.ch</p>
            </CardContent>
          </Card>
        )}

        {roles.capabilityLead && (
          <Card className="shadow-md rounded-sm">
            <CardContent>
              {/* Título con el número de empleados asignados */}
              <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
                <span>Empleados asignados a tu departamento</span>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                  {empleadosAsignados.length}
                </span>
              </h3>

              {/* Encabezados de las columnas */}
              <div className="flex items-center justify-between border-b pb-2 mb-2">
                <span className="text-sm font-semibold text-gray-600 w-1/2">Nombre</span>
                <span className="text-sm font-semibold text-gray-600 w-1/4 text-center">Rol</span>
                <span className="text-sm font-semibold text-gray-600 w-1/4 text-center">Estado</span>
              </div>

              {/* Contenedor desplazable */}
              <div className="max-h-64 overflow-y-auto">
                {empleadosAsignados.length > 0 ? (
                  <ul className="space-y-2">
                    {empleadosAsignados.map((empleado) => (
                      <li key={empleado.ID_Empleado} className="flex items-center justify-between">
                        {/* Nombre del empleado */}
                        <span className="text-sm text-gray-800 w-1/2 truncate overflow-hidden whitespace-nowrap">
                          {empleado.Nombre}
                        </span>

                        {/* Rol del empleado */}
                        <span className="text-sm text-gray-600 w-1/4 text-center">
                          {empleado.Rol}
                        </span>

                        {/* Estado */}
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

          {roles.capabilityLead && (
            <Card className="shadow-md rounded-sm">
              <CardContent>
              <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
                <span>Empleados sin proyectos asignados</span>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                  {empleadosSinProyectos.length}
                </span>
              </h3>
          
                {/* Encabezados de las columnas */}
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <span className="text-sm font-semibold text-gray-600 w-1/2">Nombre</span>
                  <span className="text-sm font-semibold text-gray-600 w-1/4 text-center">Tiempo sin proyecto</span>
                  <span className="text-sm font-semibold text-gray-600 w-1/4 text-center">Estado</span>
                </div>
          
                {/* Contenedor desplazable */}
                <div className="max-h-64 overflow-y-auto">
                  {empleadosSinProyectos.length > 0 ? (
                    <ul className="space-y-2">
                      {empleadosSinProyectos.map((empleado) => {
                        // Calcular el tiempo sin proyecto
                        const lastProjectEndDate = empleado.Puesto_proyecto
                          ?.flatMap((puesto) => puesto.Proyectos.map((proyecto) => new Date(proyecto.fecha_fin)))
                          .filter((date) => !isNaN(date.getTime())) // Filtrar fechas válidas
                          .sort((a, b) => b.getTime() - a.getTime())[0]; // Obtener la fecha más reciente
          
                        const baseDate = lastProjectEndDate || new Date(empleado.FechaContratacion);
                        const timeWithoutProject = Math.floor((new Date().getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)); // Diferencia en días
          
                        return (
                          <li key={empleado.ID_Empleado} className="flex items-center justify-between">
                            {/* Nombre del empleado */}
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
          
                            {/* Tiempo sin proyecto */}
                            <span className="text-sm text-gray-600 w-1/4 text-center">
                              {timeWithoutProject} días
                            </span>
          
                            {/* Estado */}
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



          {roles.capabilityLead && (
            <Card className="shadow-md rounded-sm overflow-visible relative">
              <CardContent className="overflow-visible relative">
                {/* Título con el número de empleados con proyectos */}
                <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
                  <span>Empleados con proyectos asignados</span>
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                    {empleadosConProyectos.length}
                  </span>
                </h3>
          
                {/* Encabezados de las columnas */}
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <span className="text-sm font-semibold text-gray-600 w-1/2">Nombre</span>
                  <span className="text-sm font-semibold text-gray-600 w-1/4 text-center">Proyecto actual</span>
                  <span className="text-sm font-semibold text-gray-600 w-1/4 text-center">Estado</span>
                </div>
          
                {/* Contenedor desplazable */}
                <div className="max-h-64 overflow-y-auto">
                  {empleadosConProyectos.length > 0 ? (
                    <ul className="space-y-2">
                      {empleadosConProyectos.map((empleado) => {
                        // Obtener el proyecto más reciente
                        const currentProject = empleado.Puesto_proyecto
                          ?.flatMap((puesto) => puesto.Proyectos)
                          .sort((a, b) => new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime())[0];
          
                        return (
                          <li key={empleado.ID_Empleado} className="flex items-center justify-between">
                            {/* Nombre del empleado */}
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
          
                            <TooltipProvider>
                              <TooltipComponent>
                                <TooltipTrigger asChild>
                                  <span className="text-sm text-gray-600 truncate block w-16">
                                    {currentProject?.Nombre || "Sin proyecto"}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {currentProject?.Nombre || "Sin proyecto"}
                                </TooltipContent>
                              </TooltipComponent>
                            </TooltipProvider>
          
                            {/* Estado */}
                            <Badge className="text-xs bg-green-100 text-green-800 w-1/4 text-center">
                              Activo
                            </Badge>
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


        {roles.deliveryLead && (
          <Card className="shadow-md rounded-sm">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Información de Delivery Lead</h3>
              <p>Yap.</p>
            </CardContent>
          </Card>
        )}

        {roles.talentLead && (
          <Card className="shadow-md rounded-sm">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Información de Talent Lead</h3>
              <p>Bla Bla.</p>
            </CardContent>
          </Card>
        )}

        {/* Gráfica de estado de certificados */}
        <Card className="shadow-md rounded-sm">
          <CardContent>
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

        {/* Cursos Totales */}
        <Card className="shadow-md rounded-sm">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="flex-shrink-0">
              <Star className="w-12 h-12 text-gray-800" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800">{selectedEmpleado.Certificados.length}</h2>
              <p className="text-sm text-muted-foreground">Certificados totales</p>
            </div>
          </CardContent>
        </Card>

        {/* Progreso en Cursos */}
        <Card className="shadow-md rounded-sm">
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Progreso en Certificados</h3>
            <div className="space-y-4">
              {selectedEmpleado.Certificados.map((cert) => (
                <div key={cert.ID_Certificado}>
                  <p className="text-sm text-muted-foreground mb-1">{cert.Nombre}</p>
                  <Progress value={cert.Verificacion ? 100 : 50} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gráfica de proyectos por año */}
        <Card className="col-span-full shadow-md rounded-sm">
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Proyectos por año</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}