//components/Profile.tsx
import React from 'react';
import CardTable from '../components/Table';
import InterestSection from './InterestSection';
import SkillSection from './SkillSection';
import { Habilidad as Hability } from '@/lib/employeeService';

interface Project {
  id: string;
  name: string;
  client: string;
  puesto: string;
  status: string;
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
  num_Casa?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
}

interface ProfileProps {
  className?: string; 
  name?: string;
  level?: string;
  id?: string;
  role?: string;
  department?: string;
  email?: string;
  phone?: string;
  direction?: Direction;
  avatarUrl?: string;
  bio?: string;
  projects?: Project[];
  certifications?: Certification[];
  goals?: Goal[];
  SoftSkills?: Hability[];
  HardSkills?: Hability[];
  interests?: string[];
  onSoftSkillsChange?: (newSkills: Hability[]) => void;
  onHardSkillsChange?: (newSkills: Hability[]) => void;
  onInterestsChange?: (newInterests: string[]) => void;
  
  
}

const Profile: React.FC<ProfileProps> = ({
  className = "max-w-full p-6 bg-blue-50 dark:bg-gray-800 rounded-lg drop-shadow-xl",
  id,
  name,
  role,
  level,
  department,
  email,
  phone,
  direction,
  avatarUrl,
  bio,
  projects = [],
  certifications = [],
  goals = [],
  SoftSkills = [],
  HardSkills = [],
  interests = [],
  onSoftSkillsChange,
  onHardSkillsChange,
  onInterestsChange,
}) => {
  const projectColumns: { key: keyof Project; label: string }[] = [
    { key: 'id', label: 'ID'},
    { key: 'name', label: 'Nombre' },
    { key: 'client', label: 'Cliente' },
    { key: 'puesto', label: 'Puesto' },
    { key: 'status', label: 'Status' },
  ];

  const certificationsColumns: { key: keyof Certification; label: string }[] = [
    { key: 'id', label: 'ID'},
    { key: 'name', label: 'Nombre' },
    { key: 'expiration', label: 'Fecha Límite' },
  ];

  const renderEmptyMessage = (sectionName: string) => (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
      <p className="text-gray-500 dark:text-gray-400">No hay {sectionName} disponibles</p>
    </div>
  );

  const renderField = (value: string | undefined, fieldName: string) => (
    value ? (
      <p className="text-gray-600 dark:text-gray-300 break-words">{value}</p>
    ) : (
      <p className="text-gray-400 dark:text-gray-500 italic break-words">No hay {fieldName.toLowerCase()}</p>
    )
  );

  const renderDirection = (dir?: Direction) => {
    if (!dir) return renderEmptyMessage("información de dirección");
    
    const directionParts = [dir.num_Casa, dir.street, , dir.city, dir.state, dir.country].filter(Boolean);
    return directionParts.length > 0 ? (
      <p className="text-gray-600 dark:text-gray-300 break-words">
        {directionParts.join(', ')}
      </p>
    ) : (
      <p className="text-gray-400 dark:text-gray-500 italic break-words">No hay información de dirección</p>
    );
  };

  return (
    <div className={`${className}`}>
      {/* Sección de información básica */}
      <div className="flex flex-col items-center md:flex-row md:items-start gap-6 flex-wrap">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 shrink-0">
          <img
            src={avatarUrl || "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"}
            alt={`${name || 'Usuario'}'s profile picture`}
            width={112}
            height={112}
            className="object-cover"
          />
        </div>
        
        {/* Información principal */}
        <div className="text-center md:text-left max-w-[300px] md:max-w-none flex-1 min-w-0">
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white break-words">
              {name || "Nombre no disponible"}
            </h2>
            {level ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Nivel {level}</p>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic">Nivel no especificado</p>
            )}
            {id ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 break-words">ID: {id}</p>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic break-words">ID no disponible</p>
            )}
          </div>
          <p className="text-lg text-blue-600 dark:text-blue-400 break-words">
            {role || "Rol no especificado"}
            {department && ` • ${department}`}
          </p>
          {!department && (
            <p className="text-sm text-gray-400 dark:text-gray-500 italic">Departamento no especificado</p>
          )}
        </div>

        {/* Información de contacto */}
        <div className="max-w-[300px] md:max-w-none flex-1 min-w-0">
          <div className="mt-3 space-y-1">
            {renderField(email, "email")}
            {renderField(phone, "teléfono")}
          </div>
          
          <div className="mt-1">
            {direction ? renderDirection(direction) : renderEmptyMessage("información de dirección")}
          </div>
          
          <div className="mt-3">
            {renderField(bio, "biografía")}
          </div>
        </div>
      </div>

      {/* Sección de softSkills */}
      <SkillSection
        title="Soft Skills"
        items={SoftSkills}
        type='soft'
        color="blue"
        editable={!!onSoftSkillsChange}
        onItemsChange={onSoftSkillsChange}
      />

      {/* Sección de hardSkills */}
      <SkillSection
        title="Technical Skills"
        items={HardSkills}
        type='hard'
        color="green"
        editable={!!onHardSkillsChange}
        onItemsChange={onHardSkillsChange}
      />

      {/* Sección de intereses */}
      <InterestSection
        title="Intereses"
        items={interests}
        color="purple"
        editable={!!onInterestsChange}
        onItemsChange={onInterestsChange}
      />

      {/* Sección de proyectos */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Proyectos</h3>
        {projects.length > 0 ? (
          <CardTable columns={projectColumns} data={projects} />
        ) : renderEmptyMessage("proyectos")}
      </div>

      {/* Sección de certificados */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Certificados</h3>
        {certifications.length > 0 ? (
          <CardTable columns={certificationsColumns} data={certifications} />
        ) : renderEmptyMessage("certificados")}
      </div>

      {/* Sección de metas */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Metas</h3>
        {goals.length > 0 ? (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {goal.name || "Meta sin nombre"}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {goal.startDate || "Fecha no especificada"} - {goal.endDate || "Fecha no especificada"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {goal.description || "No hay descripción disponible"}
                </p>
              </div>
            ))}
          </div>
        ) : renderEmptyMessage("metas")}
      </div>
    </div>
  );
};

export default Profile;