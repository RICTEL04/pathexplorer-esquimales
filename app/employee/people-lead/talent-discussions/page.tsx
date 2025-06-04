"use client";

import { useEffect, useState } from "react";
import { fetchSession } from "@/lib/metas-empleados/apiCallsMetas";
import { Talent_Discussion } from "@/lib/talent-discussions/talentDiscussionDefinitions";
import { getPeopleLeadIdForEmployee, getTalentDiscussionsByPeopleLead } from "@/lib/talent-discussions/people_lead/PeopleLeadAPICalls";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TalentDiscussionsPage() {
  const pathname = usePathname();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [ID_PeopleLead, setID_PeopleLead] = useState<string | null>(null);
  const [TalentDiscussions, setTalentDiscussions] = useState<Talent_Discussion[]>([]);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        setLoading(true);
        const session2 = await fetchSession(setLoading);
        setSession(session2);

        if (session2?.user?.id) {
          const ID_PeopleLead2 = await getPeopleLeadIdForEmployee(setLoading, session2.user.id);
          if (ID_PeopleLead2) {
            setID_PeopleLead(ID_PeopleLead2);
            const TalentDiscussionsData = await getTalentDiscussionsByPeopleLead(setLoading, ID_PeopleLead2);
            setTalentDiscussions(TalentDiscussionsData);
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Cargando Talent Discussions...</p>
      </div>
    );
  }

  if (!session || !session.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mt-4">Error de sesión</h2>
          <p className="text-gray-600 mt-2">No se ha podido cargar la sesión de usuario</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Recargar Página
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Talent Discussions</h1>
            <p className="text-gray-600 mt-1">Estas son las discusiones de talento donde eres People Lead</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {TalentDiscussions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              {TalentDiscussions.map(td => (
                <Link
                  key={td.ID_Talent_Discussion}
                  href={`${pathname}/${td.ID_Talent_Discussion}`}
                  className="bg-gray-50 border rounded-lg shadow p-4 flex flex-col gap-2 cursor-pointer hover:bg-blue-50 transition"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-blue-700">{td.Discussion}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        td.Estado === "Pendiente" ? "bg-yellow-100 text-yellow-800" : 
                        td.Estado === "Finalizada" ? "bg-green-100 text-green-800" : 
                        td.Estado === "Cancelada" ? "bg-red-100 text-red-800" : 
                        "bg-gray-300 text-gray-800"
                        
                        }`}>
                      {td.Estado}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <b>Talent Lead:</b> {td.Nombre_Talent_Lead}
                  </div>
                  <div className="text-sm text-gray-700">
                    <b>Nivel:</b> {td.Nivel}
                  </div>
                  <div className="text-sm text-gray-700">
                    <b>Fecha inicio:</b> {td.Fecha_Inicio ? new Date(td.Fecha_Inicio).toLocaleDateString() : "-"}
                  </div>
                  <div className="text-sm text-gray-700">
                    <b>Fecha final:</b> {td.Fecha_Final ? new Date(td.Fecha_Final).toLocaleDateString() : "-"}
                  </div>
                  {td.Estado_TD_People_Lead && (
                    <div className="text-xs text-gray-500">
                      <b>Estado (People Lead):</b> {td.Estado_TD_People_Lead}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No hay discusiones</h3>
              <p className="mt-1 text-sm text-gray-500">Aún no tienes Talent Discussions asignadas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}