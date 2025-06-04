import React, { useState } from "react";

interface ModalFormularioEmpleadoProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (descripcion: string) => Promise<void>;
}

export const ModalFormularioEmpleado: React.FC<ModalFormularioEmpleadoProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [bonoChecked, setBonoChecked] = useState(false);
  const [promocionChecked, setPromocionChecked] = useState(false);
  const [bonoText, setBonoText] = useState("");
  const [promocionText, setPromocionText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let descripcion = "";
    if (bonoChecked) descripcion += `Bono: ${bonoText}\n`;
    if (promocionChecked) descripcion += `Promoción: ${promocionText}`;
    setLoading(true);
    await onSubmit(descripcion.trim());
    setLoading(false);
    onClose();
    setBonoChecked(false);
    setPromocionChecked(false);
    setBonoText("");
    setPromocionText("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Nueva Solicitud</h2>
        <div className="mb-3 flex items-center">
          <input
            type="checkbox"
            id="bono"
            checked={bonoChecked}
            onChange={() => setBonoChecked(!bonoChecked)}
            className="mr-2"
          />
          <label htmlFor="bono" className="font-medium">Bono</label>
        </div>
        {bonoChecked && (
          <textarea
            className="w-full border rounded p-2 mb-3"
            placeholder="Describe el bono"
            value={bonoText}
            onChange={e => setBonoText(e.target.value)}
            required
          />
        )}
        <div className="mb-3 flex items-center">
          <input
            type="checkbox"
            id="promocion"
            checked={promocionChecked}
            onChange={() => setPromocionChecked(!promocionChecked)}
            className="mr-2"
          />
          <label htmlFor="promocion" className="font-medium">Promoción</label>
        </div>
        {promocionChecked && (
          <textarea
            className="w-full border rounded p-2 mb-3"
            placeholder="Describe la promoción"
            value={promocionText}
            onChange={e => setPromocionText(e.target.value)}
            required
          />
        )}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
            disabled={loading || (!bonoChecked && !promocionChecked)}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
};