"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Star } from "lucide-react";

const workData = [
  { year: "2021", tasks: 45 },
  { year: "2022", tasks: 78 },
  { year: "2023", tasks: 102 },
  { year: "2024", tasks: 89 },
];

const courseData = [
  { name: "Activos", value: 3, color: "#4ade80" },
  { name: "Pendientes", value: 2, color: "#facc15" },
  { name: "Denegados", value: 1, color: "#f87171" },
  { name: "Caducados", value: 1, color: "#a78bfa" },
];

function StarRating({ rating }: { rating: number }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        size={20}
        className={i <= rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-muted"}
      />
    );
  }

  return <div className="flex gap-1">{stars}</div>;
}

export default function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-[#f9fafb] p-8">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {/* Perfil */}
        <Card className="col-span-full shadow-md rounded-sm">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-2xl font-semibold">Jorge Betanzo</h2>
              <p className="text-muted-foreground mt-1">Desarrollador Backend - Nivel 8</p>
            </div>
            <Badge className="text-lg px-4 py-2" variant="default">Nivel 8</Badge>
          </CardContent>
        </Card>

        {/* Estado de Cursos */}
        <Card className="shadow-md rounded-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Estado de Cursos</h3>
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

        {/* Progreso en Cursos */}
        <Card className="shadow-md rounded-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Progreso en Cursos</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Arquitectura de Software</p>
                <Progress value={75} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">DevOps Essentials</p>
                <Progress value={40} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Historial de Roles */}
        <Card className="shadow-md rounded-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Historial de Roles</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>2021 - Intern</li>
              <li>2022 - Junior Developer</li>
              <li>2023 - Mid Developer</li>
              <li>2024 - Backend Specialist</li>
            </ul>
          </CardContent>
        </Card>

        {/* Evaluaciones */}
        <Card className="shadow-md rounded-sm">
          <CardContent className="pt-4 px-6 pb-6">
            <h3 className="text-lg font-semibold mb-2">Evaluaciones Recientes</h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Marzo 2024</span>
                  <StarRating rating={5} />
                </div>
              </li>
              <li>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Julio 2023</span>
                  <StarRating rating={4} />
                </div>
              </li>
              <li>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Diciembre 2022</span>
                  <StarRating rating={4} />
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>


        {/* Gráfica de Trabajo */}
        <Card className="col-span-full shadow-md rounded-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tareas Completadas por Año</h3>
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
