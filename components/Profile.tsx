//app/components/Profile.tsx
import Image from 'next/image';
import React from 'react';
import CardTable from '../components/Table'


interface Project {
  id: string;
  name: string;
  client: string;
  cargability: string;
  endDate: string;
}

interface Certification {
  id: string;
  name: string; 
  expiration: string;
}

interface Goal {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Direction {
  city?: string;
  state?: string;
  country: string;
}

interface ProfileProps {
  className?: string; 
  name: string;
  level?: string;
  id: string;
  role: string;
  department?: string;
  email?: string;
  phone?: string;
  direction?: Direction;
  avatarUrl: string;
  bio?: string;
  projects?: Project[];
  certifications?: Certification[];
  goals?: Goal[];
  softSkills?: string[];
  hardSkills?: string[];
  interests?: string[];

}

const Profile: React.FC<ProfileProps> = ({
  className = "max-w-full p-6 bg-blue-50 dark:bg-gray-800 rounded-lg drop-shadow-xl",
  id,
  name = "John Doe",
  role = "Dungeon Master",
  level,
  department,
  email,
  phone = "None",
  direction,
  avatarUrl,
  bio = 'No bio provided',
  projects = [],
  certifications = [],
  goals = [],
  softSkills = [],
  hardSkills = [],
  interests = [],

}) => {

    const projectColumns: { key: keyof Project; label: string }[] = [
        { key: 'id', label: 'ID'},
        { key: 'name', label: 'Nombre' },
        { key: 'client', label: 'Cliente' },
        { key: 'cargability', label: 'Cargabilidad' },
        { key: 'endDate', label: 'Fecha Límite' },
      ];

    const certificationsColumns: { key: keyof Certification; label: string }[] = [
        { key: 'id', label: 'ID'},
        { key: 'name', label: 'Nombre' },
        { key: 'expiration', label: 'Fecha Límite' },
      ];



  return (
    <div className={`${className}`}>
    {/* Sección de información básica */}
    <div className="flex flex-col items-center md:flex-row md:items-start gap-6 flex-wrap">
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 shrink-0">
        <img
          src={avatarUrl}
          alt={`${name}'s profile picture`}
          width={112}
          height={112}
          className="object-cover"
        />
      </div>
      
      {/* Información principal */}
      <div className="text-center md:text-left max-w-[300px] md:max-w-none flex-1 min-w-0">
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white break-words">{name}</h2>
          {level && (
            <p className="text-sm text-gray-500 dark:text-gray-400">Nivel {level}</p>
          )}
          {id && (
            <p className="text-sm text-gray-500 dark:text-gray-400 break-words">ID: {id}</p>
          )}
        </div>
        <p className="text-lg text-blue-600 dark:text-blue-400 break-words">
          {role}{department && ` • ${department}`}
        </p>
      </div>

      {/* Información de contacto  */}
      <div className="max-w-[300px] md:max-w-none flex-1 min-w-0">
        {(email || phone) && (
          <div className="mt-3 space-y-1">
            {email && <p className="text-gray-600 dark:text-gray-300 break-words">{email}</p>}
            {phone && <p className="text-gray-600 dark:text-gray-300 break-words">{phone}</p>}
          </div>
        )}
        
        {direction && (
          <p className="mt-1 text-gray-600 dark:text-gray-300 break-words">
            {[direction.city, direction.state, direction.country].filter(Boolean).join(', ')}
          </p>
        )}
        
        {bio && <p className="mt-3 text-gray-700 dark:text-gray-300 break-words">{bio}</p>}
      </div>
    </div>

      {/* Sección de softSkills */}
      {softSkills.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">SoftSkills</h3>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((ability, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                {ability}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sección de hardSkils */}
      {hardSkills.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Habilidades</h3>
          <div className="flex flex-wrap gap-2">
            {hardSkills.map((ability, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                {ability}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sección de hardSkils */}
      {interests.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Intereses</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sección de proyectos*/}
      {projects.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Proyectos</h3>
          <CardTable columns={projectColumns} data={projects} />
        </div>
      )}

      {/* Sección de certificados  */}
      {projects.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Certificados</h3>
          <CardTable columns={certificationsColumns} data={certifications} />
        </div>
      )}

      {/* Sección de metas */}
      {goals.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Metas</h3>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-800 dark:text-white">{goal.name}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {goal.startDate} - {goal.endDate}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default Profile;