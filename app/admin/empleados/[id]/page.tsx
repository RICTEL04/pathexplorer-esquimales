// app/capability-lead/perfil/[id]/page.tsx
"use client"
import React from 'react';
import Profile from '@/components/Profile';
import Card from '@/components/Card';
import { useEmployeeProfile } from '@/lib/hooks/useEmployeeProfile';
import { useParams } from 'next/navigation'; // Cambiado a next/navigation

const UserProfilePage = () => {
  const params = useParams(); // Usar useParams en lugar de useRouter
  // Handle the case where params is null
  if (!params || !params.id) {
    return <div className="min-h-screen flex items-center justify-center">ID no encontrado en la URL</div>;
  }

  const id = params.id as string;


  // Resto de tu lógica usando id...
  const {
    session,
    loading,
    profileData,
    isOwner,
    handlePhoneChange,
    handleBiographyChange,
    handleAddressChange,
    handleInterestsChange,
    handleSoftSkillsChange,
    handleHardSkillsChange,
    handleUpdateEmployeeAvatar
  } = useEmployeeProfile(id);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (!session) {
    return <div className="min-h-screen flex items-center justify-center">No autenticado...</div>;
  }

  // Preparar datos para el componente Profile

  
  const SoftSkills = profileData.softSkills

  const HardSkills = profileData.hardSkills

  const interests = profileData.intereses
    .map(h => h.Descripcion);

  const userProfileData = {
    id: profileData.ID_Empleado,
    name: profileData.Nombre,
    role: profileData.Rol,
    level: profileData.Nivel,
    department: profileData.Departamento,
    biography: profileData.Biografia,
    email: profileData.contacto?.Email,
    phone: profileData.contacto?.Num_Telefono,
    direction: profileData.direccion,
    avatarUrl: profileData.AvatarURL,
    projects: profileData.proyectos.map(p => ({
        id: p.idProyecto,
        name: p.nombreProyecto,
        client: p.nombreCliente,
        puesto: p.puesto,
        status: p.status,
        cargability: "",
        endDate: ""
      })),
    certifications: profileData.certificados,
    goals: [],
    SoftSkills,
    HardSkills,
    interests,
    onPhoneChange: handlePhoneChange,
    onBiographyChange: handleBiographyChange,
    onAddressChange: handleAddressChange,
    onUpdateAvatarURL: handleUpdateEmployeeAvatar,
    onInterestsChange: isOwner ? handleInterestsChange : undefined,
    onSoftSkillsChange: handleSoftSkillsChange,
    onHardSkillsChange: handleHardSkillsChange,
    editable: isOwner
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

        {/* Columna central */}
        <div className="lg:col-span-10 space-y-6">
          <Profile {...userProfileData} />
        </div>

        {/* Columna derecha */}
        <div className="lg:col-span-2 space-y-6">
          {/* People Lead */}
          <h2 className="text-lg font-bold mb-4">People Lead</h2>
          {profileData.peopleLead ? (
            <Card className="p-4 h-auto">
              <div className="flex items-start space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={profileData.peopleLead.AvatarUrl || "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"}
                    alt={`${profileData.peopleLead.Nombre}'s avatar`}
                    width={60}
                    height={60}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="min-w-0"> 
                  <p className="font-medium break-words">{profileData.peopleLead.Nombre}</p>
                  <p className="text-sm text-gray-500 break-words">People Lead</p>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-4 h-auto">
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No hay People Lead asignado</p>
              </div>
            </Card>
          )}

          {/* Capability Lead */}
          <h2 className="text-lg font-bold mb-4">Capability Lead</h2>
          {profileData.capabilityLead ? (
            <Card className="p-4 h-auto">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 shrink-0">
                  <img
                    src={profileData.capabilityLead.AvatarUrl || "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"}
                    alt={`${profileData.capabilityLead.Nombre}'s avatar`}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-medium">{profileData.capabilityLead.Nombre}</p>
                  <p className="text-sm text-gray-500">Capability Lead</p>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-4 h-auto">
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No hay Capability Lead asignado</p>
              </div>
            </Card>
          )}


          <h2 className="text-lg font-bold mb-4">Informes</h2>
          {profileData.informes.length > 0 ? (
            <div className="space-y-3">
              {profileData.informes.map((informe) => (
                <Card key={informe.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium break-words min-w-0 flex-1">
                      {informe.name}
                    </p>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-4">
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No hay informes disponibles</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default UserProfilePage;