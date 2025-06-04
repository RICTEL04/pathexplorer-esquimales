"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewProjectPage() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [roles, setRoles] = useState([
  { role: "", quantity: 1, skills: [] as { id: string; name: string; level: 'beginner' | 'intermediate' | 'expert' }[] }
]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalRoleIdx, setModalRoleIdx] = useState<number | null>(null);
  const [modalSkillSearch, setModalSkillSearch] = useState('');

  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [imageDragActive, setImageDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
};

const removeSkillFromRole = (roleIdx: number, skillId: string) => {
  setRoles(prev => prev.map((r, i) =>
    i === roleIdx
      ? { ...r, skills: r.skills.filter(s => s.id !== skillId) }
      : r
  ));
};

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const proyectoId = crypto.randomUUID();
  
    try {
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

      // 1. Crear el proyecto
      const { data: proyecto, error: proyectoError } = await supabase
        .from("Proyectos")
        .insert({
          ID_Proyecto: proyectoId,
          Nombre: projectName,
          Descripcion: description,
          fecha_inicio: startDate,
          fecha_fin: endDate,
          ID_DeliveryLead: selectedDeliveryLead?.id_deliverylead || null,
          cargabilidad_num: cargabilidad,
          Cliente: clientName,
          ImagenUrl: imageUrl,
        })
        .select()
        .single();
  
      if (proyectoError) throw proyectoError;
  
      // 2. Insertar los puestos y sus habilidades
      for (const role of roles) {
        const puestoId = crypto.randomUUID();
        // Insertar el puesto
        const { error: puestoError } = await supabase
          .from("Puesto_proyecto")
          .insert({
            id: puestoId,
            ID_Proyecto: proyectoId,
            Puesto: role.role,
            N_puestos: role.quantity,
          });
  
        if (puestoError) throw puestoError;
  
        // Insertar las habilidades asociadas a este puesto
        for (const skill of role.skills) {
          const { error: phError } = await supabase
            .from("Puesto_habilidades")
            .insert({
              Id_puesto: puestoId,
              Id_habilidad: skill.id,
              nivel: skill.level,
            });
          if (phError) throw phError;
        }
      }

      // 3. Insertar habilidades requeridas generales en Proyecto_Habilidades
      for (const skill of selectedSkills) {
        const { error: phError } = await supabase
          .from("Proyecto_Habilidades")
          .insert({
            ID_Proyecto: proyectoId,
            ID_Habilidad: skill.id,
            nivel: skill.level,
          });
        if (phError) throw phError;
      }
  
      router.push("../proyectos/" + proyectoId);
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
        const { data, error } = await supabase.rpc('get_available_delivery_leads');
        if (error) throw error;
        setDeliveryLeads(data || []);

        // Obtener los links de avatar para cada lead
        const avatarLinks: { [id: string]: string | null } = {};
        await Promise.all(
          (data || []).map(async (lead: any) => {
            avatarLinks[lead.id_empleado] = await fetchAvatarURL(lead.id_empleado);
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
    .filter(lead =>
      (!selectedDeliveryLead || lead.id_empleado !== selectedDeliveryLead.id_empleado) &&
      (
        lead.nombre_empleado.toLowerCase().includes(leadSearch.toLowerCase()) ||
        String(lead.id_empleado).includes(leadSearch)
      )
    );
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Columna principal */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900">Nuevo Proyecto</h1>
              <p className="mt-2 text-sm text-gray-600">
                Completa la información para crear un nuevo proyecto
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
                      className={`mb-6 border-2 border-dashed rounded-lg p-4 flex items-center min-h-[56px] transition-colors ${
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
                        <div className="flex items-center space-x-3">
                          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={leadAvatars[selectedDeliveryLead.id_empleado] || "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"}
                        alt={`Avatar de ${selectedDeliveryLead.nombre_empleado}`}
                        width={60}
                        height={60}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                          <span className="font-medium">{selectedDeliveryLead.nombre_empleado}</span>
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => setSelectedDeliveryLead(null)}
                            title="Quitar Delivery Lead"
                          >
                            ×
                          </button>
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
            <img
              src={imagePreview}
              alt="Vista previa"
              className="w-32 h-32 object-cover rounded mb-2 border"
            />
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
                  <div key={idx} className="flex flex-col gap-1">
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
                        onClick={() => removeRole(idx)}
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
  <div className="flex flex-wrap gap-2 mt-1">
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creando...
                    </>
                  ) : "Crear Proyecto"}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Columna derecha */}
        <div className="lg:col-span-3 space-y-6">
      
      
      {/* Tarjeta de Delivery Leads con tu consulta SQL */}
      <div className="bg-purple-50 rounded-xl shadow-md p-6">
        <h3 className="font-semibold text-lg mb-4 text-purple-700">Delivery Leads Disponibles</h3>
        {loadingLeads ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
            <span className="ml-3">Cargando delivery leads...</span>
          </div>
        ) : deliveryLeads.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">No hay delivery leads disponibles actualmente.</p>
          </div>
        ) : (
          <>
          
            {/* Barra de búsqueda y paginación */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por nombre o ID..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pl-2"
                />
                {leadSearch && (
                  <button
                    type="button"
                    onClick={() => setLeadSearch('')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            {/* Paginación */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Página {leadPage} de {totalPages}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setLeadPage(prev => Math.max(prev - 1, 1))}
                  className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50"
                  disabled={leadPage === 1}
                >
                  ←
                </button>
                <button
                  onClick={() => setLeadPage(prev => Math.min(prev + 1, totalPages))}
                  className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50"
                  disabled={leadPage === totalPages}
                >
                  →
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
              {paginatedLeads.map((lead) => (
                <div
                  key={lead.id_empleado}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-move"
                  draggable
                  onDragStart={e => {
                    e.dataTransfer.setData("application/json", JSON.stringify(lead));
                  }}
                >
                  <div className="flex items-start">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={leadAvatars[lead.id_empleado] || "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"}
                        alt={`Avatar de ${lead.nombre_empleado}`}
                        width={60}
                        height={60}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{lead.nombre_empleado}</h4>
                    </div>
                  </div>
                </div>
            ))}
          </div>
          </>
        )}
      </div>
    </div>
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
    </div>
  );
}