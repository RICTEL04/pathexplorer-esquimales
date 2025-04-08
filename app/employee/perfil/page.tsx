"use client"
import React from 'react';
import Profile from '@/components/Profile';
import Card from '@/components/Card'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Habilidad
{
  ID_Habilidad: string,
  Tipo: string,
  Descripcion: string,
}


interface Employee {
  ID_Empleado: string;
  Nombre: string;
  Rol: string;
  Nivel: string;
  ID_Departamento: string;
  Cargabilidad: string;
  ID_CapabilityLead: string | null;
  ID_PeopleLead: string | null;
  Contacto_ID: string;
  FechaContratacion: string;
  FechaUltNivel: string;
  Habilidad : Habilidad;
}

interface PeopleLead {
  id: string;
  Nombre: string;
  avatarUrl: string;
}

interface CapabilityLead {
  id: string;
  Nombre: string;
  avatarUrl: string;
}

interface Informe {
  id: string;
  name: string;
}


const UserProfile = () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [peopleLead, setPeopleLead] = useState<PeopleLead | null>(null);
    const [capabilityLead, setCapabilityLead] = useState<CapabilityLead | null>(null);
    const [informes, setInformes] = useState<Informe[]>([]);
    const [habilidades, setHabilidades] = useState<Habilidad[]>([])
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            // Obtener la sesión actual
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            
            if (!session) {
                router.push('/login');
                return;
            }

            try {
                // Obtener datos del empleado
                const { data: employeeData, error: employeeError } = await supabase
                    .from('Empleado')
                    .select('*')
                    .eq('ID_Empleado', session.user.id)
                    .single();

                if (employeeError) throw employeeError;
                setEmployee(employeeData);

                // Obtener People Lead si existe
                if (employeeData?.ID_PeopleLead) {
                    const { data: peopleLeadData, error: peopleLeadError } = await supabase
                        .from('Empleado')
                        .select('ID_Empleado, Nombre')
                        .eq('ID_Empleado', employeeData.ID_PeopleLead)
                        .single();

                    if (!peopleLeadError && peopleLeadData) {
                        setPeopleLead({
                            id: peopleLeadData.ID_Empleado,
                            Nombre: peopleLeadData.Nombre,
                            avatarUrl: ""
                        });
                    }
                }
                
                // Obtener Capability Lead si existe
                if (employeeData?.ID_CapabilityLead) {
                    const { data: capabilityLeadData, error: capabilityLeadError } = await supabase
                        .from('Empleado')
                        .select('ID_Empleado, Nombre')
                        .eq('ID_Empleado', employeeData.ID_CapabilityLead)
                        .single();

                    if (!capabilityLeadError && capabilityLeadData) {
                        setCapabilityLead({
                            id: capabilityLeadData.ID_Empleado,
                            Nombre: capabilityLeadData.Nombre,
                            avatarUrl: ""
                        });
                    }
                }

                // Obtener informes (ejemplo, ajusta según tu estructura real)
                const { data: informesData, error: informesError } = await supabase
                    .from('Informes')
                    .select('id, name')
                    .eq('empleado_id', session.user.id);

                if (!informesError) {
                    setInformes(informesData || []);
                }

                // Obtener datos de habilidades
                const { data: habilidadesData, error: habilidadesError } = await supabase
                .from('Habilidades')
                .select('ID_Habilidad, Tipo, Descripcion')
                .eq('ID_Empleado', session.user.id);



                if (!habilidadesError) {
                    setHabilidades(habilidadesData || []);
                }


            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
                console.log("Habilidades" + habilidades)
            }
        };

        fetchData();

        // Escuchar cambios en la autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, [router]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!session) {
        return <div>No autenticado...</div>;
    }

    if (!employee) {
        return <div>No se encontraron datos del empleado</div>;
    }

    const softSkills = habilidades
    .filter(h => h.Tipo === 'soft')
    .map(h => h.Descripcion);

    const hardSkills = habilidades
        .filter(h => h.Tipo === 'hard')
        .map(h => h.Descripcion);

    const interests = habilidades
        .filter(h => h.Tipo === 'interest')
        .map(h => h.Descripcion);
        

    const handleInterestsChange = async (newInterests: string[]) => {
        try {

    
            // 2. Identificar cambios
            const interestsToAdd = newInterests.filter(
                interest => !interests.includes(interest)
            );
            
            const interestsToRemove = interests.filter(
                interest => !newInterests.includes(interest)
            );
    
            // 3. Procesar eliminaciones
            if (interestsToRemove.length > 0) {
                // Obtener IDs de los intereses a eliminar
                const idsToRemove = habilidades
                    .filter(h => 
                        h.Tipo === 'interest' && 
                        interestsToRemove.includes(h.Descripcion)
                    )
                    .map(h => h.ID_Habilidad);
    
                if (idsToRemove.length > 0) {
                    const { error } = await supabase
                        .from('Habilidades')
                        .delete()
                        .in('ID_Habilidad', idsToRemove);
                    
                    if (error) throw error;
                }
            }
    
            // 4. Procesar adiciones
            if (interestsToAdd.length > 0) {
                const newRecords = interestsToAdd.map(descripcion => ({
                    ID_Empleado: session?.user.id,
                    Tipo: 'interest',
                    Descripcion: descripcion
                }));
    
                const { error } = await supabase
                    .from('Habilidades')
                    .insert(newRecords);
                
                if (error) throw error;
            }
    
            // 5. Actualizar el estado local
            if (interestsToAdd.length > 0 || interestsToRemove.length > 0) {
                // Refrescar los datos desde Supabase
                const { data: updatedHabilidades, error } = await supabase
                    .from('Habilidades')
                    .select('ID_Habilidad, Tipo, Descripcion')
                    .eq('ID_Empleado', session?.user.id);
                
                if (error) throw error;
                
                setHabilidades(updatedHabilidades || []);
            }
    
            console.log('Intereses actualizados correctamente');
        } catch (error) {
            console.error('Error al actualizar intereses:', error);
            // Aquí podrías mostrar una notificación al usuario
        }
    };

    // Datos para el componente Profile
    const userProfileData = {
        id: employee.ID_Empleado,
        name: employee.Nombre,
        role: employee.Rol,
        level: employee.Nivel,
        department: employee.ID_Departamento,
        email: "",
        phone: "",
        direction: {
            city: "",
            state: "",
            country: ""
        },
        avatarUrl: "",
        bio: "",
        projects: [],
        certifications: [],
        goals: [],
        softSkills,
        hardSkills,
        interests,
        onInterestsChange: handleInterestsChange

    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                {/* Columna izquierda */}
                <div className="lg:col-span-2 space-y-6">
                    {/* People Lead */}
                    <h2 className="text-lg font-bold mb-4">People Lead</h2>
                    {peopleLead ? (
                        <Card className="p-4 h-auto">
                            <div className="flex items-start space-x-3">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={peopleLead.avatarUrl || "https://via.placeholder.com/60"}
                                        alt={`${peopleLead.Nombre}'s avatar`}
                                        width={60}
                                        height={60}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="min-w-0"> 
                                    <p className="font-medium break-words">{peopleLead.Nombre}</p>
                                    <p className="text-sm text-gray-500 break-words">People Lead</p>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <Card className="p-4 h-auto">
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">No hay People Lead asignado</p>
                            </div>
                        </Card>
                    )}

                    {/* Capability Lead */}
                    <h2 className="text-lg font-bold mb-4">Capability Lead</h2>
                    {capabilityLead ? (
                        <Card className="p-4 h-auto">
                            <div className="flex items-center space-x-3">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 shrink-0">
                                    <img
                                        src={capabilityLead.avatarUrl || "https://via.placeholder.com/60"}
                                        alt={`${capabilityLead.Nombre}'s avatar`}
                                        width={112}
                                        height={112}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium">{capabilityLead.Nombre}</p>
                                    <p className="text-sm text-gray-500">Capability Lead</p>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <Card className="p-4 h-auto">
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">No hay Capability Lead asignado</p>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Columna central */}
                <div className="lg:col-span-8 space-y-6">
                    <Profile {...userProfileData} />
                </div>

                {/* Columna derecha */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Sección de Informes */}
                    <h2 className="text-lg font-bold mb-4">Informes</h2>
                    {informes.length > 0 ? (
                        <div className="space-y-3">
                            {informes.map((informe) => (
                                <Card key={informe.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                                    <div className="flex items-start justify-between">
                                        <p className="text-sm font-medium break-words min-w-0 flex-1">
                                            {informe.name}
                                        </p>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M9 5l7 7-7 7" 
                                            />
                                        </svg>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="p-4">
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">No hay informes disponibles</p>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;