"use client"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSkillRefresh } from "@/context/SkillRefreshContext";

interface Skill {
  id_habilidad: string;
  nombre: string;
  nivel: string;
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
          .rpc('obtener_habilidades_empleado_excluyendo_categoria', {
            p_id_empleado: employeeId,
            p_id_categoria_excluir: categoryId
          });

        if (rpcError) throw rpcError;

        // Validación y mapeo de datos
        const validatedData = (data || []).map((item: any) => ({
          id_habilidad: item.id_habilidad,
          nombre: item.nombre || 'Sin nombre',
          nivel: item.nivel?.toLowerCase() || 'beginner' // Aseguramos que siempre haya un nivel
        }));

        setSkills(validatedData);
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

  const getLevelColor = (level: string = '') => {
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

  const getLevelText = (level: string = '') => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'Experto';
      case 'intermediate':
        return 'Intermedio';
      case 'beginner':
        return 'Principiante';
      default:
        return level || 'N/A';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{error}</span>
    </div>;
  }

  if (skills.length === 0) {
    return (
        <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Habilidades Técnicas</h2>
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
      No se encontraron habilidades técnicas.
    </div>
    </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Habilidades Técnicas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.id_habilidad} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900 text-lg">{skill.nombre}</h3>
              <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${getLevelColor(skill.nivel)}`}>
                {getLevelText(skill.nivel)}
              </span>
            </div>
            
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${getLevelColor(skill.nivel)}`}
                  style={{
                    width: skill.nivel === 'expert' ? '100%' : 
                           skill.nivel === 'intermediate' ? '66%' : '33%'
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