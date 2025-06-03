import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
});

// Esquema de respuesta: solo un reporte textual
const EmployeeReportSchema = z.object({
  reporte: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { empleado } = req.body;

  if (!empleado) {
    return res.status(400).json({ error: "Faltan datos del empleado" });
  }

  try {
    const prompt = `
Eres un experto en gestión de talento y recursos humanos. 
Con base en la siguiente información del empleado, genera un reporte profesional y persuasivo que resuma sus fortalezas, logros, habilidades y potencial, con el objetivo de defender su caso para un ascenso, aumento de salario o asignación a un mejor puesto durante una talent discussion. 
Incluye argumentos claros y recomendaciones para su desarrollo profesional.

Datos del empleado:
- ID: ${empleado.ID_Empleado}
- Nombre: ${empleado.Nombre}
- Email: ${empleado.Contacto?.[0]?.Email || 'N/A'}
- Rol: ${empleado.Rol}
- Departamento: ${empleado.Departamento?.[0]?.Nombre || 'N/A'}
- Fecha de Contratación: ${empleado.FechaContratacion || 'N/A'}
- Nivel: ${empleado.Nivel}
- Metas: ${empleado.metas?.length ? empleado.metas.join(", ") : 'N/A'}
- Intereses: ${empleado.intereses?.length ? empleado.intereses.map((i: any) => i.Descripcion).join(", ") : 'N/A'}
- Hard Skills: ${empleado.hardSkills?.length ? empleado.hardSkills.map((h: any) => h.nombre || h.nombre_habilidad).join(", ") : 'N/A'}
- Soft Skills: ${empleado.softSkills?.length ? empleado.softSkills.map((s: any) => s.nombre_habilidad || s.nombre).join(", ") : 'N/A'}

El reporte debe estar orientado a resaltar el valor del empleado para la organización y su potencial de crecimiento.
Devuelve el resultado en el siguiente formato JSON:
{
  "reporte": "Texto del reporte aquí"
}
    `;

    const completion = await openai.beta.chat.completions.parse({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: "Eres un asistente experto en recursos humanos y gestión de talento." },
        { role: "user", content: prompt },
      ],
      response_format: zodResponseFormat(EmployeeReportSchema, "reporte"),
    });

    if (!completion.choices?.[0]?.message?.parsed) {
      throw new Error("Invalid API response structure");
    }

    const report = completion.choices[0].message.parsed;

    res.status(200).json(report);
  } catch (error) {
    console.error("Error al generar el reporte del empleado:", error);
    res.status(500).json({
      error: "Error al generar el reporte del empleado",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}