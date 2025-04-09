// lib/hooks/useEmployeeProfile.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  getEmployeeFullData, 
  updateInterests,
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
    habilidades: [],
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
      const updatedHabilidades = await updateInterests(
        profileData.employee.ID_Empleado,
        profileData.habilidades,
        newInterests
      );
      
      setProfileData(prev => ({
        ...prev,
        habilidades: updatedHabilidades
      }));
    } catch (error) {
      console.error('Error updating interests:', error);
    }
  };

  return {
    session,
    loading,
    profileData,
    isOwner,
    handleInterestsChange
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
      habilidades: [],
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
        const updatedHabilidades = await updateInterests(
          profileData.employee.ID_Empleado,
          profileData.habilidades,
          newInterests
        );
        
        setProfileData(prev => ({
          ...prev,
          habilidades: updatedHabilidades
        }));
      } catch (error) {
        console.error('Error updating interests:', error);
      }
    };
  
    return {
      session,
      loading,
      profileData,
      isOwner,
      handleInterestsChange
    };
  };