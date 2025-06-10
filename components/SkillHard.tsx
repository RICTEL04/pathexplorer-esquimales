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
  const [currentPage, setCurrentPage] = useState(1);
  const skillsPerPage = 6;

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

  useEffect(() => {
    setCurrentPage(1); // Reinicia a la primera página cuando cambian los datos
  }, [employeeId, categoryId, refreshFlag]);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'bg-purple-600';
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
        return level || 'N/A';
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
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="inline-block">Habilidades técnicas</span>
          <span className="inline-flex items-center justify-center bg-blue-100 text-blue-700 text-base font-semibold rounded-full px-3 py-0.5">
            0
          </span>
        </h2>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          No se encontraron habilidades técnicas.
        </div>
      </div>
    );
  }

  // Paginación
  const levelOrder = { expert: 1, intermediate: 2, beginner: 3 };
  const sortedSkills = [...skills].sort(
    (a, b) =>
      (levelOrder[a.nivel.toLowerCase() as keyof typeof levelOrder] ?? 99) -
      (levelOrder[b.nivel.toLowerCase() as keyof typeof levelOrder] ?? 99)
  );
  const totalPages = Math.ceil(sortedSkills.length / skillsPerPage);
  const startIndex = (currentPage - 1) * skillsPerPage;
  const paginatedSkills = sortedSkills.slice(startIndex, startIndex + skillsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="inline-block">Habilidades técnicas</span>
          <span className="inline-flex items-center justify-center bg-purple-100 text-purple-700 text-base font-semibold rounded-full px-3 py-0.5">
            {skills.length}
          </span>
        </h2>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded-lg border border-purple-300 bg-purple hover:bg-purple-100 transition disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ◀
            </button>
            <span className="text-gray-700 font-medium">
              {currentPage} / {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded-lg border border-purple-300 bg-purple hover:bg-purple-100 transition disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              ▶
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedSkills.map((skill) => (
          <div key={skill.id_habilidad} className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 text-lg truncate">{skill.nombre}</h3>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${getLevelColor(skill.nivel)} ${
                  skill.nivel.toLowerCase() === 'expert' ? 'text-white' : 'text-white'
                }`}
              >
                {getLevelText(skill.nivel)}
              </span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${getLevelColor(skill.nivel)}`}
                  style={{
                    width: skill.nivel.toLowerCase() === 'expert' ? '100%' :
                          skill.nivel.toLowerCase() === 'intermediate' ? '66%' : '33%'
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