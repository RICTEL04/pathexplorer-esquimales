import React, { useState } from "react";
import EmployeeCard from "./EmployeeCard";

interface DraggableListProps {
  employees: any[]; // Accepts raw employee objects
  onDragStart: (employee: any) => void;
  onDrop: () => void;
  onDragOver: () => void;
  isOver: boolean;
  draggableEnabled: boolean;
}

export default function DraggableList({
  employees,
  onDragStart,
  onDrop,
  onDragOver,
  isOver,
  draggableEnabled,
}: DraggableListProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <ul
      className={`w-full mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 min-h-[80px] transition-colors ${
        isOver ? "bg-purple-100" : ""
      }`}
      onDragOver={e => {
        e.preventDefault();
        onDragOver();
      }}
      onDrop={onDrop}
    >
      {employees.map((employee) => (
        <li
          key={employee.ID_Empleado}
          draggable={draggableEnabled}
          onDragStart={draggableEnabled ? () => onDragStart(employee) : undefined}
          onMouseDown={() => setActiveId(employee.ID_Empleado)}
          onMouseUp={() => setActiveId(null)}
          onMouseLeave={() => setActiveId(null)}
          className={
            (draggableEnabled ? "cursor-move " : "") +
            "transition-transform duration-150 " +
            (activeId === employee.ID_Empleado ? "scale-95" : "")
          }
          style={{ userSelect: "none" }}
        >
          {/* Pass the raw employee object to EmployeeCard, or render fields directly */}
          <EmployeeCard employee={employee} />
          {/* Or, if you want to render directly here: */}
          {/* <div>
            <div><b>{employee.Nombre}</b></div>
            <div>{employee.Rol}</div>
            <div>Nivel: {employee.Nivel}</div>
          </div> */}
        </li>
      ))}
    </ul>
  );
}