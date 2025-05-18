"use client";

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase'
import NewProjectModal from './NewProjectModal';
import ProjectInfoModal from './ProjectInfoModal';

interface ProjectJson {
  ID_Proyecto?: string;
  Nombre: string;
  Descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  roles: {
    puesto: string;
    cantidad: number;
  }[];
}

export default function ProyectosPage() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showProjectInfoModal, setShowProjectInfoModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectJson | null>(null);
  const [projectRoles, setProjectRoles] = useState<{ id: number, role_name: string, Proyecto_id: string }[]>([]);
  const [roles, setRoles] = useState([{ role: '', quantity: 1 }]);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projects, setProjects] = useState<ProjectJson[]>([]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('Proyectos')
        .select('*')
        .order('ID_Proyecto', { ascending: false });
      if (error) throw error;
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectCardClick = async (project: ProjectJson) => {
    setSelectedProject(project);
    setShowProjectInfoModal(true);
    if (project.ID_Proyecto) {
      const { data, error } = await supabase
        .from('Roles')
        .select('*')
        .eq('Proyecto_id', project.ID_Proyecto);
      setProjectRoles(!error ? data || [] : []);
    } else {
      setProjectRoles([]);
    }
  };

  const handleRoleChange = (index: number, field: string, value: string | number) => {
    const updatedRoles = [...roles];
    updatedRoles[index] = { ...updatedRoles[index], [field]: value };
    setRoles(updatedRoles);
  };

  const addRole = () => setRoles([...roles, { role: '', quantity: 1 }]);
  const removeRole = (index: number) => setRoles(roles.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData: ProjectJson = {
      Nombre: projectName,
      Descripcion: description,
      fecha_inicio: startDate,
      fecha_fin: endDate,
      roles: roles.map((role) => ({
        puesto: role.role,
        cantidad: role.quantity,
      })),
    };
    try {
      const { data: proyecto, error: proyectoError } = await supabase
        .from('Proyectos')
        .insert({
          Nombre: projectData.Nombre,
          Descripcion: projectData.Descripcion,
          fecha_inicio: projectData.fecha_inicio,
          fecha_fin: projectData.fecha_fin,
        })
        .select()
        .single();
      if (proyectoError) throw proyectoError;
      const rolesData = projectData.roles.map((role) => ({
        role_name: role.puesto,
        Proyecto_id: proyecto.ID_Proyecto,
      }));
      const { error: rolesError } = await supabase.from('Roles').insert(rolesData);
      if (rolesError) throw rolesError;
      setShowNewProjectModal(false);
      setProjectName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setRoles([{ role: '', quantity: 1 }]);
      window.location.reload();
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-gray-800 text-4xl font-bold mb-2">Proyectos</h1>
          <p className="text-gray-600">Aquí puedes gestionar los proyectos.</p>
        </div>
        <button 
          onClick={() => setShowNewProjectModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white font-bold rounded-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Proyecto</span>
        </button>
      </div>

      <NewProjectModal
        open={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onSubmit={handleSubmit}
        projectName={projectName}
        setProjectName={setProjectName}
        description={description}
        setDescription={setDescription}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        roles={roles}
        handleRoleChange={handleRoleChange}
        addRole={addRole}
        removeRole={removeRole}
      />

      <ProjectInfoModal
        open={showProjectInfoModal}
        onClose={() => setShowProjectInfoModal(false)}
        project={selectedProject}
        roles={projectRoles}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Proyectos</h2>
        {projects.length === 0 ? (
          <p className="text-gray-600">No hay proyectos disponibles.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.ID_Proyecto}
              className="bg-white rounded-lg border border-gray-200 p-4 mb-4 cursor-pointer hover:shadow-lg transition"
              onClick={() => handleProjectCardClick(project)}
            >
              <h3 className="text-black font-bold">{project.Nombre}</h3>
              <p className="text-gray-600 text-sm">{project.Descripcion}</p>
              <p className="text-gray-600 mt-2">Fecha de Inicio: {project.fecha_inicio}</p>
              <p className="text-gray-600 mt-2">Fecha de Fin: {project.fecha_fin}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}