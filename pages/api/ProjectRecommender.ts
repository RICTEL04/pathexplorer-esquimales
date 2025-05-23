import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
});

// Esquema para validar la respuesta de la IA
const SuggestedProjectsSchema = z.object({
  suggestedProjects: z.array(
    z.object({
      ID_Proyecto: z.string(),
      Nombre: z.string(),
      Descripcion: z.string(),
      Status: z.string(),
      fecha_inicio: z.string().nullable(),
      fecha_fin: z.string().nullable(),
    })
  ),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { metas, habilidades, intereses, proyectos } = req.body;

  if (!metas || !habilidades || !intereses || !proyectos) {
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  try {
    // Construir el prompt para el modelo
    const prompt = `
      Basándote en las siguientes metas profesionales, habilidades e intereses del empleado, ordena los proyectos existentes según su relevancia para el empleado. 
      Devuelve únicamente los proyectos que ya están en la lista proporcionada.

      Metas:
      ${metas.join(", ")}

      Habilidades:
      ${habilidades.join(", ")}

      Intereses:
      ${intereses.join(", ")}

      Proyectos existentes:
      ${proyectos
        .map(
          (p: any) =>
            `- ID: ${p.ID_Proyecto}, Nombre: ${p.Nombre}, Descripción: ${p.Descripcion}, Estado: ${p.Status}, Fecha de inicio: ${p.fecha_inicio || "N/A"}, Fecha de fin: ${p.fecha_fin || "N/A"}`
        )
        .join("\n")}

      Devuelve los proyectos en el siguiente formato JSON:
      {
        "suggestedProjects": [
          {
            "ID_Proyecto": "string",
            "Nombre": "string",
            "Descripcion": "string",
            "Status": "string",
            "fecha_inicio": "string",
            "fecha_fin": "string"
          }
        ]
      }
    `;

    // Llamar al modelo de OpenAI con validación Zod
    const completion = await openai.beta.chat.completions.parse({
      model: "gemini-2.0-flash", // Usar el mismo modelo que en generateCareerPath
      messages: [
        { role: "system", content: "Eres un asistente que ordena proyectos existentes según su relevancia para un empleado." },
        { role: "user", content: prompt },
      ],
      response_format: zodResponseFormat(SuggestedProjectsSchema, "suggestedProjects"),
    });

    // Validar y procesar la respuesta
    const suggestedProjects = completion.choices[0].message.parsed;

    res.status(200).json(suggestedProjects);
  } catch (error) {
    console.error("Error al generar proyectos sugeridos:", error);
    res.status(500).json({
      error: "Error al generar proyectos sugeridos",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
