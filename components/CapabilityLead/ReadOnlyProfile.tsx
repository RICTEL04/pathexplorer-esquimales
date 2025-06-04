import React from 'react';
import InterestSection from '../InterestSection';
import AddressSection from '../AddressSection';
import AvatarSection from '../AvatarSection';
import ExperienceSection from '../Experience';
import { Habilidad as Hability, Direccion as Direction, Certificado as Certification } from '@/lib/employeeService';
import { FiMail, FiPhone, FiMapPin, FiUser, FiAward, FiCircle, FiBook } from 'react-icons/fi';
import EmployeeSkills from '../SkillSection';
import EmployeeSkillsHard from '../SkillHard';
import CardTable from '../Table';
import ReadOnlyExperience from './ReadOnlyExperience';

interface Project {
  id: string;
  name: string;
  client: string;
  puesto: string;
  status: string;
  cargability: string;
  endDate: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
  location: string;
  workMode: string;
  description: string;
  skills: string[];
}

interface Goal {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface CertificationWithDocument extends Certification {
  Documento?: string | null;
}

interface ReadOnlyProfileProps {
  className?: string; 
  name?: string;
  level?: string;
  id?: string;
  role?: string;
  department?: string | null;
  biography: string | null;
  email?: string;
  phone?: string;
  direction: Direction | null;
  avatarUrl: string | null;
  projects?: Project[];
  certifications?: CertificationWithDocument[];
  goals?: Goal[];
  SoftSkills?: Hability[];
  HardSkills?: Hability[];
  interests?: string[];
  experiences?: Experience[];
}

const ReadOnlyProfile: React.FC<ReadOnlyProfileProps> = ({
  className = "max-w-full p-6 bg-blue-50 rounded-lg drop-shadow-xl",
  id,
  name,
  role,
  biography,
  level,
  department,
  email,
  phone,
  direction,
  avatarUrl,
  certifications = [],
  SoftSkills = [],
  HardSkills = [],
  interests = [],
}) => {
  const certificationsColumns: { key: keyof Certification; label: string }[] = [
    { key: 'Nombre', label: 'Nombre' },
    { key: 'Fecha_caducidad', label: 'Fecha Límite' },
    { key: 'Verificacion', label: 'Verificado' },
  ];

  const renderEmptyMessage = (sectionName: string) => (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
      <p className="text-gray-500">No hay {sectionName} disponibles</p>
    </div>
  );

  const renderField = (value: string | undefined, fieldName: string, icon: React.ReactNode) => (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-gray-500">{icon}</div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">{fieldName}</label>
        {value ? (
          <p className="text-gray-600 break-words">{value}</p>
        ) : (
          <p className="text-gray-400 italic break-words">No especificado</p>
        )}
      </div>
    </div>
  );

  const categoryId = '6a8ab048-2033-4a16-a9fa-e2006952af4e';

  return (
    <div className={`${className}`}>
      {/* Sección de información básica */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Columna 1 - Avatar */}
        <AvatarSection
          avatarUrl={avatarUrl}
          name={name}
          editable={false}
        />

        {/* Columna 2 - Información principal */}
        <div className="w-full md:w-2/5 space-y-2 md:pl-10">
          <h2 className="text-3xl font-bold text-gray-800 break-words">
            {name || "Nombre no disponible"}
          </h2>
          <p className="text-xl text-blue-600 break-words">
            {role || "Rol no especificado"}
          </p>
          {level && (
            <div className="flex items-center gap-1 mt-2">
              <FiAward className="text-gray-500 text-lg" />
              <span className="text-base text-gray-500">Nivel {level}</span>
            </div>
          )}
          {id && (
            <div className="flex items-center gap-1 mt-2">
              <FiUser className="text-gray-500 text-lg" />
              <span className="text-base text-gray-500">ID: {id}</span>
            </div>
          )}
          {department && (
            <div className="flex items-center gap-1 mt-2">
              <FiCircle className="text-gray-500 text-lg" />
              <span className="text-base text-gray-500">Department: {department}</span>
            </div>
          )}
        </div>

        {/* Columna 3 - Información de contacto */}
        <div className="w-full md:w-2/5 space-y-4">
          {renderField(email, "Email", <FiMail />)}
          {renderField(phone, "Teléfono", <FiPhone />)}
          <div className="flex items-start gap-3">
            <div className="mt-1 text-gray-500"><FiMapPin /></div>
            <div className="flex-1">
              <AddressSection
                label="Dirección"
                address={{
                  Estado: direction?.Estado || null,
                  Pais: direction?.Pais || null
                }}
                editable={false}
                hideLabel={false}
              />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 text-gray-500"><FiBook /></div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-1">Biografía</label>
              <p className="text-gray-600 break-words">{biography || <span className="text-gray-400 italic">No especificado</span>}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de HardSkills */}
      <div className="container mx-auto p-4">
        <EmployeeSkillsHard employeeId={id ?? ''} categoryId={categoryId} />
      </div>

      {/* Sección de SoftSkills */}
      <div className="container mx-auto p-4">
        <EmployeeSkills employeeId={id ?? ''} categoryId={categoryId} />
      </div>

      {/* Sección de intereses */}
      <InterestSection
        title="Intereses"
        items={interests}
        color="purple"
        editable={false}
      />

      {/* Sección de certificados */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Certificados</h3>
        {certifications.length > 0 ? (
          <CardTable
            columns={certificationsColumns}
            data={certifications}
            onRowClick={(cert) => {
              if (cert.Documento) {
                window.open(cert.Documento, '_blank');
              }
            }}
          />
        ) : renderEmptyMessage("certificados")}
      </div>

      {/* Sección de historial profesional */}
      <div className="mt-8">
        <ReadOnlyExperience userId={id ?? ''} />
      </div>
    </div>
  );
};

export default ReadOnlyProfile;