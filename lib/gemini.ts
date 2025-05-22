import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

// Inicializar el cliente de Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "")

// Configuración del modelo de Gemini
const modelName = "gemini-2.0-flash" // Puedes usar "gemini-pro" o "gemini-ultra" según tus necesidades

// Configuración de seguridad
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
]

// Contexto del sistema para el asistente
const systemPrompt = `
Eres un asistente virtual para el sistema pathexplorer, una aplicación de gestión de talento.

Información sobre pathexpllorer:
-

Tu trabajo es:
-

Sé amable, conciso y útil. Si no conoces la respuesta a algo específico, indícalo claramente.
`

// Función para generar respuestas de texto
export async function generateAssistantResponse(prompt: string): Promise<string> {
  try {
    // Obtener el modelo
    const model = genAI.getGenerativeModel({
      model: modelName,
      safetySettings,
    })

    // Crear un chat
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Por favor, actúa como el asistente descrito a continuación:" }],
        },
        {
          role: "model",
          parts: [{ text: "Entendido, actuaré según esas instrucciones." }],
        },
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 100,
      },
    })

    // Enviar mensaje y obtener respuesta
    const result = await chat.sendMessage(prompt)
    const response = result.response.text()

    return response
  } catch (error) {
    console.error("Error al generar respuesta:", error)
    return "Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, inténtalo de nuevo más tarde."
  }
}

// Función para transmitir respuestas en tiempo real
export async function streamAssistantResponse(
  prompt: string,
  onChunk: (chunk: string) => void,
  onFinish: (fullText: string) => void,
) {
  try {
    // Obtener el modelo
    const model = genAI.getGenerativeModel({
      model: modelName,
      safetySettings,
    })

    // Crear un chat
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Por favor, actúa como el asistente descrito a continuación:" }],
        },
        {
          role: "model",
          parts: [{ text: "Entendido, actuaré según esas instrucciones." }],
        },
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    })

    // Enviar mensaje y obtener respuesta con streaming
    const result = await chat.sendMessageStream(prompt)

    let fullText = ""

    // Procesar el stream de respuesta
    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      fullText += chunkText
      onChunk(chunkText)
    }

    onFinish(fullText)
    return fullText
  } catch (error) {
    console.error("Error al transmitir respuesta:", error)
    onChunk("Lo siento, ha ocurrido un error al procesar tu consulta.")
    onFinish("Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, inténtalo de nuevo más tarde.")
    return null
  }
}

// Función para guardar el historial de conversaciones
export type ChatMessage = {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

// Función para enriquecer el contexto con información específica del usuario
export function enrichPromptWithContext(
  prompt: string,
  userName: string,
  userRole: string,
  recentActions: string[],
): string {
  return `
Usuario: ${userName}
Rol: ${userRole}
Acciones recientes: ${recentActions.join(", ")}

Consulta: ${prompt}
  `
}