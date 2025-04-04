"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function ProyectosPage() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [roles, setRoles] = useState([{ role: '', quantity: 1 }]);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projectJson, setProjectJson] = useState(null); // Variable para almacenar el JSON generado

  const handleRoleChange = (index: number, field: string, value: string | number) => {
    const updatedRoles = [...roles];
    updatedRoles[index] = { ...updatedRoles[index], [field]: value };
    setRoles(updatedRoles);
  };

  const addRole = () => {
    setRoles([...roles, { role: '', quantity: 1 }]);
  };

  const removeRole = (index: number) => {
    const updatedRoles = roles.filter((_, i) => i !== index);
    setRoles(updatedRoles);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generar el JSON con los datos del proyecto
    const projectData = {
      nombre: projectName,
      descripcion: description,
      fechaInicio: startDate,
      fechaFin: endDate,
      roles: roles.map((role) => ({
        puesto: role.role,
        cantidad: role.quantity,
      })),
    };

    // Guardar el JSON en la variable y mostrarlo en la consola
    setProjectJson(projectData);
    console.log('JSON generado:', projectData);

    // Cerrar el modal y limpiar el formulario
    setShowNewProjectModal(false);
    setProjectName('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setRoles([{ role: '', quantity: 1 }]);
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
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-bold rounded-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Proyecto</span>
        </button>
      </div>

      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 max-w-2xl w-full mx-4 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-red-600">Nuevo Proyecto</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-2">Nombre del Proyecto</label>
                <input 
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Descripción</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Fecha de Inicio</label>
                  <input 
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Fecha de Fin</label>
                  <input 
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
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
                      className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                      type="number"
                      min="1"
                      value={role.quantity}
                      onChange={(e) => handleRoleChange(index, 'quantity', parseInt(e.target.value))}
                      className="w-20 p-3 bg-gray-50 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeRole(index)}
                      className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all"
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
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-all duration-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded transition-all duration-300"
                >
                  Crear Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mostrar el JSON generado (opcional) */}
      {projectJson && (
        <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded">
          <h3 className="text-lg font-bold mb-2">JSON Generado:</h3>
          <pre className="text-sm text-gray-700">{JSON.stringify(projectJson, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}