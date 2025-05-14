// lib/hooks/useEmployeeProfile.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  getEmployeeFullData, 
  updateEmployeePhone,
  updateEmployeeAddress,
  updateInterests,
  updateEmployeeBiography,
  updateEmployeeSkills,
  EmployeeFullData,
  updateEmployeeAvatarURL,
  Habilidad,
  Direccion
} from '@/lib/employeeService';
import { isNull } from 'node:util';

export const useEmployeeProfile = (employeeId: string) => {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<EmployeeFullData>({
    ID_Empleado: undefined,
    Nombre: undefined,
    Rol: undefined,
    Nivel: undefined,
    Biografia : null,
    AvatarURL : null,
    Departamento: null,
    peopleLead: null,
    capabilityLead: null,
    contacto: null,
    informes: [], 
    softSkills: [],
    hardSkills: [],
    intereses: [],
    proyectos: [] ,
    certificados: [],
    direccion: null,
  });

  const isOwner = session?.user?.id === employeeId;

  useEffect(() => {
    const fetchSessionAndData = async () => {
      // Obtener sesión
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (!session) {
        router.push('/login');
        return;
      }

      try {
        // Obtener datos del empleado
        const data = await getEmployeeFullData(employeeId);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        router.push('/profile/error');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndData();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) router.push('/login');
    });

    return () => subscription.unsubscribe();
  }, [employeeId, router]);


  const handleUpdateEmployeeAvatar = async(Imagen: File) => {
    if (!profileData.ID_Empleado) return;

    try {
      console.log("Agregar " + Imagen + " a: " + profileData.ID_Empleado + "/" + "perfil")
      if (!Imagen || !(Imagen instanceof File) || Imagen.size === 0) {
        console.error('La imagen no es válida o está vacía');
        return;
      }
      await updateEmployeeAvatarURL(profileData.ID_Empleado, Imagen);
    } catch (error) {
      console.error('Error updating phone:', error);
      throw error;
    }

  }

  const handlePhoneChange = async (newPhone: string) => {
    if (!profileData.ID_Empleado) return;
    
    try {
      const updatedPhone = await updateEmployeePhone(profileData.ID_Empleado, newPhone);
      
      setProfileData(prev => ({
        ...prev,
        contacto: {
          ...prev.contacto!,
          Num_Telefono: updatedPhone
        }
      }));
    } catch (error) {
      console.error('Error updating phone:', error);
      throw error;
    }
  };

  const handleBiographyChange = async (newBiography: string) => {
    if (!profileData.ID_Empleado) return;
    
    try {
      const updatedBiography = await updateEmployeeBiography(profileData.ID_Empleado, newBiography);
      
      setProfileData(prev => ({
        ...prev,
        Biografia: updatedBiography
      }));
    } catch (error) {
      console.error('Error updating phone:', error);
      throw error;
    }
  };


  const handleAddressChange = async (newAddress: Direccion) => {
    if (!profileData.ID_Empleado) return;
    
    try {
      const updatedAddress = await updateEmployeeAddress(
        profileData.ID_Empleado, 
        newAddress
      );
      
      setProfileData(prev => ({
        ...prev,
        direccion: updatedAddress
      }));
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  };


  const handleInterestsChange = async (newInterests: string[]) => {
    if (!isOwner ) return;
  
    try {

      
      const updatedIntereses = await updateInterests(
        employeeId,
        profileData.intereses, 
        newInterests
      );
      
      setProfileData(prev => ({
        ...prev,
        intereses: updatedIntereses
      }));
    } catch (error) {
      console.error('Error handling interests change:', {
        error: error instanceof Error ? error.message : error,
        employeeId,
        newInterests
      });
    }
  };


    // En tu componente o hook
  const handleSoftSkillsChange = async (newSkill: Habilidad[]) => {

    try {
      const updatedSkills = await updateEmployeeSkills(
        employeeId,
        'soft',
        profileData.softSkills,
        newSkill
      );
      // Actualizar el estado con las nuevas habilidades
    } catch (error) {
      console.error('Error updating soft skills:', error);
    }
  };

  const handleHardSkillsChange = async (newSkill: Habilidad[]) => {


    try {
      const updatedSkills = await updateEmployeeSkills(
        employeeId,
        'hard',
        profileData.hardSkills,
        newSkill
      );
      // Actualizar el estado con las nuevas habilidades
    } catch (error) {
      console.error('Error updating hard skills:', error);
    }
  };

  return {
    session,
    loading,
    profileData,
    isOwner,
    handlePhoneChange,
    handleBiographyChange,
    handleUpdateEmployeeAvatar,
    handleAddressChange,
    handleInterestsChange,
    handleSoftSkillsChange,
    handleHardSkillsChange,

  };
};
