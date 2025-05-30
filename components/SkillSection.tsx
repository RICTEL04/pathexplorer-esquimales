"use client"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSkillRefresh } from "@/context/SkillRefreshContext";

interface Skill {
  id_habilidad: string;
  nombre_habilidad: string;
  nivel_habilidad: string;
}

const EmployeeSkillsByCategory = ({ employeeId, categoryId }: { employeeId: string; categoryId: string }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { refreshFlag } = useSkillRefresh();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error: rpcError } = await supabase
          .rpc('obtener_habilidades_por_categoria', {
            p_id_empleado: employeeId,
            p_id_categoria: categoryId
          });

        if (rpcError) throw rpcError;

        // Validación de datos
        if (data && Array.isArray(data)) {
          setSkills(data as Skill[]);
        } else {
          setSkills([]);
        }
      } catch (err: any) {
        console.error('Error al cargar habilidades:', err.message);
        setError(err.message || 'Error al cargar las habilidades');
      } finally {
        setLoading(false);
      }
    };

    if (employeeId && categoryId) {
      fetchSkills();
    }
  }, [employeeId, categoryId, refreshFlag]);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'beginner':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getLevelText = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'Experto';
      case 'intermediate':
        return 'Intermedio';
      case 'beginner':
        return 'Principiante';
      default:
        return level;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (skills.length === 0) {
    return (
        <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Habilidades blandas</h2>
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
      No se encontraron habilidades blandas.
    </div>
    </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Habilidades blandas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.id_habilidad} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900 text-lg">{skill.nombre_habilidad}</h3>
              <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${getLevelColor(skill.nivel_habilidad)}`}>
                {getLevelText(skill.nivel_habilidad)}
              </span>
            </div>
            
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${getLevelColor(skill.nivel_habilidad)}`}
                  style={{
                    width: skill.nivel_habilidad.toLowerCase() === 'expert' ? '100%' : 
                           skill.nivel_habilidad.toLowerCase() === 'intermediate' ? '66%' : '33%'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeSkillsByCategory;