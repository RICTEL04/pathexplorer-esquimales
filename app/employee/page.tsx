
"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"; // Import the User type from Supabase
import { supabase } from "@/lib/supabase";
import { getEmpleados } from "@/lib/empleadoService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Star } from "lucide-react";

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

export default function EmployeeDashboard() {
  interface Empleado {
    ID_Empleado: any;
    Nombre: any;
    Rol: any;
    FechaContratacion: any;
    Certificados: {
      ID_Certificado: any;
      Nombre: any;
      Verificacion: boolean | null;
    }[];
    Departamento: {
      Nombre: any;
      Descripcion: any;
    }[];
    Puesto_proyecto: {
      Proyectos: {
        ID_Proyecto: any;
        fecha_inicio: any;
        fecha_fin: any;
        Nombre: any;
        Descripcion: any;
      }[];
      id: any;
      created_at: any;
      Puesto: any;
    }[];
  }
  
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserAndData = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const userId = sessionData.session?.user.id;
        setUser(sessionData.session?.user ?? null);

        // Obtener los empleados y filtrar por el usuario logueado
        const empleadosData = await getEmpleados();
        const empleadoLogueado = empleadosData.find((empleado) => empleado.ID_Empleado === userId);

        setEmpleados(empleadosData);
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

  const courseData = [
    { name: "Activos", value: selectedEmpleado.Certificados.filter((c) => c.Verificacion).length, color: "#4ade80" },
    { name: "Pendientes", value: selectedEmpleado.Certificados.filter((c) => c.Verificacion === null).length, color: "#f87171" },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] p-8">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {/* Perfil */}
        <Card className="col-span-full shadow-md rounded-sm">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-2xl font-semibold">{selectedEmpleado.Nombre}</h2>
              <p className="text-muted-foreground mt-1">{selectedEmpleado.Rol}</p>
            </div>
            <Badge className="text-lg px-4 py-2">Contratado: {selectedEmpleado.FechaContratacion}</Badge>
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

        {/* Estado de Cursos */}
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

        {/* Gráfica de Trabajo */}
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