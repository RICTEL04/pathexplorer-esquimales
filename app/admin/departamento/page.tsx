"use client"
import { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Departamento = {
  ID_Departamento: string;
  Nombre: string;
  Descripcion: string | null;
};

export default function DepartmentManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

  const [nuevoDepartamento, setNuevoDepartamento] = useState<Omit<Departamento, 'ID_Departamento'>>({
    Nombre: '',
    Descripcion: ''
  });

  // Cargar departamentos al montar el componente
  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('Departamento')
          .select('*')
          .order('Nombre', { ascending: true });
        
        if (error) throw error;
        
        setDepartamentos(data || []);
      } catch (error) {
        console.error('Error cargando departamentos:', error);
        setMessage({ type: 'error', content: 'Error al cargar departamentos' });
      } finally {
        setLoading(false);
      }
    };

    fetchDepartamentos();
  }, []);

  // Filtrar departamentos
  const departamentosFiltrados = useMemo(() => {
    return departamentos.filter(dept => {
      const nombre = dept.Nombre?.toLowerCase() || '';
      const descripcion = dept.Descripcion?.toLowerCase() || '';
      const busqueda = searchTerm.toLowerCase();
      
      return nombre.includes(busqueda) || descripcion.includes(busqueda);
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
                      <td className="px-6 py-4 text-sm text-gray-500">{'Sin Asignar'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
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
    </div>
  );
}