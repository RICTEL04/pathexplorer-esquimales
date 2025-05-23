import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
});

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

  if (!metas || !habilidades || !intereses || !todosLosCursos || !cursosCompletados) {
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  try {
    const prompt = `
      Basándote en las siguientes metas, habilidades e intereses, genera un path de carrera estructurado y ordena los cursos disponibles por relevancia:
      
      Metas: ${metas.join(", ")}
      Habilidades: ${habilidades.join(", ")}
      Intereses: ${intereses.join(", ")}
      Cursos de la empresa: ${todosLosCursos.map((curso: any) => curso.nombre).join(", ")}
      Cursos completados: ${cursosCompletados.map((curso: any) => curso.nombre).join(", ")}

      Ordena los cursos por relevancia. Los cursos ya completados deben aparecer al final.
    `;

    const completion = await openai.beta.chat.completions.parse({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: "Eres un asistente que genera paths de carrera y ordena cursos." },
        { role: "user", content: prompt },
      ],
      response_format: zodResponseFormat(CareerPathSchema, "careerPath"),
    });

    // Add null checks for the API response
    if (!completion.choices?.[0]?.message?.parsed) {
      throw new Error("Invalid API response structure");
    }

    const careerPath = completion.choices[0].message.parsed;

    // Validate careerPath structure
    if (!careerPath || !careerPath.sortedCourses) {
      throw new Error("Invalid career path structure");
    }

    // Filter and map courses with null checks
    const todosLosCursosMap = new Map(todosLosCursos.map((curso: any) => [curso.nombre, curso]));
    
    const filteredCourses = careerPath.sortedCourses
  .filter((curso: any) => {
    // Ensure `curso` is an object and has a `nombre` property
    return typeof curso === 'object' && curso !== null && 'nombre' in curso;
  })
  .map((curso: any) => {
    const existingCourse = todosLosCursosMap.get(curso.nombre);
    
    // Fallback if `existingCourse` is undefined
    if (!existingCourse) {
      return {
        id: curso.id || '',
        nombre: curso.nombre || '',
        descripcion: curso.descripcion || null,
        link: curso.link || null,
        relevancia: curso.relevancia || 0,
      };
    }

    // Only spread if `existingCourse` is a valid object
    return {
      ...existingCourse,
      relevancia: curso.relevancia || 0,
    };
  });

    // Ensure we have a valid careerPath object
    const responseData = {
      careerPath: careerPath.careerPath || "",
      steps: careerPath.steps || [],
      recommendations: careerPath.recommendations || [],
      sortedCourses: filteredCourses,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error al generar el path de carrera:", error);
    res.status(500).json({ 
      error: "Error al generar el path de carrera",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}