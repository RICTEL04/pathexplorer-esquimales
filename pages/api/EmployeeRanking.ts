import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
});

// Esquema para validar la respuesta de la IA
const EmployeeRankingSchema = z.object({
  rankedEmployees: z.array(
    z.object({
      id_empleado: z.string(),
      nombre: z.string(),
      puesto: z.any(),
      score: z.number().optional(), // Puedes pedirle a la IA que asigne un score opcional
      // Puedes agregar más campos si lo deseas
    })
  ),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { empleados, proyecto } = req.body;

  if (!empleados || !Array.isArray(empleados) || !proyecto) {
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  try {
    // Construir el prompt para el modelo
    const prompt = `
      Tienes la siguiente información de un proyecto y una lista de empleados con sus habilidades, metas, intereses y puesto asignado.
      Ordena a los empleados del más capacitado al menos capacitado para el proyecto, considerando la relevancia de sus habilidades, metas e intereses respecto a los requerimientos del proyecto y el puesto asignado.
      Devuelve el resultado en formato JSON con el id_empleado, nombre, puesto y un score de afinidad (opcional).

      Proyecto:
      Nombre: ${proyecto.Nombre}
      Descripción: ${proyecto.Descripcion}
      Habilidades requeridas: ${(proyecto.habilidades_proyecto || []).join(", ")}
      Puestos requeridos: 
      ${Array.isArray(proyecto.puestos) ? proyecto.puestos.map((p: any) => `- ${p.Puesto} (${p.N_puestos})`).join("\n") : ""}

      Empleados:
      ${empleados.map((e: any, idx: number) => `
        ${idx + 1}. 
        Nombre: ${e.nombre}
        ID: ${e.id_empleado}
        Puesto: ${e.puesto?.Puesto || ""}
        Habilidades: ${(e.habilidades || []).map((h: any) => h.nombre || h.nombre_habilidad || h).join(", ")}
        Metas: ${(e.metas || []).map((m: any) => m.Nombre || m.nombre || m).join(", ")}
        Intereses: ${(e.intereses || []).map((i: any) => i.Descripcion || i.descripcion || i).join(", ")}
      `).join("\n")}

      Devuelve el resultado en el siguiente formato JSON:
      {
        "rankedEmployees": [
          {
            "id_empleado": "string",
            "nombre": "string",
            "puesto": { ... },
            "score": 0 // opcional, de 0 a 100
          }
        ]
      }
    `;

    // Llamar al modelo de OpenAI con validación Zod
    const completion = await openai.beta.chat.completions.parse({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: "Eres un asistente que ordena empleados según su afinidad y capacidad para un proyecto." },
        { role: "user", content: prompt },
      ],
      response_format: zodResponseFormat(EmployeeRankingSchema, "rankedEmployees"),
    });

    // Validar y procesar la respuesta
    const rankedEmployees = completion.choices[0].message.parsed;

    res.status(200).json(rankedEmployees);
  } catch (error) {
    console.error("Error al generar ranking de empleados:", error);
    res.status(500).json({
      error: "Error al generar ranking de empleados",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}