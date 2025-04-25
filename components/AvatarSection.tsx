import React, { useState, useRef } from 'react';
import { FiEdit2, FiCheck, FiX, FiUpload } from 'react-icons/fi';

interface AvatarSectionProps {
  avatarUrl?: string | null;
  name?: string | null;
  editable?: boolean;
  onSave?: (imageFile: File) => Promise<void>;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({
  avatarUrl,
  name = null,
  editable = false,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 ${isEditing ? 'border-blue-500' : 'border-gray-200'} shrink-0`}>
          <img
            src={previewUrl || avatarUrl || "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"}
            alt={`${name || 'Usuario'}'s profile picture`}
            className="object-cover w-full h-full"
          />

          {editable && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute inset-0 flex items-center justify-center bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"
              aria-label="Editar foto de perfil"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center w-10 h-10 bg-white bg-opacity-80 rounded-full">
                <FiEdit2 className="text-gray-700 text-lg" />
              </div>
            </button>
          )}
        </div>

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