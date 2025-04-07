import { useMemo } from 'react';
import { Employee } from './definitions';

// Filtrar empleados basado en el término de búsqueda
export const filterEmployees = (employees: Array<Employee>, searchTerm: string) => {
  return useMemo(() => {
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);
};