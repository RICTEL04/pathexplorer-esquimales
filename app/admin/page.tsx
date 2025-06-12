"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Users, Briefcase, Layers, UserCog, BookOpen, Target, UserCheck, BarChart2, UserPlus, Award, Activity } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";

// Importa dinámicamente Chart.js para evitar SSR issues
const Bar = dynamic(() => import("react-chartjs-2").then(mod => mod.Bar), { ssr: false });
const Pie = dynamic(() => import("react-chartjs-2").then(mod => mod.Pie), { ssr: false });
const Line = dynamic(() => import("react-chartjs-2").then(mod => mod.Line), { ssr: false });
const Doughnut = dynamic(() => import("react-chartjs-2").then(mod => mod.Doughnut), { ssr: false });
const Radar = dynamic(() => import("react-chartjs-2").then(mod => mod.Radar), { ssr: false });
const PolarArea = dynamic(() => import("react-chartjs-2").then(mod => mod.PolarArea), { ssr: false });

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement, // <-- Agrega esto
    LineElement,
    RadialLinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement, // <-- Y esto
    LineElement,
    RadialLinearScale,
  Tooltip,
  Legend,
  Title
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    empleados: 0,
    proyectos: 0,
    departamentos: 0,
    leads: 0,
    cursos: 0,
    habilidades: 0,
    metas: 0,
    empleadosActivos: 0,
    empleadosInactivos: 0,
    proyectosActivos: 0,
    proyectosFinalizados: 0,
    certificaciones: 0,
    nuevasAltas: 0,
    promedioCargabilidad: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Empleados activos: tienen un puesto en un proyecto con Status 'active'
      const { count: empleadosActivos } = await supabase
        .from("Puesto_persona")
        .select("ID_Empleado", { count: "exact", head: true })
        .in(
          "ID_Puesto",
          (
            await supabase
              .from("Puesto_proyecto")
              .select("id")
              .in(
                "ID_Proyecto",
                (
                  await supabase
                    .from("Proyectos")
                    .select("ID_Proyecto")
                    .eq("Status", "active")
                ).data?.map((p) => p.ID_Proyecto) || []
              )
          ).data?.map((pp) => pp.id) || []
        );

      // Empleados inactivos: empleados que NO tienen ningún puesto en proyectos activos
      const { data: allEmpleados } = await supabase
        .from("Empleado")
        .select("ID_Empleado");
      const { data: activosEmpleados } = await supabase
        .from("Puesto_persona")
        .select("ID_Empleado")
        .in(
          "ID_Puesto",
          (
            await supabase
              .from("Puesto_proyecto")
              .select("id")
              .in(
                "ID_Proyecto",
                (
                  await supabase
                    .from("Proyectos")
                    .select("ID_Proyecto")
                    .eq("Status", "active")
                ).data?.map((p) => p.ID_Proyecto) || []
              )
          ).data?.map((pp) => pp.id) || []
        );
      const activosIds = new Set(activosEmpleados?.map((e) => e.ID_Empleado));
      const empleadosInactivos = allEmpleados
        ? allEmpleados.filter((e) => !activosIds.has(e.ID_Empleado)).length
        : 0;

      // Otras métricas
      const [
        { count: empleados },
        { count: proyectos },
        { count: departamentos },
        { count: leads },
        { count: cursos },
        { count: habilidades },
        { count: metas },
        { count: proyectosActivos },
        { count: proyectosFinalizados },
        { count: certificaciones },
        { count: nuevasAltas },
        promedioCargabilidadRes,
      ] = await Promise.all([
        supabase.from("Empleado").select("*", { count: "exact", head: true }),
        supabase.from("Proyectos").select("*", { count: "exact", head: true }),
        supabase.from("Departamento").select("*", { count: "exact", head: true }),
        supabase.from("People_lead").select("*", { count: "exact", head: true }),
        supabase.from("Cursos").select("*", { count: "exact", head: true }),
        supabase.from("Habilidades").select("*", { count: "exact", head: true }),
        supabase.from("Metas").select("*", { count: "exact", head: true }),
        supabase.from("Proyectos").select("*", { count: "exact", head: true }).eq("Status", "active"),
        supabase.from("Proyectos").select("*", { count: "exact", head: true }).eq("Status", "done"),
        supabase.from("Certificados").select("*", { count: "exact", head: true }),
        supabase
          .from("Empleado")
          .select("*", { count: "exact", head: true })
          .gte("FechaContratacion", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)),
        supabase.from("Empleado").select("Cargabilidad"),
      ]);

      // Calcular promedio de cargabilidad
      let promedioCargabilidad = 0;
      if (promedioCargabilidadRes?.data?.length) {
        const total = promedioCargabilidadRes.data.reduce(
          (acc: number, curr: any) => acc + (curr.Cargabilidad || 0),
          0
        );
        promedioCargabilidad = Math.round(total / promedioCargabilidadRes.data.length);
      }

      setStats({
        empleados: empleados ?? 0,
        proyectos: proyectos ?? 0,
        departamentos: departamentos ?? 0,
        leads: leads ?? 0,
        cursos: cursos ?? 0,
        habilidades: habilidades ?? 0,
        metas: metas ?? 0,
        empleadosActivos: empleadosActivos ?? 0,
        empleadosInactivos: empleadosInactivos ?? 0,
        proyectosActivos: proyectosActivos ?? 0,
        proyectosFinalizados: proyectosFinalizados ?? 0,
        certificaciones: certificaciones ?? 0,
        nuevasAltas: nuevasAltas ?? 0,
        promedioCargabilidad,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: "Empleados",
      value: stats.empleados,
      icon: <Users className="w-8 h-8 text-violet-700" />,
      href: "/admin/empleados",
    },
    {
      label: "Empleados Activos",
      value: stats.empleadosActivos,
      icon: <UserCheck className="w-8 h-8 text-green-700" />,
      href: "/admin/empleados?status=activo",
    },
    {
      label: "Empleados Inactivos",
      value: stats.empleadosInactivos,
      icon: <UserCog className="w-8 h-8 text-gray-500" />,
      href: "/admin/empleados?status=inactivo",
    },
    {
      label: "Nuevas Altas (30 días)",
      value: stats.nuevasAltas,
      icon: <UserPlus className="w-8 h-8 text-blue-700" />,
      href: "/admin/empleados?altas=30dias",
    },
    {
      label: "Promedio Cargabilidad",
      value: stats.promedioCargabilidad + "%",
      icon: <Activity className="w-8 h-8 text-fuchsia-700" />,
      href: "/admin/empleados",
    },
    {
      label: "Proyectos",
      value: stats.proyectos,
      icon: <Briefcase className="w-8 h-8 text-fuchsia-700" />,
      href: "/admin/proyectos",
    },
    {
      label: "Proyectos Activos",
      value: stats.proyectosActivos,
      icon: <BarChart2 className="w-8 h-8 text-green-700" />,
      href: "/admin/proyectos?estado=activo",
    },
    {
      label: "Proyectos Finalizados",
      value: stats.proyectosFinalizados,
      icon: <BarChart2 className="w-8 h-8 text-gray-400" />,
      href: "/admin/proyectos?estado=finalizado",
    },
    {
      label: "Departamentos",
      value: stats.departamentos,
      icon: <Layers className="w-8 h-8 text-blue-700" />,
      href: "/admin/departamento",
    },
    {
      label: "People Leads",
      value: stats.leads,
      icon: <UserCog className="w-8 h-8 text-green-700" />,
      href: "/admin/leads",
    },
    {
      label: "Cursos",
      value: stats.cursos,
      icon: <BookOpen className="w-8 h-8 text-orange-700" />,
      href: "/admin/cursos",
    },
    {
      label: "Habilidades",
      value: stats.habilidades,
      icon: <Target className="w-8 h-8 text-yellow-700" />,
      href: "/admin/habilidades",
    },
    {
      label: "Metas",
      value: stats.metas,
      icon: <UserCheck className="w-8 h-8 text-emerald-700" />,
      href: "#",
    },
    {
      label: "Certificaciones",
      value: stats.certificaciones,
      icon: <Award className="w-8 h-8 text-indigo-700" />,
      href: "/admin/certificaciones",
    },
  ];

  // Datos para gráfica de barras: empleados activos/inactivos y proyectos activos/finalizados
  const barData = {
    labels: ["Empleados Activos", "Empleados Inactivos", "Proyectos Activos", "Proyectos Finalizados"],
    datasets: [
      {
        label: "Cantidad",
        data: [
          stats.empleadosActivos,
          stats.empleadosInactivos,
          stats.proyectosActivos,
          stats.proyectosFinalizados,
        ],
        backgroundColor: [
          "#7c3aed", // violeta
          "#a1a1aa", // gris
          "#22d3ee", // cyan
          "#fbbf24", // amarillo
        ],
        borderRadius: 8,
      },
    ],
  };

  // Datos para gráfica de pastel: distribución de empleados por departamento
  const [departamentoLabels, setDepartamentoLabels] = useState<string[]>([]);
  const [departamentoCounts, setDepartamentoCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      const { data: departamentos } = await supabase
        .from("Departamento")
        .select("ID_Departamento, Nombre");
      if (!departamentos) return;
      const labels = departamentos.map((d: any) => d.Nombre);
      // Cuenta empleados por departamento
      const counts = await Promise.all(
        departamentos.map(async (d: any) => {
          const { count } = await supabase
            .from("Empleado")
            .select("ID_Empleado", { count: "exact", head: true })
            .eq("ID_Departamento", d.ID_Departamento);
          return count ?? 0;
        })
      );
      setDepartamentoLabels(labels);
      setDepartamentoCounts(counts);
    };
    fetchDepartamentos();
  }, []);

  const pieData = {
    labels: departamentoLabels,
    datasets: [
      {
        label: "Empleados por Departamento",
        data: departamentoCounts,
        backgroundColor: [
          "#7c3aed",
          "#f472b6",
          "#fbbf24",
          "#22d3ee",
          "#34d399",
          "#818cf8",
          "#f87171",
          "#a3e635",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Nueva gráfica: Evolución de nuevas altas de empleados por mes (últimos 6 meses)
  const [altasLabels, setAltasLabels] = useState<string[]>([]);
  const [altasCounts, setAltasCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchAltasPorMes = async () => {
      // Obtener los últimos 6 meses
      const now = new Date();
      const meses: string[] = [];
      const counts: number[] = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const mes = d.toLocaleString("default", { month: "short" });
        const año = d.getFullYear();
        meses.push(`${mes} ${año}`);
        // Primer y último día del mes
        const inicio = new Date(año, d.getMonth(), 1).toISOString().slice(0, 10);
        const fin = new Date(año, d.getMonth() + 1, 0).toISOString().slice(0, 10);
        // Consulta empleados contratados en ese mes
        // eslint-disable-next-line no-await-in-loop
        const { count } = await supabase
          .from("Empleado")
          .select("ID_Empleado", { count: "exact", head: true })
          .gte("FechaContratacion", inicio)
          .lte("FechaContratacion", fin);
        counts.push(count ?? 0);
      }
      setAltasLabels(meses);
      setAltasCounts(counts);
    };
    fetchAltasPorMes();
  }, []);

  const lineData = {
    labels: altasLabels,
    datasets: [
      {
        label: "Nuevas Altas",
        data: altasCounts,
        fill: false,
        borderColor: "#7c3aed",
        backgroundColor: "#a78bfa",
        tension: 0.3,
        pointRadius: 6,
        pointBackgroundColor: "#7c3aed",
      },
    ],
  };

  // Gráfica 1: Doughnut de proyectos por status
  const [proyectosStatusLabels, setProyectosStatusLabels] = useState<string[]>([]);
  const [proyectosStatusCounts, setProyectosStatusCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchProyectosStatus = async () => {
      const statuses = ["active", "inactive", "pending", "done"];
      const counts = await Promise.all(
        statuses.map(async (status) => {
          const { count } = await supabase
            .from("Proyectos")
            .select("ID_Proyecto", { count: "exact", head: true })
            .eq("Status", status);
          return count ?? 0;
        })
      );
      setProyectosStatusLabels(["Activos", "Inactivos", "Pendientes", "Finalizados"]);
      setProyectosStatusCounts(counts);
    };
    fetchProyectosStatus();
  }, []);

  const doughnutData = {
    labels: proyectosStatusLabels,
    datasets: [
      {
        data: proyectosStatusCounts,
        backgroundColor: ["#7c3aed", "#fbbf24", "#f472b6", "#a1a1aa"],
        borderWidth: 2,
      },
    ],
  };

  // Gráfica 2: Radar de habilidades más frecuentes
  const [habilidadLabels, setHabilidadLabels] = useState<string[]>([]);
  const [habilidadCounts, setHabilidadCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchHabilidades = async () => {
      const { data: habilidades } = await supabase
        .from("Habilidades")
        .select("ID_Habilidad, Nombre");
      if (!habilidades) return;
      // Contar empleados por habilidad
      const counts = await Promise.all(
        habilidades.map(async (h: any) => {
          const { count } = await supabase
            .from("Historial_Habilidades")
            .select("ID_Habilidad", { count: "exact", head: true })
            .eq("ID_Habilidad", h.ID_Habilidad);
          return count ?? 0;
        })
      );
      // Tomar solo las 6 más frecuentes
      const top = habilidades
        .map((h: any, i: number) => ({ label: h.Nombre, count: counts[i] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);
      setHabilidadLabels(top.map((t) => t.label));
      setHabilidadCounts(top.map((t) => t.count));
    };
    fetchHabilidades();
  }, []);

  const radarData = {
    labels: habilidadLabels,
    datasets: [
      {
        label: "Empleados con habilidad",
        data: habilidadCounts,
        backgroundColor: "rgba(124,58,237,0.2)",
        borderColor: "#7c3aed",
        pointBackgroundColor: "#f472b6",
        borderWidth: 2,
      },
    ],
  };

  // Gráfica 3: PolarArea de empleados por nivel (del 1 al 12)
  const [nivelLabels, setNivelLabels] = useState<string[]>([]);
  const [nivelCounts, setNivelCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchNiveles = async () => {
      // Niveles del 1 al 12
      const niveles = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
      const counts = await Promise.all(
        niveles.map(async (nivel) => {
          const { count } = await supabase
            .from("Empleado")
            .select("ID_Empleado", { count: "exact", head: true })
            .eq("Nivel", nivel);
          return count ?? 0;
        })
      );
      setNivelLabels(niveles);
      setNivelCounts(counts);
    };
    fetchNiveles();
  }, []);

  const polarData = {
    labels: nivelLabels,
    datasets: [
      {
        label: "Empleados por nivel",
        data: nivelCounts,
        backgroundColor: [
          "#7c3aed", "#fbbf24", "#34d399", "#f472b6", "#818cf8", "#f87171",
          "#a3e635", "#f472b6", "#fbbf24", "#22d3ee", "#34d399", "#a1a1aa"
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f3e8ff] to-[#e0e7ff] pb-16">
      {/* Header */}
      <header className="px-4 md:px-12 pt-10 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-800 to-fuchsia-600 drop-shadow">
            Panel de Administrador
          </h1>
          <p className="text-gray-600 mt-2 text-lg md:text-xl">
            Visualiza y gestiona empleados, proyectos, departamentos y más.
          </p>
        </div>
        <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-fuchsia-100 to-violet-100 text-violet-700 font-semibold shadow text-lg">
          {new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" })}
        </span>
      </header>

      {/* Tarjetas resumen */}
      <section className="px-4 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-14">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group flex items-center gap-4 p-6 bg-white/95 rounded-2xl shadow-lg border border-violet-100 hover:scale-[1.04] hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 group-hover:from-fuchsia-200 group-hover:to-violet-200 transition">
                {card.icon}
              </div>
              <div>
                <div className="text-3xl font-extrabold text-violet-900 group-hover:text-fuchsia-700 transition">{card.value}</div>
                <div className="text-gray-600 font-medium">{card.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Gráficas */}
      <section className="px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white/95 rounded-2xl shadow-lg p-8 border border-violet-100 col-span-1">
            <h2 className="text-xl font-bold mb-4 text-violet-800 flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-fuchsia-600" /> Empleados y Proyectos
            </h2>
            {typeof window === "undefined" ? (
              <Skeleton active />
            ) : (
              <Bar data={barData} options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: { beginAtZero: true, ticks: { stepSize: 1 } },
                },
              }} />
            )}
          </div>
          <div className="bg-white/95 rounded-2xl shadow-lg p-8 border border-violet-100 col-span-1">
            <h2 className="text-xl font-bold mb-4 text-violet-800 flex items-center gap-2">
              <Layers className="w-6 h-6 text-fuchsia-600" /> Distribución por Departamento
            </h2>
            {typeof window === "undefined" ? (
              <Skeleton active />
            ) : (
              <Pie data={pieData} options={{
                responsive: true,
                plugins: {
                  legend: { position: "bottom" },
                  title: { display: false },
                },
              }} />
            )}
          </div>
          <div className="bg-white/95 rounded-2xl shadow-lg p-8 border border-violet-100 col-span-1">
            <h2 className="text-xl font-bold mb-4 text-violet-800 flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-fuchsia-600" /> Altas de Empleados por Mes
            </h2>
            {typeof window === "undefined" ? (
              <Skeleton active />
            ) : (
              <Line data={lineData} options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: { beginAtZero: true, ticks: { stepSize: 1 } },
                },
              }} />
            )}
          </div>
        </div>
      </section>

      {/* Otras gráficas: Proyectos por Estado, Habilidades Más Frecuentes, Empleados por Nivel */}
      <section className="px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white/95 rounded-2xl shadow-lg p-8 border border-violet-100">
            <h2 className="text-lg font-bold mb-4 text-violet-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-fuchsia-600" /> Proyectos por Estado
            </h2>
            {typeof window === "undefined" ? (
              <Skeleton active />
            ) : (
              <Doughnut data={doughnutData} options={{
                responsive: true,
                plugins: {
                  legend: { position: "bottom" },
                  title: { display: false },
                },
              }} />
            )}
          </div>
          <div className="bg-white/95 rounded-2xl shadow-lg p-8 border border-violet-100">
            <h2 className="text-lg font-bold mb-4 text-violet-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-fuchsia-600" /> Habilidades Más Frecuentes
            </h2>
            {typeof window === "undefined" ? (
              <Skeleton active />
            ) : (
              <Radar data={radarData} options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  r: { beginAtZero: true, pointLabels: { font: { size: 14 } } },
                },
              }} />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm mt-10">
        &copy; {new Date().getFullYear()} PathExplorer. Todos los derechos reservados.
      </footer>
    </div>
  );
}