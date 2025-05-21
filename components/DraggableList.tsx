import React, {useState} from "react";
import EmployeeCard from "./EmployeeCard";

type Employee = {
  id: string;
  name: string;
  position: string;
  email: string;
  level: number;
  project: string;
  companyEntryDate: string;
  timeOnLevel: string;
  activeProject: string;
  activeProjectStartDate: string;
  projectRole: string;
  isProjectLead: boolean;
  certificates: string[];
  courses: string[];
};

interface DraggableListProps {
  employees: Employee[];
  onDragStart: (employee: Employee) => void;
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
      className={`w-full max-w-3xl mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[80px] transition-colors ${
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
          key={employee.id}
          draggable={draggableEnabled}
          onDragStart={draggableEnabled ? () => onDragStart(employee) : undefined}
          onMouseDown={() => setActiveId(employee.id)}
          onMouseUp={() => setActiveId(null)}
          onMouseLeave={() => setActiveId(null)}
          className={
            (draggableEnabled ? "cursor-move " : "") +
            "transition-transform duration-150 " +
            (activeId === employee.id ? "scale-95" : "")
          }
          style={{ userSelect: "none" }}
        >
          <EmployeeCard employee={employee} />
        </li>
      ))}
    </ul>
  );
}