import React, { useEffect, useState, useRef } from "react";

export default function ConfirmModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [countdown, setCountdown] = useState(5);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCountdown(5);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-red-600">¿Estás seguro?</h2>
        <p className="mb-6 text-gray-700">
          ¿Quieres marcar este proyecto como <span className="font-semibold">hecho</span>?<br />
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 bg-green-600 text-white rounded transition-all ${countdown > 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Confirmar (${countdown})` : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}