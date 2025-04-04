'use client';

import React, { useState } from 'react';

export default function SendEmailButton() {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleSendEmail = async () => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Email enviado con exito: ${JSON.stringify(data)}`);
      } else {
        const error = await response.json();
        setResponseMessage(`Error enviando email: ${JSON.stringify(error)}`);
      }
    } catch (error) {
      setResponseMessage(`Request fallado: ${error}`);
    }
  };

  return (
    <div>
      <button onClick={handleSendEmail}>Enviar Email</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}