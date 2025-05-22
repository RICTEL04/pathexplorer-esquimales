import { useState, useEffect, useRef } from 'react';
import { fetchRevisores } from '@/lib/metas-empleados/apiCallsMetas';
import { Meta, Revisor_Meta, Empleado } from '@/lib/metas-empleados/metasDefinitions';

interface AddMetaFormProps {
  employeeID: string;
  onSubmit: (meta: Meta) => Promise<void>;
  onCancel: () => void;
  metaToEdit?: Meta | null;
}

interface SearchableSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Empleado[];
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
}

function SearchableSelect({ 
  id, 
  name, 
  value, 
  onChange, 
  options, 
  placeholder, 
  disabled = false, 
  required = false,
  loading = false 
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayValue, setDisplayValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set display value based on selected value
  useEffect(() => {
    if (value) {
      const selectedOption = options.find(option => option.ID_Empleado === value);
      setDisplayValue(selectedOption?.Nombre || '');
    } else {
      setDisplayValue('');
    }
  }, [value, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDisplayValue(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleOptionSelect = (option: Empleado) => {
    onChange(option.ID_Empleado);
    setDisplayValue(option.Nombre);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setSearchTerm(displayValue);
    setDisplayValue('');
  };

  const handleInputBlur = () => {
    // Small delay to allow option selection
    setTimeout(() => {
      if (value) {
        const selectedOption = options.find(option => option.ID_Empleado === value);
        setDisplayValue(selectedOption?.Nombre || '');
      } else {
        setDisplayValue('');
      }
      setSearchTerm('');
    }, 150);
  };

  const handleClear = () => {
    onChange('');
    setDisplayValue('');
    setSearchTerm('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          value={isOpen ? searchTerm : displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          autoComplete="off"
        />
        
        {/* Clear button */}
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
        
        {/* Dropdown arrow */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {!value && (
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {loading ? (
            <div className="px-3 py-2 text-gray-500">Cargando revisores...</div>
          ) : filteredOptions.length > 0 ? (
            <>
              {/* Clear option */}
              <div
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-gray-500 border-b border-gray-200"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleClear()}
              >
                {placeholder}
              </div>
              
              {/* Filtered options */}
              {filteredOptions.map((option) => (
                <div
                  key={option.ID_Empleado}
                  className="px-3 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-700"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.Nombre}
                </div>
              ))}
            </>
          ) : (
            <div className="px-3 py-2 text-gray-500">No se encontraron revisores</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AddMetaForm({ employeeID, onSubmit, onCancel, metaToEdit }: AddMetaFormProps) {
  const tipoMetaOptions = ['capability', 'proyecto', 'colaborador/empleado', 'curso/certificacion', 'Otro'];
  const plazoOptions = ['Corto', 'Mediano', 'Largo'];
  const estadoOptions = ['En Progreso', 'Completada', 'Cancelada'];
  
  const [formData, setFormData] = useState<Omit<Meta, 'ID_meta' | 'Revisores'> & { 
    revisor1: string;
    revisor2: string;
  }>({
    Nombre: metaToEdit?.Nombre || '',
    Tipo_Meta: metaToEdit?.Tipo_Meta || tipoMetaOptions[0],
    Plazo: metaToEdit?.Plazo || plazoOptions[0],
    Descripcion: metaToEdit?.Descripcion || '',
    Fecha_Inicio: metaToEdit?.Fecha_Inicio ? new Date(metaToEdit.Fecha_Inicio) : new Date(),
    Fecha_limite: metaToEdit?.Fecha_limite ? new Date(metaToEdit.Fecha_limite) : new Date(),
    ID_Empleado: employeeID,
    Registrada: metaToEdit?.Registrada || false,
    Estado: metaToEdit?.Estado || 'En Progreso',
    Self_Reflection: metaToEdit?.Self_Reflection || null,
    revisor1: metaToEdit?.Revisores?.[0]?.ID_EmpleadoRevisor || '',
    revisor2: metaToEdit?.Revisores?.[1]?.ID_EmpleadoRevisor || ''
  });

  const [revisores, setRevisores] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const showSelfReflection = metaToEdit && 
                          (metaToEdit.Estado === 'Completada' || metaToEdit.Estado === 'Cancelada') && 
                          metaToEdit.Self_Reflection === null;

  useEffect(() => {
    async function loadRevisores() {
      try {
        setLoading(true);
        const revisorData = await fetchRevisores();
        setRevisores(revisorData);
      } catch (err) {
        setError('Error al cargar los revisores');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadRevisores();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: new Date(value)
    });
  };

  const handleRevisorChange = (name: string, value: string) => {
    if (name === 'revisor1' && value === '' && formData.revisor2 !== '') {
      setFormData({
        ...formData,
        revisor1: '',
        revisor2: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const selectedRevisorIds = [formData.revisor1, formData.revisor2].filter(id => id !== '');
      
      if (selectedRevisorIds.length === 0 && !showSelfReflection) {
        setError('Debes seleccionar al menos un revisor');
        return;
      }
      
      const selectedRevisoresObjects: Revisor_Meta[] = selectedRevisorIds.map(revisorId => {
        const revisor = revisores.find(r => r.ID_Empleado === revisorId);
        return {
          ID_Revisor: '',
          ID_EmpleadoRevisor: revisorId,
          ID_meta: metaToEdit?.ID_meta || '',
          ID_Empleado: employeeID,
          Retroalimentacion: null,
          Nombre: revisor?.Nombre || 'Sin nombre'
        };
      });
      
      const newMeta: Meta = {
        ID_meta: metaToEdit?.ID_meta || '',
        Nombre: formData.Nombre,
        Tipo_Meta: formData.Tipo_Meta,
        Plazo: formData.Plazo,
        Descripcion: formData.Descripcion,
        Fecha_Inicio: formData.Fecha_Inicio,
        Fecha_limite: formData.Fecha_limite,
        ID_Empleado: employeeID,
        Registrada: formData.Registrada,
        Estado: formData.Estado,
        Self_Reflection: formData.Self_Reflection,
        Revisores: selectedRevisoresObjects
      };
      
      await onSubmit(newMeta);
    } catch (err) {
      setError('Error al guardar la meta');
      console.error(err);
    }
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Get available revisores for each selector
  const getAvailableRevisores = (excluding: string[]) => {
    return revisores.filter(revisor => 
      revisor.ID_Empleado !== employeeID && 
      !excluding.includes(revisor.ID_Empleado)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-2xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        {metaToEdit ? (showSelfReflection ? "Agregar Reflexión" : "Editar Meta") : "Agregar Meta"}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {showSelfReflection ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Meta: {metaToEdit?.Nombre}</h3>
              <p className="text-sm text-gray-600 mb-4">{metaToEdit?.Descripcion}</p>
            </div>
            
            <div>
              <label htmlFor="Self_Reflection" className="block text-sm font-medium text-gray-700 mb-1">
                Auto-Reflexión *
              </label>
              <textarea
                id="Self_Reflection"
                name="Self_Reflection"
                value={formData.Self_Reflection || ''}
                onChange={handleInputChange}
                required
                rows={6}
                placeholder="Comparte tu reflexión sobre esta meta completada o cancelada..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="Nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Meta *
              </label>
              <input
                type="text"
                id="Nombre"
                name="Nombre"
                value={formData.Nombre}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="Tipo_Meta" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Meta *
                </label>
                <select
                  id="Tipo_Meta"
                  name="Tipo_Meta"
                  value={formData.Tipo_Meta}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {tipoMetaOptions.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Solo mostrar campo de Estado cuando se está editando una meta */}
              {metaToEdit && (
                <div>
                  <label htmlFor="Estado" className="block text-sm font-medium text-gray-700 mb-1">
                    Estado *
                  </label>
                  <select
                    id="Estado"
                    name="Estado"
                    value={formData.Estado}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {estadoOptions.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* 
              <div>
                <label htmlFor="Plazo" className="block text-sm font-medium text-gray-700 mb-1">
                  Plazo *
                </label>
                <select
                  id="Plazo"
                  name="Plazo"
                  value={formData.Plazo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {plazoOptions.map((plazo) => (
                    <option key={plazo} value={plazo}>
                      {plazo}
                    </option>
                  ))}
                </select>
              </div>
              */}

            </div>
            
            <div>
              <label htmlFor="Descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción *
              </label>
              <textarea
                id="Descripcion"
                name="Descripcion"
                value={formData.Descripcion}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="Fecha_Inicio" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Inicio *
                </label>
                <input
                  type="date"
                  id="Fecha_Inicio"
                  name="Fecha_Inicio"
                  value={formatDateForInput(formData.Fecha_Inicio)}
                  onChange={handleDateChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="Fecha_limite" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha Límite *
                </label>
                <input
                  type="date"
                  id="Fecha_limite"
                  name="Fecha_limite"
                  value={formatDateForInput(formData.Fecha_limite)}
                  onChange={handleDateChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="revisor1" className="block text-sm font-medium text-gray-700 mb-1">
                  Revisor Principal *
                </label>
                <SearchableSelect
                  id="revisor1"
                  name="revisor1"
                  value={formData.revisor1}
                  onChange={(value) => handleRevisorChange('revisor1', value)}
                  options={getAvailableRevisores([formData.revisor2])}
                  placeholder="Seleccionar revisor principal"
                  required
                  loading={loading}
                />
              </div>

              <div>
                <label htmlFor="revisor2" className="block text-sm font-medium text-gray-700 mb-1">
                  Revisor Secundario (Opcional)
                </label>
                <SearchableSelect
                  id="revisor2"
                  name="revisor2"
                  value={formData.revisor2}
                  onChange={(value) => handleRevisorChange('revisor2', value)}
                  options={getAvailableRevisores([formData.revisor1])}
                  placeholder="Sin revisor secundario"
                  disabled={!formData.revisor1}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {showSelfReflection ? "Guardar Reflexión" : "Guardar Meta"}
          </button>
        </div>
      </form>
    </div>
  );
}