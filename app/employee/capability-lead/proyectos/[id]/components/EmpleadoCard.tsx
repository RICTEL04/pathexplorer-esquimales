import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { Avatar, Progress } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ItemTypes = { EMPLEADO: "empleado" };

export default function EmpleadoCard({
  empleado,
  fetchAvatarURL,
  onDrag,
  useTotalPropuesta = false,
  showRemove = false,
  onRemove
}: {
  empleado: any,
  fetchAvatarURL: (id: string) => Promise<string | null>,
  onDrag?: () => void,
  useTotalPropuesta?: boolean,
  showRemove?: boolean,
  onRemove?: () => void
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchAvatarURL(empleado.id_empleado).then(url => {
      if (mounted) setAvatarUrl(url);
    });
    return () => { mounted = false; };
  }, [empleado.id_empleado, fetchAvatarURL]);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.EMPLEADO,
    item: { ...empleado },
    end: (item, monitor) => {
      if (monitor.didDrop() && onDrag) onDrag();
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const porcentaje = useTotalPropuesta
    ? empleado.total_propuesta ?? 0
    : empleado.cargabilidad ?? 0;

  return (
    <div
      ref={(node) => {
        if (node) drag(node);
      }}
      className={`flex items-center bg-white rounded-2xl shadow-lg p-3 border border-gray-200 hover:shadow-2xl transition-shadow duration-200 min-h-0 ${isDragging ? "opacity-50" : ""}`}
      style={{
        minHeight: 50,
        maxHeight: 70,
        cursor: "grab",
        position: "relative",
        width: "100%",
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
        className="bg-gray-100 text-gray-500 mr-3"
      />
      <div className="flex-1 flex flex-col justify-center">
        <span className="font-semibold text-gray-800 text-base">{empleado.nombre}</span>
        <span className="text-sm text-gray-600 font-semibold ml-1">
          {porcentaje}%
        </span>
        <div className="w-full mt-1">
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
          />
        </div>
      </div>
    </div>
  );
}