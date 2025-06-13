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
      Eres un asistente experto en desarrollo profesional. 
      Analiza cuidadosamente las metas profesionales, habilidades actuales e intereses del empleado.
      Considera también las habilidades requeridas por cada proyecto.

      Tu objetivo es recomendar y ordenar los proyectos existentes que mejor se alineen con los intereses y habilidades actuales del empleado, 
      priorizando aquellos que le permitan desarrollarse profesionalmente, aprender nuevas competencias relevantes y avanzar hacia sus metas.

      Siempre debes devolver una lista ordenada de proyectos de la lista proporcionada, aunque no todos sean ideales. No omitas proyectos, solo ordénalos según su relevancia para el desarrollo profesional del empleado o proyectos del mas complejo al menos complejo.

      Metas del empleado:
      ${metas.join(", ")}

      Habilidades actuales del empleado:
      ${habilidades.join(", ")}

      Intereses del empleado:
      ${intereses.join(", ")}

      Proyectos existentes:
      ${proyectos
        .map(
          (p: any) =>
            `- ID: ${p.ID_Proyecto}, Nombre: ${p.Nombre}, Descripción: ${p.Descripcion}, Estado: ${p.Status}, Fecha de inicio: ${p.fecha_inicio || "N/A"}, Fecha de fin: ${p.fecha_fin || "N/A"}, Habilidades requeridas: ${
              Array.isArray(p.habilidades_proyecto) && p.habilidades_proyecto.length > 0
                ? p.habilidades_proyecto.map((h: any) => `${h.Nombre} (${h.nivel})`).join(", ")
                : "Ninguna"
            }`
        )
        .join("\n")}

      Analiza qué proyectos ayudarán más al empleado a crecer profesionalmente, considerando tanto sus intereses como las oportunidades de aprendizaje y mejora de habilidades. Siempre devuelve la lista ordenada de todos los proyectos.

      Devuelve los proyectos recomendados en el siguiente formato JSON:
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
