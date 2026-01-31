
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateDemoContent(prompt: string): Promise<GeneratedContent> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a JSON object for a UI card with the following info: ${prompt}.
               Include: title (string), description (string), status (success/warning/error/info/neutral), tags (array of strings).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          status: { 
            type: Type.STRING,
            description: "Must be one of: success, warning, error, info, neutral"
          },
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["title", "description", "status", "tags"]
      }
    }
  });

  const jsonStr = response.text?.trim() || "{}";
  return JSON.parse(jsonStr);
}
