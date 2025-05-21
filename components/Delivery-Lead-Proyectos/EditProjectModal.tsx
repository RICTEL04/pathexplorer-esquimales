import React from "react";

export default function EditProjectModal({
  onClose,
  onSubmit,
  editProject,
  setEditProject,
  editRoles,
  setEditRoles,
}: any) {
  const handleEditRoleChange = (index: number, field: string, value: string | number) => {
    const updatedRoles = [...editRoles];
    updatedRoles[index] = { ...updatedRoles[index], [field]: value };
    setEditRoles(updatedRoles);
  };

  const addEditRole = () => setEditRoles([...editRoles, { role: '', quantity: 1 }]);
  const removeEditRole = (index: number) => setEditRoles(editRoles.filter((_: any, i: number) => i !== index));

  if (!editProject) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 max-w-2xl w-full mx-4 rounded-lg shadow-xl max-h-[80vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Editar Proyecto</h2>
        <form className="space-y-4 overflow-y-auto flex-1" onSubmit={onSubmit}>
          <div>
            <label className="block text-gray-700 mb-2">Nombre del Proyecto</label>
            <input
              type="text"
              value={editProject.Nombre}
              onChange={e => setEditProject({ ...editProject, Nombre: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Descripción</label>
            <textarea
              value={editProject.Descripcion}
              onChange={e => setEditProject({ ...editProject, Descripcion: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Fecha de Inicio</label>
              <input
                type="date"
                value={editProject.fecha_inicio}
                onChange={e => setEditProject({ ...editProject, fecha_inicio: e.target.value })}
                className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Fecha de Fin</label>
              <input
                type="date"
                value={editProject.fecha_fin}
                onChange={e => setEditProject({ ...editProject, fecha_fin: e.target.value })}
                className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Roles Necesarios</label>
            {editRoles.map((role: any, index: number) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Rol"
                  value={role.role}
                  onChange={e => handleEditRoleChange(index, "role", e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="number"
                  min="1"
                  value={role.quantity}
                  onChange={e => handleEditRoleChange(index, "quantity", parseInt(e.target.value))}
                  className="w-20 p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="button"
                  onClick={() => removeEditRole(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addEditRole}
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
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all duration-300"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}