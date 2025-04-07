"use client"
import {FormEvent, useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'

type NewEmployee = {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  hireDate: string;
  level: string;
};

interface Departamento {
  ID_Departamento: string;
  Nombre: string;
}

const STANDARD_PASSWORD = "password123"; // Contraseña estándar

export default function EmployeeManagement() {
    const router = useRouter();
    const [departments, setDepartments] = useState<Departamento[]>([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');

    

    useEffect(() => {
      const fetchDepartments = async () => {
        try {
          setLoading(true);
          
          const { data, error } = await supabase
            .from('Departamento')  // Match your table name
            .select('ID_Departamento, Nombre');
  
          if (error) throw error;
  
          setDepartments(data as Departamento[]);
        } catch (err) {
          console.error('Error fetching departments:', err);
          setError(
            err instanceof Error 
              ? err.message 
              : 'Failed to load departments'
          );
        } finally {
          setLoading(false);
        }
      };
  
      fetchDepartments();
    }, []);

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDepartment(e.target.value);
    };

    const [newEmployee, setNewEmployee] = useState<Omit<NewEmployee, 'id'>>({
        name: '',
        email: '',
        position: '',
        department: '',
        hireDate: '',
        level: ''
    });
    const initialEmployees: NewEmployee[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan.perez@empresa.com',
      position: 'Desarrollador Frontend',
      department: 'Tecnología',
      hireDate: '2022-03-15',
      level: '12'
    },
    {
      id: '2',
      name: 'María García',
      email: 'maria.garcia@empresa.com',
      position: 'Diseñadora UX',
      department: 'Diseño',
      hireDate: '2021-11-20',
      level: '12'
    },
    {
      id: '3',
      name: 'Carlos López',
      email: 'carlos.lopez@empresa.com',
      position: 'Gerente de Proyectos',
      department: 'Operaciones',
      hireDate: '2020-05-10',
      level: '12'
    }
  ];
  const [employees, setEmployees] = useState<NewEmployee[]>(initialEmployees);

  // Filtrar empleados basado en el término de búsqueda
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
    //1. Registrar el usuario en Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newEmployee.email,
        password: STANDARD_PASSWORD,
        options: {
          data: {
            name: newEmployee.name,
            role: 'employee'
          }
        }
      });
    
      if (authError) throw authError;

      // 2. Insertar el empleado en la tabla
      const { error: dbError } = await supabase
        .from('Empleado')
        .insert({
        ID_Empleado: authData.user?.id,
        Nombre: newEmployee.name,
        Rol: newEmployee.position,
        ID_Departamento: newEmployee.department,
        Nivel: newEmployee.level,
        Cargabilidad:"0%",
        FechaContratacion: newEmployee.hireDate,
        FechaUltNivel: newEmployee.hireDate,
        });
      
      if (dbError) throw dbError;

      // 3. Actualizar UI y estado
      setMessage({ 
        type: 'success', 
        content: 'Empleado registrado exitosamente. Contraseña estándar asignada.' 
      });
      
      // Resetear formulario después de 2 segundos
      setTimeout(() => {
        setNewEmployee({
          name: '',
          email: '',
          position: '',
          department: '',
          hireDate: '',
          level: ''
        });
        setShowModal(false);
        router.refresh();
      }, 2000);

    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        content: error.message || 'Error al registrar empleado' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Administración de Empleados</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Empleados</h1>
            <p className="text-gray-600 mt-1">
              Total de empleados: <span className="font-semibold">{employees.length}</span>
              {searchTerm && (
                <span className="ml-2">
                  (Mostrando {filteredEmployees.length} resultados)
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nuevo Empleado
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
              placeholder="Buscar empleados..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabla de empleados */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {filteredEmployees.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No se encontraron empleados que coincidan con la búsqueda.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Contratación</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(employee.hireDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.level}</td>
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

      {/* Modal para nuevo empleado */}
    {showModal && (
    <div className="fixed inset-0 bg-gray-950/70  flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Registrar Nuevo Empleado</h2>
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nombre Completo
                </label>
                <input
                type="text"
                id="name"
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
                </label>
                <input
                type="text"
                id="email"
                name="email"
                value={newEmployee.email}
                onChange={handleInputChange}
                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                Cargo
                </label>
                <input
                type="text"
                id="position"
                name="position"
                value={newEmployee.position}
                onChange={handleInputChange}
                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                Departamento
              </label>
              <select
                id="department"
                name="department"
                value={newEmployee.department}
                onChange={handleInputChange}
                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Seleccione un departamento --</option>
                {departments.map((dept) => (
                  <option key={dept.ID_Departamento} value={dept.ID_Departamento}>
                    {dept.Nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hireDate">
                Fecha de Contratación
                </label>
                <input
                type="date"
                id="hireDate"
                name="hireDate"
                value={newEmployee.hireDate}
                onChange={handleInputChange}
                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
            </div>

            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
                Nivel
            </label>
            <input
                type="text"
                id="level"
                name="level"
                value={newEmployee.level}
                onChange={handleInputChange}
                className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                {loading ? 'Enviando invitación...' : 'Guardar y Enviar Invitación'}
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