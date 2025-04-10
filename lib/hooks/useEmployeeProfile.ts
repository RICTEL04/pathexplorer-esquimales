// lib/hooks/useEmployeeProfile.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  getEmployeeFullData, 
  updateInterests,
  updateEmployeeSkills,
  EmployeeFullData,
  Habilidad
} from '@/lib/employeeService';

export const useEmployeeProfile = (employeeId: string) => {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<EmployeeFullData>({
    employee: null,
    peopleLead: null,
    capabilityLead: null,
    contacto: null,
    informes: [], 
    softSkills: [],
    hardSkills: [],
    intereses: [],
    proyectos: [] 
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

  const handleInterestsChange = async (newInterests: string[]) => {
    if (!isOwner || !profileData.employee) return;
  
    try {

      
      const updatedIntereses = await updateInterests(
        profileData.employee.ID_Empleado,
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
        employeeId: profileData.employee?.ID_Empleado,
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
    handleInterestsChange,
    handleSoftSkillsChange,
    handleHardSkillsChange
  };
};

export const ownProfile = () => {
    const router = useRouter();
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState<EmployeeFullData>({
      employee: null,
      peopleLead: null,
      capabilityLead: null,
      contacto: null,
      informes: [], 
      softSkills: [],
      hardSkills: [],
      intereses: [],
      proyectos: [] 
    });
  
    const isOwner = true;
  
    useEffect(() => {
      const fetchSessionAndData = async () => {
        // Obtener sesión
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        
        if (!session) {
          router.push('/login');
          return;
        }
        
        const employeeId = session.user.id;

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
    }, [ router]);
  
    const handleInterestsChange = async (newInterests: string[]) => {
      if (!isOwner || !profileData.employee) return;
      
      try {
        const updatedIntereses = await updateInterests(
          profileData.employee.ID_Empleado,
          profileData.intereses,
          newInterests
        );
        
        setProfileData(prev => ({
          ...prev,
          intereses: updatedIntereses
        }));
      } catch (error) {
        console.error('Error updating interests:', error);
      }
    };
  

    const handleSoftSkillsChange = async (newSkill: Habilidad[]) => {

      if (!isOwner || !profileData.employee) return;

      try {
        const updatedSkills = await updateEmployeeSkills(
          profileData.employee?.ID_Empleado,
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

      if (!isOwner || !profileData.employee) return;

      try {
        const updatedSkills = await updateEmployeeSkills(
          profileData.employee?.ID_Empleado,
          'hard',
          profileData.hardSkills,
          newSkill
        );
  
      } catch (error) {
        console.error('Error updating hard skills:', error);
      }
    };

    return {
      session,
      loading,
      profileData,
      isOwner,
      handleInterestsChange,
      handleSoftSkillsChange,
      handleHardSkillsChange
    };
  };