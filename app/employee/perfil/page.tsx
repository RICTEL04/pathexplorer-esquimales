// app/capability-lead/perfil/page.tsx
"use client"
import React from 'react';
import Profile from '@/components/Profile';
import Card from '@/components/Card';
import {  ownProfile } from '@/lib/hooks/useEmployeeProfile';

const UserProfilePage = () => {
  const {
    session,
    loading,
    profileData,
    isOwner,
    handleInterestsChange,
    handleSoftSkillsChange,
    handleHardSkillsChange
  } = ownProfile();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (!session) {
    return <div className="min-h-screen flex items-center justify-center">No autenticado...</div>;
  }

  if (!profileData.employee) {
    return <div className="min-h-screen flex items-center justify-center">No se encontraron datos del empleado</div>;
  }

  // Preparar datos para el componente Profile
  const { employee, contacto, peopleLead, capabilityLead, informes, softSkills, hardSkills, intereses } = profileData;

  const SoftSkills = softSkills

  const HardSkills = hardSkills

  const interests = intereses
    .map(h => h.Descripcion);

  const userProfileData = {
    id: employee.ID_Empleado,
    name: employee.Nombre,
    role: employee.Rol,
    level: employee.Nivel,
    department: employee.ID_Departamento,
    email: contacto?.Email,
    phone: contacto?.Num_Telefono,
    direction: {
      city: "",
      state: "",
      country: ""
    },
    avatarUrl: "",
    bio: "",
    projects: profileData.proyectos.map(p => ({
        id: p.idProyecto,
        name: p.nombreProyecto,
        client: p.nombreCliente,
        puesto: p.puesto,
        status: p.status,
        cargability: "",
        endDate: ""
      })),
    certifications: [],
    goals: [],
    SoftSkills,
    HardSkills,
    interests,
    onInterestsChange: isOwner ? handleInterestsChange : undefined,
    onSoftSkillsChange: handleSoftSkillsChange,
    onHardSkillsChange: handleHardSkillsChange,
    editable: isOwner
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

        {/* Columna central */}
        <div className="lg:col-span-8 space-y-6">
          <Profile {...userProfileData} />
        </div>

        {/* Columna derecha */}
        <div className="lg:col-span-2 space-y-6">
          {/* People Lead */}
          <h2 className="text-lg font-bold mb-4">People Lead</h2>
          {peopleLead ? (
            <Card className="p-4 h-auto">
              <div className="flex items-start space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={peopleLead.avatarUrl || "https://via.placeholder.com/60"}
                    alt={`${peopleLead.Nombre}'s avatar`}
                    width={60}
                    height={60}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="min-w-0"> 
                  <p className="font-medium break-words">{peopleLead.Nombre}</p>
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
          {capabilityLead ? (
            <Card className="p-4 h-auto">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 shrink-0">
                  <img
                    src={capabilityLead.avatarUrl || "https://via.placeholder.com/60"}
                    alt={`${capabilityLead.Nombre}'s avatar`}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-medium">{capabilityLead.Nombre}</p>
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
          {informes.length > 0 ? (
            <div className="space-y-3">
              {informes.map((informe) => (
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