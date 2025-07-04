"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card, Badge, Progress, Divider, Tag, List, Typography, Avatar, Button, Modal, Input } from "antd";
import EmployeeProfile from "@/components/CapabilityLead/EmployeeProfile";
import {
  CalendarOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  StarOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReviewModal from "@/components/Delivery-Lead-Proyectos/ReviewModal";

const { Title, Text, Paragraph } = Typography;

// Tipo para react-dnd
const ItemTypes = { EMPLEADO: "empleado" };

export default function ProyectoDetalle() {
  const router = useRouter();
  const params = useParams();
  const id =
    params && typeof params["id"] === "string"
      ? params["id"]
      : Array.isArray(params?.["id"])
        ? params?.["id"][0]
        : undefined;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [leadAvatarUrl, setLeadAvatarUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPuesto, setSelectedPuesto] = useState<any>(null);
  const [empleadosDisponibles, setEmpleadosDisponibles] = useState<any[]>([]);
  const [loadingEmpleados, setLoadingEmpleados] = useState(false);
  const [searchEmpleado, setSearchEmpleado] = useState(""); // Nuevo estado para búsqueda
  // Estado para empleados asignados a cada drop zone
  const [asignados, setAsignados] = useState<any[]>([]);
  // Estado para guardar los asignados originales al abrir el modal
  const [asignadosOriginales, setAsignadosOriginales] = useState<any[]>([]);
  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    index: null as number | null,
    newEmpleado: null as any,
    action: "" as "remove" | "replace" | "",
  });
  const [exitConfirmVisible, setExitConfirmVisible] = useState(false);
  const [asignadosPorPuesto, setAsignadosPorPuesto] = useState<Record<string, number>>({});
  const [startProjectModal, setStartProjectModal] = useState(false);
  const [finishProjectModal, setFinishProjectModal] = useState(false);
  const [finishCountdown, setFinishCountdown] = useState(5);
  const [finishEnabled, setFinishEnabled] = useState(false);
  const [postulados, setPostulados] = useState<any[]>([]);
  // Agrega este estado antes del return principal
  const [empleadoTab, setEmpleadoTab] = useState<"todos" | "postulados" | "ia">("todos");
  const [iaMode, setIaMode] = useState<"mejor" | "capacitar">("mejor"); // <--- NUEVO
  const [detallesEmpleados, setDetallesEmpleados] = useState<any[]>([]); // Nuevo estado para detalles de empleados
  const [ranking, setRanking] = useState<any[]>([]);
  const [loadingRanking, setLoadingRanking] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [perfilEmpleadoVisible, setPerfilEmpleadoVisible] = useState(false);
  const [empleadoPerfil, setEmpleadoPerfil] = useState<any>(null);
  const [rolIncompletoModal, setRolIncompletoModal] = useState(false);
  
  // Mueve fetchData fuera del useEffect para poder reutilizarla
  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("get_full_project_data", {
      project_id: id,
    });
    if (error) {
      console.error(error);
    } else {
      setData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  // Desestructurar data antes de usar proyecto en el siguiente useEffect
  const { proyecto, puestos, habilidadesPuestos, habilidadesGenerales } = data || {};

  // Esta función ya la tienes, solo asegúrate que retorna la URL firmada:
  const fetchAvatarURL = async (employeeID: string | null): Promise<string | null> => {
    if (!employeeID) return null;
    const bucketName = "profile-pictures";
    try {
      // Buscar archivos en el bucket
      const { data: files, error } = await supabase.storage
        .from(bucketName)
        .list(`${employeeID}`, {
          limit: 1,
          search: 'perfil'
        });

      if (error || !files || files.length === 0) {
        return null;
      }

      const actualFileName = files[0].name;
      const fullFilePath = `${employeeID}/${actualFileName}`;

      // Obtener URL firmada
      const { data: signedUrl } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(fullFilePath, 3600);

      if (!signedUrl?.signedUrl) {
        return null;
      }

      return signedUrl.signedUrl;
    } catch (error) {
      return null;
    }
  };

  // Efecto para cargar el avatar del líder cuando tengas los datos del proyecto
  useEffect(() => {
    if (proyecto?.ID_DeliveryLead) {
      fetchAvatarURL(proyecto.id_empleado_delivery).then(setLeadAvatarUrl);
    }
  }, [proyecto?.ID_DeliveryLead]);

  const fetchEmpleadosDisponibles = async (cargabilidadAdicional = 0) => {
    if (!proyecto?.ID_Proyecto) return;
    setLoadingEmpleados(true);
    const { data, error } = await supabase.rpc("obtener_empleados_disponibles", {
      id_proyecto: proyecto.ID_Proyecto,
      cargabilidad_adicional: cargabilidadAdicional,
    });
    if (error) {
      setEmpleadosDisponibles([]);
      console.error(error);
    } else {
      setEmpleadosDisponibles(data || []);
    }
    setLoadingEmpleados(false);
  };

  // Nuevo: función para obtener empleados asignados a un puesto
  const fetchEmpleadosAsignados = async (idPuestoProyecto: string) => {
    const { data, error } = await supabase.rpc("obtener_empleados_por_puesto_proyecto", {
      id_puesto_proyecto: idPuestoProyecto,
    });
    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  };

  // Nuevo: obtener empleados postulados para el puesto y proyecto actual
  const fetchPostulados = async (puestoId: string) => {
    if (!proyecto?.ID_Proyecto || !puestoId) {
      setPostulados([]);
      return;
    }
    // Trae los empleados postulados a este puesto en este proyecto
    const { data, error } = await supabase
      .from("Postulaciones")
      .select(`
        ID_empleado,
        Empleado:ID_empleado (
          ID_Empleado,
          Nombre,
          Cargabilidad
        )
      `)
      .eq("ID_Proyecto", proyecto.ID_Proyecto)
      .eq("ID_Puesto", puestoId);

    if (!error && data) {
      // Normaliza el formato para las tarjetas
      setPostulados(
        data
          .map((p: any) => ({
            id_empleado: p.Empleado?.ID_Empleado,
            nombre: p.Empleado?.Nombre,
            // Asegúrate de tomar el campo correcto y convertirlo a número
            cargabilidad: Number(p.Empleado?.Cargabilidad ?? p.Empleado?.cargabilidad ?? 0),
          }))
          .filter((p: any) => !!p.id_empleado)
      );
    } else {
      setPostulados([]);
    }
  };

  // Reset asignados cuando cambie el puesto seleccionado
  useEffect(() => {
  if (selectedPuesto) {
    setAsignados(Array(selectedPuesto.N_puestos).fill(null));
  }
}, [selectedPuesto]);

  // Llama fetchPostulados cuando se selecciona un puesto
  useEffect(() => {
    if (selectedPuesto) {
      fetchPostulados(selectedPuesto.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPuesto, proyecto?.ID_Proyecto]);

  // Handler para drop
  const handleDropEmpleado = (empleado: any, index: number) => {
  setAsignados(prev => {
    // Evita duplicados
    if (prev.some(e => e && e.id_empleado === empleado.id_empleado)) return prev;
    const nuevo = [...prev];
    // Siempre recalcula la suma de cargabilidad
    nuevo[index] = {
      ...empleado,
      total_propuesta: Number(empleado.cargabilidad ?? 0) + Number(proyecto?.cargabilidad_num ?? 0),
    };
    return nuevo;
  });
};

  // Nueva función para obtener el conteo de asignados por puesto
  const fetchAsignadosPorPuesto = async () => {
    if (!puestos) return;
    const conteos: Record<string, number> = {};
    for (const puesto of puestos) {
      const { data, error } = await supabase.rpc("obtener_empleados_por_puesto_proyecto", {
        id_puesto_proyecto: puesto.id,
      });
      if (!error) {
        conteos[puesto.id] = (data || []).length;
      } else {
        conteos[puesto.id] = 0;
      }
    }
    setAsignadosPorPuesto(conteos);
  };

  useEffect(() => {
    fetchAsignadosPorPuesto();
  }, [puestos]);

  // Countdown effect for finish project modal
  useEffect(() => {
    if (finishProjectModal && !finishEnabled) {
      setFinishCountdown(5);
      const interval = setInterval(() => {
        setFinishCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setFinishEnabled(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else if (!finishProjectModal) {
      setFinishEnabled(false);
    }
  }, [finishProjectModal]);

  // Efecto para cargar detalles de empleados cuando cambia empleadosDisponibles
  interface EmpleadoDisponible {
    id_empleado: string;
    nombre: string;
    cargabilidad?: number;
    [key: string]: any;
  }

  interface Proyecto {
    ID_Proyecto: string;
    Nombre: string;
    Descripcion: string;
    Status: string;
    fecha_inicio: string;
    fecha_fin: string;
    cargabilidad_num: number;
    ImagenUrl?: string;
    [key: string]: any;
  }

  interface Puesto {
    id: string;
    Puesto: string;
    N_puestos: number;
    Completo?: boolean;
    [key: string]: any;
  }

  interface HabilidadPuesto {
    id: string;
    Id_puesto: string;
    nombre_habilidad: string;
    nivel: string;
    [key: string]: any;
  }

  interface DetalleEmpleado {
    metas_en_progreso?: Array<{ Nombre?: string; nombre?: string } | string>;
    habilidades?: Array<{ nombre?: string; nombre_habilidad?: string } | string>;
    intereses?: Array<{ Descripcion?: string; descripcion?: string } | string>;
    empleado?: any;
    [key: string]: any;
  }

  interface ProyectoListItem {
    ID_Proyecto: string;
    Nombre: string;
    Descripcion: string;
    Status: string;
    fecha_inicio: string;
    fecha_fin: string;
    cargabilidad_num: number;
    habilidades_proyecto: string[];
    ImagenUrl?: string;
  }

  interface BodyEmpleado {
    id_empleado: string;
    nombre: string;
    metas: string[];
    habilidades: string[];
    intereses: string[];
    proyectos: ProyectoListItem[];
    jefe?: any;
  }

  useEffect(() => {
    const cargarDetalles = async () => {
      const detalles: (DetalleEmpleado | null)[] = await Promise.all(
        empleadosDisponibles.map(async (emp: EmpleadoDisponible) => {
          console.log("Consultando detalles para:", emp.id_empleado);
          const detalle = await fetchEmpleadoDetalle(emp.id_empleado);
          console.log("Detalle recibido para", emp.id_empleado, ":", detalle);
          return detalle;
        })
      );
      console.log("IDs de empleados disponibles:", empleadosDisponibles.map((e: EmpleadoDisponible) => e.id_empleado));
      setDetallesEmpleados(detalles);

      // Aquí armas el body para cada empleado
      const proyectosList: ProyectoListItem[] = puestos?.map((p: Puesto) => ({
        ID_Proyecto: proyecto.ID_Proyecto,
        Nombre: proyecto.Nombre,
        Descripcion: proyecto.Descripcion,
        Status: proyecto.Status,
        fecha_inicio: proyecto.fecha_inicio,
        fecha_fin: proyecto.fecha_fin,
        cargabilidad_num: proyecto.cargabilidad_num,
        habilidades_proyecto: habilidadesPuestos
          .filter((h: HabilidadPuesto) => h.Id_puesto === p.id)
          .map((h: HabilidadPuesto) => h.nombre_habilidad),
        ImagenUrl: proyecto.ImagenUrl,
      })) || [];

      const bodies: (BodyEmpleado | null)[] = empleadosDisponibles.map((emp: EmpleadoDisponible, idx: number) => {
        const detalle = detalles[idx];
        if (!detalle) return null;
        const metas: string[] = Array.isArray(detalle.metas_en_progreso)
          ? detalle.metas_en_progreso.map((m: any) => m.Nombre || m.nombre || m)
          : [];
        const habilidades: string[] = Array.isArray(detalle.habilidades)
          ? detalle.habilidades.map((h: any) => h.nombre || h.nombre_habilidad || h)
          : [];
        const intereses: string[] = Array.isArray(detalle.intereses)
          ? detalle.intereses.map((i: any) => i.Descripcion || i.descripcion || i)
          : [];

        // Si tienes un solo puesto seleccionado (por ejemplo, en el modal):
        const puesto = selectedPuesto || null;

        // O si tienes una relación de puestos por empleado, ajústalo aquí

        return {
          id_empleado: emp.id_empleado,
          nombre: emp.nombre,
          metas,
          habilidades,
          intereses,
          proyectos: proyectosList,
          jefe: detalle.empleado,
          puesto: puesto // <--- agrega aquí el puesto
        };
      });
      // Solo para depuración, muestra el body de cada empleado
      console.log("Bodies para ProjectRecommender:", bodies);

      bodies.forEach((body, idx) => {
        if (!body) return;
        console.log(`Detalles de proyectos para empleado ${body.id_empleado} (${body.nombre}):`);
        body.proyectos.forEach((proyecto: any, pidx: number) => {
          console.log(`  Proyecto ${pidx + 1}:`, proyecto);
        });
      });
      // Aquí podrías hacer el fetch a la API para cada body si lo necesitas
    };

    if (empleadosDisponibles.length > 0) {
      cargarDetalles();
    }
  }, [
    empleadosDisponibles.map((e: EmpleadoDisponible) => e.id_empleado).join(','),
    puestos?.map((p: Puesto) => p.id).join(','),
    proyecto?.ID_Proyecto,
    habilidadesPuestos?.map((h: HabilidadPuesto) => h.id).join(',')
  ]);

  // Construye el array bodies a partir de empleadosDisponibles y detallesEmpleados
  const bodies: (BodyEmpleado | null)[] = empleadosDisponibles.map((emp: EmpleadoDisponible, idx: number) => {
    const detalle = detallesEmpleados[idx];
    if (!detalle) return null;
    const metas: string[] = Array.isArray(detalle.metas_en_progreso)
      ? detalle.metas_en_progreso.map((m: any) => m.Nombre || m.nombre || m)
      : [];
    const habilidades: string[] = Array.isArray(detalle.habilidades)
      ? detalle.habilidades.map((h: any) => h.nombre || h.nombre_habilidad || h)
      : [];
    const intereses: string[] = Array.isArray(detalle.intereses)
      ? detalle.intereses.map((i: any) => i.Descripcion || i.descripcion || i)
      : [];

    // Si tienes un solo puesto seleccionado (por ejemplo, en el modal):
    const puesto = selectedPuesto || null;

    // O si tienes una relación de puestos por empleado, ajústalo aquí

    const proyectosList: ProyectoListItem[] = puestos?.map((p: Puesto) => ({
      ID_Proyecto: proyecto.ID_Proyecto,
      Nombre: proyecto.Nombre,
      Descripcion: proyecto.Descripcion,
      Status: proyecto.Status,
      fecha_inicio: proyecto.fecha_inicio,
      fecha_fin: proyecto.fecha_fin,
      cargabilidad_num: proyecto.cargabilidad_num,
      habilidades_proyecto: habilidadesPuestos
        .filter((h: HabilidadPuesto) => h.Id_puesto === p.id)
        .map((h: HabilidadPuesto) => h.nombre_habilidad),
      ImagenUrl: proyecto.ImagenUrl,
    })) || [];

    return {
      id_empleado: emp.id_empleado,
      nombre: emp.nombre,
      metas,
      habilidades,
      intereses,
      proyectos: proyectosList,
      jefe: detalle.empleado,
      puesto: puesto // <--- agrega aquí el puesto
    };
  });

  // Nueva función para obtener el ranking de empleados
  const fetchEmployeeRanking = async () => {
  setLoadingRanking(true);
  try {
    const empleados = bodies.filter(Boolean);
    const proyectoData = {
      ...proyecto,
      puestos,
      habilidades_proyecto: habilidadesGenerales?.map((h: any) => h.nombre_habilidad) || [],
    };

    const response = await fetch("/api/EmployeeRanking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ empleados, proyecto: proyectoData }),
    });
    const data = await response.json();

    // Mezcla la cargabilidad actual de los empleados originales
    const rankingConCargabilidad = (data.rankedEmployees || []).map((empIA: any) => {
      const original = empleadosDisponibles.find(e => e.id_empleado === empIA.id_empleado);
      return {
        ...empIA,
        cargabilidad: original?.cargabilidad ?? 0, // agrega la cargabilidad actual
      };
    });

    setRanking(rankingConCargabilidad);
  } catch (error) {
    console.error("Error al obtener ranking:", error);
    setRanking([]);
  }
  setLoadingRanking(false);
};

  useEffect(() => {
    if (bodies && bodies.length > 0) {
      fetchEmployeeRanking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(bodies)]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  if (!data) return <div className="p-6 text-center text-gray-500">No se encontró información del proyecto.</div>;

  const supabaseUrl = "https://nuyfnqiodjynfkubkqpn.supabase.co/storage/v1/object/public/project-images/";
  const imagenUrlCompleta =
    (proyecto?.ImagenUrl || proyecto?.imagenurl)
      ? supabaseUrl + (proyecto.ImagenUrl || proyecto.imagenurl)
      : null;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge status="success" text="Activo" className="font-medium" />;
      case "inactive":
        return <Badge status="warning" text="En progreso" className="font-medium" />;
      case "done":
        return <Badge status="default" text="Finalizado" className="font-medium" />;
      default:
        return <Badge status="processing" text={status} className="font-medium" />;
    }
  };

  const getSkillLevelTag = (nivel: string) => {
    const levelMap: Record<string, { color: string; text: string }> = {
      beginner: { color: "geekblue", text: "Principiante" },
      intermediate: { color: "orange", text: "Intermedio" },
      expert: { color: "red", text: "Experto" },
    };

    const level = levelMap[nivel.toLowerCase()] || {
      color: "default",
      text: nivel,
    };

    return <Tag color={level.color} className="font-medium">{level.text}</Tag>;
  };

  const fetchEmpleadoDetalle = async (id_empleado: string) => {
    const { data, error } = await supabase.rpc("get_empleado_a_recomendar", { p_id_empleado: id_empleado });
    if (error) {
      console.error("Error obteniendo detalles del empleado:", error);
      return null;
    }
    return data;
  };

  function actualizarCompletoEnPuestos(puestoId: string, completo: boolean) {
    setData((prev: any) => {
      if (!prev) return prev;
      return {
        ...prev,
        puestos: prev.puestos.map((p: any) =>
          p.id === puestoId ? { ...p, Completo: completo } : p
        ),
      };
    });
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Project review modal */}
      {openReviewModal && proyecto && (
        <ReviewModal
          selectedProject={proyecto}
          onClose={() => setOpenReviewModal(false)}
        />
      )}
      {/* Botón de regreso con mejor contraste */}
      <button
        className="mb-6 px-4 py-2 bg-white border border-purple-200 text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 flex items-center gap-1 shadow-xs"
        onClick={() => router.push("/admin/proyectos")}
      >
        <ArrowLeftOutlined className="text-sm" />
        <span>Regresar</span>
      </button>

      {/* Encabezado del proyecto */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-2">
            {getStatusBadge(proyecto.Status)}
            <Tag color="blue" icon={<CalendarOutlined />} className="font-medium">
              {proyecto.fecha_inicio} - {proyecto.fecha_fin}
            </Tag>
            {proyecto.Status === "inactive" && (
              <button
                className="ml-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all text-sm"
                onClick={() => router.push(`/admin/proyectos/${proyecto.ID_Proyecto}/edit`)}
                type="button"
              >
                Editar proyecto
              </button>
            )}
            {proyecto.Status === "inactive" && (
              <button
                className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-all text-sm"
                onClick={() => setStartProjectModal(true)}
                type="button"
              >
                Comenzar proyecto
              </button>
            )}
            {proyecto.Status === "active" && (
              <button
                className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-all text-sm"
                onClick={() => setFinishProjectModal(true)}
                type="button"
              >
                Finalizar proyecto
              </button>
            )}
          </div>
          <Title level={2} className="mb-0 text-gray-800 truncate">
            {proyecto.Nombre}
          </Title>
        </div>

        {/* Tarjeta del cliente */}
        <div className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 w-full md:w-auto">
          <Avatar
            size={48}
            src={imagenUrlCompleta}
            icon={<UserOutlined />}
            className="bg-primary-100 text-primary-500"
          />
          <div>
            <Text className="block text-sm text-gray-500">Cliente</Text>
            <Text strong className="text-base text-gray-800">{proyecto.Cliente}</Text>
          </div>
        </div>
      </div>
      {/* Tarjeta principal */}
      <Card className="mb-6 shadow-sm">
        <Title level={4} className="mb-4 text-gray-700">Descripción del Proyecto</Title>
        <Paragraph className="text-gray-700 text-base leading-relaxed">
          {proyecto.Descripcion}
        </Paragraph>

        <Divider className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Title level={5} className="mb-3 text-gray-700">Cargabilidad</Title>
            <Progress
              percent={proyecto.cargabilidad_num}
              status={
                proyecto.cargabilidad_num > 70
                  ? "exception"
                  : proyecto.cargabilidad_num > 40
                    ? "active"
                    : "success"
              }
              strokeColor={
                proyecto.cargabilidad_num > 70
                  ? "#f5222d"
                  : proyecto.cargabilidad_num > 40
                    ? "#fa8c16"
                    : "#52c41a"
              }
              format={(percent) => (
                <span className="font-medium">{percent}%</span>
              )}
              className="w-full"
            />
          </div>

          <div>
            <Title level={5} className="mb-3 text-gray-700">Líder del Proyecto</Title>
            <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm mx-auto p-2">
              <Avatar
                src={leadAvatarUrl || undefined} // Aquí se pone la URL de la imagen
                icon={!leadAvatarUrl ? <UserOutlined /> : undefined}
                className="bg-gray-100 text-gray-500"
                size={48}
              />
              <Text strong className="text-gray-800">{proyecto.nombre_delivery}</Text>
            </div>
          </div>

          <div>
                      <Title level={5} className="mb-3 text-gray-700">Estado de Revisión</Title>
                      {proyecto.isReviewed ? (
                        <Tag icon={<CheckCircleOutlined />} color="success" className="font-medium text-sm py-1 px-3">
                          Revisado
                        </Tag>
                      ) : proyecto.Status === "done" ? (
                        <div>
                          <Tag icon={<ClockCircleOutlined />} color="warning" className="font-medium text-sm py-1 px-3">
                            Revisión al finalizar
                          </Tag>
                          <Button
                            type="primary"
                            className="mt-2 w-full"
                            onClick={() => setOpenReviewModal(true)}
                          >
                            Dar retroalimentación
                          </Button>
                        </div>
                      ) : (
                        <Tag icon={<ClockCircleOutlined />} color="warning" className="font-medium text-sm py-1 px-3">
                          Revisión al finalizar
                        </Tag>
                      )}
                    </div>
        </div>
      </Card>

      {/* Sección de puestos y habilidades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title={
            <div className="flex items-center gap-2">
              <TeamOutlined className="text-primary-500" />
              <span className="text-gray-800">Puestos Requeridos</span>
            </div>
          }
          className="shadow-sm"
        >
          <List
            itemLayout="vertical"
            dataSource={puestos}
            renderItem={(puesto: any) => (
              <List.Item
                key={puesto.id}
                className="hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors cursor-pointer relative"
                extra={
                  <div className="flex flex-col items-end gap-2 min-w-[120px]">
                    <Tag color="purple" className="font-medium">{puesto.N_puestos} posiciones</Tag>
                    {/* Etiqueta de empleados asignados */}
                    {asignadosPorPuesto[puesto.id] > 0 && !puesto.Completo && (
                      <Tag color="blue" className="font-medium">
                        {asignadosPorPuesto[puesto.id]} asignado{asignadosPorPuesto[puesto.id] === 1 ? "" : "s"}
                      </Tag>
                    )}
                    {puesto.Completo && (
                      <Tag
                        color="success"
                        className="font-medium flex items-center gap-1"
                        icon={<CheckCircleOutlined />}
                        style={{ marginTop: 4 }}
                      >
                        Completo
                      </Tag>
                    )}
                  </div>
                }
                onClick={async () => {
                  setSelectedPuesto(puesto);
                  setModalVisible(true);
                  await fetchEmpleadosDisponibles(proyecto?.cargabilidad_num || 0);

                  // Obtener empleados asignados y llenar la dropzone
                  const asignados = await fetchEmpleadosAsignados(puesto.id);
                  const asignadosArray = Array.from({ length: puesto.N_puestos }).map((_, idx) => asignados[idx] || null);
                  setAsignados(asignadosArray);
                  setAsignadosOriginales(asignadosArray); // Guardar los originales
                }}
              >
                <List.Item.Meta
                  title={<Text strong className="text-gray-800">{puesto.Puesto}</Text>}
                  description={
                    <div className="mt-3 space-y-2">
                      {habilidadesPuestos
                        .filter((h: any) => h.Id_puesto === puesto.id)
                        .map((h: any) => (
                          <div key={h.id} className="flex items-center justify-between">
                            <Text className="text-gray-600">{h.nombre_habilidad}</Text>
                            {getSkillLevelTag(h.nivel)}
                          </div>
                        ))}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>

        <Card
          title={
            <div className="flex items-center gap-2">
              <StarOutlined className="text-primary-500" />
              <span className="text-gray-800">Habilidades y Herramientas Requeridas</span>
            </div>
          }
          className="shadow-sm"
        >
          {habilidadesGenerales.length > 0 ? (
            <List
              dataSource={habilidadesGenerales}
              renderItem={(h: any, idx: number) => (
                <List.Item
                  key={idx}
                  className="hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                >
                  <div className="flex justify-between w-full items-center">
                    <Text className="text-gray-600">{h.nombre_habilidad}</Text>
                    {getSkillLevelTag(h.nivel)}
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <div className="text-center py-8">
              <Text type="secondary" className="text-gray-400">
                No se requieren habilidades generales adicionales
              </Text>
            </div>
          )}
        </Card>
      </div>

      {/* Modal para mostrar detalles del puesto */}
      <Modal
  open={modalVisible}
  title={selectedPuesto ? selectedPuesto.Puesto : ""}
  onCancel={async () => {
    // Si el rol no está completo, muestra confirmación antes de cerrar
    if (selectedPuesto && !asignados.every(a => !!a)) {
      setExitConfirmVisible(true); // <-- muestra el modal de confirmación
      // NO cierres el modal aquí
      return;
    }
    setModalVisible(false);
    await fetchAsignadosPorPuesto();
  }}
  width={1200}
  footer={null}
  styles={{ body: { padding: 0, borderRadius: 12, overflow: "hidden" } }}
>
        {selectedPuesto && (
          <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col md:flex-row">
              {/* Lado izquierdo: Habilidades requeridas y drop zones */}
              <div className="flex-1 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-200 min-h-[320px] flex flex-col">
                <div className="mb-4 text-lg font-semibold text-primary-700">Habilidades requeridas</div>
                <ul className="space-y-3 overflow-y-auto mb-6" style={{ maxHeight: 180 }}>
                  {habilidadesPuestos
                    .filter((h: any) => h.Id_puesto === selectedPuesto.id)
                    .map((h: any) => (
                      <li key={h.id} className="flex items-center justify-between">
                        <span className="text-gray-800">{h.nombre_habilidad}</span>
                        {getSkillLevelTag(h.nivel)}
                      </li>
                    ))}
                </ul>
                <div className="mb-2 text-base font-semibold text-primary-700">Empleados asignados ({selectedPuesto.N_puestos})</div>
                {proyecto.Status === "active" || proyecto.Status === "done" ? (
                  // Solo muestra los empleados asignados, sin dropzones ni botones
                  <div className="space-y-3">
                    {asignados.map((empleado, idx) =>
                      empleado ? (
                        <EmpleadoCard
                          key={empleado.id_empleado}
                          empleado={empleado}
                          fetchAvatarURL={fetchAvatarURL}
                          showCargabilidad={false} // <--- Nuevo prop para ocultar cargabilidad
                          onShowProfile={() => {
                          setEmpleadoPerfil(empleado);
                          setPerfilEmpleadoVisible(true);
                        }}
                        />
                      ) : (
                        <div key={idx} className="text-gray-400 border border-dashed rounded-lg p-3 text-center">
                          Vacante sin asignar
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  // Modo edición (proyecto no activo)
                  <>
                    {Array.from({ length: selectedPuesto.N_puestos }).map((_, idx) => (
                      <DropZone
                        key={idx}
                        index={idx}
                        assignedEmpleado={asignados[idx]}
                        originalEmpleado={asignadosOriginales[idx]}
                        onDrop={(empleado, dropIdx) => {
                          if (asignadosOriginales[dropIdx]) {
                            setConfirmModal({ visible: true, index: dropIdx, newEmpleado: empleado, action: "replace" });
                          } else {
                            handleDropEmpleado(empleado, dropIdx);
                          }
                        }}
                        fetchAvatarURL={fetchAvatarURL}
                        onRemove={async (removeIdx) => {
                          if (asignadosOriginales[removeIdx]) {
                            setConfirmModal({ visible: true, index: removeIdx, newEmpleado: null, action: "remove" });
                          } else {
                            setAsignados(prev => {
                              const nuevo = [...prev];
                              nuevo[removeIdx] = null;
                              return nuevo;
                            });
                            await fetchEmpleadosDisponibles(proyecto?.cargabilidad_num || 0);
                          }
                        }}
                      />
                    ))}
                    {JSON.stringify(asignados) !== JSON.stringify(asignadosOriginales) && (
                      <Button
                        type="primary"
                        className="mt-4 w-full"
                        onClick={async () => {
                          // Solo inserta empleados que NO estaban originalmente asignados
                          const inserts = asignados
                            .map((a, idx) => {
                              const original = asignadosOriginales[idx];
                              if (!a) return null;
                              if (original && original.id_empleado === a.id_empleado) return null;
                              return {
                                ID_Puesto: selectedPuesto.id,
                                ID_Empleado: a.id_empleado,
                              };
                            })
                            .filter(Boolean) as { ID_Puesto: string; ID_Empleado: string }[];

                          let error = null;
                          if (inserts.length > 0) {
                            // Inserta en Puesto_persona
                            const res = await supabase
                              .from("Puesto_persona")
                              .insert(inserts);
                            error = res.error;

                            // Llama al RPC para aumentar la cargabilidad solo de los nuevos asignados
                            for (const insert of inserts) {
                              await supabase.rpc("aumentar_cargabilidad", {
                                id: insert.ID_Empleado,
                                incremento: proyecto.cargabilidad_num ?? 0,
                              });
                            }
                          }

                          if (!error) {
                            await supabase
                              .from("Puesto_proyecto")
                              .update({
                                Completo: asignados.every(a => !!a)
                              })
                              .eq("id", selectedPuesto.id);

                            actualizarCompletoEnPuestos(selectedPuesto.id, asignados.every(a => !!a));

                            Modal.success({
                              title: "Asignaciones guardadas",
                              content: "Los empleados fueron asignados correctamente.",
                            });
                            setModalVisible(false);
                            await fetchData();
                            await fetchAsignadosPorPuesto();
                          } else {
                            Modal.error({
                              title: "Error al guardar",
                              content: error.message,
                            });
                          }
                        }}
                      >
                        Guardar asignaciones
                      </Button>
                    )}
                  </>
                )}
              </div>
              {/* Lado derecho: Empleados disponibles solo si el proyecto NO está activo */}
              {(proyecto.Status !== "active" && proyecto.Status !== "done") && (
                <div className="flex-1 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-lg font-semibold text-primary-700">
                      {empleadoTab === "todos" ? "Empleados disponibles" : "Empleados postulados"}
                      <span className="ml-2 text-base text-gray-500 font-normal">
                        ({empleadoTab === "todos" ? empleadosDisponibles.length : postulados.length})
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type={empleadoTab === "todos" ? "primary" : "default"}
                        onClick={() => setEmpleadoTab("todos")}
                        size="small"
                      >
                        Todos
                      </Button>
                      <Button
                        type={empleadoTab === "postulados" ? "primary" : "default"}
                        onClick={() => setEmpleadoTab("postulados")}
                        size="small"
                      >
                        Postulados
                      </Button>
                      <Button
                        type={empleadoTab === "ia" ? "primary" : "default"}
                        onClick={() => setEmpleadoTab("ia")}
                        size="small"
                      >
                        IA
                      </Button>
                    </div>
                  </div>
                  <Input
                    placeholder="Buscar por nombre o ID de empleado"
                    value={searchEmpleado}
                    onChange={e => setSearchEmpleado(e.target.value)}
                    className="mb-4"
                    allowClear
                  />
                  <div className="overflow-y-auto" style={{ maxHeight: 600 }}>
                    {empleadoTab === "todos" ? (
                      loadingEmpleados ? (
                        <div className="text-center text-gray-500 py-8">Cargando empleados...</div>
                      ) : empleadosDisponibles.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">No hay empleados disponibles para este puesto.</div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                          {empleadosDisponibles
                            .filter(emp =>
                              emp.nombre.toLowerCase().includes(searchEmpleado.toLowerCase()) ||
                              String(emp.id_empleado).toLowerCase().includes(searchEmpleado.toLowerCase())
                            )
                            .filter(emp => !asignados.some(a => a && a.id_empleado === emp.id_empleado))
                            .filter(emp => emp.id_empleado !== proyecto.id_empleado_delivery)
                            .map(emp => (
                              <EmpleadoCard 
                              key={emp.id_empleado} 
                              empleado={emp} 
                              fetchAvatarURL={fetchAvatarURL}
                              onShowProfile={() => {
                                    setEmpleadoPerfil(emp);
                                    setPerfilEmpleadoVisible(true);
                                  }}
                               />
                            ))}
                        </div>
                      )
                    ) : empleadoTab === "postulados" ? (
                      (() => {
                        const postuladosFiltrados = postulados
                          .filter(emp =>
                            emp.nombre.toLowerCase().includes(searchEmpleado.toLowerCase()) ||
                            String(emp.id_empleado).toLowerCase().includes(searchEmpleado.toLowerCase())
                          )
                          .filter(emp => emp.id_empleado !== proyecto.id_empleado_delivery)
                          .filter(emp => !asignados.some(a => a && a.id_empleado === emp.id_empleado));
                        return postuladosFiltrados.length === 0 ? (
                          <div className="text-center text-gray-400 py-8">No hay empleados postulados para este puesto.</div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                            {postuladosFiltrados.map(emp => (
                              <EmpleadoCard 
                              key={emp.id_empleado} 
                              empleado={emp} 
                              fetchAvatarURL={fetchAvatarURL} 
                              onShowProfile={() => {
                                setEmpleadoPerfil(emp);
                                setPerfilEmpleadoVisible(true);
                              }}/>
                            ))}
                          </div>
                        );
                      })()
                    ) : (
                      // IA TAB
                      <>
                        <div className="flex gap-2 mb-3">
                          <Button
                            type={iaMode === "mejor" ? "primary" : "default"}
                            onClick={() => setIaMode("mejor")}
                            size="small"
                          >
                            Personal mejor capacitado
                          </Button>
                          <Button
                            type={iaMode === "capacitar" ? "primary" : "default"}
                            onClick={() => setIaMode("capacitar")}
                            size="small"
                          >
                            Personal a capacitar
                          </Button>
                        </div>
                        {loadingRanking ? (
                          <div className="text-center text-gray-500 py-8">Cargando ranking...</div>
                        ) : ranking.length === 0 ? (
                          <div className="text-center text-gray-400 py-8">No hay ranking disponible.</div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                            {(iaMode === "mejor" ? ranking : [...ranking].reverse())
                              .filter(emp =>
                                emp.nombre.toLowerCase().includes(searchEmpleado.toLowerCase()) ||
                                String(emp.id_empleado).toLowerCase().includes(searchEmpleado.toLowerCase())
                              )
                              .filter(emp => !asignados.some(a => a && a.id_empleado === emp.id_empleado))
                              .filter(emp => emp.id_empleado !== proyecto.id_empleado_delivery)
                              .map(emp => (
                                <EmpleadoCard
                                  key={emp.id_empleado}
                                  empleado={emp}
                                  fetchAvatarURL={fetchAvatarURL}
                                  onShowProfile={() => {
                                  setEmpleadoPerfil(emp);
                                  setPerfilEmpleadoVisible(true);
                                }}
                                />
                              ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </DndProvider>
        )}
      </Modal>

      {/* Modal de confirmación para reemplazo o eliminación */}
      <Modal
        open={confirmModal.visible}
        title="Confirmar acción"
        onCancel={() => setConfirmModal({ visible: false, index: null, newEmpleado: null, action: "" })}
        onOk={async () => {
          if (confirmModal.index !== null) {
            const empleadoActual = asignados[confirmModal.index];
            // Elimina de la tabla Puesto_persona si hay empleado asignado
            if (empleadoActual && selectedPuesto) {
              await supabase
                .from("Puesto_persona")
                .delete()
                .eq("ID_Puesto", selectedPuesto.id)
                .eq("ID_Empleado", empleadoActual.id_empleado);

              // Disminuye la cargabilidad del empleado removido/reemplazado
              await supabase.rpc("aumentar_cargabilidad", {
                id: empleadoActual.id_empleado,
                incremento: -(proyecto.cargabilidad_num ?? 0),
              });
            }
            // Actualiza el estado local
            if (confirmModal.action === "remove") {
              setAsignados(prev => {
                const nuevo = [...prev];
                nuevo[confirmModal.index!] = null;
                return nuevo;
              });
              setAsignadosOriginales(prev => {
                const nuevo = [...prev];
                nuevo[confirmModal.index!] = null;
                return nuevo;
              });
              // <--- Agrega esta línea para refrescar empleados disponibles
              await fetchEmpleadosDisponibles(proyecto?.cargabilidad_num || 0);
            }
            if (confirmModal.action === "replace" && confirmModal.newEmpleado) {
              setAsignados(prev => {
                const nuevo = [...prev];
                nuevo[confirmModal.index!] = confirmModal.newEmpleado;
                return nuevo;
              });
              setAsignadosOriginales(prev => {
                const nuevo = [...prev];
                nuevo[confirmModal.index!] = null;
                return nuevo;
              });
            }
          }
          setConfirmModal({ visible: false, index: null, newEmpleado: null, action: "" });
        }}
        okText="Sí, continuar"
        cancelText="Cancelar"
      >
        {confirmModal.action === "remove"
          ? "¿Estás seguro de eliminar a este empleado del rol? Deberás guardar los cambios para que se apliquen."
          : "¿Estás seguro de reemplazar a este empleado? Deberás guardar los cambios para que se apliquen."}
      </Modal>

      {/* Modal de confirmación para salir sin completar el rol */}
      <Modal
        open={exitConfirmVisible}
        title="El rol debe completarse"
        onCancel={() => setExitConfirmVisible(false)}
        onOk={async () => {
          if (selectedPuesto) {
            // Si falta algún empleado, marca como incompleto
            await supabase
              .from("Puesto_proyecto")
              .update({ Completo: asignados.every(a => !!a) })
              .eq("id", selectedPuesto.id);
          }
          setExitConfirmVisible(false);
          setModalVisible(false);
          await fetchData();
        }}
        okText="Sí, salir"
        cancelText="Cancelar"
      >
        Hay espacios sin asignar en este rol que está marcado como completo. ¿Seguro que quieres salir? El rol se marcará como incompleto.
      </Modal>

      {/* Modal para confirmar inicio de proyecto */}
      <Modal
        open={startProjectModal}
        title="¿Seguro que quieres comenzar el proyecto?"
        onCancel={() => setStartProjectModal(false)}
        onOk={async () => {
          if (puestos.every((p: any) => p.Completo)) {
            // 1. Extraer habilidades generales del proyecto desde Proyecto_Habilidades
            const { data: habilidadesGenerales, error: errorGen } = await supabase
              .from("Proyecto_Habilidades")
              .select("ID_Habilidad, nivel")
              .eq("ID_Proyecto", proyecto.ID_Proyecto);

            if (errorGen) {
              console.error("Error obteniendo habilidades generales:", errorGen);
              return;
            }

            // 2. Extraer habilidades por rol desde Puesto_habilidades
            // (Opcional: puedes traer todas y filtrar por puesto en cada iteración)
            const { data: habilidadesPuestos, error: errorPuestos } = await supabase
              .from("Puesto_habilidades")
              .select("Id_puesto, Id_habilidad, nivel");

            if (errorPuestos) {
              console.error("Error obteniendo habilidades por puesto:", errorPuestos);
              return;
            }

            // Insertar en Historial para cada empleado asignado
            for (const puesto of puestos) {
              // Obtener empleados asignados a este puesto
              const empleados = await supabase.rpc("obtener_empleados_por_puesto_proyecto", {
                id_puesto_proyecto: puesto.id,
              });
              if (empleados.data && empleados.data.length > 0) {
                for (const emp of empleados.data) {
                  const newuuid = crypto.randomUUID();
                  const { error: errorHistorial } = await supabase
                    .from("Historial")
                    .insert({
                      id: newuuid,
                      ID_Empleado: emp.id_empleado,
                      Descripcion: proyecto.Descripcion,
                      Fecha_inicio: new Date().toISOString(),
                      NombrePosition: puesto.Puesto,
                      NombreEmpresa: `proyecto: ${proyecto.Nombre} (${proyecto.Cliente})`,
                      Currentjob: true,
                      ID_Proyecto: proyecto.ID_Proyecto,
                    });
                  if (errorHistorial) {
                    console.error("Error insertando en Historial:", errorHistorial);
                    continue;
                  }

                  // Habilidades del rol para empleados asignados a roles
                  const habilidadesRol = habilidadesPuestos
                    .filter((h: any) => h.Id_puesto === puesto.id)
                    .map((h: any) => ({
                      id: h.Id_habilidad,
                      nivel: h.nivel,
                    }));

                  for (const h of habilidadesRol) {
                    const { error: errorHab } = await supabase.from("Historial_Habilidades").insert({
                      ID_Habilidad: h.id,
                      ID_Historial: newuuid,
                      nivel: h.nivel,
                    });
                    if (errorHab) {
                      console.error("Error insertando habilidad:", h, errorHab);
                    }
                  }
                }
              }
            }
            // Delivery Lead
            const newuuidDelivery = crypto.randomUUID();
            const { error: errorHistorialDelivery } = await supabase
              .from("Historial")
              .insert({
                id: newuuidDelivery,
                ID_Empleado: proyecto.id_empleado_delivery,
                Descripcion: proyecto.Descripcion,
                Fecha_inicio: new Date().toISOString(),
                NombrePosition: "Lider de proyecto",
                NombreEmpresa: `proyecto: ${proyecto.Nombre} (${proyecto.Cliente})`,
                Currentjob: true,
                ID_Proyecto: proyecto.ID_Proyecto,
              });
            if (errorHistorialDelivery) {
              console.error("Error insertando historial delivery lead:", errorHistorialDelivery);
            } else {
              // Solo habilidades generales para el delivery lead
              for (const h of habilidadesGenerales) {
                const { error: errorHab } = await supabase.from("Historial_Habilidades").insert({
                  ID_Habilidad: h.ID_Habilidad,
                  ID_Historial: newuuidDelivery,
                  nivel: h.nivel,
                });
                if (errorHab) {
                  console.error("Error insertando habilidad delivery lead:", h, errorHab);
                }
              }
            }

            // Eliminar postulaciones del proyecto
            const { error: errorPostulaciones } = await supabase
              .from("Postulaciones")
              .delete()
              .eq("ID_Proyecto", proyecto.ID_Proyecto);
            if (errorPostulaciones) {
              console.error("Error eliminando postulaciones:", errorPostulaciones);
            }

            // Cambiar status del proyecto
            await supabase
              .from("Proyectos")
              .update({
                Status: "active",
                fecha_inicio: new Date().toISOString(),
              })
              .eq("ID_Proyecto", proyecto.ID_Proyecto);
            setStartProjectModal(false);
            await fetchData();
          }
        }}
        okText="Sí, comenzar"
        cancelText="Cancelar"
        okButtonProps={{
          disabled: !puestos.every((p: any) => p.Completo),
        }}
      >
        {!puestos.every((p: any) => p.Completo) ? (
          <span className="text-red-600">
            No puedes comenzar el proyecto: todos los puestos requeridos deben estar completos.
          </span>
        ) : (
          <>Ya no podrás editar la información general del proyecto. ¿Estás seguro de proseguir?</>
        )}
      </Modal>

      <Modal
  open={exitConfirmVisible}
  title="El rol se marcará como incompleto"
  onCancel={() => setExitConfirmVisible(false)}
  footer={[
    <Button key="volver" onClick={() => setExitConfirmVisible(false)}>
      Volver al modal
    </Button>,
    <Button
      key="confirmar"
      type="primary"
      danger
      onClick={async () => {
        if (selectedPuesto) {
          // Marca como incompleto
          await supabase
            .from("Puesto_proyecto")
            .update({ Completo: false })
            .eq("id", selectedPuesto.id);
          actualizarCompletoEnPuestos(selectedPuesto.id, false);
        }
        setExitConfirmVisible(false);
        setModalVisible(false);
        await fetchAsignadosPorPuesto();
      }}
    >
      Sí, salir y marcar como incompleto
    </Button>,
  ]}
>
  <p>
    No has asignado todos los empleados requeridos para este rol. Si sales ahora, el rol se marcará como incompleto.<br />
    ¿Deseas salir y marcar el rol como incompleto o volver a completar las asignaciones?
  </p>
</Modal>

      {/* Modal para finalizar proyecto con contador */}
      <Modal
        open={finishProjectModal}
        title="Finalizar proyecto"
        onCancel={() => setFinishProjectModal(false)}
        footer={[
          <Button
            key="finish"
            type="primary"
            danger
            disabled={!finishEnabled}
            onClick={async () => {
              // 1. Cambiar status del proyecto a done
              await supabase
                .from("Proyectos")
                .update({
                  Status: "done",
                  fecha_fin: new Date().toISOString(),
                })
                .eq("ID_Proyecto", proyecto.ID_Proyecto);

              // 2. Actualizar historial: Fecha_final y Currentjob = false
              const fechaFinal = new Date().toISOString();
              await supabase
                .from("Historial")
                .update({
                  Fecha_final: fechaFinal,
                  Currentjob: false,
                })
                .eq("ID_Proyecto", proyecto.ID_Proyecto);

              // 3. Obtener empleados que participaron en el proyecto
              const { data: historiales } = await supabase
                .from("Historial")
                .select("ID_Empleado")
                .eq("ID_Proyecto", proyecto.ID_Proyecto);

              // 4. Llamar aumentar_cargabilidad para cada empleado
              if (historiales && Array.isArray(historiales)) {
                for (const h of historiales) {
                  await supabase.rpc("aumentar_cargabilidad", {
                    id: h.ID_Empleado,
                    incremento: -(proyecto.cargabilidad_num ?? 0),
                  });
                }
              }

              setFinishProjectModal(false);
              setFinishEnabled(false);
              await fetchData();
              Modal.success({
                title: "Proyecto finalizado",
                content: "El proyecto ha sido finalizado correctamente.",
              });
            }}
          >
            Finalizar proyecto
          </Button>,
        ]}
      >
        <div className="text-center py-6">
          <p className="mb-4 text-lg text-gray-700">
            ¿Seguro que quieres finalizar el proyecto? Esta acción es irreversible.
          </p>
          {!finishEnabled ? (
            <div className="text-red-600 text-2xl font-bold">
              Espera {finishCountdown} segundo{finishCountdown !== 1 ? "s" : ""}...
            </div>
          ) : (
            <div className="text-green-600 text-lg font-semibold mb-2">
              Puedes finalizar el proyecto ahora.
            </div>
          )}
        </div>
      </Modal>
      <Modal
  open={perfilEmpleadoVisible}
  title="Perfil del empleado"
  onCancel={() => setPerfilEmpleadoVisible(false)}
  footer={null}
  width={900}
  styles={{ body: { padding: 0 } }}
>
  {empleadoPerfil && (
    // Usa el mismo componente que en perfiles-de-empleados/page.tsx
    <EmployeeProfile id={empleadoPerfil.id_empleado || empleadoPerfil.ID_Empleado} />
  )}
</Modal>
      
    </div>
  );
}

function EmpleadoCard({
  empleado,
  fetchAvatarURL,
  onDrag,
  useTotalPropuesta = false,
  showRemove = false,
  onRemove,
  showCargabilidad = true,
  draggable = true,
  onShowProfile // <--- NUEVO
}: {
  empleado: any,
  fetchAvatarURL: (id: string) => Promise<string | null>,
  onDrag?: () => void,
  useTotalPropuesta?: boolean,
  showRemove?: boolean,
  onRemove?: () => void,
  showCargabilidad?: boolean,
  draggable?: boolean,
  onShowProfile?: () => void // <--- NUEVO
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchAvatarURL(empleado.id_empleado).then(url => {
      if (mounted) setAvatarUrl(url);
    });
    return () => { mounted = false; };
  }, [empleado.id_empleado, fetchAvatarURL]);

  // Solo usa useDrag si draggable es true
  const [dragCollected, drag, /* dragPreview */] = draggable
    ? useDrag({
        type: ItemTypes.EMPLEADO,
        item: { ...empleado },
        end: (item, monitor) => {
          if (monitor.didDrop() && onDrag) onDrag();
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      })
    : [{ isDragging: false }, () => {}];

  const { isDragging } = dragCollected;

  return (
  <div
    ref={draggable ? (node) => { if (node) drag(node); } : undefined}
    className={`flex items-center bg-white rounded-2xl shadow-lg p-3 border border-gray-200 hover:shadow-2xl transition-shadow duration-200 min-h-0 ${isDragging ? "opacity-50" : ""}`}
    style={{
      minHeight: 50,
      maxHeight: 70,
      cursor: draggable ? "grab" : "default",
      position: "relative",
      width: "100%",
      overflow: "hidden",
    }}
  >
    {showRemove && (
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white rounded-full p-2 shadow"
        style={{ zIndex: 2, fontSize: 18, lineHeight: 1 }}
        type="button"
      >
        ×
      </button>
    )}
    <Avatar
      size={40}
      src={avatarUrl || undefined}
      icon={!avatarUrl ? <UserOutlined /> : undefined}
      className="bg-gray-100 text-gray-500 mr-3 flex-shrink-0"
    />
    <div className="flex-1 flex flex-col justify-center min-w-0">
      <span className="font-semibold text-gray-800 text-base truncate block max-w-full" style={{ lineHeight: 1.2 }}>
        {empleado.nombre}
      </span>
      {showCargabilidad && (
        (() => {
          let porcentaje = 0;
          if (useTotalPropuesta && empleado.total_propuesta !== undefined) {
            porcentaje = Number(empleado.total_propuesta);
          } else if (empleado.cargabilidad !== undefined) {
            porcentaje = Number(empleado.cargabilidad);
          }
          return (
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm text-gray-600 font-semibold ml-1 whitespace-nowrap">
                {porcentaje}%
              </span>
              <div className="flex-1 min-w-0">
                <Progress
                  percent={porcentaje}
                  size="small"
                  showInfo={false}
                  strokeColor={
                    porcentaje > 70 ? "#f5222d"
                      : porcentaje > 40 ? "#fa8c16"
                        : "#52c41a"
                  }
                  className="mx-auto"
                  style={{ minWidth: 0 }}
                />
              </div>
            </div>
          );
        })()
      )}
    </div>
    {onShowProfile && (
      <Button
        type="default"
        className="ml-2 flex items-center gap-1 border-purple-500 text-purple-700 hover:bg-purple-50 hover:border-purple-700 transition-all"
        style={{ borderWidth: 1, fontWeight: 500, whiteSpace: "nowrap" }}
        icon={<UserOutlined />}
        onClick={e => {
          e.stopPropagation();
          onShowProfile();
        }}
      >
        Ver perfil
      </Button>
    )}
  </div>
);
}

// Drop zone para asignar empleados
function DropZone({ index, assignedEmpleado, originalEmpleado, onDrop, fetchAvatarURL, onRemove }: {
  index: number,
  assignedEmpleado: any,
  originalEmpleado: any,
  onDrop: (empleado: any, index: number) => void,
  fetchAvatarURL: (id: string) => Promise<string | null>,
  onRemove: (index: number) => void
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.EMPLEADO,
    drop: (item: any) => onDrop(item, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Detecta si es un nuevo ingreso (no estaba asignado originalmente)
  const isNuevoIngreso =
    assignedEmpleado &&
    (!originalEmpleado || assignedEmpleado.id_empleado !== originalEmpleado.id_empleado);

  return (
    <div
      ref={(node) => {
        drop(node as HTMLDivElement | null);
      }}
      className={`flex items-center justify-center border-2 rounded-lg min-h-[60px] mb-5 transition-colors
        ${isOver && canDrop ? "border-green-500 bg-green-50" : "border-dashed border-gray-300 bg-white"}
      `}
      style={{ height: 60, position: "relative" }}
    >
      {assignedEmpleado ? (
        <EmpleadoCard
  empleado={assignedEmpleado}
  fetchAvatarURL={fetchAvatarURL}
  useTotalPropuesta={assignedEmpleado?.total_propuesta !== undefined}
  showRemove
  onRemove={() => onRemove(index)}
  
  
/>
      ) : (
        <span className="text-gray-400">Arrastra un empleado aquí</span>
      )}
    </div>
  );
}

// Utilidad para normalizar el nivel (minúsculas y sin acentos)
function normalizaNivel(nivel: string): "experto" | "intermedio" | "principiante" | undefined {
  if (!nivel) return undefined;
  const n = nivel
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita acentos
  if (n.includes("experto")) return "experto";
  if (n.includes("intermedio")) return "intermedio";
  if (n.includes("principiante") || n.includes("beginner")) return "principiante";
  return undefined;
}