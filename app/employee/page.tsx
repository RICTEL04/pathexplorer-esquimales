"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"; // Import the User type from Supabase
import { supabase } from "@/lib/supabase";
import { CapabilityLead, DeliveryLead, getEmpleados, Proyecto, Metas } from "@/lib/empleadoService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Star, ArrowBigUpDash, CalendarClock, Goal } from "lucide-react";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import { Tooltip as TooltipComponent } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Empleado } from "@/lib/empleadoService";


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
          ...empleado
        }));

        

        const empleadoLogueado = empleadosMapped.find((empleado: any) => empleado.ID_Empleado === userId);


        setEmpleados(empleadosMapped);
        setSelectedEmpleado(empleadoLogueado);

        const metas = empleadosData
        .flatMap((empleado) => empleado.Metas || []); // Combinar todas las metas en un solo array
        setMetasEmpleados(metas); // Guardar las metas en el estado

        const firstEmpleadoWithMetas = empleadosData.find((empleado) => empleado.Metas && empleado.Metas.length > 0);
        setSelectedEmpleado2(firstEmpleadoWithMetas || null);


        if (empleadoLogueado) {
          const deliveryLeadData = empleadoLogueado.Delivery_Lead;
          if (deliveryLeadData) {
            setDeliveryLead(Array.isArray(deliveryLeadData) ? deliveryLeadData[0] : deliveryLeadData);
          }
          const capabilityLeadData = empleadoLogueado.Capability_Lead;
          if (capabilityLeadData) {
            setCapabilityLead(Array.isArray(capabilityLeadData) ? capabilityLeadData[0] : capabilityLeadData);
          }
        }
      } catch (error) {
        console.error("Error fetching user or empleados:", error);
      }
    };


    fetchUserAndData();
  }, []);

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


  const empleadosAsignados = empleados.filter((empleado) => {
    // Verificar si el empleado logueado tiene un ID_Departamento válido
    const departamentoLogueado = capabilityLead

      ? capabilityLead.ID_Departamento
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

        {roles.peopleLead && (
          <Card className="col-span-2 shadow-md rounded-sm">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Metas de empleados</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Lista de empleados con metas */}
                <div className="border-r pr-4 h-[200px] overflow-y-auto">
                  <h4 className="text-md font-semibold mb-2">Lista de empleados</h4>
                  <ul className="space-y-2 max-h-64 overflow-y-auto">
                    {empleados
                      .filter((empleado) => empleado.Metas && empleado.Metas.length > 0) // Filtrar empleados con metas
                      .map((empleado) => (
                        <li
                          key={empleado.ID_Empleado}
                          className={`cursor-pointer p-2 hover:bg-gray-100 rounded-md ${
                            selectedEmpleado2?.ID_Empleado === empleado.ID_Empleado ? "bg-gray-200" : ""
                          }`}
                          onClick={() => setSelectedEmpleado2(empleado)} // Actualizar el empleado seleccionado para metas
                        >
                          <span className="text-sm text-gray-800">{empleado.Nombre}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Detalles de metas del empleado seleccionado */}
                <div className= "pl-4 h-[200px] overflow-y-auto">
                  <h4 className="text-md font-semibold mb-2">Detalles de metas</h4>
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

        {/* Información adicional basada en roles */}
        

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
              <div className="max-h-42 overflow-y-auto">
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
              <div className="max-h-42 overflow-y-auto">
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


        {roles.deliveryLead && (deliveryLead?.Proyectos ?? []).length > 0 && (
          <Card className="shadow-md rounded-sm">
            <CardContent>

              <h3 className="text-lg font-semibold mb-4">Empleados Asignados a Proyectos</h3>
              <div className="space-y-2 h-[250px] overflow-y-auto flex flex-col">
                {deliveryLead?.Proyectos.map((proyecto: Proyecto, index: number) => (
                  <div key={index} className="mb-6">
                    <h4 className="text-xl font-bold">{proyecto.Nombre}</h4>
                    <p className="text-sm text-gray-600 mt-2">{proyecto.Descripcion}</p>

                    {/* Lista de empleados asignados */}
                    <div className="mt-4">
                      <h5 className="text-md font-semibold mb-2">Empleados:</h5>

                      <ul className="space-y-2">
                        {empleadosConProyectos
                          .filter((empleado) => {
                            // Verificar si algún proyecto del empleado coincide con el proyecto actual
                            const proyectosEmpleado = empleado.Puesto_proyecto.flatMap((puesto) => puesto.Proyectos);
                            const isMatch = proyectosEmpleado.some((proyectoEmpleado) => proyectoEmpleado.ID_Proyecto === proyecto.ID_Proyecto);

                            console.log("Empleado:", empleado.Nombre);
                            console.log("Proyectos del empleado:", proyectosEmpleado);
                            console.log("Proyecto actual ID_Proyecto:", proyecto.ID_Proyecto);
                            console.log("Match:", isMatch);

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
        )}


        {roles.deliveryLead && (deliveryLead?.Proyectos ?? []).length > 0 && (
          <Card className="shadow-md rounded-sm">
            <CardContent className = "flex flex-col h-full">
              <h3 className="text-lg font-semibold mb-4">Proyectos Asignados</h3>


              <div className="mb-4 flex-grow">
                <h4 className="text-xl font-bold">{deliveryLead?.Proyectos[currentProjectIndex]?.Nombre}</h4>
                <p className="text-sm text-gray-600 mt-2">
                  {deliveryLead?.Proyectos[currentProjectIndex]?.Descripcion}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Estado:</strong> {deliveryLead?.Proyectos[currentProjectIndex]?.Status}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Fecha de inicio:</strong> {new Date(deliveryLead?.Proyectos[currentProjectIndex]?.fecha_inicio).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Fecha de fin:</strong> {new Date(deliveryLead?.Proyectos[currentProjectIndex]?.fecha_fin).toLocaleDateString()}
                </p>
              </div>

              {/* Menú para cambiar entre proyectos */}
              <div className="flex justify-center space-x-4 ">
                {deliveryLead?.Proyectos.map((_: Proyecto, index: number) => (
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

           <div className="grid grid-cols-2 gap-4">
          {/* Primera tarjeta: Certificados totales */}
          <Card className="shadow-md rounded-sm h-40">
            <CardContent className="flex items-center space-x-4 p-6 h-full">
              <div className="flex-shrink-0">
                <Star className="w-8 h-8 text-gray-800" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{selectedEmpleado.Certificados.length}</h2>
                <p className="text-sm text-muted-foreground">Certificados totales</p>
              </div>
            </CardContent>
          </Card>
        
          {/* Segunda tarjeta: Metas activas */}
          <Card className="shadow-md rounded-sm">
            <CardContent className="flex items-center space-x-4 p-6 h-full">
              <div className="flex-shrink-0">
                <Goal className="w-8 h-8 text-gray-800" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {metasEmpleados.filter((meta) => meta.Plazo === "Activa").length}
                </h2>
                <p className="text-sm text-muted-foreground">Metas activas</p>
              </div>
            </CardContent>
          </Card>
        
                    {/* Tercera tarjeta: Nivel del empleado */}
          <Card className="shadow-md rounded-sm h-40">
            <CardContent className="flex items-center justify-center space-x-4 p-6 h-full">
              <div className="flex-shrink-0">
                <ArrowBigUpDash className="w-8 h-8 text-gray-800" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{selectedEmpleado.Nivel}</h2>
                <p className="text-sm text-muted-foreground">Nivel del empleado</p>
              </div>
            </CardContent>
          </Card>
        
          {/* Cuarta tarjeta: Tiempo de antigüedad */}
          <Card className="shadow-md rounded-sm">
            <CardContent className="flex items-center space-x-4 p-6 h-full">
              <div className="flex-shrink-0">
                <CalendarClock className="w-8 h-8 text-gray-800" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {Math.floor((new Date().getTime() - new Date(selectedEmpleado.FechaContratacion).getTime()) / (1000 * 60 * 60 * 24 * 365))} años
                </h2>
                <p className="text-sm text-muted-foreground">Tiempo de antigüedad</p>
              </div>
            </CardContent>
          </Card>
        </div>

    

        {/* Gráfica de proyectos por año */}
        <Card className="col-span-full shadow-md rounded-sm">
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Proyectos por año</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#8b36db" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}