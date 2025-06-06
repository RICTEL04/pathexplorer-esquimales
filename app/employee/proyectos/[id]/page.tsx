"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card, Badge, Progress, Divider, Tag, List, Typography, Avatar, Button, Modal, message } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  StarOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const { Title, Text, Paragraph } = Typography;

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
  const [miCargabilidad, setMiCargabilidad] = useState<number | null>(null); // Nuevo estado
  const [modalVisible, setModalVisible] = useState(false);
  const [puestoSeleccionado, setPuestoSeleccionado] = useState<any>(null);
  const [postulaciones, setPostulaciones] = useState<any[]>([]);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [puestoCancelar, setPuestoCancelar] = useState<any>(null);
  const [asignadosModalVisible, setAsignadosModalVisible] = useState(false);
  const [puestoAsignadoSeleccionado, setPuestoAsignadoSeleccionado] = useState<any>(null);
  const [empleadosAsignados, setEmpleadosAsignados] = useState<any[]>([]);
  const [loadingAsignados, setLoadingAsignados] = useState(false);

  // Obtener el id del usuario logeado
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    async function fetchCargabilidad() {
      const { data: sessionData } = await supabase.auth.getSession();
      const uid = sessionData?.session?.user?.id;
      setUserId(uid || null);
      if (!uid) return;
      const { data: empleadoData, error } = await supabase
        .from("Empleado")
        .select("Cargabilidad")
        .eq("ID_Empleado", uid)
        .single();
      if (!error && empleadoData) {
        setMiCargabilidad(Number(empleadoData.Cargabilidad));
      }
    }
    fetchCargabilidad();
  }, []);

  useEffect(() => {
    async function fetchData() {
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
    }
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

  // Consulta las postulaciones del usuario para este proyecto
  const fetchPostulaciones = useCallback(async () => {
    if (!userId || !proyecto?.ID_Proyecto) return;
    const { data, error } = await supabase
      .from("Postulaciones")
      .select("ID_Puesto")
      .eq("ID_empleado", userId)
      .eq("ID_Proyecto", proyecto.ID_Proyecto);
    if (!error && data) setPostulaciones(data.map((p: any) => p.ID_Puesto));
  }, [userId, proyecto?.ID_Proyecto]);

  // Refresca postulaciones cuando cambia usuario o proyecto
  useEffect(() => {
    fetchPostulaciones();
  }, [fetchPostulaciones]);

  // Función para obtener empleados asignados a un puesto
  const fetchEmpleadosAsignados = async (idPuestoProyecto: string) => {
    setLoadingAsignados(true);
    const { data, error } = await supabase.rpc("obtener_empleados_por_puesto_proyecto", {
      id_puesto_proyecto: idPuestoProyecto,
    });
    if (!error && data) {
      // Obtiene la URL del avatar para cada empleado
      const empleadosConAvatar = await Promise.all(
        data.map(async (emp: any) => ({
          ...emp,
          avatar_url: await fetchAvatarURL(emp.id_empleado ?? emp.ID_Empleado ?? emp.id), // Ajusta según tu estructura
        }))
      );
      setEmpleadosAsignados(empleadosConAvatar);
    } else {
      setEmpleadosAsignados([]);
    }
    setLoadingAsignados(false);
  };

  // Handler para abrir modal de empleados asignados
  const handleVerAsignados = async (puesto: any) => {
    setPuestoAsignadoSeleccionado(puesto);
    setAsignadosModalVisible(true);
    await fetchEmpleadosAsignados(puesto.id);
  };

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
  const imagenUrlCompleta = proyecto.ImagenUrl ? supabaseUrl + proyecto.ImagenUrl : null;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge status="success" text="Activo" className="font-medium" />;
      case "pending":
        return <Badge status="warning" text="Pendiente" className="font-medium" />;
      case "completed":
        return <Badge status="default" text="Completado" className="font-medium" />;
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

  // Función para postularse
  const handlePostularse = (puesto: any) => {
    setPuestoSeleccionado(puesto);
    setModalVisible(true);
  };

  const handleConfirmPostulacion = async () => {
    if (!userId || !proyecto?.ID_Proyecto || !puestoSeleccionado?.id) {
      message.error("Faltan datos para postularse.");
      setModalVisible(false);
      return;
    }
    // Insertar postulación
    const { error } = await supabase.from("Postulaciones").insert([
      {
        ID_empleado: userId,
        ID_Proyecto: proyecto.ID_Proyecto,
        ID_Puesto: puestoSeleccionado.id,
      },
    ]);
    if (error) {
      message.error("Error al postularse.");
    } else {
      message.success("¡Te has postulado exitosamente!");
      fetchPostulaciones(); // Refresca el estado
    }
    setModalVisible(false);
    setPuestoSeleccionado(null);
  };

  // Cancelar postulación
  const handleCancelarPostulacion = (puesto: any) => {
    setPuestoCancelar(puesto);
    setCancelModalVisible(true);
  };

  // Nueva función para confirmar la cancelación
  const handleConfirmCancelar = async () => {
    if (!userId || !proyecto?.ID_Proyecto || !puestoCancelar?.id) {
      setCancelModalVisible(false);
      return;
    }
    const { error } = await supabase
      .from("Postulaciones")
      .delete()
      .eq("ID_empleado", userId)
      .eq("ID_Proyecto", proyecto.ID_Proyecto)
      .eq("ID_Puesto", puestoCancelar.id);
    if (error) {
      message.error("No se pudo cancelar la solicitud.");
    } else {
      message.success("Solicitud cancelada.");
      fetchPostulaciones();
    }
    setCancelModalVisible(false);
    setPuestoCancelar(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Botón de regreso con mejor contraste */}
      <button
        className="mb-6 px-4 py-2 bg-white border border-purple-200 text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 flex items-center gap-1 shadow-xs"
        onClick={() => router.back()}
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
            ) : (
              <Tag icon={<ClockCircleOutlined />} color="warning" className="font-medium text-sm py-1 px-3">
                Revision al finalizar
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
                className="hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                extra={
                  <Tag color="purple" className="font-medium">{puesto.N_puestos} posiciones</Tag>
                }
                // Solo permite click si el proyecto está activo o done
                onClick={() => 
                  (["active", "done"].includes(proyecto.Status?.toLowerCase()))
                    ? handleVerAsignados(puesto)
                    : undefined
                }
                style={{
                  cursor: ["active", "done"].includes(proyecto.Status?.toLowerCase()) ? "pointer" : "default"
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

      {/* Modal para mostrar empleados asignados al puesto */}
      <Modal
        open={asignadosModalVisible}
        title={puestoAsignadoSeleccionado ? `Empleados asignados a ${puestoAsignadoSeleccionado.Puesto}` : ""}
        onCancel={() => setAsignadosModalVisible(false)}
        footer={null}
      >
        {loadingAsignados ? (
          <div className="text-center py-8 text-gray-400">Cargando empleados asignados...</div>
        ) : empleadosAsignados.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No hay empleados asignados a este puesto.</div>
        ) : (
          <List
            dataSource={empleadosAsignados}
            renderItem={(emp: any) => (
              <List.Item key={emp.id_empleado ?? emp.ID_Empleado ?? emp.id}>
                <div className="flex items-center gap-3">
                  <Avatar src={emp.avatar_url || undefined} icon={<UserOutlined />} />
                  <Text>{emp.nombre}</Text>
                </div>
              </List.Item>
            )}
          />
        )}
      </Modal>

      {/* Modal de confirmación */}
      <Modal
        open={modalVisible}
        title="¿Estás seguro de postularte?"
        onOk={handleConfirmPostulacion}
        onCancel={() => setModalVisible(false)}
        okText="Sí, postularme"
        cancelText="Cancelar"
      >
        <p>¿Deseas postularte al puesto seleccionado?</p>
      </Modal>

      {/* Modal de confirmación de cancelación */}
      <Modal
        open={cancelModalVisible}
        title="¿Cancelar solicitud?"
        onOk={handleConfirmCancelar}
        onCancel={() => setCancelModalVisible(false)}
        okText="Sí, cancelar"
        cancelText="No"
      >
        <p>¿Deseas cancelar tu solicitud para este puesto?</p>
      </Modal>
    </div>
  );
}