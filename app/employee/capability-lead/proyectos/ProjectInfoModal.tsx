import React from 'react';

interface ProjectInfoModalProps {
  open: boolean;
  onClose: () => void;
  project: any;
  roles: { id: number; role_name: string; Proyecto_id: string }[];
}

export default function ProjectInfoModal({ open, onClose, project, roles }: ProjectInfoModalProps) {
  if (!open || !project) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 max-w-xl w-full mx-4 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">{project.Nombre}</h2>
        <p className="mb-2"><span className="font-semibold">Descripción:</span> {project.Descripcion}</p>
        <p className="mb-2"><span className="font-semibold">Fecha de Inicio:</span> {project.fecha_inicio}</p>
        <p className="mb-2"><span className="font-semibold">Fecha de Fin:</span> {project.fecha_fin}</p>
        <div className="mb-4">
          <span className="font-semibold">Roles:</span>
          <ul className="list-disc ml-6">
            {roles.length === 0 ? (
              <li>No hay roles registrados para este proyecto.</li>
            ) : (
              roles.map((role) => (
                <li key={role.id}>{role.role_name}</li>
              ))
            )}
          </ul>
        </div>
        {/* Placeholder for adding employees later */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}