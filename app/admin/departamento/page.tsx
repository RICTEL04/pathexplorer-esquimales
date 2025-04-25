"use client"
import { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type DepartamentoConLead = {
  ID_Departamento: string;
  Nombre: string;
  Descripcion: string | null;
  Empleado_Encargado: string | null;
  ID_Empleado_Encargado?: string | null;
};

type Departamento = {
  ID_Departamento: string;
  Nombre: string;
  Descripcion: string | null;
};

type EmpleadoOption = {
  ID_Empleado: string;
  Nombre: string;
};

export default function DepartmentManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departamentos, setDepartamentos] = useState<DepartamentoConLead[]>([]);
  const [empleadosOptions, setEmpleadosOptions] = useState<EmpleadoOption[]>([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState<string | null>(null);
  const [initialEditValues, setInitialEditValues] = useState<DepartamentoConLead | null>(null);

  const [nuevoDepartamento, setNuevoDepartamento] = useState<Omit<Departamento, 'ID_Departamento'>>({
    Nombre: '',
    Descripcion: ''
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [departamentoEdit, setDepartamentoEdit] = useState<DepartamentoConLead | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [departmentToDelete, setDepartmentToDelete] = useState<DepartamentoConLead | null>(null);

  // Cargar departamentos al montar el componente
  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('Departamento')
          .select(`
            ID_Departamento,
            Nombre,
            Descripcion,
            Capability_Lead(
              ID_Empleado,
              Empleado:ID_Empleado (Nombre)
            )
          `)
          .order('Nombre', { ascending: true });
    
        if (error) throw error;
    
        // Procesamos para extraer el nombre del lead
        const departamentosConLead: DepartamentoConLead[] = (data || []).map((d: any) => ({
          ID_Departamento: d.ID_Departamento,
          Nombre: d.Nombre,
          Descripcion: d.Descripcion,
          Empleado_Encargado: d.Capability_Lead?.Empleado?.Nombre || null,
          ID_Empleado_Encargado: d.Capability_Lead?.ID_Empleado || null
        }));
    
        setDepartamentos(departamentosConLead);
      } catch (error) {
        console.error('Error cargando departamentos:', error);
        setMessage({ type: 'error', content: 'Error al cargar departamentos' });
      } finally {
        setLoading(false);
      }
    };
    
    const fetchEmpleadosDisponibles = async () => {
      try {
        const { data, error } = await supabase
          .from('Capability_Lead')
          .select('ID_Empleado, Empleado:ID_Empleado(Nombre)')
          .is('ID_Departamento', null);

        if (error) throw error;

        const options = data?.map((item: any) => ({
          ID_Empleado: item.ID_Empleado,
          Nombre: item.Empleado.Nombre
        })) || [];

        setEmpleadosOptions(options);
      } catch (error) {
        console.error('Error cargando empleados disponibles:', error);
      }
    };

    fetchDepartamentos();
    fetchEmpleadosDisponibles();
  }, []);

  // Filtrar departamentos
  const departamentosFiltrados = useMemo(() => {
    return departamentos.filter(dept => {
      const nombre = dept.Nombre?.toLowerCase() || '';
      const Capability = dept.Empleado_Encargado?.toLowerCase() || '';
      const busqueda = searchTerm.toLowerCase();
      
      return nombre.includes(busqueda) || Capability.includes(busqueda);
    });
  }, [departamentos, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNuevoDepartamento(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
      // Insertar el nuevo departamento
      const { data, error } = await supabase
        .from('Departamento')
        .insert([{
          Nombre: nuevoDepartamento.Nombre,
          Descripcion: nuevoDepartamento.Descripcion
        }])
        .select();
      
      if (error) throw error;

      if (data && data[0]) {
        // Actualizar el estado local con el nuevo departamento
        setDepartamentos(prev => [data[0], ...prev]);
      }

      setMessage({ 
        type: 'success', 
        content: 'Departamento creado exitosamente' 
      });
      
      // Resetear formulario
      setTimeout(() => {
        setNuevoDepartamento({
          Nombre: '',
          Descripcion: ''
        });
        setShowModal(false);
      }, 2000);

    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        content: error.message || 'Error al crear departamento' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Modifica la función handleEdit para guardar los valores iniciales
const handleEdit = (dept: DepartamentoConLead) => {
  setDepartamentoEdit({
    ...dept,
    ID_Departamento: dept.ID_Departamento,
    Nombre: dept.Nombre,
    Descripcion: dept.Descripcion,
    Empleado_Encargado: dept.Empleado_Encargado || null,
    ID_Empleado_Encargado: dept.ID_Empleado_Encargado || null
  });
  setSelectedEmpleado(dept.ID_Empleado_Encargado || null);
  
  // Guarda los valores iniciales
  setInitialEditValues({
    ...dept,
    ID_Departamento: dept.ID_Departamento,
    Nombre: dept.Nombre,
    Descripcion: dept.Descripcion,
    Empleado_Encargado: dept.Empleado_Encargado || null,
    ID_Empleado_Encargado: dept.ID_Empleado_Encargado || null
  });
  
  setEditModalOpen(true);
};

// Función para verificar si hay cambios
const hasChanges = () => {
  if (!departamentoEdit || !initialEditValues) return false;
  
  return (
    departamentoEdit.Nombre !== initialEditValues.Nombre ||
    departamentoEdit.Descripcion !== initialEditValues.Descripcion ||
    selectedEmpleado !== initialEditValues.ID_Empleado_Encargado
  );
};



const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!departamentoEdit) return;

  setLoading(true);
  setMessage({ type: '', content: '' });

  try {
    // Validación básica
    if (departamentoEdit.ID_Departamento === null) {
      throw new Error('ID de departamento inválido');
    }

    // 1. Actualizar el departamento en la base de datos
    const { data: updatedDept, error: deptError } = await supabase
      .from('Departamento')
      .update({
        Nombre: departamentoEdit.Nombre,
        Descripcion: departamentoEdit.Descripcion,
      })
      .eq('ID_Departamento', departamentoEdit.ID_Departamento)
      .select()
      .single();

    if (deptError) throw deptError;
    if (!updatedDept) throw new Error('No se recibieron datos actualizados');

    // 2. Obtener el nombre del nuevo empleado encargado (si se seleccionó uno)
    let nombreEmpleadoEncargado = null;
    if (selectedEmpleado) {
      const { data: empleadoData, error: empleadoError } = await supabase
        .from('Empleado')
        .select('Nombre')
        .eq('ID_Empleado', selectedEmpleado)
        .single();

      if (!empleadoError) {
        nombreEmpleadoEncargado = empleadoData.Nombre;
      }
    }

    // 3. Actualizar el estado local con los nuevos datos
    setDepartamentos(prev => prev.map(dept => 
      dept.ID_Departamento === departamentoEdit.ID_Departamento 
        ? { 
            ...dept, 
            Nombre: updatedDept.Nombre,
            Descripcion: updatedDept.Descripcion,
            ID_Empleado_Encargado: selectedEmpleado,
            Empleado_Encargado: nombreEmpleadoEncargado || null
          } 
        : dept
    ));

    setMessage({
      type: 'success', 
      content: 'Departamento actualizado exitosamente' 
    });

    // Cerrar el modal después de 1 segundo
    setTimeout(() => {
      setEditModalOpen(false);
      setInitialEditValues(null);
      setLoading(false);
    }, 1000);

  } catch (error: any) {
    setMessage({ 
      type: 'error', 
      content: error.message || 'Error al actualizar departamento' 
    });
    setLoading(false);
  }
};

  const handleDelete = async () => {
    if (!departmentToDelete) return;
  
    setLoading(true);
    setMessage({ type: '', content: '' });
  
    try {
      // First, check if there are any employees in this department
      const { count, error: countError } = await supabase
        .from('Empleado')
        .select('*', { count: 'exact' })
        .eq('ID_Departamento', departmentToDelete.ID_Departamento);
  
      if (countError) throw countError;
  
      if (count && count > 0) {
        throw new Error('No se puede eliminar el departamento porque tiene empleados asignados.');
      }
  
      // If no employees, proceed with deletion
      const { error } = await supabase
        .from('Departamento')
        .delete()
        .eq('ID_Departamento', departmentToDelete.ID_Departamento);
  
      if (error) throw error;
  
      // Update local state
      setDepartamentos(prev => 
        prev.filter(dept => dept.ID_Departamento !== departmentToDelete.ID_Departamento)
      );
  
      setMessage({ 
        type: 'success', 
        content: 'Departamento eliminado exitosamente' 
      });
  
      setTimeout(() => {
        setDeleteModalOpen(false);
        setDepartmentToDelete(null);
      }, 2000);
  
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        content: error.message || 'Error al eliminar departamento' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Administración de Capabilities</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Capabilities</h1>
            <p className="text-gray-600 mt-1">
              Total de capabilities: <span className="font-semibold">{departamentos.length}</span>
              {searchTerm && (
                <span className="ml-2">
                  (Mostrando {departamentosFiltrados.length} resultados)
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-violet-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nuevo Capability
          </button>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar capabilities..."
              className="text-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabla de departamentos */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {loading && departamentos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Cargando capabilities...</div>
          ) : departamentosFiltrados.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {departamentos.length === 0 ? 'No hay departamentos registrados' : 'No se encontraron departamentos que coincidan con la búsqueda.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capability lead</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {departamentosFiltrados.map((dept) => (
                    <tr key={dept.ID_Departamento}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.Nombre}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{dept.Descripcion || 'Sin descripción'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {dept.Empleado_Encargado || 'Sin Asignar'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => handleEdit(dept)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => {
                            setDepartmentToDelete(dept);
                            setDeleteModalOpen(true);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal para nuevo departamento */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-950/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Crear Nuevo Departamento</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre">
                    Nombre del Departamento*
                  </label>
                  <input
                    type="text"
                    id="Nombre"
                    name="Nombre"
                    value={nuevoDepartamento.Nombre}
                    onChange={handleInputChange}
                    className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Descripcion">
                    Descripción
                  </label>
                  <textarea
                    id="Descripcion"
                    name="Descripcion"
                    value={nuevoDepartamento.Descripcion || ''}
                    onChange={handleInputChange}
                    rows={3}
                    className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {message.content && (
                  <div className={`mb-4 p-3 rounded-md ${
                    message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {message.content}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? 'Creando...' : 'Crear Departamento'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar departamento */}
      {editModalOpen && departamentoEdit && (
        <div className="fixed inset-0 bg-gray-950/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Editar Departamento</h2>
                <button 
                  onClick={() => setEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-Nombre">
                    Nombre del Departamento*
                  </label>
                  <input
                    type="text"
                    id="edit-Nombre"
                    name="Nombre"
                    value={departamentoEdit.Nombre}
                    onChange={(e) => setDepartamentoEdit({...departamentoEdit, Nombre: e.target.value})}
                    className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-Descripcion">
                    Descripción
                  </label>
                  <textarea
                    id="edit-Descripcion"
                    name="Descripcion"
                    value={departamentoEdit.Descripcion || ''}
                    onChange={(e) => setDepartamentoEdit({...departamentoEdit, Descripcion: e.target.value})}
                    rows={3}
                    className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-Empleado">
                    Capability Lead
                  </label>
                  <select
                    id="edit-Empleado"
                    value={selectedEmpleado || ''}
                    onChange={(e) => setSelectedEmpleado(e.target.value || null)}
                    className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{departamentoEdit.Empleado_Encargado}</option>
                    {empleadosOptions.map((empleado) => (
                      <option key={empleado.ID_Empleado} value={empleado.ID_Empleado}>
                        {empleado.Nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {message.content && (
                  <div className={`mb-4 p-3 rounded-md ${
                    message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {message.content}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading || !hasChanges()}
                  >
                    {loading ? 'Actualizando...' : 'Actualizar Departamento'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Modal de confirmación para eliminar */}
{deleteModalOpen && departmentToDelete && (
  <div className="fixed inset-0 bg-gray-950/70 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Confirmar Eliminación</h2>
          <button 
            onClick={() => {
              setDeleteModalOpen(false);
              setDepartmentToDelete(null);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">
            ¿Estás seguro que deseas eliminar el departamento <span className="font-semibold">"{departmentToDelete.Nombre}"</span>?
          </p>
          {departmentToDelete.Empleado_Encargado && (
            <p className="text-red-600 mt-2">
              Advertencia: Este departamento tiene asignado un Capability Lead ({departmentToDelete.Empleado_Encargado}). 
              El empleado quedará sin departamento asignado.
            </p>
          )}
        </div>

        {message.content && (
          <div className={`mb-4 p-3 rounded-md ${
            message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message.content}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setDeleteModalOpen(false);
              setDepartmentToDelete(null);
            }}
            className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Eliminando...' : 'Sí, Eliminar'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}