import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

// Configuración de OpenAI
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
});

// Definir el esquema del output estructurado
const CareerPathSchema = z.object({
  careerPath: z.string(),
  steps: z.array(
    z.object({
      step: z.string(),
      description: z.string(),
    })
  ),
  recommendations: z.array(z.string()),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { metas, habilidades, intereses } = req.body;

  if (!metas || !habilidades || !intereses) {
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  try {
    // Construir el prompt para el modelo
    const prompt = `
      Basándote en las siguientes metas, habilidades e intereses, genera un path de carrera estructurado:
      
      Metas:
      ${metas.join(", ")}

      Habilidades:
      ${habilidades.join(", ")}

      Intereses:
      ${intereses.join(", ")}

      El resultado debe estar en el siguiente formato JSON:
      {
        "careerPath": "string",
        "steps": [
          {
            "step": "string",
            "description": "string"
          }
        ],
        "recommendations": ["string"]
      }
    `;

    // Llamar al modelo de IA con zodResponseFormat
    const completion = await openai.beta.chat.completions.parse({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: "Eres un asistente que genera paths de carrera." },
        { role: "user", content: prompt },
      ],
      response_format: zodResponseFormat(CareerPathSchema, "careerPath"),
    });

    // Extraer el resultado parseado
    const careerPath = completion.choices[0].message.parsed;

    res.status(200).json(careerPath);
  } catch (error) {
    console.error("Error al generar el path de carrera:", error);
    res.status(500).json({ error: "Error al generar el path de carrera" });
  }
}