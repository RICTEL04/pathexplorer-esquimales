import React, { use, useEffect, useState } from "react";
import Card from "../Card";
import { supabase } from "@/lib/supabase";
import { SkillRefreshProvider } from "@/context/SkillRefreshContext";
import { ExperienceModalProvider } from "@/context/ModalContext";
import ExperienceModal from "@/components/ModalExperience";
import ViewExperienceModal from "@/components/ViewExperienceModal";
import EditExperienceModal from "@/components/EditExperienceModal";
import ReadOnlyProfile from "./ReadOnlyProfile";

interface Departamento {
    Nombre: string;
    Descripcion: string;
}

interface PeopleLead {
    ID: string;
    ID_Empleado: string;
    Nombre: string;
}

interface CapabilityLead {
    ID_Empleado: string;
    ID_Departamento: string;
    Departamento: Departamento
    ID_CapabilityLead: string;
    Nombre: string;
}

interface EmployeeProfileProps {
    id: string;
}

const fetchAvatarURL = async (employeeID: string | null): Promise<string | null> => {
  if (!employeeID) return null;
  const bucketName = "profile-pictures";
  try {
    const { data: files, error } = await supabase.storage
      .from(bucketName)
      .list(`${employeeID}`, { limit: 1, search: 'perfil' });
    if (error || !files || files.length === 0) return null;
    const actualFileName = files[0].name;
    const fullFilePath = `${employeeID}/${actualFileName}`;
    const { data: signedUrl } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fullFilePath, 3600);
    return signedUrl?.signedUrl ?? null;
  } catch {
    return null;
  }
};

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ id }) => {
    const [profileData, setProfileData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [peopleLead, setPeopleLead] = useState<PeopleLead | null>(null);
    const [capabilityLead, setCapabilityLead] = useState<CapabilityLead | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [peopleLeadAvatar, setPeopleLeadAvatar] = useState<string | null>(null);

    const getEmployeeName = async (employeeID: string): Promise<string> => {
        const { data, error } = await supabase
            .from("Empleado")
            .select("Nombre")
            .eq("ID_Empleado", employeeID)
            .single();
        if (error) {
            console.error("Error al obtener el nombre del empleado:", error);
            return "Empleado desconocido";
        }
        return data ? data.Nombre : "Empleado desconocido";
    }

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("Empleado")
                .select(`
                    ID_Empleado,
                    Nombre,
                    Rol,
                    Nivel,
                    FechaContratacion,
                    ID_Departamento,
                    Biografia,
                    Metas (
                        ID_meta,
                        ID_Empleado,
                        Nombre,
                        Descripcion,
                        Tipo_Meta,
                        Plazo,
                        Fecha_limite
                    ),
                    Certificados (
                        ID_Certificado,
                        Nombre,
                        Fecha_caducidad,
                        Documento,
                        Verificacion,
                        Descripcion
                    ),
                    Intereses (
                        ID_Interes,
                        Descripcion
                    ),
                    Contacto (
                        Email,
                        Num_Telefono,
                        Estado,
                        Pais
                    ),
                    Delivery_Lead (
                        ID_DeliveryLead,
                        ID_Empleado,
                        Proyectos (
                        ID_Proyecto,
                        Nombre,
                        Descripcion,
                        Status,
                        fecha_inicio,
                        fecha_fin
                        )
                    ),
                    People_lead!ID_PeopleLead (
                        ID_Empleado,
                        ID
                        )
                    `)
                .eq("ID_Empleado", id)
                .single();

            if (data) {
                setProfileData(data);
                // Handle People_Lead as array or object
                let peopleLeadRaw = null;
                if (Array.isArray(data.People_lead)) {
                    peopleLeadRaw = data.People_lead.length > 0 ? data.People_lead[0] : null;
                } else if (data.People_lead && typeof data.People_lead === "object") {
                    peopleLeadRaw = data.People_lead;
                }
                if (peopleLeadRaw) {
                    const name = await getEmployeeName(peopleLeadRaw.ID_Empleado);
                    setPeopleLead({
                        ID: peopleLeadRaw.ID,
                        ID_Empleado: peopleLeadRaw.ID_Empleado,
                        Nombre: name,
                    });
                }
            }
            console.log("Perfil cargado:", data);
            if (error) console.error("Error al cargar el perfil:", error);
            console.log("Capability Lead:", capabilityLead);
            setLoading(false);
        };
        if (id) fetchProfile();
    }, [id]);

    // Obtener avatar del empleado
    useEffect(() => {
      if (!id) return;
      fetchAvatarURL(id).then(setAvatarUrl);
    }, [id]);

    // Obtener avatar del People Lead cuando se cargue
    useEffect(() => {
      if (peopleLead?.ID_Empleado) {
        fetchAvatarURL(peopleLead.ID_Empleado).then(setPeopleLeadAvatar);
      }
    }, [peopleLead?.ID_Empleado]);

    if (loading) return <div className="p-8">Cargando perfil...</div>;
    if (!profileData) return <div className="p-8">No se encontró el perfil.</div>;

    // Prepare data for Profile component (read-only, no handlers)
    const SoftSkills = profileData.softSkills;
    const HardSkills = profileData.hardSkills;
    const interests = (profileData.Intereses || []).map((h: any) => h.Descripcion);
    const contact = profileData.Contacto[0] || {};

    const userProfileData = {
        id: profileData.ID_Empleado,
        name: profileData.Nombre,
        role: profileData.Rol,
        level: profileData.Nivel,
        department: profileData.Departamento,
        biography: profileData.Biografia,
        email: contact.Email,
        phone: contact.Num_Telefono,
        direction: {
            Estado: contact.Estado || "",
            Pais: contact.Pais || ""
        },
        avatarUrl: profileData.AvatarURL,
        projects: (profileData.proyectos || []).map((p: any) => ({
            id: p.idProyecto,
            name: p.nombreProyecto,
            client: p.nombreCliente,
            puesto: p.puesto,
            status: p.status,
            cargability: "",
            endDate: ""
        })),
        certifications: profileData.Certificados || [],
        goals: [],
        SoftSkills,
        HardSkills,
        interests,
        peopleLead: profileData.People_lead,
        editable: false // Make sure Profile is read-only
    };

    return (
        <div className="h-[90vh] bg-gray-100 p-4 w-full overflow-y-scroll no-scrollbar">
            <SkillRefreshProvider>
                <ExperienceModalProvider>
                    <div className="grid grid-cols-1 lg:grid-cols-16 gap-6 w-full">
                        {/* Fila horizontal para People Lead, Capability Lead, Informes */}
                        <div className="lg:col-span-16">
                            <div className="flex flex-row gap-6 w-full">
                                {/* People Lead */}
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg font-bold mb-4">People Lead</h2>
                                    {peopleLead ? (
                                        <Card className="p-3 sm:p-4 h-auto hover:shadow-md">
                                            <div className="flex flex-col xs:flex-row items-center xs:items-start gap-3 sm:gap-4">
                                                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={peopleLeadAvatar || "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"}
                                                        width={60}
                                                        height={60}
                                                        className="object-cover w-full h-full"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="text-center xs:text-left min-w-0">
                                                    <p className="font-medium text-sm sm:text-base break-words">
                                                        {peopleLead.Nombre}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-500 break-words">
                                                        People Lead
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    ) : (
                                        <Card className="p-4 h-auto flex items-center justify-center min-h-[80px] hover:shadow-md">
                                            <p className="text-gray-500 text-sm sm:text-base text-center">
                                                No hay People Lead asignado
                                            </p>
                                        </Card>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Columna central */}
                        <div className="lg:col-span-16 space-y-6">
                          <ReadOnlyProfile {...userProfileData} avatarUrl={avatarUrl} />
                        </div>
                    </div>
                    <ExperienceModal />
                    <ViewExperienceModal />
                    <EditExperienceModal />
                </ExperienceModalProvider>
            </SkillRefreshProvider>
        </div>
    );
};

export default EmployeeProfile;