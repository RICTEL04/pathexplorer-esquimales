import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

// Configuración de OpenAI
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY, // Asegúrate de configurar esta clave en tu archivo .env.local
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
  sortedCourses: z.array(
    z.object({
      id: z.string(),
      nombre: z.string(),
      descripcion: z.string().nullable(),
      link: z.string().nullable(),
      relevancia: z.number(),
    })
  ),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { metas, habilidades, intereses, todosLosCursos, cursosCompletados } = req.body;

  console.log("Recibido:", { metas, habilidades, intereses, todosLosCursos, cursosCompletados });

  if (!metas || !habilidades || !intereses || !todosLosCursos || !cursosCompletados) {
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  try {
    const prompt = `
      Basándote en las siguientes metas, habilidades e intereses, genera un path de carrera estructurado y ordena los cursos disponibles por relevancia:
      
      Metas:
      ${metas.join(", ")}

      Habilidades:
      ${habilidades.join(", ")}

      Intereses:
      ${intereses.join(", ")}

      Cursos de la empresa:
      ${todosLosCursos.map((curso: any) => curso.nombre).join(", ")}

      Cursos completados por el empleado:
      ${cursosCompletados.map((curso: any) => curso.nombre).join(", ")}

      Ordena los cursos de la empresa por relevancia en función de las metas, habilidades e intereses del empleado. Los cursos ya completados deben aparecer al final de la lista.

      El resultado debe estar en el siguiente formato JSON:
      {
        "careerPath": "string",
        "steps": [
          {
            "step": "string",
            "description": "string"
          }
        ],
        "recommendations": ["string"],
        "sortedCourses": [
          {
            "id": "string",
            "nombre": "string",
            "descripcion": "string",
            "link": "string",
            "relevancia": "number"
          }
        ]
      }
    `;

    const completion = await openai.beta.chat.completions.parse({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: "Eres un asistente que genera paths de carrera y ordena cursos." },
        { role: "user", content: prompt },
      ],
      response_format: zodResponseFormat(CareerPathSchema, "careerPath"),
    });

    let careerPath = completion.choices[0].message.parsed;

    // Filtrar los cursos generados por el modelo para asegurarse de que existan en todosLosCursos
    const todosLosCursosMap = new Map(todosLosCursos.map((curso: any) => [curso.nombre, curso]));
    careerPath.sortedCourses = careerPath.sortedCourses
      .filter((curso: any) => todosLosCursosMap.has(curso.nombre))
      .map((curso: any) => ({
        ...todosLosCursosMap.get(curso.nombre),
        relevancia: curso.relevancia, // Mantener la relevancia generada por el modelo
      }));

    res.status(200).json(careerPath);
  } catch (error) {
    console.error("Error al generar el path de carrera:", error);
    res.status(500).json({ error: "Error al generar el path de carrera" });
  }
}