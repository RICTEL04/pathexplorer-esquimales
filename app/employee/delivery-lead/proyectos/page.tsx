"use client";

import { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import {
  fetchProjects as fetchProjectsApi,
  insertProject,
  insertRoles,
  updateProject,
  deleteRolesByProject,
  updateProjectStatus,
} from '@/lib/delivery-lead-proyectos/apiCalls';
import NewProjectModal from '@/components/Delivery-Lead-Proyectos/NewProjectModal';
import EditProjectModal from '@/components/Delivery-Lead-Proyectos/EditProjectModal';
import ConfirmModal from '@/components/Delivery-Lead-Proyectos/ConfirmModal';
import ReviewModal from '@/components/Delivery-Lead-Proyectos/ReviewModal';
import { ProjectJson } from '@/lib/delivery-lead-proyectos/definitions';

export default function ProyectosPage() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [roles, setRoles] = useState([{ role: '', quantity: 1 }]);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [Status, setStatus] = useState('active');
  const [deliveryLeadId, setDeliveryLeadId] = useState('');
  const [projects, setProjects] = useState<ProjectJson[]>([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<ProjectJson | null>(null);
  const [editRoles, setEditRoles] = useState<{ role: string; quantity: number }[]>([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmProjectId, setConfirmProjectId] = useState<string | undefined>(undefined);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectJson | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await fetchProjectsApi();
      setProjects(data);
      if (data.length > 0) {
        setDeliveryLeadId(data[0].ID_DeliveryLead);
        console.log('Delivery Lead ID:', data[0].ID_DeliveryLead);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  useEffect(() => {
    const loadProjects = async () => {
      try {
        await fetchProjects();
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };
    loadProjects();
  }, []);

  // Handler to create a new project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData: ProjectJson = {
      ID_Proyecto: '',
      Nombre: projectName,
      Descripcion: description,
      fecha_inicio: startDate,
      fecha_fin: endDate,
      Status: Status,
      ID_DeliveryLead: deliveryLeadId,
      isReviewed: false,
      roles: roles.map((role) => ({
        puesto: role.role,
        cantidad: role.quantity,
      })),
    };

    try {
      const proyecto = await insertProject(projectData);
      const rolesData = (projectData.roles ?? []).map((role) => ({
        role_name: role.puesto,
        Proyecto_id: proyecto.ID_Proyecto,
      }));
      await insertRoles(rolesData);
      setShowNewProjectModal(false);
      setProjectName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setRoles([{ role: '', quantity: 1 }]);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  // Open edit modal and populate fields
  const openEditModal = (project: ProjectJson) => {
    setEditProject(project);
    setEditRoles(
      project.roles?.map(r => ({
        role: r.puesto,
        quantity: r.cantidad,
      })) || [{ role: '', quantity: 1 }]
    );
    setEditModalOpen(true);
  };

  // Save edited project
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProject) return;
    try {
      await updateProject(editProject);
      if (editProject.ID_Proyecto) {
        await deleteRolesByProject(editProject.ID_Proyecto);
      }
      const rolesData = editRoles.map(role => ({
        role_name: role.role,
        Proyecto_id: editProject.ID_Proyecto,
      }));
      if (rolesData.length > 0) {
        await insertRoles(rolesData);
      }
      setEditModalOpen(false);
      setEditProject(null);
      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  // Handler to open confirmation modal
  const openConfirmModal = (projectId: string | undefined) => {
    setConfirmProjectId(projectId);
    setConfirmModalOpen(true);
  };

  // Handler to open review modal
  const openReviewModal = (project: ProjectJson) => {
    setReviewModalOpen(true);
    setSelectedProject(project);
  };

  // Handler to confirm marking as done
  const handleConfirmMarkAsDone = async () => {
    if (!confirmProjectId) return;
    try {
      await updateProjectStatus(confirmProjectId, 'done');
      setConfirmModalOpen(false);
      fetchProjects();
    } catch (error) {
      console.error('Error confirming mark as done:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => setShowNewProjectModal(true)}
        className="flex items-center gap-2 px-6 py-3 bg-violet-800 hover:bg-red-700 transition-all duration-300 text-white font-bold rounded-lg"
      >
        <Plus className="w-5 h-5" />
        <span>Nuevo Proyecto</span>
      </button>
      {showNewProjectModal && (
        <NewProjectModal
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
          setRoles={setRoles}
        />
      )}

      {/* Edit Project Modal */}
      {editModalOpen && editProject && (
        <EditProjectModal
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleEditSubmit}
          editProject={editProject}
          setEditProject={setEditProject}
          editRoles={editRoles}
          setEditRoles={setEditRoles}
        />
      )}

      {/* Review Modal */}
      {reviewModalOpen && (
        <ReviewModal
          onClose={() => setReviewModalOpen(false)}
          selectedProject={selectedProject}
        />
      )}

      {/* Display the projects */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Proyectos</h2>
        {projects.length === 0 ? (
          <p className="text-gray-600">No hay proyectos disponibles.</p>
        ) : (
          projects.map((project) => (
            <div key={project.ID_Proyecto} className="bg-white rounded-lg border border-gray-200 p-4 mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-black font-bold">{project.Nombre}</h3>
                <p className="text-gray-600 text-sm">{project.Descripcion}</p>
                <p className="text-gray-600 mt-2">Fecha de Inicio: {project.fecha_inicio}</p>
                <p className="text-gray-600 mt-2">Fecha de Fin: {project.fecha_fin}</p>
              </div>
              {project.Status === 'active' ? (
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-violet-800 hover:bg-red-700 text-white rounded transition-all"
                    onClick={() => openEditModal(project)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-all"
                    onClick={() => openConfirmModal(project.ID_Proyecto)}
                  >
                    Marcar como hecho
                  </button>
                </div>
              ) : project.Status === 'done' && project.isReviewed ? (
                <div>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-200 text-green-800 rounded text-lg font-medium">
                    Hecho
                  </span>
                </div>

              ) : project.Status === "done" && !project.isReviewed ? (
                <div>
                  <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
                    onClick={() => { openReviewModal(project) }}
                  >
                    Revisar
                  </button>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModalOpen && (
        <ConfirmModal
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={handleConfirmMarkAsDone}
        />
      )}

    </div>
  );
}