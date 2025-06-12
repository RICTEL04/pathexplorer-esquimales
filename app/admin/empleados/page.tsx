"use client"
import {FormEvent, useState, useMemo, useEffect, useRef } from 'react';
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
const SOFT_CATEGORY_ID = '6a8ab048-2033-4a16-a9fa-e2006952af4e';

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
    const [showReportModal, setShowReportModal] = useState(false);
    const [employeeProfile, setEmployeeProfile] = useState<any>(null);
    const [reportText, setReportText] = useState<string | null>(null);
    const [reportLoading, setReportLoading] = useState(false);
    const [reportError, setReportError] = useState<string | null>(null);
    const [experienciaLaboral, setExperienciaLaboral] = useState<any[]>([]);
    const reportRef = useRef<HTMLDivElement>(null);

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
      // 1. Llama a tu API interna
        const response = await fetch('/api/create-employee', { // <-- Cambia aquí
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newEmployee.email,
          password: STANDARD_PASSWORD,
          name: newEmployee.name,
          role: 'employee'
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Error al crear usuario');
      const userId = result.user?.id;
      if (!userId) throw new Error('No se pudo obtener el ID del usuario creado');
      
      const { error: dbError } = await supabase
        .from('Empleado')
        .insert({
          ID_Empleado: userId,
          Nombre: newEmployee.name,
          Rol: newEmployee.position,
          ID_Departamento: newEmployee.department,
          Nivel: newEmployee.level,
          Cargabilidad: 0,
          FechaContratacion: newEmployee.hireDate,
          FechaUltNivel: newEmployee.hireDate,
        });
      
      if (dbError) throw dbError;
      
      // 3. Insertar en la segunda tabla (ejemplo: 'Empleado_Detalles')
      const { error: secondTableError } = await supabase
        .from('Contacto')
        .insert({
          ID_empleado: userId,
          Email: newEmployee.email,
        });
      
      if (secondTableError) throw secondTableError;
  
      // Crear el objeto del nuevo empleado para agregar al estado
      const newEmpleado: Empleado = {
        ID_Empleado: userId,
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

  // Función para obtener el perfil extendido del empleado
  const fetchEmployeeProfile = async (employeeId: string) => {
    // 1. Obtener datos básicos del empleado
    const { data: empleado, error: empleadoError } = await supabase
      .from('Empleado')
      .select(`
        ID_Empleado,
        Nombre,
        Rol,
        Nivel,
        FechaContratacion,
        Departamento:Departamento(ID_Departamento, Nombre),
        Contacto:Contacto(PK_Contacto, Email, Num_Telefono)
      `)
      .eq('ID_Empleado', employeeId)
      .single();

    if (empleadoError) {
      console.error('Error fetching empleado:', empleadoError);
      return {};
    }

    // 2. Obtener metas
    const { data: metas } = await supabase
      .from('Metas')
      .select('Descripcion')
      .eq('ID_Empleado', employeeId);

    // 3. Obtener intereses
    const { data: intereses } = await supabase
      .from('Intereses')
      .select('Descripcion')
      .eq('ID_Empleado', employeeId);

    // 4. Obtener hard skills usando RPC
    const { data: hardSkills, error: hardError } = await supabase
      .rpc('obtener_habilidades_empleado_excluyendo_categoria', {
        p_id_empleado: employeeId,
        p_id_categoria_excluir: SOFT_CATEGORY_ID
      });
    
    if (hardError) {
      console.error('Error fetching hard skills:', hardError);
    }

    // 5. Obtener soft skills usando RPC
    const { data: softSkills, error: softError } = await supabase
      .rpc('obtener_habilidades_por_categoria', {
        p_id_empleado: employeeId,
        p_id_categoria: SOFT_CATEGORY_ID
      });
    console.log('soft Skills:', softSkills);
    if (softError) {
      console.error('Error fetching soft skills:', softError);
    }

    return {
      ...empleado,
      metas: metas?.map(m => m.Descripcion) || [],
      intereses: intereses || [],
      hardSkills: hardSkills || [],
      softSkills: softSkills || [],
    };
  };

    const fetchExperienciaLaboral = async (employeeId: string) => {
      const { data, error } = await supabase
        .rpc('get_employee_history_with_evaluations', { employee_id: employeeId });
    
      if (error) {
        console.error('Error al obtener experiencia laboral:', error);
        return [];
      }
      return data || [];
    };
  const handleOpenReport = async (employee: Empleado) => {
    setSelectedEmployee(employee);
    setShowReportModal(true);
    setReportText(null);
    setReportError(null);
    setReportLoading(true);

    // Trae el perfil extendido
    const profile = await fetchEmployeeProfile(employee.ID_Empleado);
    setEmployeeProfile(profile);

    // Trae la experiencia laboral
    const experiencia = await fetchExperienciaLaboral(employee.ID_Empleado);
    setExperienciaLaboral(experiencia);

    // Llama a la API para generar el reporte
    try {
      const response = await fetch('/api/generateReport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ empleado: profile }),
      });
      if (!response.ok) throw new Error('Error al generar el reporte');
      const data = await response.json();
      setReportText(data.reporte);
    } catch (err: any) {
      setReportError(err.message || 'Error al generar el reporte');
    } finally {
      setReportLoading(false);
    }
  };

  const handleUploadReport = async () => {
    if (!employeeProfile) return;
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4"
      });

      // 1. Logo base64 (coloca aquí el string base64 de tu imagen PNG)
      const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABwgAAAJDCAYAAAAfNECOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDQzRUEzQjUyRkEzMTFFOUI5NzdEMjkxM0M5MzU1OTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDQzRUEzQjQyRkEzMTFFOUI5NzdEMjkxM0M5MzU1OTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4M2E4ZTE0NS02N2YzLTY3NDEtYjM4Mi0zZWE0OGQ3MmU0ODEiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4M2E4ZTE0NS02N2YzLTY3NDEtYjM4Mi0zZWE0OGQ3MmU0ODEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+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AAAAAADykCAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIBEJQgAAAAAAAEhEghAAAAAAAAASkSAEAAAAAACARCQIAQAAAAAAIJH/L8AADyjLN50rdN0AAAAASUVORK5CYII="; // <-- Pega aquí el string base64 de tu logo

      // 2. Fecha actual
      const now = new Date();
      const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      const mesAnio = `${meses[now.getMonth()]} ${now.getFullYear()}`;

      let y = 40;

      // 3. Logo en esquina superior derecha (ajusta tamaño y posición según tu logo)
      doc.addImage(logoBase64, 'PNG', 470, 20, 90, 40);

      // 4. Título con mes y año
      doc.setFontSize(22);
      doc.setTextColor(40, 40, 80);
      doc.text(`Reporte de Empleado (${mesAnio})`, 40, y);

      y += 18;
      doc.setDrawColor(120, 120, 180);
      doc.line(40, y, 555, y);
      y += 18;

      doc.setFontSize(13);
      doc.setTextColor(30, 30, 30);

      // Datos generales
      y = printMultiline(doc, `ID: ${employeeProfile.ID_Empleado}`, 40, y, 500, 18);
      y = printMultiline(doc, `Nombre: ${employeeProfile.Nombre}`, 40, y, 500, 18);
      y = printMultiline(doc, `Email: ${employeeProfile.Contacto?.[0]?.Email || 'N/A'}`, 40, y, 500, 18);
      y = printMultiline(doc, `Rol: ${employeeProfile.Rol}`, 40, y, 500, 18);
      y = printMultiline(doc, `Departamento: ${employeeProfile.Departamento?.Nombre || 'N/A'}`, 40, y, 500, 18);
      y = printMultiline(doc, `Fecha de Contratación: ${employeeProfile.FechaContratacion ? new Date(employeeProfile.FechaContratacion).toLocaleDateString() : 'N/A'}`, 40, y, 500, 18);
      y = printMultiline(doc, `Nivel: ${employeeProfile.Nivel}`, 40, y, 500, 18);

      y += 10;
      doc.setFontSize(14);
      doc.setTextColor(60, 60, 120);
      y = printMultiline(doc, "Metas:", 40, y, 500, 18);
      doc.setFontSize(12);
      doc.setTextColor(30, 30, 30);
      y = printMultiline(doc, employeeProfile.metas?.length ? employeeProfile.metas.join(", ") : 'N/A', 60, y, 480, 16);

      y += 6;
      doc.setFontSize(14);
      doc.setTextColor(60, 60, 120);
      y = printMultiline(doc, "Intereses:", 40, y, 500, 18);
      doc.setFontSize(12);
      doc.setTextColor(30, 30, 30);
      y = printMultiline(doc, employeeProfile.intereses?.length ? employeeProfile.intereses.map((i: { Descripcion: string }) => i.Descripcion).join(", ") : 'N/A', 60, y, 480, 16);

      y += 6;
      doc.setFontSize(14);
      doc.setTextColor(60, 60, 120);
      y = printMultiline(doc, "Hard Skills:", 40, y, 500, 18);
      doc.setFontSize(12);
      doc.setTextColor(30, 30, 30);
      y = printMultiline(doc, employeeProfile.hardSkills?.length ? employeeProfile.hardSkills.map((h: { nombre: string }) => h.nombre).join(", ") : 'N/A', 60, y, 480, 16);

      y += 6;
      doc.setFontSize(14);
      doc.setTextColor(60, 60, 120);
      y = printMultiline(doc, "Soft Skills:", 40, y, 500, 18);
      doc.setFontSize(12);
      doc.setTextColor(30, 30, 30);
      y = printMultiline(doc, employeeProfile.softSkills?.length ? employeeProfile.softSkills.map((s: { nombre_habilidad: string }) => s.nombre_habilidad).join(", ") : 'N/A', 60, y, 480, 16);

      // Experiencia Laboral
      y += 12;
      doc.setFontSize(15);
      doc.setTextColor(80, 80, 160);
      y = printMultiline(doc, "Experiencia Laboral:", 40, y, 500, 20);
      doc.setFontSize(12);
      doc.setTextColor(30, 30, 30);

      if (experienciaLaboral.length === 0) {
        y = printMultiline(doc, "Sin experiencia registrada.", 60, y, 480, 16);
      } else {
        experienciaLaboral.forEach((exp: any) => {
          y += 6;
          doc.setFont("helvetica", "bold");
          y = printMultiline(
            doc,
            `${exp.nombre_position} en ${exp.nombre_empresa} — ${exp.fecha_inicio ? new Date(exp.fecha_inicio).toLocaleDateString() : "?"} a ${exp.currentjob ? "Actualidad" : (exp.fecha_final ? new Date(exp.fecha_final).toLocaleDateString() : "?")}`,
            60, y, 480, 16
          );
          doc.setFont("helvetica", "normal");
          if (exp.descripcion) {
            doc.setFontSize(11);
            y = printMultiline(doc, exp.descripcion, 70, y, 460, 14);
            doc.setFontSize(12);
          }
          // Evaluaciones
          if (exp.evaluaciones && exp.evaluaciones.length > 0) {
            exp.evaluaciones.forEach((ev: any) => {
              y = printMultiline(doc, `  Evaluación:`, 70, y, 460, 14);
              y = printMultiline(doc, `    Calificación: ${ev.calificacion ?? 'N/A'}`, 80, y, 440, 14);
              y = printMultiline(doc, `    Fortalezas: ${ev.fortalezas ?? 'N/A'}`, 80, y, 440, 14);
              y = printMultiline(doc, `    Áreas de Mejora: ${ev.areas_mejora ?? 'N/A'}`, 80, y, 440, 14);
            });
          }
          y += 4;
          // Línea divisoria entre experiencias
          doc.setDrawColor(220, 220, 220);
          doc.line(60, y, 540, y);
          y += 4;
        });
      }

      // Reporte IA
      if (reportText) {
        y += 14;
        doc.setFontSize(14);
        doc.setTextColor(80, 80, 160);
        y = printMultiline(doc, "Reporte IA:", 40, y, 500, 20);
        doc.setFontSize(11);
        doc.setTextColor(30, 30, 30);
        y = printMultiline(doc, reportText, 60, y, 480, 16);
        doc.setFontSize(12);
      }

      // Convierte el PDF a blob
      const pdfBlob = doc.output('blob');

      // Sube el PDF a Supabase Storage
      const fileName = `${employeeProfile.ID_Empleado}/reporte_${employeeProfile.ID_Empleado}_${Date.now()}.pdf`;
      const { data, error } = await supabase.storage
        .from('reportes')
        .upload(fileName, pdfBlob, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'application/pdf'
        });

      if (error) {
        alert('Error al subir el PDF: ' + error.message);
      } else {
        alert('Reporte subido correctamente al bucket "reportes".');
      }
    } catch (err: any) {
      alert('Error al generar o subir el PDF: ' + err.message);
    }
  };

  // --- Pega la función printMultiline fuera del componente ---
  function printMultiline(doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const pageHeight = doc.internal.pageSize.getHeight();
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line: string) => {
      if (y > pageHeight - 40) { // 40 es el margen inferior
      doc.addPage();
      y = 40;
      }
      doc.text(line, x, y);
      y += lineHeight;
    });
    return y;
  }

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
            className="bg-gradient-to-r from-violet-700 to-fuchsia-600 hover:from-violet-800 hover:to-fuchsia-700 text-white px-4 py-2 rounded-lg flex items-center"
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capability</th>
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
                              href={`/admin/empleados/${employee.ID_Empleado}`}
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
                                setSelectedEmployee(employee);
                                await checkRoles(employee.ID_Empleado);
                                setShowRoleModal(true);
                              }} 
                              className="text-purple-600 hover:text-purple-900"
                              title="Cambiar rol"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </button>

                            {/* Botón para generar reporte */}
                            <button
                              className="text-green-600 hover:text-green-900"
                              title="Generar reporte"
                              type="button"
                              onClick={() => handleOpenReport(employee)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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
                              ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
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
                onChange={(e) => {
                    const value = e.target.value;
                    // Permite vacío o números del 1 al 12
                    if (
                        value === "" ||
                        (/^\d{1,2}$/.test(value) && Number(value) >= 1 && Number(value) <= 12)
                    ) {
                        handleInputChange(e);
                    }
                }}
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
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
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
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] p-6 overflow-y-auto">
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
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
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
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
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
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
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
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
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
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para reporte de empleado */}
      {showReportModal && employeeProfile && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col p-8 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Reporte de Empleado</h2>
              <button
                onClick={handleUploadReport}
                className="ml-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Subir reporte
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setEmployeeProfile(null);
                  setReportText(null);
                  setReportError(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div ref={reportRef} className="flex-1 overflow-y-auto space-y-2 pr-2" style={{ background: "#fff", color: "#222" }} >
              <div><span className="font-semibold">ID:</span> {employeeProfile.ID_Empleado}</div>
              <div><span className="font-semibold">Nombre:</span> {employeeProfile.Nombre}</div>
              <div><span className="font-semibold">Email:</span> {employeeProfile.Contacto?.[0]?.Email || 'N/A'}</div>
              <div><span className="font-semibold">Rol:</span> {employeeProfile.Rol}</div>
              <div><span className="font-semibold">Departamento:</span> {employeeProfile.Departamento?.Nombre || 'N/A'}</div>
              <div><span className="font-semibold">Fecha de Contratación:</span> {employeeProfile.FechaContratacion ? new Date(employeeProfile.FechaContratacion).toLocaleDateString() : 'N/A'}</div>
              <div><span className="font-semibold">Nivel:</span> {employeeProfile.Nivel}</div>
              <div>
                <span className="font-semibold">Metas:</span> {employeeProfile.metas?.length ? employeeProfile.metas.join(", ") : 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Intereses:</span> {employeeProfile.intereses?.length ? employeeProfile.intereses.map((i: { Descripcion: string }) => i.Descripcion).join(", ") : 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Hard Skills:</span> {employeeProfile.hardSkills?.length ? employeeProfile.hardSkills.map((h: { nombre: string }) => h.nombre).join(", ") : 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Soft Skills:</span> {employeeProfile.softSkills?.length ? employeeProfile.softSkills.map((s: { nombre_habilidad: string }) => s.nombre_habilidad).join(", ") : 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Experiencia Laboral:</span>
                {experienciaLaboral.length === 0 ? (
                  <div className="text-gray-500">Sin experiencia registrada.</div>
                ) : (
                  <ul className="list-disc ml-5 space-y-1">
                    {experienciaLaboral.map((exp) => (
                      <li key={exp.id}>
                        <span className="font-semibold">{exp.nombre_position}</span> en <span className="font-semibold">{exp.nombre_empresa}</span>
                        {" — "}
                        {exp.fecha_inicio ? new Date(exp.fecha_inicio).toLocaleDateString() : "?"}
                        {" a "}
                        {exp.currentjob ? "Actualidad" : (exp.fecha_final ? new Date(exp.fecha_final).toLocaleDateString() : "?")}
                        {exp.descripcion && (
                          <div className="text-gray-600 text-sm">{exp.descripcion}</div>
                        )}
                        {/* Evaluaciones */}
                        {exp.evaluaciones && exp.evaluaciones.length > 0 && (
                          <div className="text-xs text-gray-700 ml-2">
                            <div>Evaluación:</div>
                            {exp.evaluaciones.map((ev: any, idx: number) => (
                              <div key={idx}>
                                Calificación: {ev.calificacion ?? 'N/A'}<br />
                                Fortalezas: {ev.fortalezas ?? 'N/A'}<br />
                                Áreas de Mejora: {ev.areas_mejora ?? 'N/A'}
                              </div>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <span className="font-semibold">Reporte IA:</span>
                {reportLoading && <div className="text-blue-600">Generando reporte...</div>}
                {reportError && <div className="text-red-600">{reportError}</div>}
                {reportText && (
                  <div className="mt-2 p-3 bg-gray-100 rounded text-gray-800 whitespace-pre-line">
                    {reportText}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}