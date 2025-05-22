// En RevisorMetaCards.tsx
import { useState } from 'react';
import { Meta } from "@/lib/metas-empleados/metasDefinitions";
import RevisorMetaCard from './RevisorMetaCard';

export default function RevisorMetaCards({
  metas,
  onMetaRevisor,
  employeeID
}: {
  metas: Meta[];
  onMetaRevisor: () => void;
  employeeID: string;
}) {
  // Si no hay metas, mostrar mensaje
  if (!metas || metas.length === 0) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500 text-center">No tienes metas asignadas como revisor</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Título y contenedor con scroll */}
      <div className="bg-white/1 rounded-lg  p-4 h-full flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {metas.map((meta) => (
            <RevisorMetaCard 
              key={meta.ID_meta} 
              meta={meta} 
              onMetaRevisor={onMetaRevisor}
              employeeID={employeeID}
            />
          ))}
        </div>
      </div>
    </div>
  );
}