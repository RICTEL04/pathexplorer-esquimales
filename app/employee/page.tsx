"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const workData = [
  { year: "2021", tasks: 45 },
  { year: "2022", tasks: 78 },
  { year: "2023", tasks: 102 },
  { year: "2024", tasks: 89 },
];

export default function EmployeeDashboard() {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">

      {/* Perfil y Nivel */}
      <Card className="col-span-full flex items-center justify-between p-4">
        <div>
          <h2 className="text-2xl font-bold">Jorge Betanzo</h2>
          <p className="text-muted-foreground">Desarrollador Backend - Nivel 8</p>
        </div>
        <Badge className="text-lg px-4 py-2" variant="default">Nivel 8</Badge>
      </Card>


      <Card>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">Certificaciones</h3>
          <ul className="space-y-2">
            <li className="flex justify-between"><span>React Avanzado</span> <Badge variant="default">Activa</Badge></li>
            <li className="flex justify-between"><span>Docker Básico</span> <Badge variant="secondary">Pendiente</Badge></li>
            <li className="flex justify-between"><span>SCRUM Master</span> <Badge variant="destructive">Denegada</Badge></li>
            <li className="flex justify-between"><span>Kubernetes</span> <Badge variant="outline">Caducada</Badge></li>
          </ul>
        </CardContent>
      </Card>


      <Card>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">Progreso en Cursos</h3>
          <p>Arquitectura de Software</p>
          <Progress value={75} className="mb-4" />
          <p>DevOps Essentials</p>
          <Progress value={40} />
        </CardContent>
      </Card>


      <Card>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">Historial de Roles</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>2021 - Intern</li>
            <li>2022 - Junior Developer</li>
            <li>2023 - Mid Developer</li>
            <li>2024 - Backend Specialist</li>
          </ul>
        </CardContent>
      </Card>


      <Card>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">Evaluaciones Recientes</h3>
          <ul className="space-y-1">
            <li>Marzo 2024: 4.5/5</li>
            <li>Julio 2023: 4.2/5</li>
            <li>Diciembre 2022: 4.0/5</li>
          </ul>
        </CardContent>
      </Card>


      <Card className="col-span-full">
        <CardContent>
          <h3 className="text-xl font-semibold mb-4">Tareas Completadas por Año</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={workData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
}
