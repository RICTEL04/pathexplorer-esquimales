import React from 'react';

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  projectName: string;
  setProjectName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  roles: { role: string; quantity: number }[];
  handleRoleChange: (index: number, field: string, value: string | number) => void;
  addRole: () => void;
  removeRole: (index: number) => void;
}

export default function NewProjectModal({
  open, onClose, onSubmit,
  projectName, setProjectName,
  description, setDescription,
  startDate, setStartDate,
  endDate, setEndDate,
  roles, handleRoleChange, addRole, removeRole
}: NewProjectModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 max-w-2xl w-full mx-4 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-purple-600">Nuevo Proyecto</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-gray-700 mb-2">Nombre del Proyecto</label>
            <input 
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Descripción</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 h-32"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Fecha de Inicio</label>
              <input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Fecha de Fin</label>
              <input 
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Roles Necesarios</label>
            {roles.map((role, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Rol"
                  value={role.role}
                  onChange={(e) => handleRoleChange(index, 'role', e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="number"
                  min="1"
                  value={role.quantity}
                  onChange={(e) => handleRoleChange(index, 'quantity', parseInt(e.target.value))}
                  className="w-20 p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="button"
                  onClick={() => removeRole(index)}
                  className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-all"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRole}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-all"
            >
              Agregar Rol
            </button>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded transition-all duration-300"
            >
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}