// Puedes colocarlo en TalentDiscussionsList.tsx o directamente en tu página

import React from "react";
import { Talent_Discussion } from "@/lib/talent-discussions/talentDiscussionDefinitions";
import Link from "next/link";

interface TalentDiscussionsListProps {
  discussions: Talent_Discussion[];
  pathname: string;
}

export function TalentDiscussionsList({ discussions, pathname }: TalentDiscussionsListProps) {
  if (!discussions || discussions.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No hay talent discussions
      </div>
    );
  }

  return (
    <div className="grid gap-4 mt-8">
      {discussions.map((td) => (
        <Link
          key={td.ID_Talent_Discussion}
          className="bg-white shadow rounded p-4 border"
          href ={`${pathname}/${td.ID_Talent_Discussion}`}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{td.Discussion}</h2>
          <div className="text-sm text-gray-600 mb-1">
            <span className="font-bold">Nivel:</span> {td.Nivel}
          </div>
          <div className="text-sm text-gray-600 mb-1">
            <span className="font-bold">Estado:</span> {td.Estado}
          </div>
          <div className="text-sm text-gray-600 mb-1">
            <span className="font-bold">Talent Lead:</span> {td.Nombre_Talent_Lead}
          </div>
          <div className="text-sm text-gray-600 mb-1">
            <span className="font-bold">Fecha Inicio:</span>{" "}
            {td.Fecha_Inicio ? new Date(td.Fecha_Inicio).toLocaleDateString() : "Sin fecha"}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-bold">Fecha Final:</span>{" "}
            {td.Fecha_Final ? new Date(td.Fecha_Final).toLocaleDateString() : "Sin fecha"}
          </div>
        </Link>
      ))}
    </div>
  );
}