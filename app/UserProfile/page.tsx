"use client"
import React from 'react';
import Profile from '@/components/Profile'; // Asegúrate de importar correctamente el componente
import Card from '@/components/Card'
import { useEffect, useState } from 'react';
import { fetchProfile } from '../../lib/profile';
import { UserProfile as UserProfileType } from '../../lib/definitions';

const UserProfile = () => {
  const [user, setUserData] = useState<UserProfileType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProfile();
      if (data) {
        console.log(data);
        setUserData(data);
      }
    };

    fetchData();
  }, []);

  if (!user) return <div>Cargando...</div>; // Manejo de carga
  if (user === null) return <div>Error al cargar el perfil</div>; // Manejo de error

  // Aquí puedes obtener los datos de un usuario, ya sea desde un estado o una API.
  const user2 = {
    id: "123456789",
    name: "Jane Doe",
    role: "Software Engineer",
    level: "9",
    department: "Engineering",
    email: "jane.doe@example.com",
    phone: "123-456-7890",
    direction: {
      city: "Monterrey",
      state: "Nuevo Leon",
      country: "México"
    },
    avatarUrl: "https://i.redd.it/dxufnnvawr651.jpg",
    bio: "A passionate software engineer who loves coding and problem-solving.",
    projects: [
      {
        id: "1",
        name: "Project Aaaaaaaaaaaaaaaaaaaaaaaaaaa",
        client: "Client X",
        cargability: "80",
        endDate: "2025-01-01"
      },
      {
        id: "1",
        name: "Project A",
        client: "Client X",
        cargability: "80",
        endDate: "2025-01-01"
      },
      {
        id: "1",
        name: "Project A",
        client: "Client X",
        cargability: "80",
        endDate: "2025-01-01"
      },
      {
        id: "1",
        name: "Project A",
        client: "Client X",
        cargability: "80",
        endDate: "2025-01-01"
      },
      {
        id: "1",
        name: "Project A",
        client: "Client X",
        cargability: "80",
        endDate: "2025-01-01"
      },
      {
        id: "1",
        name: "Project A",
        client: "Client X",
        cargability: "80",
        endDate: "2025-01-01"
      }
    ],
    certifications: [
      {
        id: "1",
        name: "Certified Developer",
        expiration: "2026-01-01"
      }
    ],
    goals: [
      {
        id: "1",
        name: "Improve coding skills",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        description: "Complete 50 coding challenges."
      }
    ],
    softSkills: ["Comunicacion efectiva", "Trabajo en equipo"],
    hardSkills: ["React", "TypeScript", "Node.js"],
    interests: ["Desarrollo FullStack", "Liderar Proyectos", "Python"],
    peopleLead:{
      id: "1",
      name: "David Martinez",
      avatarURL: "https://i.ytimg.com/vi/29Rk-sbtzGU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDi58Rn17xAuk5ZiUdv9P3qlSPWWQ"
    },
    capabilityLead:{
      id: "2",
      name: "super josue",
      avatarURL: "https://media1.tenor.com/m/kwYKgLDbZp8AAAAd/pirata-pirata-de-culiacan.gif"
    },
    informe: [
      {
        id: "1",
        name: "Informe de maracuya"
      },
      {
        id: "2",
        name: "Informe de maracuya 2"
      }
    ]

  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* Columna izquierda */}
        <div className="lg:col-span-2 space-y-6">
          {/* People Lead */}
          <h2 className="text-lg font-bold mb-4">People Lead</h2>
          <Card className="p-4 h-auto">
            <div className="flex items-start space-x-3"> {/* Cambiado a items-start */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={user.peopleLead.avatarURL}
                  alt={`${user.peopleLead.name}'s avatar`}
                  width={60}
                  height={60}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="min-w-0"> 
                <p className="font-medium break-words">{user.peopleLead.name}</p>
                <p className="text-sm text-gray-500 break-words">People Lead</p>
              </div>
            </div>
          </Card>

          {/* Capability Lead */}
          <h2 className="text-lg font-bold mb-4">Capability Lead</h2>
          <Card className="p-4 h-auto">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 shrink-0">
                <img
                  src={user.capabilityLead.avatarURL}
                  alt={`${user.capabilityLead.name}'s avatar`}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-medium">{user.capabilityLead.name}</p>
                <p className="text-sm text-gray-500">Capability Lead</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Columna central */}
        <div className="lg:col-span-8 space-y-6">
          <Profile
            name={user.name}
            className="max-w-full p-6 bg-blue-50 dark:bg-gray-900 rounded-lg drop-shadow-xl"
            id={user.id}
            role={user.role}
            level={user.level}
            department={user.department}
            email={user.email}
            phone={user.phone}
            direction={user.direction}
            avatarUrl={user.avatarUrl}
            bio={user.bio}
            projects={user.projects}
            certifications={user.certifications}
            goals={user.goals}
            softSkills={user.softSkills}
            hardSkills={user.hardSkills}
            interests={user.interests}
          />
        </div>

        {/* Columna derecha */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sección de Informes */}
          {/*
          <div>
            <h2 className="text-lg font-bold mb-4">Informes</h2>
            <div className="space-y-3">
              {user.informe.map((informe) => (
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
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
