import React, { useState, useRef, useEffect } from 'react';
import { FiEdit2, FiCheck, FiX, FiUpload } from 'react-icons/fi';
import { supabase } from '@/lib/supabase';

interface AvatarSectionProps {
  avatarUrl?: string | null;
  name?: string | null;
  editable?: boolean;
  onSave?: (imageFile: File) => Promise<void>;
  empleadoId: string; // Cambia cargabilidad por empleadoId
}

const AvatarSection: React.FC<AvatarSectionProps> = ({
  avatarUrl,
  name = null,
  editable = false,
  onSave,
  empleadoId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cargabilidad, setCargabilidad] = useState<number>(0);
  const [animatedCarga, setAnimatedCarga] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Obtener cargabilidad desde Supabase usando el id
  useEffect(() => {
    const fetchCargabilidad = async () => {
      if (!empleadoId) return;
      const { data, error } = await supabase
        .from('Empleado')
        .select('Cargabilidad')
        .eq('ID_Empleado', empleadoId)
        .single();
      if (error) {
        setCargabilidad(0);
      } else {
        setCargabilidad(data?.Cargabilidad ?? 0);
      }
    };
    fetchCargabilidad();
  }, [empleadoId]);

  // Animación de la barra de progreso
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 1500; // ms
    const from = 0;
    const to = Math.min(Math.max(cargabilidad, 0), 100);

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setAnimatedCarga(from + (to - from) * progress);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    setAnimatedCarga(0);
    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [cargabilidad]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('Formato de imagen no soportado. Use JPEG, PNG, WEBP o GIF.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen es demasiado grande (máximo 5MB)');
        return;
      }

      setSelectedFile(file);
      setError(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (onSave) {
        await onSave(selectedFile);
      }
      
      setIsEditing(false);
    } catch (err) {
      setError('Error al subir la imagen. Por favor intente nuevamente.');
      console.error('Error uploading avatar:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    setIsEditing(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <div
          className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-visible border-4
            ${isEditing ? 'border-blue-500' : 'border-gray-200'} shrink-0`}
          style={{ boxShadow: '0 0 0 6px rgba(168,85,247,0.10)' }}
        >
          {/* SVG de progreso circular mejorado */}
          <svg
            className="absolute -top-5 -left-5 w-[144px] h-[144px] md:w-[180px] md:h-[180px] z-0 pointer-events-none"
            viewBox="0 0 90 90"
          >
            <defs>
              <linearGradient id="carga-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#f59e42" />
              </linearGradient>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                {/* @ts-ignore */}
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Fondo gris */}
            <circle
              cx="45"
              cy="45"
              r="36"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="7"
            />
            {/* Progreso con gradiente y glow, inicia desde abajo */}
            <circle
              cx="45"
              cy="45"
              r="36"
              fill="none"
              stroke="url(#carga-gradient)"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 36}
              strokeDashoffset={
                2 * Math.PI * 36 * (1 - Math.min(Math.max(animatedCarga, 0), 100) / 100)
              }
              strokeLinecap="butt"
              style={{
                transition: 'stroke-dashoffset 0s',
                transform: 'rotate(90deg)',
                transformOrigin: '45px 45px'
              }}
              filter="url(#glow)"
            />
          </svg>
          {/* Avatar con botón de editar encima */}
          <div className="relative w-full h-full z-10">
            <img
              src={previewUrl || avatarUrl || "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"}
              alt={`${name || 'Usuario'}'s profile picture`}
              className="object-cover w-full h-full rounded-full"
            />
            {editable && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-transparent focus:outline-none"
                aria-label="Editar foto de perfil"
                style={{ border: "none", background: "transparent", padding: 0 }}
              >
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center w-10 h-10 bg-white bg-opacity-80 rounded-full m-auto">
                  <FiEdit2 className="text-gray-700 text-lg" />
                </div>
              </button>
            )}
          </div>
        </div>
        {/* Número de cargabilidad debajo del avatar */}
        <div className="w-full flex justify-center mt-2">
          <span className="text-sm font-semibold text-violet-600 bg-violet-50 px-3 py-0.5 rounded-full shadow-sm">
            Cargabilidad: {Math.round(cargabilidad)}%
          </span>
        </div>
        {/* Fin número de cargabilidad */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/png, image/webp, image/gif"
          onChange={handleFileChange}
          className="hidden"
          disabled={!isEditing}
        />
      </div>

      {isEditing && (
        <div className="space-y-3 w-full max-w-xs">
          {error && (
            <div className="p-2 bg-red-100 text-red-800 rounded text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={triggerFileInput}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
            >
              <FiUpload className="text-base" />
              {selectedFile ? 'Cambiar' : 'Seleccionar'}
            </button>

            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors shadow-sm disabled:opacity-50"
            >
              <FiX className="text-base" />
              Cancelar
            </button>

            {selectedFile && (
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm disabled:opacity-50"
              >
                <FiCheck className="text-base" />
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarSection;