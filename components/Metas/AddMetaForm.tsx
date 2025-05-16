import { useState, useEffect } from 'react';
import { fetchRevisores } from '@/lib/metas-empleados/apiCallsMetas';
import { Meta, Revisor_Meta, Empleado } from '@/lib/metas-empleados/metasDefinitions';

interface AddMetaFormProps {
  employeeID: string;
  onSubmit: (meta: Meta) => Promise<void>;
  onCancel: () => void;
  metaToEdit?: Meta | null; // Nueva prop para la meta a editar
}

export default function AddMetaForm({ employeeID, onSubmit, onCancel, metaToEdit }: AddMetaFormProps) {
  const tipoMetaOptions = ['capability', 'proyecto', 'colaborador/empleado', 'curso/certificacion', 'Otro'];
  const plazoOptions = ['Corto', 'Mediano', 'Largo'];
  
  // Estado inicial basado en si estamos editando o creando nueva
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
    Estado: metaToEdit?.Estado || 'Pendiente',
    Self_Reflection: metaToEdit?.Self_Reflection || null,
    revisor1: metaToEdit?.Revisores?.[0]?.ID_EmpleadoRevisor || '',
    revisor2: metaToEdit?.Revisores?.[1]?.ID_EmpleadoRevisor || ''
  });

  const [revisores, setRevisores] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar la lista de revisores disponibles
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

  const handleRevisorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Si estamos quitando el primer revisor, también quitamos el segundo
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
      
      if (selectedRevisorIds.length === 0) {
        setError('Debes seleccionar al menos un revisor');
        return;
      }
      
      const selectedRevisoresObjects: Revisor_Meta[] = selectedRevisorIds.map(revisorId => {
        const revisor = revisores.find(r => r.ID_Empleado === revisorId);
        return {
          ID_Revisor: '', // Se generará/actualizará automáticamente
          ID_EmpleadoRevisor: revisorId,
          ID_meta: metaToEdit?.ID_meta || '', // Usamos el ID existente si estamos editando
          ID_Empleado: employeeID,
          Retroalimentacion: null,
          Nombre: revisor?.Nombre || 'Sin nombre'
        };
      });
      
      const newMeta: Meta = {
        ID_meta: metaToEdit?.ID_meta || '', // Pasamos el ID si estamos editando
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

  // Formateo de fechas para el input type="date"
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Agregar Nueva Meta</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre de la Meta */}
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
        
        {/* Tipo de Meta - Dropdown */}
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
        
        {/* Plazo - Dropdown */}
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
        
        {/* Descripción */}
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
        
        {/* Fechas - Inicio y Límite */}
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
        
        {/* Revisores - Two single-select dropdowns */}
        <div className="space-y-4">
          <div>
            <label htmlFor="revisor1" className="block text-sm font-medium text-gray-700 mb-1">
              Revisor Principal *
            </label>
            <select
              id="revisor1"
              name="revisor1"
              value={formData.revisor1}
              onChange={handleRevisorChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar revisor principal</option>
              {loading ? (
                <option disabled>Cargando revisores...</option>
              ) : (
                revisores
                  .filter(revisor => 
                    revisor.ID_Empleado !== employeeID && // Filtrar al empleado actual
                    revisor.ID_Empleado !== formData.revisor2 // Filtrar revisor ya seleccionado en la opción 2
                  )
                  .map((revisor) => (
                    <option key={revisor.ID_Empleado} value={revisor.ID_Empleado}>
                      {revisor.Nombre}
                    </option>
                  ))
              )}
            </select>
          </div>
          
          <div>
            <label htmlFor="revisor2" className="block text-sm font-medium text-gray-700 mb-1">
              Revisor Secundario (Opcional)
            </label>
            <select
              id="revisor2"
              name="revisor2"
              value={formData.revisor2}
              onChange={handleRevisorChange}
              disabled={!formData.revisor1} // Deshabilitar si no hay revisor principal
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="">Sin revisor secundario</option>
              {loading ? (
                <option disabled>Cargando revisores...</option>
              ) : (
                revisores
                  .filter(revisor => 
                    revisor.ID_Empleado !== employeeID && // Filtrar al empleado actual
                    revisor.ID_Empleado !== formData.revisor1 // Filtrar revisor ya seleccionado en la opción 1
                  )
                  .map((revisor) => (
                    <option key={revisor.ID_Empleado} value={revisor.ID_Empleado}>
                      {revisor.Nombre}
                    </option>
                  ))
              )}
            </select>
          </div>
        </div>
        
        {/* Estado - Oculto, se establece automáticamente como "Pendiente" */}
        <input type="hidden" name="Estado" value={formData.Estado} />
        
        {/* Botones */}
        <div className="flex justify-end space-x-3 pt-4">
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
            Guardar Meta
          </button>
        </div>
      </form>
    </div>
  );
}