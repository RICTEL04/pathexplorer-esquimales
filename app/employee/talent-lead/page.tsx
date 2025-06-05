"use client";

import { getTalentDiscussionsByLead, 
  getTalentLeadIdForEmployee, 
  createTalentDiscussionWithParticipants
} from "@/lib/talent-discussions/talent_lead/TalendLeadAPICalls";
import { fetchSession } from "@/lib/metas-empleados/apiCallsMetas";
import { useEffect, useState } from "react";
import { Talent_Discussion } from "@/lib/talent-discussions/talentDiscussionDefinitions";
import { TalentDiscussionsList } from "@/components/Talent_Discussions/Talent_Lead/TDList";
import { TalentDiscussionForm } from "@/components/Talent_Discussions/Talent_Lead/TalentDiscussionForm";
import { usePathname } from "next/navigation";

export default function EmployeePage() {
  const pathname = usePathname();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [EmployeeByNivel, setEmployeeByNivel] = useState<any>(null);
  const [showCreateTalentDiscussionForm, setShowCreateTalentDiscussionForm] = useState(false);
  const [ID_TalentLead, setID_TalentLead] = useState<string | null>(null);
  const [TalentDiscussions, setTalentDiscussions] = useState<Talent_Discussion[]>([]);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        setLoading(true);
        const session2 = await fetchSession(setLoading);
        setSession(session2);
        
        if (session2?.user?.id ) {
          const ID_TalentLead2 = await getTalentLeadIdForEmployee(setLoading, session2.user.id);
          if (ID_TalentLead2) {
            setID_TalentLead(ID_TalentLead2);
            const TalentDiscussionsData = await getTalentDiscussionsByLead(setLoading, ID_TalentLead2);
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

  const handleCreateTalentDiscussion = async (formData: any) => {
    setLoading(true);
    try {
      await createTalentDiscussionWithParticipants(
        setLoading,
        formData.discussion,
        formData.nivel,
        ID_TalentLead ?? "",
        formData.fechaInicio,
        formData.fechaFinal,
        formData.peopleLeads,
        formData.employees
      );
      setShowCreateTalentDiscussionForm(false);
      if (ID_TalentLead) {
        const TalentDiscussionsData = await getTalentDiscussionsByLead(setLoading, ID_TalentLead);
        setTalentDiscussions(TalentDiscussionsData);
      }
    } catch (error) {
      console.error("Error al crear Talent Discussion:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
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
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
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
            <p className="text-gray-600 mt-1">Gestiona las discusiones de talento de tu equipo</p>
          </div>
          <button
            className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md shadow-md transition-colors flex items-center"
            onClick={() => setShowCreateTalentDiscussionForm(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Crear Talent Discussion
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {TalentDiscussions.length > 0 ? (
            <TalentDiscussionsList discussions={TalentDiscussions} pathname={pathname ?? ""} />
          ) : (
            <div className="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No hay discusiones</h3>
              <p className="mt-1 text-sm text-gray-500">Crea tu primera Talent Discussion para comenzar.</p>
              
            </div>
          )}
        </div>

        {/* Modal Form */}
        {showCreateTalentDiscussionForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <TalentDiscussionForm
                onClose={() => setShowCreateTalentDiscussionForm(false)}
                onSubmit={handleCreateTalentDiscussion}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}