"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewProjectPage() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [roles, setRoles] = useState([
  { role: "", quantity: 1, skills: [] as { id: string; name: string; level: 'beginner' | 'intermediate' | 'expert' }[] }
]);

  const [rolesDirty, setRolesDirty] = useState<boolean[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string | undefined;

  // HABILIDADES: Estados y lógica de búsqueda
  const [habilidades, setHabilidades] = useState<{ ID_Habilidad: string; Nombre: string; ID_Categoria: string }[]>([]);
  const [categorias, setCategorias] = useState<{ id: string; Nombre_categoria: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ categorias: any[]; habilidades: any[] }>({ categorias: [], habilidades: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<{ id: string; name: string; level: 'beginner' | 'intermediate' | 'expert' }[]>([]);
  const [deliveryLeads, setDeliveryLeads] = useState<any[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [selectedDeliveryLead, setSelectedDeliveryLead] = useState<any>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [cargabilidad, setCargabilidad] = useState<number | null>(null)
  const [leadSearch, setLeadSearch] = useState("");
  const [leadPage, setLeadPage] = useState(1);
  const leadsPerPage = 5;
  const [clientName, setClientName] = useState("");
  const [showNoLeadModal, setShowNoLeadModal] = useState(false);
  const [originalDeliveryLead, setOriginalDeliveryLead] = useState<any>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalRoleIdx, setModalRoleIdx] = useState<number | null>(null);
  const [modalSkillSearch, setModalSkillSearch] = useState('');

  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [imageDragActive, setImageDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);
  const [isDeletingImage, setIsDeletingImage] = useState(false);
  const [showRoleSuccessModal, setShowRoleSuccessModal] = useState(false);
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [roleToDeleteIdx, setRoleToDeleteIdx] = useState<number | null>(null);
  const [isDeletingRole, setIsDeletingRole] = useState(false);
  const [affectedEmployees, setAffectedEmployees] = useState<{ id: string; nombre: string; cargabilidad: number }[]>([]);
  
  // Nuevo estado para el modal de selección de empleados a eliminar
  const [showSelectEmployeesModal, setShowSelectEmployeesModal] = useState(false);
  const [employeesToRemove, setEmployeesToRemove] = useState<any[]>([]);
  const [selectedEmployeesToRemove, setSelectedEmployeesToRemove] = useState<string[]>([]);
  const [pendingRoleUpdate, setPendingRoleUpdate] = useState<{ idx: number, puestoId: string } | null>(null);
  const [showCargabilidadModal, setShowCargabilidadModal] = useState(false);
  const [empleadosCargabilidad, setEmpleadosCargabilidad] = useState<any[]>([]);
  const [pendingProjectUpdate, setPendingProjectUpdate] = useState<any>(null);
  const [showCargabilidadWarning, setShowCargabilidadWarning] = useState(false);
  const [cargabilidadAnterior, setCargabilidadAnterior] = useState<number | null>(null);

  const [incrementoCargabilidad, setIncrementoCargabilidad] = useState(0);
  
  const sobrepasaCargabilidad = ((Number(selectedDeliveryLead?.Cargabilidad) || 0) + incrementoCargabilidad) > 100;


  const isEditDisabled =
  !projectName.trim() ||
  !clientName.trim() ||
  !cargabilidad ||
  !startDate ||
  !endDate ||
  !selectedDeliveryLead;

  // Mostrar preview al seleccionar imagen
  useEffect(() => {
    if (projectImage) {
      const url = URL.createObjectURL(projectImage);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreview(null);
    }
  }, [projectImage]);

  const handleRoleChange = (index: number, field: string, value: string | number) => {
    const updatedRoles = [...roles];
    updatedRoles[index] = { ...updatedRoles[index], [field]: value };
    setRoles(updatedRoles);
    setRolesDirty(dirty => {
      const copy = [...dirty];
      copy[index] = true;
      return copy;
    });
  };

  const addRole = () => setRoles([...roles, { role: "", quantity: 1, skills: [] }]);
  const removeRole = (index: number) => setRoles(roles.filter((_, i) => i !== index));

  const openSkillModal = (idx: number) => {
  setModalRoleIdx(idx);
  setModalSkillSearch('');
  setModalOpen(true);
};

const closeSkillModal = () => {
  setModalOpen(false);
  setModalRoleIdx(null);
  setModalSkillSearch('');
};

const addSkillToRole = (
  roleIdx: number,
  skill: { id: string; name: string },
  level: 'beginner' | 'intermediate' | 'expert' = 'beginner'
) => {
  setRoles(prev => prev.map((r, i) =>
    i === roleIdx && !r.skills.some(s => s.id === skill.id)
      ? { ...r, skills: [...r.skills, { ...skill, level }] }
      : r
  ));
  setRolesDirty(dirty => {
    const copy = [...dirty];
    copy[roleIdx] = true;
    return copy;
  });
};

const updateSkillLevelInRole = (
  roleIdx: number,
  skillId: string,
  newLevel: 'beginner' | 'intermediate' | 'expert'
) => {
  setRoles(prev => prev.map((r, i) =>
    i === roleIdx
      ? {
          ...r,
          skills: r.skills.map(s =>
            s.id === skillId ? { ...s, level: newLevel } : s
          )
        }
      : r
  ));
  setRolesDirty(dirty => {
    const copy = [...dirty];
    copy[roleIdx] = true;
    return copy;
  });
};

const removeSkillFromRole = (roleIdx: number, skillId: string) => {
  setRoles(prev => prev.map((r, i) =>
    i === roleIdx
      ? { ...r, skills: r.skills.filter(s => s.id !== skillId) }
      : r
  ));
  setRolesDirty(dirty => {
    const copy = [...dirty];
    copy[roleIdx] = true;
    return copy;
  });
};

// Función para guardar cambios de un rol específico
const handleSaveRole = async (idx: number) => {
  if (!projectId) return;
  setIsSubmitting(true);

  try {
    // 1. Buscar el puesto actual en la base de datos
    const { data: puestos, error: puestoError } = await supabase
      .from("Puesto_proyecto")
      .select("id")
      .eq("ID_Proyecto", projectId);

    if (puestoError) throw puestoError;
    let puestoId = puestos?.[idx]?.id;

    // Si no se encontró el puesto, insertarlo
    if (!puestoId) {
      const { data: insertData, error: insertPuestoError } = await supabase
        .from("Puesto_proyecto")
        .insert({
          ID_Proyecto: projectId,
          Puesto: roles[idx].role,
          N_puestos: roles[idx].quantity,
          Completo: false, // Por defecto
        })
        .select("id")
        .single();

      if (insertPuestoError) throw insertPuestoError;
      puestoId = insertData?.id;
      if (!puestoId) throw new Error("No se pudo crear el puesto.");
    }

    // 2. Consultar empleados asignados a este puesto
    const { data: empleadosPuesto, error: empleadosError } = await supabase
      .from("Puesto_persona")
      .select("ID_Empleado")
      .eq("ID_Puesto", puestoId);

    if (empleadosError) throw empleadosError;
    const empleadosAsignados = empleadosPuesto || [];
    const nEmpleados = empleadosAsignados.length;
    const nPuestosNuevo = roles[idx].quantity;

    // 3. Lógica de Completo y eliminación
    if (nPuestosNuevo === nEmpleados) {
      // Marcar completo
      await supabase.from("Puesto_proyecto").update({ Completo: true, N_puestos: nPuestosNuevo, Puesto: roles[idx].role }).eq("id", puestoId);
    } else if (nPuestosNuevo > nEmpleados) {
      // Marcar incompleto
      await supabase.from("Puesto_proyecto").update({ Completo: false, N_puestos: nPuestosNuevo, Puesto: roles[idx].role }).eq("id", puestoId);
    } else if (nPuestosNuevo < nEmpleados) {
      // Abrir modal para seleccionar empleados a eliminar
      // Buscar datos de empleados
      const empleadosIds = empleadosAsignados.map((ep: any) => ep.ID_Empleado);
      const { data: empleados } = await supabase
        .from("Empleado")
        .select("ID_Empleado, Nombre, Cargabilidad")
        .in("ID_Empleado", empleadosIds);

      setEmployeesToRemove(empleados || []);
      setSelectedEmployeesToRemove([]);
      setPendingRoleUpdate({ idx, puestoId });
      setShowSelectEmployeesModal(true);
      setIsSubmitting(false);
      return; // Detener aquí hasta que el usuario seleccione
    }

    // 3. Borrar habilidades actuales del puesto
    const { error: deleteError } = await supabase
      .from("Puesto_habilidades")
      .delete()
      .eq("Id_puesto", puestoId);

    if (deleteError) throw deleteError;

    // 4. Insertar nuevas habilidades
    if (roles[idx].skills.length > 0) {
      const habilidadesToInsert = roles[idx].skills.map(skill => ({
        Id_puesto: puestoId,
        Id_habilidad: skill.id,
        nivel: skill.level,
      }));

      const { error: insertError } = await supabase
        .from("Puesto_habilidades")
        .insert(habilidadesToInsert);

      if (insertError) throw insertError;
    }

    // Limpiar dirty
    setRolesDirty(dirty => {
      const copy = [...dirty];
      copy[idx] = false;
      return copy;
    });
    setShowRoleSuccessModal(true);
  } catch (error) {
    alert("Error al guardar el rol.");
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};

// Función para confirmar la eliminación de empleados y continuar la actualización
const confirmRemoveEmployeesAndUpdateRole = async () => {
  if (!pendingRoleUpdate) return;
  setIsSubmitting(true);
  try {
    // Eliminar empleados seleccionados de Puesto_persona
    for (const idEmpleado of selectedEmployeesToRemove) {
      await supabase.from("Puesto_persona").delete().eq("ID_Empleado", idEmpleado).eq("ID_Puesto", pendingRoleUpdate.puestoId);

      // Disminuye la cargabilidad del empleado eliminado
      await supabase.rpc("aumentar_cargabilidad", {
        id: idEmpleado,
        incremento: -(cargabilidad ?? 0), // Usa el valor de cargabilidad del proyecto
      });
    }
    // Actualizar Puesto_proyecto con nuevo N_puestos y Completo
    await supabase.from("Puesto_proyecto").update({
      N_puestos: roles[pendingRoleUpdate.idx].quantity,
      Completo: true, // Ahora sí debe quedar igualados
      Puesto: roles[pendingRoleUpdate.idx].role
    }).eq("id", pendingRoleUpdate.puestoId);

    // 3. Borrar habilidades actuales del puesto
    await supabase.from("Puesto_habilidades").delete().eq("Id_puesto", pendingRoleUpdate.puestoId);

    // 4. Insertar nuevas habilidades
    if (roles[pendingRoleUpdate.idx].skills.length > 0) {
      const habilidadesToInsert = roles[pendingRoleUpdate.idx].skills.map(skill => ({
        Id_puesto: pendingRoleUpdate.puestoId,
        Id_habilidad: skill.id,
        nivel: skill.level,
      }));

      await supabase.from("Puesto_habilidades").insert(habilidadesToInsert);
    }

    setRolesDirty(dirty => {
      const copy = [...dirty];
      copy[pendingRoleUpdate.idx] = false;
      return copy;
    });
    setShowRoleSuccessModal(true);
    setShowSelectEmployeesModal(false);
    setPendingRoleUpdate(null);
  } catch (error) {
    alert("Error al actualizar el rol.");
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};

const handleRemoveEmpleadosCargabilidad = async () => {
  if (!pendingProjectUpdate) return;
  setIsSubmitting(true);
  try {
    // 1. Elimina a los empleados afectados de todos los puestos del proyecto
    for (const emp of empleadosCargabilidad) {
      const { data: puestos } = await supabase
        .from("Puesto_proyecto")
        .select("id")
        .eq("ID_Proyecto", pendingProjectUpdate.proyectoId);

      if (puestos && puestos.length > 0) {
        for (const puesto of puestos) {
          await supabase
            .from("Puesto_persona")
            .delete()
            .eq("ID_Puesto", puesto.id)
            .eq("ID_Empleado", emp.id_empleado ?? emp.ID_Empleado);
        }
      }

      // Disminuye la cargabilidad del empleado eliminado
      await supabase.rpc("aumentar_cargabilidad", {
        id: emp.id_empleado ?? emp.ID_Empleado,
        incremento: -(pendingProjectUpdate.cargabilidadActualProyecto ?? 0),
      });
    }

    // 2. Aplica el incremento a todos los empleados restantes con rol en el proyecto
    const { data: puestosRestantes } = await supabase
      .from("Puesto_proyecto")
      .select("id")
      .eq("ID_Proyecto", pendingProjectUpdate.proyectoId);

    if (puestosRestantes && puestosRestantes.length > 0) {
      // Obtener todos los empleados asignados a algún puesto en el proyecto
      const puestoIds = puestosRestantes.map(p => p.id);
      const { data: empleadosRestantes } = await supabase
        .from("Puesto_persona")
        .select("ID_Empleado")
        .in("ID_Puesto", puestoIds);

      // Evita duplicados
      const empleadosUnicos = [
        ...new Set(
          (empleadosRestantes || []).map(e => e.ID_Empleado)
        ),
      ];

      const incremento = (cargabilidad ?? 0) - (pendingProjectUpdate.cargabilidadActualProyecto ?? 0);

      for (const idEmpleado of empleadosUnicos) {
        await supabase.rpc("aumentar_cargabilidad", {
          id: idEmpleado,
          incremento: incremento,
        });
      }
    }

    // Ahora continúa con la actualización del proyecto (igual que en handleSubmit)
    let imageUrl: string | null = null;
    if (projectImage) {
      const fileExt = projectImage.name.split('.').pop();
      const filePath = `proyectos/${pendingProjectUpdate.proyectoId}/imagen.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, projectImage, {
          cacheControl: "3600",
          upsert: true,
        });
      if (uploadError) throw uploadError;
      imageUrl = filePath;
    }

    const { error } = await supabase
      .from("Proyectos")
      .update({
        Nombre: projectName,
        Descripcion: description,
        fecha_inicio: startDate,
        fecha_fin: endDate,
        ID_DeliveryLead: selectedDeliveryLead?.ID_DeliveryLead || null,
        cargabilidad_num: cargabilidad,
        Cliente: clientName,
        ...(imageUrl && { ImagenUrl: imageUrl }),
      })
      .eq("ID_Proyecto", pendingProjectUpdate.proyectoId);
    if (error) throw error;

    // 1. Elimina las habilidades actuales del proyecto
await supabase
  .from("Proyecto_Habilidades")
  .delete()
  .eq("ID_Proyecto", projectId);

// 2. Inserta las nuevas habilidades seleccionadas
if (selectedSkills.length > 0) {
  const habilidadesToInsert = selectedSkills.map(skill => ({
    ID_Proyecto: pendingProjectUpdate.proyectoId,
    ID_Habilidad: skill.id,
    nivel: skill.level,
  }));
  await supabase.from("Proyecto_Habilidades").insert(habilidadesToInsert);
}

    setShowCargabilidadModal(false);
    setEmpleadosCargabilidad([]);
    setPendingProjectUpdate(null);
  } catch (error) {
    alert("Error al actualizar el proyecto.");
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};

  // Inicializa rolesDirty cuando cambian los roles
  useEffect(() => {
    setRolesDirty(Array(roles.length).fill(false));
  }, [roles.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeliveryLead) {
      setShowNoLeadModal(true);
      return;
    }
    // Validación de cargabilidad combinada
    if (selectedDeliveryLead && sobrepasaCargabilidad) {
      setShowCargabilidadWarning(true);
      return;
    }
    setIsSubmitting(true);

    const proyectoId = projectId || crypto.randomUUID();

    try {
      // 1. Obtener la cargabilidad actual del proyecto si es edición
      let cargabilidadActualProyecto = 0;
      if (projectId) {
        const { data: proyectoData, error: proyectoError } = await supabase
          .from("Proyectos")
          .select("cargabilidad_num")
          .eq("ID_Proyecto", projectId)
          .single();
        if (proyectoError) throw proyectoError;
        cargabilidadActualProyecto = proyectoData?.cargabilidad_num ?? 0;
      }

      // 2. Si la cargabilidad cambió, verifica empleados afectados
      if (
        projectId &&
        cargabilidad !== cargabilidadActualProyecto
      ) {
        const { data: empleadosAfectados, error: errorVerificar } = await supabase.rpc(
          "verificar_cargabilidad_empleados",
          {
            id_proyecto: projectId,
            cargabilidad_nueva: cargabilidad,
            cargabilidad_actual_proyecto: cargabilidadActualProyecto,
          }
        );
        if (errorVerificar) throw errorVerificar;

        if (empleadosAfectados && empleadosAfectados.length > 0) {
          setEmpleadosCargabilidad(empleadosAfectados);
          setShowCargabilidadModal(true);
          setPendingProjectUpdate({
            proyectoId,
            cargabilidadActualProyecto,
            imageUrl: null, // se setea después si hay imagen
          });
          setIsSubmitting(false);
          return; // Detener hasta que el usuario decida
        }
      }

      // Subir imagen si existe
      let imageUrl: string | null = null;
      if (projectImage) {
        const fileExt = projectImage.name.split('.').pop();
        const filePath = `proyectos/${proyectoId}/imagen.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(filePath, projectImage, {
            cacheControl: "3600",
            upsert: true,
          });
        if (uploadError) throw uploadError;
        imageUrl = filePath;
      }

      if (
  selectedDeliveryLead &&
  originalDeliveryLead &&
  selectedDeliveryLead.ID_Empleado === originalDeliveryLead.ID_Empleado
) {
  // Delivery Lead original: solo actualiza con incremento
  if (incrementoCargabilidad !== 0) {
    await supabase.rpc("aumentar_cargabilidad", {
      id: selectedDeliveryLead.ID_Empleado,
      incremento: incrementoCargabilidad,
    });
  }
} else if (selectedDeliveryLead && originalDeliveryLead) {
  // Nuevo Delivery Lead: suma cargabilidad del proyecto
  if ((cargabilidad ?? 0) > 0) {
    await supabase.rpc("aumentar_cargabilidad", {
      id: selectedDeliveryLead.ID_Empleado,
      incremento: cargabilidad ?? 0,
    });
  }
  // Resta al original
  if ((cargabilidadAnterior ?? 0) > 0) {
    await supabase.rpc("aumentar_cargabilidad", {
      id: originalDeliveryLead.ID_Empleado,
      incremento: -(cargabilidadAnterior ?? 0),
    });
  }
}

      // UPDATE
      const { error } = await supabase
        .from("Proyectos")
        .update({
          Nombre: projectName,
          Descripcion: description,
          fecha_inicio: startDate,
          fecha_fin: endDate,
          ID_DeliveryLead: selectedDeliveryLead?.ID_DeliveryLead || null,
          cargabilidad_num: cargabilidad,
          Cliente: clientName,
          ...(imageUrl && { ImagenUrl: imageUrl }),
        })
        .eq("ID_Proyecto", projectId);
      if (error) throw error;

      // 1. Elimina las habilidades actuales del proyecto
await supabase
  .from("Proyecto_Habilidades")
  .delete()
  .eq("ID_Proyecto", projectId);

// 2. Inserta las nuevas habilidades seleccionadas
if (selectedSkills.length > 0) {
  const habilidadesToInsert = selectedSkills.map(skill => ({
    ID_Proyecto: projectId,
    ID_Habilidad: skill.id,
    nivel: skill.level,
  }));
  await supabase.from("Proyecto_Habilidades").insert(habilidadesToInsert);
}

      // Si no hubo empleados afectados, actualiza la cargabilidad de todos los empleados con rol
      if (!empleadosCargabilidad.length && projectId && cargabilidad !== cargabilidadActualProyecto) {
        const { data: puestosRestantes } = await supabase
          .from("Puesto_proyecto")
          .select("id")
          .eq("ID_Proyecto", projectId);

        if (puestosRestantes && puestosRestantes.length > 0) {
          const puestoIds = puestosRestantes.map(p => p.id);
          const { data: empleadosRestantes } = await supabase
            .from("Puesto_persona")
            .select("ID_Empleado")
            .in("ID_Puesto", puestoIds);

          const empleadosUnicos = [
            ...new Set(
              (empleadosRestantes || []).map(e => e.ID_Empleado)
            ),
          ];

          const incremento = (cargabilidad ?? 0) - cargabilidadActualProyecto;

          for (const idEmpleado of empleadosUnicos) {
            await supabase.rpc("aumentar_cargabilidad", {
              id: idEmpleado,
              incremento: incremento,
            });
          }
        }
      }

      router.back(); // <-- Aquí, después de todo el proceso exitoso
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      } else if (typeof error === "object" && error !== null && "message" in error) {
        alert((error as any).message);
      } else {
        alert(JSON.stringify(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cargar habilidades y categorías al montar
  // Cargar habilidades, categorías y Delivery Leads al montar
  useEffect(() => {
    const fetchData = async () => {
      // Cargar categorías y habilidades (mantén tu código existente)
      const { data: categoriasData } = await supabase.from('Categorias_habilidades').select('*');
      setCategorias(categoriasData || []);
      const { data: habilidadesData } = await supabase.from('Habilidades').select('*');
      setHabilidades(habilidadesData || []);

      // Cargar Delivery Leads usando tu consulta SQL específica
      setLoadingLeads(true);
      try {
        const { data, error } = await supabase.rpc('get_available_delivery_leads2');
        console.log('Delivery Leads fetched:', data);
        if (error) throw error;
        setDeliveryLeads(data || []);

        // Obtener los links de avatar para cada lead
        const avatarLinks: { [id: string]: string | null } = {};
        await Promise.all(
          (data || []).map(async (lead: any) => {
            avatarLinks[lead.ID_Empleado] = await fetchAvatarURL(lead.ID_Empleado);
          })
        );
        setLeadAvatars(avatarLinks);
      } catch (error) {
        console.error('Error fetching delivery leads:', error);
      } finally {
        setLoadingLeads(false);
      }
    };
    
    fetchData();
  }, []);

  // Cargar datos del proyecto si hay ID (modo edición)
  useEffect(() => {
    if (!projectId) return;
    const fetchProjectData = async () => {
      const { data, error } = await supabase.rpc("get_full_project_data", { project_id: projectId });
      console.log("Datos del proyecto:", data);
      if (error) {
        console.error("Error al cargar datos del proyecto:", error);
        return;
      }
      if (!data) return;

      // 1. Proyecto base
      const proyecto = data.proyecto;
      setProjectName(proyecto?.Nombre ?? "");
      setDescription(proyecto?.Descripcion ?? "");
      setStartDate(proyecto?.fecha_inicio ?? "");
      setEndDate(proyecto?.fecha_fin ?? "");
      setCargabilidad(proyecto?.cargabilidad_num ?? null);
      setCargabilidadAnterior(proyecto?.cargabilidad_num ?? null); // <-- Guarda el original
      setClientName(proyecto?.Cliente ?? "");

      // Delivery Lead
      if (proyecto?.id_empleado_delivery) {
  const leadObj = {
    ID_Empleado: proyecto.id_empleado_delivery,
    nombre_empleado: proyecto.nombre_delivery,
    ID_DeliveryLead: proyecto.ID_DeliveryLead,
    Cargabilidad: Number(proyecto.cargabilidad_delivery) || 0, // <-- Asegura número
  };
  setSelectedDeliveryLead(leadObj);
  setOriginalDeliveryLead(leadObj);

  if (!leadAvatars[leadObj.ID_Empleado]) {
        const url = await fetchAvatarURL(leadObj.ID_Empleado);
        setLeadAvatars(prev => ({
          ...prev,
          [leadObj.ID_Empleado]: url,
        }));
      }

  
}


      // Imagen
      if (proyecto?.ImagenUrl) {
        // Si tienes lógica para mostrar preview desde Supabase Storage, ponla aquí
        setImagePreview(
          await supabase.storage.from("project-images").getPublicUrl(proyecto.ImagenUrl).data.publicUrl
        );
      }

      // 2. Puestos y habilidades por puesto
      const puestos = data.puestos || [];
      const habilidadesPuestos = data.habilidadesPuestos || [];
      setRoles(
        puestos.map((p: any) => ({
          role: p.Puesto,
          quantity: p.N_puestos,
          skills: habilidadesPuestos
            .filter((h: any) => h.Id_puesto === p.id)
            .map((h: any) => ({
              id: h.Id_habilidad,
              name: h.nombre_habilidad,
              level: h.nivel,
            })),
        }))
      );

      // 3. Habilidades generales
      const habilidadesGenerales = data.habilidadesGenerales || [];
      setSelectedSkills(
        habilidadesGenerales.map((h: any) => ({
          id: h.ID_Habilidad,
          name: h.nombre_habilidad,
          level: h.nivel,
        }))
      );
    };
    fetchProjectData();
  }, [projectId]);

  // Lógica de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const term = searchTerm.toLowerCase().trim();
    const filteredCategorias = categorias.filter(cat => cat.Nombre_categoria.toLowerCase().includes(term));
    const filteredHabilidades = habilidades.filter(h => h.Nombre.toLowerCase().includes(term));
    const habilidadesDeCategoriasEncontradas = habilidades.filter(h => filteredCategorias.some(c => c.id === h.ID_Categoria));
    const todasHabilidadesUnicas = [...new Map([...filteredHabilidades, ...habilidadesDeCategoriasEncontradas].map(h => [h.ID_Habilidad, h])).values()];
    setSearchResults({ categorias: filteredCategorias, habilidades: todasHabilidadesUnicas });
  }, [searchTerm, categorias, habilidades]);

  // Funciones para agregar/quitar habilidades
  const handleAddSkill = (skill: string) => {
    if (
      skill.trim() &&
      !selectedSkills.some(s => s.name === skill.trim())
    ) {
      const habilidad = habilidades.find(h => h.Nombre === skill.trim());
      if (!habilidad) return;
      setSelectedSkills(prev => [
        ...prev,
        { id: habilidad.ID_Habilidad, name: habilidad.Nombre, level: 'beginner' }
      ]);
    }
  };
  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(prev => prev.filter(skill => skill.name !== skillToRemove));
  };
  const updateSkillLevel = (skillName: string, newLevel: 'beginner' | 'intermediate' | 'expert') => {
    setSelectedSkills(prev =>
      prev.map(skill =>
        skill.name === skillName ? { ...skill, level: newLevel } : skill
      )
    );
  };

  // Filtrado y paginación de delivery leads
  const filteredLeads = deliveryLeads
  .filter(lead => {
    // No mostrar el lead ya seleccionado
    if (selectedDeliveryLead && lead.ID_Empleado === selectedDeliveryLead.ID_Empleado) return false;
    // Filtro por nombre o ID
    const matchesSearch =
      lead.nombre_empleado.toLowerCase().includes(leadSearch.toLowerCase()) ||
      String(lead.ID_Empleado).includes(leadSearch);
    if (!matchesSearch) return false;
    // Filtro de cargabilidad: solo mostrar si NO excede el 100%
    const leadCargabilidad = Number(lead.Cargabilidad) || 0;
    const proyectoCargabilidad = Number(cargabilidad) || 0;
    const suma = leadCargabilidad + proyectoCargabilidad;
    return suma <= 100;
  });
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const paginatedLeads = filteredLeads.slice((leadPage - 1) * leadsPerPage, leadPage * leadsPerPage);

  // Filtrar habilidades para el modal de skills por nombre y que no estén ya agregadas al rol
  const filteredModalSkills = habilidades.filter(h =>
    h.Nombre.toLowerCase().includes(modalSkillSearch.toLowerCase())
  );
  const filteredModalCategorias = categorias.filter(cat =>
    cat.Nombre_categoria.toLowerCase().includes(modalSkillSearch.toLowerCase())
  );
  const filteredModalHabilidades = habilidades.filter(h =>
    h.Nombre.toLowerCase().includes(modalSkillSearch.toLowerCase())
  );
  const habilidadesDeModalCategorias = habilidades.filter(h =>
    filteredModalCategorias.some(c => c.id === h.ID_Categoria)
  );
  const todasModalHabilidadesUnicas = [
    ...new Map([...filteredModalHabilidades, ...habilidadesDeModalCategorias].map(h => [h.ID_Habilidad, h])).values()
  ];
    const [leadAvatars, setLeadAvatars] = useState<{ [id: string]: string | null }>({});
  const [selectedLeadAvatar, setSelectedLeadAvatar] = useState<string | null>(null);

  const fetchAvatarURL = async (employeeID: string | null): Promise<string | null> => {
  if (!employeeID) return null;

  const bucketName = "profile-pictures";
  const basePath = `${employeeID}/perfil`;
  
  try {
    // 1. Listar archivos en el directorio para encontrar la imagen real
    const { data: files, error } = await supabase.storage
      .from(bucketName)
      .list(`${employeeID}`, {
        limit: 1,
        search: 'perfil'
      });

    if (error || !files || files.length === 0) {
      console.log('No se encontró archivo de avatar:', error?.message);
      return null;
    }

    // Obtener el nombre real del archivo (con extensión)
    const actualFileName = files[0].name;
    const fullFilePath = `${employeeID}/${actualFileName}`;

    // 2. Obtener URL firmada (temporal) para acceder al archivo
    const { data: signedUrl } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fullFilePath, 3600); // URL válida por 1 hora

    if (!signedUrl?.signedUrl) {
      console.log('No se pudo generar URL firmada');
      return null;
    }

    console.log('Avatar encontrado:', signedUrl.signedUrl);
    return signedUrl.signedUrl;
    
  } catch (error) {
    console.error('Error verificando avatar:', error);
    return null;
  }
};

useEffect(() => {
  const getAvatar = async () => {
    if (selectedDeliveryLead?.ID_Empleado) {
      const url = await fetchAvatarURL(selectedDeliveryLead.ID_Empleado);
      setSelectedLeadAvatar(url);
    } else {
      setSelectedLeadAvatar(null);
    }
  };
  getAvatar();
}, [selectedDeliveryLead]);

useEffect(() => {
  const cargarAvatarOriginal = async () => {
    if (
      originalDeliveryLead &&
      originalDeliveryLead.ID_Empleado &&
      !leadAvatars[originalDeliveryLead.ID_Empleado]
    ) {
      const url = await fetchAvatarURL(originalDeliveryLead.ID_Empleado);
      setLeadAvatars(prev => ({
        ...prev,
        [originalDeliveryLead.ID_Empleado]: url,
      }));
    }
  };
  cargarAvatarOriginal();
}, [originalDeliveryLead, leadAvatars, fetchAvatarURL]);

  const handleDeleteImage = async () => {
    if (!imagePreview || !projectId) return;
    setIsDeletingImage(true);
    try {
      // Obtén la ruta de la imagen guardada en la base de datos
      const { data: proyecto } = await supabase
        .from("Proyectos")
        .select("ImagenUrl")
        .eq("ID_Proyecto", projectId)
        .single();

      if (proyecto?.ImagenUrl) {
        const { error } = await supabase.storage
          .from("project-images")
          .remove([proyecto.ImagenUrl]);
        if (error) throw error;

        // Limpia el estado local
        setImagePreview(null);
        setProjectImage(null);

        // Borra la referencia en la base de datos
        await supabase
          .from("Proyectos")
          .update({ ImagenUrl: null })
          .eq("ID_Proyecto", projectId);
      }
      setShowDeleteImageModal(false);
    } catch (error) {
      alert("Error al borrar la imagen.");
      console.error(error);
    } finally {
      setIsDeletingImage(false);
    }
  };

  const handleDeleteRole = async () => {
    if (roleToDeleteIdx === null) return;
    setIsDeletingRole(true);

    try {
      // Si hay projectId, elimina también en la base de datos
      if (projectId) {
        // Buscar el puesto correspondiente en la base de datos
        const { data: puestos, error: puestoError } = await supabase
          .from("Puesto_proyecto")
          .select("id")
          .eq("ID_Proyecto", projectId);

        if (puestoError) throw puestoError;
        const puestoId = puestos?.[roleToDeleteIdx]?.id;

        if (puestoId) {
          // Buscar empleados asignados a este puesto
          const { data: empleadosPuesto } = await supabase
            .from("Puesto_persona")
            .select("ID_Empleado")
            .eq("ID_Puesto", puestoId);

          // Obtener la cargabilidad del proyecto
          const { data: proyectoData, error: proyectoError } = await supabase
            .from("Proyectos")
            .select("cargabilidad_num")
            .eq("ID_Proyecto", projectId)
            .single();

          if (proyectoError) throw proyectoError;
          const incremento = -(proyectoData?.cargabilidad_num ?? null);

          // Ejecutar el RPC para cada empleado afectado
          if (empleadosPuesto && empleadosPuesto.length > 0 && incremento !== null) {
            for (const emp of empleadosPuesto) {
              await supabase.rpc("aumentar_cargabilidad", {
                id: emp.ID_Empleado,
                incremento: incremento
              });
            }
          }

          // Elimina habilidades asociadas
          await supabase.from("Puesto_habilidades").delete().eq("Id_puesto", puestoId);
          //Elimina Personas del puesto
          await supabase.from("Puesto_persona").delete().eq("ID_Puesto", puestoId);
          // Elimina el puesto
          await supabase.from("Puesto_proyecto").delete().eq("id", puestoId);
        }
      }

      // Elimina del estado local
      setRoles(roles => roles.filter((_, i) => i !== roleToDeleteIdx));
      setRolesDirty(dirty => dirty.filter((_, i) => i !== roleToDeleteIdx));
      setShowDeleteRoleModal(false);
      setRoleToDeleteIdx(null);
    } catch (error) {
      alert("Error al eliminar el rol.");
      console.error(error);
    } finally {
      setIsDeletingRole(false);
    }
  };

  

  // Calcula incremento y cargabilidad nueva cada vez que cambie cargabilidad o cargabilidadAnterior o selectedDeliveryLead
useEffect(() => {
  const anterior = Number(cargabilidadAnterior) || 0;
  const nueva = Number(cargabilidad) || 0;
  const incremento = nueva - anterior;
  setIncrementoCargabilidad(incremento);
}, [cargabilidad, cargabilidadAnterior]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Columna principal */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900">Editar Proyecto</h1>
              <p className="mt-2 text-sm text-gray-600">
                Edita la información del proyecto a los nuevos requerimientos.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Nombre del Proyecto */}
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Proyecto
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                    placeholder="Ej: Desarrollo de Aplicación Móvil"
                    required
                  />
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Cliente
                    </label>
                    <input
                      id="clientName"
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                      placeholder="Ej: Banco Ejemplo S.A."
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cargabilidad" className="block text-sm font-medium text-gray-700 mb-1">
                      Cargabilidad (%)
                    </label>
                    <input
                      id="cargabilidad"
                      type="number"
                      min={1}
                      max={100}
                      value={cargabilidad ?? ""}
                      onChange={e => setCargabilidad(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                      placeholder="Ej: 80"
                      required
                    />
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                    placeholder="Describe los objetivos y características del proyecto..."
                    required
                  />
                </div>

                {/* Fechas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Inicio
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Fin
                    </label>
                    <input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Delivery lead */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="Delivery_lead" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery lead
                    </label>
                    {/* Área para soltar el Delivery Lead seleccionado */}
                    <div
                      className={`mb-6 border-2 border-dashed rounded-lg p-4 flex items-center min-h-[56px] transition-colores ${
                        isDraggingOver ? "border-purple-500 bg-purple-50" : "border-gray-300 bg-white"
                      }`}
                      onDragOver={e => {
                        e.preventDefault();
                        setIsDraggingOver(true);
                      }}
                      onDragLeave={() => setIsDraggingOver(false)}
                      onDrop={e => {
                        e.preventDefault();
                        setIsDraggingOver(false);
                        const lead = JSON.parse(e.dataTransfer.getData("application/json"));
                        setSelectedDeliveryLead(lead);
                      }}
                    >
                      {selectedDeliveryLead ? (
                        <div className="flex items-center space-x-3 w-full">
    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
      <img
        src={selectedLeadAvatar || "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"}
        alt={`Avatar de ${selectedDeliveryLead.nombre_empleado}`}
        width={60}
        height={60}
        className="object-cover w-full h-full"
        loading="lazy"
      />
    </div>
    <div className="flex-1">
      <span className="font-medium">{selectedDeliveryLead.nombre_empleado}</span>
      {/* Mostrar cargabilidad real */}
      <div className="mt-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Cargabilidad:</span>
          <span className="text-xs font-semibold text-purple-700">
            {
              (() => {
                if (
                  selectedDeliveryLead &&
                  originalDeliveryLead &&
                  selectedDeliveryLead.ID_Empleado === originalDeliveryLead.ID_Empleado
                ) {
                  // Delivery Lead original: usa el cálculo con incremento
                  const anterior = Number(cargabilidadAnterior) || 0;
                  const nueva = Number(cargabilidad) || 0;
                  const incremento = nueva - anterior;
                  const cargabilidadNueva = (Number(selectedDeliveryLead.Cargabilidad) || 0) + incremento;
                  return `${cargabilidadNueva}%`;
                } else {
                  // Nuevo Delivery Lead: suma cargabilidad actual + cargabilidad del proyecto
                  const leadCargabilidad = Number(selectedDeliveryLead?.Cargabilidad) || 0;
                  const proyectoCargabilidad = Number(cargabilidad) || 0;
                  return `${leadCargabilidad + proyectoCargabilidad}%`;
                }
              })()
            }
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div
            className={`h-2 rounded-full transition-all ${
              (() => {
                if (
                  selectedDeliveryLead &&
                  originalDeliveryLead &&
                  selectedDeliveryLead.ID_Empleado === originalDeliveryLead.ID_Empleado
                ) {
                  // Delivery Lead original
                  return ((Number(selectedDeliveryLead.Cargabilidad) || 0) + incrementoCargabilidad) > 100
                    ? "bg-red-500"
                    : "bg-purple-500";
                } else {
                  // Nuevo Delivery Lead
                  const leadCargabilidad = Number(selectedDeliveryLead?.Cargabilidad) || 0;
                  const proyectoCargabilidad = Number(cargabilidad) || 0;
                  return (leadCargabilidad + proyectoCargabilidad) > 100
                    ? "bg-red-500"
                    : "bg-purple-500";
                }
              })()
            }`}
            style={{
              width: (() => {
                if (
                  selectedDeliveryLead &&
                  originalDeliveryLead &&
                  selectedDeliveryLead.ID_Empleado === originalDeliveryLead.ID_Empleado
                ) {
                  // Delivery Lead original
                  return `${Math.min((Number(selectedDeliveryLead.Cargabilidad) || 0) + incrementoCargabilidad, 100)}%`;
                } else {
                  // Nuevo Delivery Lead
                  const leadCargabilidad = Number(selectedDeliveryLead?.Cargabilidad) || 0;
                  const proyectoCargabilidad = Number(cargabilidad) || 0;
                  return `${Math.min(leadCargabilidad + proyectoCargabilidad, 100)}%`;
                }
              })()
            }}
          ></div>
        </div>
      </div>
    </div>
    {/* Botón de quitar Delivery Lead eliminado */}
  </div>
) : (
  <span className="text-gray-400">Arrastra aquí un Delivery Lead disponible</span>
)}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="projectImage" className="block text-sm font-medium text-gray-700 mb-1">
                      Imagen proyecto
                    </label>
                    <div
          className={`w-full px-4 py-6 border-2 rounded-lg shadow-sm transition duration-200 flex flex-col items-center justify-center cursor-pointer
            ${imageDragActive ? "border-purple-500 bg-purple-50" : "border-gray-300 bg-white"}
          `}
          onDragOver={e => {
            e.preventDefault();
            setImageDragActive(true);
          }}
          onDragLeave={e => {
            e.preventDefault();
            setImageDragActive(false);
          }}
          onDrop={e => {
            e.preventDefault();
            setImageDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              setProjectImage(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => imageInputRef.current?.click()}
        >
                  {imagePreview ? (
          <div className="flex flex-col items-center">
            <img
              src={imagePreview}
              alt="Vista previa"
              className="w-32 h-32 object-cover rounded mb-2 border"
            />
            <button
              type="button"
              className="mt-2 text-xs text-red-500 hover:text-red-700"
              onClick={e => {
                e.stopPropagation();
                setShowDeleteImageModal(true);
              }}
            >
              Borrar imagen
            </button>
          </div>
        ) : (
          <span className="text-gray-400 text-center">
            Arrastra una imagen aquí o haz clic para seleccionar
          </span>
        )}
          <input
            id="projectImage"
            type="file"
            accept="image/*"
            ref={imageInputRef}
            style={{ display: "none" }}
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setProjectImage(e.target.files[0]);
              }
            }}
          />
          {projectImage && (
            <button
              type="button"
              className="mt-2 text-xs text-red-500 hover:text-red-700"
              onClick={e => {
                e.stopPropagation();
                setProjectImage(null);
              }}
            >
              Quitar imagen
            </button>
          )}
        </div>
                  </div>
                </div>

                {/* Roles */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Roles Requeridos</label>
                  <div className="space-y-3">
                    {roles.map((role, idx) => (
    <div
      key={idx}
      className={`flex flex-col gap-1 border rounded-lg shadow-sm p-4 mb-2 transition
        ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
        ${rolesDirty[idx] ? "border-green-400" : "border-gray-200"}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Ej: Desarrollador Frontend"
            value={role.role}
            onChange={(e) => handleRoleChange(idx, "role", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
            required
          />
        </div>
        <div className="w-24">
          <input
            type="number"
            min={1}
            value={role.quantity}
            onChange={(e) => handleRoleChange(idx, "quantity", Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
            required
          />
        </div>
        <button
          type="button"
          onClick={() => openSkillModal(idx)}
          className="p-2 text-green-500 hover:text-green-700 transition duration-200"
          aria-label="Vincular habilidades"
          title="Vincular habilidades"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button
          type="button"
          onClick={async () => {
            setRoleToDeleteIdx(idx);
            setAffectedEmployees([]); // Limpia antes de cargar
            if (projectId) {
              // Buscar el puesto correspondiente en la base de datos
              const { data: puestos, error: puestoError } = await supabase
                .from("Puesto_proyecto")
                .select("id")
                .eq("ID_Proyecto", projectId);

              if (!puestoError) {
                const puestoId = puestos?.[idx]?.id;
                if (puestoId) {
                  // Buscar empleados asignados a este puesto
                  const { data: empleadosPuesto } = await supabase
                    .from("Puesto_persona")
                    .select("ID_Empleado")
                    .eq("ID_Puesto", puestoId);

                  if (empleadosPuesto && empleadosPuesto.length > 0) {
                    const empleadosIds = empleadosPuesto.map((ep: any) => ep.ID_Empleado);
                    // Buscar datos de los empleados
                    const { data: empleados } = await supabase
                    .from("Empleado")
                    .select("ID_Empleado, Nombre, Cargabilidad")
                    .in("ID_Empleado", empleadosIds);

                    setAffectedEmployees(
                    (empleados || []).map((e: any) => ({
                        id: e.ID_Empleado,
                        nombre: e.Nombre,
                        cargabilidad: e.Cargabilidad, // Cambia aquí
                    }))
                    );
                  }
                }
              }
            }
            setShowDeleteRoleModal(true);
          }}
          className="p-2 text-red-500 hover:text-red-700 transition duration-200"
          aria-label="Eliminar rol"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {/* Habilidades vinculadas */}
      {role.skills && role.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {role.skills.map(skill => (
            <span key={skill.id} className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs flex items-center">
              {skill.name}
              <select
                value={skill.level}
                onChange={e => updateSkillLevelInRole(idx, skill.id, e.target.value as 'beginner' | 'intermediate' | 'expert')}
                className="ml-2 text-xs border border-gray-300 rounded p-0.5"
              >
                <option value="beginner">Principiante</option>
                <option value="intermediate">Intermedio</option>
                <option value="expert">Experto</option>
              </select>
              <button
                type="button"
                className="ml-1 text-red-400 hover:text-red-600"
                onClick={() => removeSkillFromRole(idx, skill.id)}
                title="Quitar habilidad"
              >×</button>
            </span>
          ))}
        </div>
      )}
      {/* Botón Guardar cambios */}
      {rolesDirty[idx] && (
        <button
          type="button"
          className="self-end mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={() => handleSaveRole(idx)}
        >
          Guardar cambios
        </button>
      )}
    </div>
  ))}
                  </div>
                  <button
                    type="button"
                    onClick={addRole}
                    className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Agregar Rol
                  </button>
                </div>

                {/* HABILIDADES Y HERRAMIENTAS */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Habilidades y Herramientas Requeridas
                  </label>
                  {/* Barra de búsqueda */}
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Buscar categorías o habilidades..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pl-2"
                      />
                      {searchTerm && (
                        <button
                          type="button"
                          onClick={() => setSearchTerm('')}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Resultados de búsqueda */}
                  {isSearching && (
                    <div className="mb-4 bg-white rounded-lg shadow p-4 border border-gray-200">
                      <h2 className="text-lg font-semibold mb-2">Resultados de búsqueda para "{searchTerm}"</h2>
                      {searchResults.categorias.length === 0 && searchResults.habilidades.length === 0 ? (
                        <p className="text-gray-500">No se encontraron resultados</p>
                      ) : (
                        <>
                          {/* Categorías encontradas */}
                          {searchResults.categorias.length > 0 && (
                            <div className="mb-4">
                              <h3 className="text-md font-medium mb-2">Categorías ({searchResults.categorias.length})</h3>
                              <div className="space-y-2">
                                {searchResults.categorias.map(categoria => {
                                  const habilidadesDeCategoria = habilidades.filter(h => h.ID_Categoria === categoria.id);
                                  return (
                                    <div key={categoria.id} className="border rounded-lg overflow-hidden">
                                      <div className="p-2 bg-gray-50 border-b">
                                        <h4 className="font-medium">{categoria.Nombre_categoria}</h4>
                                      </div>
                                      <div className="p-2">
                                        {habilidadesDeCategoria.length === 0 ? (
                                          <p className="text-gray-500 text-sm">No hay habilidades en esta categoría</p>
                                        ) : (
                                          <ul className="space-y-1">
                                            {habilidadesDeCategoria.map(habilidad => (
                                              <li
                                                key={habilidad.ID_Habilidad}
                                                className="flex justify-between items-center p-1 hover:bg-gray-50 rounded cursor-pointer"
                                                onClick={() => handleAddSkill(habilidad.Nombre)}
                                              >
                                                <span>{habilidad.Nombre}</span>
                                                {selectedSkills.some(s => s.name === habilidad.Nombre) ? (
                                                  <span className="text-xs text-green-600">✓ agregada</span>
                                                ) : (
                                                  <button
                                                    type="button"
                                                    onClick={e => { e.stopPropagation(); handleAddSkill(habilidad.Nombre); }}
                                                    className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded hover:bg-purple-200"
                                                  >
                                                    Agregar
                                                  </button>
                                                )}
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          {/* Habilidades encontradas (que no pertenecen a categorías encontradas) */}
                          {searchResults.habilidades.length > 0 && (
                            <div>
                              <h3 className="text-md font-medium mb-2">
                                Habilidades y Herramientas ({searchResults.habilidades.length})
                              </h3>
                              <ul className="space-y-1">
                                {searchResults.habilidades.map(habilidad => {
                                  if (searchResults.categorias.some(c => c.id === habilidad.ID_Categoria)) {
                                    return null;
                                  }
                                  return (
                                    <li
                                      key={habilidad.ID_Habilidad}
                                      className="p-1 hover:bg-gray-50 rounded flex justify-between items-center cursor-pointer"
                                      onClick={() => handleAddSkill(habilidad.Nombre)}
                                    >
                                      <div>
                                        <span>{habilidad.Nombre}</span>
                                        <span className="text-xs text-gray-500 ml-2">
                                          ({categorias.find(c => c.id === habilidad.ID_Categoria)?.Nombre_categoria})
                                        </span>
                                      </div>
                                      {selectedSkills.some(s => s.name === habilidad.Nombre) ? (
                                        <span className="text-xs text-green-600">✓ agregada</span>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={e => { e.stopPropagation(); handleAddSkill(habilidad.Nombre); }}
                                          className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded hover:bg-purple-200"
                                        >
                                          Agregar
                                        </button>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {/* Habilidades seleccionadas */}
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Habilidades requeridas seleccionadas:</h4>
                    {selectedSkills.length > 0 ? (
                      <div className="space-y-1">
                        {selectedSkills.map(skill => (
                          <div key={skill.name} className="flex items-center justify-between p-1 bg-gray-50 rounded">
                            <span className="text-gray-800">{skill.name}</span>
                            <div className="flex items-center space-x-2">
                              <select
                                value={skill.level}
                                onChange={e => updateSkillLevel(skill.name, e.target.value as 'beginner' | 'intermediate' | 'expert')}
                                className="text-xs border border-gray-300 rounded p-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
                              >
                                <option value="beginner">Principiante</option>
                                <option value="intermediate">Intermedio</option>
                                <option value="expert">Experto</option>
                              </select>
                              <button
                                type="button"
                                onClick={() => removeSkill(skill.name)}
                                className="text-gray-500 hover:text-gray-700 p-1"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No has seleccionado ninguna habilidad</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
  type="submit"
  className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 disabled:opacity-70"
  disabled={isSubmitting || isEditDisabled}
>
  {isSubmitting ? (
    <>
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Creando...
    </>
  ) : "Editar Proyecto"}
</button>
              </div>
            </form>
          </div>
        </div>
        {/* Columna derecha */}
        {/* 
        <div className="lg:col-span-3 space-y-6">
          ...TODA LA SECCIÓN DE DELIVERY LEADS DISPONIBLES Y DELIVERY LEAD ORIGINAL ELIMINADA...
        </div>
        */}
      </div>
                        {modalOpen && modalRoleIdx !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/30 bg-opacity-40">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
        onClick={closeSkillModal}
        title="Cerrar"
      >×</button>
      <h2 className="text-lg font-semibold mb-3">Vincular habilidades al rol</h2>
      <input
        type="text"
        placeholder="Buscar categorías o habilidades..."
        value={modalSkillSearch}
        onChange={e => setModalSkillSearch(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-3"
      />
      <div className="max-h-64 overflow-y-auto">
        {filteredModalCategorias.length === 0 && todasModalHabilidadesUnicas.length === 0 ? (
          <p className="text-gray-500 text-sm">No se encontraron resultados</p>
        ) : (
          <>
            {/* Categorías encontradas */}
            {filteredModalCategorias.length > 0 && (
              <div className="mb-4">
                <h3 className="text-md font-medium mb-2">Categorías ({filteredModalCategorias.length})</h3>
                <div className="space-y-2">
                  {filteredModalCategorias.map(categoria => {
                    const habilidadesDeCategoria = habilidades.filter(h => h.ID_Categoria === categoria.id);
                    return (
                      <div key={categoria.id} className="border rounded-lg overflow-hidden">
                        <div className="p-2 bg-gray-50 border-b">
                          <h4 className="font-medium">{categoria.Nombre_categoria}</h4>
                        </div>
                        <div className="p-2">
                          {habilidadesDeCategoria.length === 0 ? (
                            <p className="text-gray-500 text-sm">No hay habilidades en esta categoría</p>
                          ) : (
                            <ul className="space-y-1">
                              {habilidadesDeCategoria.map(habilidad => {
                                const alreadyAdded = roles[modalRoleIdx].skills.some(s => s.id === habilidad.ID_Habilidad);
                                const skillObj = roles[modalRoleIdx].skills.find(s => s.id === habilidad.ID_Habilidad);
                                return (
                                  <li
                                    key={habilidad.ID_Habilidad}
                                    className="flex justify-between items-center p-1 hover:bg-gray-50 rounded"
                                  >
                                    <span>{habilidad.Nombre}</span>
                                    {alreadyAdded ? (
                                      <select
                                        value={skillObj?.level}
                                        onChange={e =>
                                          updateSkillLevelInRole(
                                            modalRoleIdx,
                                            habilidad.ID_Habilidad,
                                            e.target.value as 'beginner' | 'intermediate' | 'expert'
                                          )
                                        }
                                        className="text-xs border border-gray-300 rounded p-1 ml-2"
                                      >
                                        <option value="beginner">Principiante</option>
                                        <option value="intermediate">Intermedio</option>
                                        <option value="expert">Experto</option>
                                      </select>
                                    ) : (
                                      <button
                                        type="button"
                                        className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded hover:bg-purple-200 ml-2"
                                        onClick={() =>
                                          addSkillToRole(
                                            modalRoleIdx,
                                            { id: habilidad.ID_Habilidad, name: habilidad.Nombre },
                                            'beginner'
                                          )
                                        }
                                      >
                                        Agregar
                                      </button>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Habilidades encontradas fuera de categorías */}
            {todasModalHabilidadesUnicas.length > 0 && (
              <div>
                <h3 className="text-md font-medium mb-2">
                  Habilidades y Herramientas ({todasModalHabilidadesUnicas.length})
                </h3>
                <ul className="space-y-1">
                  {todasModalHabilidadesUnicas.map(habilidad => {
                    if (filteredModalCategorias.some(c => c.id === habilidad.ID_Categoria)) {
                      return null;
                    }
                    const alreadyAdded = roles[modalRoleIdx].skills.some(s => s.id === habilidad.ID_Habilidad);
                    const skillObj = roles[modalRoleIdx].skills.find(s => s.id === habilidad.ID_Habilidad);
                    return (
                      <li
                        key={habilidad.ID_Habilidad}
                        className="flex justify-between items-center p-1 hover:bg-gray-50 rounded"
                      >
                        <div>
                          <span>{habilidad.Nombre}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({categorias.find(c => c.id === habilidad.ID_Categoria)?.Nombre_categoria})
                          </span>
                        </div>
                        {alreadyAdded ? (
                          <select
                            value={skillObj?.level}
                            onChange={e =>
                              updateSkillLevelInRole(
                                modalRoleIdx,
                                habilidad.ID_Habilidad,
                                e.target.value as 'beginner' | 'intermediate' | 'expert'
                              )
                            }
                            className="text-xs border border-gray-300 rounded p-1 ml-2"
                          >
                            <option value="beginner">Principiante</option>
                            <option value="intermediate">Intermedio</option>
                            <option value="expert">Experto</option>
                          </select>
                        ) : (
                          <button
                            type="button"
                            className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded hover:bg-purple-200 ml-2"
                            onClick={() =>
                              addSkillToRole(
                                modalRoleIdx,
                                { id: habilidad.ID_Habilidad, name: habilidad.Nombre },
                                'beginner'
                              )
                            }
                          >
                            Agregar
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={closeSkillModal}
        >
          Listo
        </button>
      </div>
    </div>
  </div>
)}
{showDeleteImageModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/40">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
      <h2 className="text-lg font-semibold mb-3 text-red-600">¿Eliminar imagen?</h2>
      <p className="mb-4">¿Seguro que deseas borrar la imagen del proyecto? Esta acción no se puede deshacer.</p>
      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setShowDeleteImageModal(false)}
          disabled={isDeletingImage}
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={handleDeleteImage}
          disabled={isDeletingImage}
        >
          {isDeletingImage ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  </div>
)}
{showRoleSuccessModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/40">
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
      <svg className="w-16 h-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#dcfce7" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
      </svg>
      <h2 className="text-xl font-semibold text-green-700 mb-2">¡Rol actualizado correctamente!</h2>
      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => setShowRoleSuccessModal(false)}
      >
        Cerrar
      </button>
    </div>
  </div>
)}
{showDeleteRoleModal && roleToDeleteIdx !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/40">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
      <h2 className="text-lg font-semibold mb-3 text-red-600">¿Eliminar rol?</h2>
      <p className="mb-4">¿Seguro que deseas eliminar este rol y todas sus habilidades asociadas? Esta acción no se puede deshacer.</p>
      {affectedEmployees.length > 0 && (
        <div className="mb-4 text-left">
          <p className="text-sm font-semibold text-gray-700 mb-1">Empleados afectados:</p>
          <ul className="max-h-32 overflow-y-auto text-sm text-gray-700 pl-4 list-disc">
            {affectedEmployees.map(emp => (
                <li key={emp.id}>
                <span className="font-medium">{emp.nombre}</span>
                <span className="text-gray-500"> (Cargabilidad: {emp.cargabilidad ?? "N/A"}%)</span>
                </li>
            ))}
            </ul>
        </div>
      )}
      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setShowDeleteRoleModal(false)}
          disabled={isDeletingRole}
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={handleDeleteRole}
          disabled={isDeletingRole}
        >
          {isDeletingRole ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  </div>
)}
{/* Modal para seleccionar empleados a eliminar */}
{showSelectEmployeesModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/40">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
      <h2 className="text-lg font-semibold mb-3 text-red-600">Selecciona empleados a eliminar</h2>
      <p className="mb-4">Debes seleccionar {employeesToRemove.length - roles[pendingRoleUpdate?.idx ?? 0].quantity} empleados para eliminar de este rol.</p>
      <div className="mb-4 text-left max-h-40 overflow-y-auto">
        {employeesToRemove.map(emp => (
          <label key={emp.ID_Empleado} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={selectedEmployeesToRemove.includes(emp.ID_Empleado)}
              onChange={e => {
                if (e.target.checked) {
                  setSelectedEmployeesToRemove(prev => [...prev, emp.ID_Empleado]);
                } else {
                  setSelectedEmployeesToRemove(prev => prev.filter(id => id !== emp.ID_Empleado));
                }
              }}
              disabled={
                !selectedEmployeesToRemove.includes(emp.ID_Empleado) &&
                selectedEmployeesToRemove.length >= (employeesToRemove.length - roles[pendingRoleUpdate?.idx ?? 0].quantity)
              }
            />
            <span>{emp.Nombre} (Cargabilidad: {emp.Cargabilidad ?? "N/A"}%)</span>
          </label>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setShowSelectEmployeesModal(false)}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={confirmRemoveEmployeesAndUpdateRole}
          disabled={selectedEmployeesToRemove.length !== (employeesToRemove.length - roles[pendingRoleUpdate?.idx ?? 0].quantity) || isSubmitting}
        >
          {isSubmitting ? "Actualizando..." : "Eliminar y actualizar"}
        </button>
      </div>
    </div>
  </div>
)}
{showCargabilidadModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/40">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
      <h2 className="text-lg font-semibold mb-3 text-red-600">Empleados exceden cargabilidad</h2>
      <p className="mb-4">
        Los siguientes empleados superarían el 100% de cargabilidad con la nueva configuración. ¿Deseas eliminarlos del proyecto?
      </p>
      <ul className="mb-4 max-h-40 overflow-y-auto text-left text-sm">
  {empleadosCargabilidad.map(emp => (
    <li key={emp.id_empleado} className="mb-2">
      <span className="font-medium">{emp.nombre}</span>
      <span className="ml-2 text-gray-500">
        (Actual: {emp.cargabilidad_actual}%, Calculada: {emp.cargabilidad_calculada}%)
      </span>
    </li>
  ))}
</ul>
      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => {
            setShowCargabilidadModal(false);
            setEmpleadosCargabilidad([]);
            setPendingProjectUpdate(null);
          }}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={handleRemoveEmpleadosCargabilidad}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Eliminando..." : "Eliminar empleados y actualizar"}
        </button>
      </div>
    </div>
  </div>
)}
{showCargabilidadWarning && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/40 bg-opacity-40">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
        onClick={() => setShowCargabilidadWarning(false)}
        title="Cerrar"
      >×</button>
      <div className="flex items-center mb-4">
        <svg className="w-8 h-8 text-red-500 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-lg font-semibold text-red-600">Cargabilidad excedida</h2>
      </div>
      <p className="mb-4 text-gray-700">
        La suma de la cargabilidad actual del Delivery Lead y la cargabilidad propuesta para este proyecto es <b>{(Number(selectedDeliveryLead?.Cargabilidad) || 0) + incrementoCargabilidad}%</b>, lo cual excede el 100%.<br />
        Por favor, ajusta la cargabilidad del proyecto o selecciona otro Delivery Lead.
      </p>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={() => setShowCargabilidadWarning(false)}
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}