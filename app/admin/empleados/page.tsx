"use client"
import {FormEvent, useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'
import { getEmpleados } from "@/lib/getempleadoAdmin";
import { handleTalentLeadActions } from "@/lib/insertTalentLead";
import { handleCapabilityLeadActions } from "@/lib/insertCapabilityLead";
import { handleDeliveryLeadActions } from "@/lib/insertDeliveryLead";
import { handlePeopleLeadActions } from "@/lib/insertPeopleLead";
import Link from "next/link";
import { handleRemovePeopleLead, handleRemoveCapabilityLead, handleRemoveDeliveryLead, handleRemoveTalentLead  } from "@/lib/removeRoles";

type NewEmployee = {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  hireDate: string;
  level: string;
};

interface Empleado {
  ID_Empleado: string;
  Nombre: string;
  Contacto: Contacto[];
  Rol: string;
  Departamento: Departamento[];
  FechaContratacion: string;
  Nivel: string;
};

interface Contacto {
  PK_Contacto: string;
  Email: string;
  Num_Telefono: number;
}

interface Departamento {
  ID_Departamento?: string;
  Nombre: string;
}

const STANDARD_PASSWORD = "password123"; // Contraseña estándar

export default function EmployeeManagement() {
    const router = useRouter();
    const [departments, setDepartments] = useState<Departamento[]>([]);
    const [employees, setEmpleado] = useState<Empleado[]>([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(15);

    // Agrega estos estados al componente
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Empleado | null>(null);
    const [roles, setRoles] = useState({
      peopleLead: false,
      capabilityLead: false,
      deliveryLead: false,
      talentLead: false
    });
    const [initialRoles, setInitialRoles] = useState({
      peopleLead: false,
      capabilityLead: false,
      deliveryLead: false,
      talentLead: false
    });

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

      const fetchEmpleados = async () => {
        try {
          const data: Empleado[] = await getEmpleados();
          setEmpleado(data);
        } catch (err) {
          console.error('Error fetching Empleados:', err);
          setError(
            err instanceof Error 
              ? err.message 
              : 'Failed to load employees'
          );
        }
      };
  
      fetchDepartments();
      fetchEmpleados();
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
    

  // Filtrar empleados basado en el término de búsqueda
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee =>
      employee.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // Buscar en los emails de los contactos
      employee.Contacto.some(contacto => 
        contacto.Email.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      employee.Rol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // Buscar en los nombres de los departamentos
      employee.Departamento.some(departamento => 
        departamento.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [employees, searchTerm]);

  // Obtener empleados actuales para la página
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Cambiar página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });
  
    try {
      // 1. Registrar el usuario en Auth
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
  
      // 2. Insertar el empleado en la tabla Empleado
      const { error: dbError } = await supabase
        .from('Empleado')
        .insert({
          ID_Empleado: authData.user?.id,
          Nombre: newEmployee.name,
          Rol: newEmployee.position,
          ID_Departamento: newEmployee.department,
          Nivel: newEmployee.level,
          Cargabilidad: "0%",
          FechaContratacion: newEmployee.hireDate,
          FechaUltNivel: newEmployee.hireDate,
        });
      
      if (dbError) throw dbError;
  
      // 3. Insertar en la segunda tabla (ejemplo: 'Empleado_Detalles')
      const { error: secondTableError } = await supabase
        .from('Contacto')
        .insert({
          ID_empleado: authData.user?.id,
          Email: newEmployee.email,
        });
      
      if (secondTableError) throw secondTableError;
  
      // Crear el objeto del nuevo empleado para agregar al estado
      const newEmpleado: Empleado = {
        ID_Empleado: authData.user?.id || '',
        Nombre: newEmployee.name,
        Contacto: [{
          PK_Contacto: '', // Aquí deberías poner el ID real si lo necesitas
          Email: newEmployee.email,
          Num_Telefono: 0 // Añade el número si es necesario
        }],
        Rol: newEmployee.position,
        Departamento: departments.filter(d => d.ID_Departamento === newEmployee.department),
        FechaContratacion: newEmployee.hireDate,
        Nivel: newEmployee.level
      };
  
      // Actualizar el estado de empleados
      setEmpleado(prev => [...prev, newEmpleado]);
  
      setMessage({ 
        type: 'success', 
        content: 'Empleado registrado exitosamente en todas las tablas. Contraseña estándar asignada.' 
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

  // Modifica la función handleSaveRoles para manejar cambios individuales
const handleSaveRoles = async () => {
  if (!selectedEmployee || !hasRoleChanges()) return;

  try {
    // Verificar cambios individuales para cada rol
    if (roles.peopleLead !== initialRoles.peopleLead) {
      if (roles.peopleLead) {
        await handlePeopleLeadActions(selectedEmployee.ID_Empleado);
      } else {
        await handleRemovePeopleLead(selectedEmployee.ID_Empleado); // Necesitarías implementar esta función
      }
    }

    if (roles.capabilityLead !== initialRoles.capabilityLead) {
      if (roles.capabilityLead) {
        await handleCapabilityLeadActions(selectedEmployee.ID_Empleado);
      } else {
        await handleRemoveCapabilityLead(selectedEmployee.ID_Empleado);
      }
    }

    if (roles.deliveryLead !== initialRoles.deliveryLead) {
      if (roles.deliveryLead) {
        await handleDeliveryLeadActions(selectedEmployee.ID_Empleado);
      } else {
        await handleRemoveDeliveryLead(selectedEmployee.ID_Empleado);
      }
    }

    if (roles.talentLead !== initialRoles.talentLead) {
      if (roles.talentLead) {
        await handleTalentLeadActions(selectedEmployee.ID_Empleado);
      } else {
        await handleRemoveTalentLead(selectedEmployee.ID_Empleado);
      }
    }

    // Actualizar los roles iniciales solo con los que cambiaron
    setInitialRoles(roles);
    setShowRoleModal(false);
    alert('Roles actualizados correctamente');

  } catch (error) {
    console.error('Error al actualizar roles:', error);
    alert('Error al actualizar roles');
    // Opcional: Revertir los cambios en el estado si falla
    setRoles(initialRoles);
  }
};


  const checkRoles = async (employeeId:string) => {
    try {
      // Buscar en Supabase si el empleado tiene cada rol
      const { data: peopleLeadData } = await supabase
        .from('People_lead') // o la tabla donde guardas los roles
        .select('*')
        .eq('ID_Empleado', employeeId)
        .single();
  
      const { data: capabilityLeadData } = await supabase
        .from('Capability_Lead')
        .select('*')
        .eq('ID_Empleado', employeeId)
        .single();
  
      const { data: deliveryLeadData } = await supabase
        .from('Delivery_Lead')
        .select('*')
        .eq('ID_Empleado', employeeId)
        .single();
  
      const { data: talentLeadData } = await supabase
        .from('Talent_Lead')
        .select('*')
        .eq('ID_Empleado', employeeId)
        .single();
  
      // Actualizar el estado de roles
      setRoles({
        peopleLead: peopleLeadData !== null,
        capabilityLead: capabilityLeadData !== null,
        deliveryLead: deliveryLeadData !== null,
        talentLead: talentLeadData !== null
      });

      const currentRoles = {
        peopleLead: peopleLeadData !== null,
        capabilityLead: capabilityLeadData !== null,
        deliveryLead: deliveryLeadData !== null,
        talentLead: talentLeadData !== null
      };

      setRoles(currentRoles);
      setInitialRoles(currentRoles); // Guarda los roles iniciales
  
    } catch (error) {
      console.error("Error al verificar roles:", error);
    }
  };

  const hasRoleChanges = () => {
    return (
      roles.peopleLead !== initialRoles.peopleLead ||
      roles.capabilityLead !== initialRoles.capabilityLead ||
      roles.deliveryLead !== initialRoles.deliveryLead ||
      roles.talentLead !== initialRoles.talentLead
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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
            className="bg-violet-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
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
              className="text-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <>
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
                    {currentEmployees.map((employee) => (
                      <tr key={employee.ID_Empleado}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.Nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.Contacto[0]?.Email || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.Rol}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.Departamento[0]?.Nombre || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(employee.FechaContratacion).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.Nivel}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            {/* Icono para editar usuario */}
                            <Link 
                              href={`/admin/empleados/${employee.ID_Empleado}`} // Reemplaza con tu ruta real
                              className="text-blue-600 hover:text-blue-900"
                              title="Editar usuario"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </Link>
                            
                            {/* Icono para modificar rol */}
                            <button 
                              onClick={async() => {
                                setSelectedEmployee(employee); // Guarda el empleado seleccionado
                                await checkRoles(employee.ID_Empleado); // Verificar roles primero
                                setShowRoleModal(true)
                              }} 
                              className="text-purple-600 hover:text-purple-900"
                              title="Cambiar rol"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Paginación */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">{indexOfFirstEmployee + 1}</span> a{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastEmployee, filteredEmployees.length)}
                      </span>{' '}
                      de <span className="font-medium">{filteredEmployees.length}</span> resultados
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="sr-only">Anterior</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => paginate(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === index + 1
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="sr-only">Siguiente</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </>
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
      {/* Modal para modificar roles - Con funcionalidad completa */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-gray-950/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Modificar Roles</h2>
                <button 
                  onClick={() => setShowRoleModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 mb-2">
                  Seleccionar roles para: 
                  <span className="font-semibold">
                    {selectedEmployee ? selectedEmployee.Nombre : 'Nombre del Empleado'}
                  </span>
                </p>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="role-capability"
                      checked={roles.peopleLead}
                      onChange={() => setRoles({...roles, peopleLead: !roles.peopleLead})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="role-capability" className="ml-2 block text-sm text-gray-700">
                    People Lead
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="role-delivery"
                      checked={roles.capabilityLead}
                      onChange={() => setRoles({...roles, capabilityLead: !roles.capabilityLead})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="role-delivery" className="ml-2 block text-sm text-gray-700">
                    Capability Lead
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="role-people"
                      checked={roles.deliveryLead}
                      onChange={() => setRoles({...roles, deliveryLead: !roles.deliveryLead})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="role-people" className="ml-2 block text-sm text-gray-700">
                    Delivery Lead
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="role-talent"
                      checked={roles.talentLead}
                      onChange={() => setRoles({...roles, talentLead: !roles.talentLead})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="role-talent" className="ml-2 block text-sm text-gray-700">
                      Talent Lead
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowRoleModal(false)}
                  className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveRoles}
                  disabled={!hasRoleChanges()}
                  className={`px-4 py-2 rounded-md ${
                    hasRoleChanges() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}