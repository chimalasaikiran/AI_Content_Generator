import { ContentType } from "../types";

// Lazy initialization - don't crash on import
let ai: any = null;
let initError: string | null = null;

const initializeAI = async () => {
  if (ai) return ai;
  
  try {
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
    if (!apiKey) {
      initError = "API key not configured. Add VITE_GEMINI_API_KEY to your .env.local file.";
      return null;
    }
    
    const { GoogleGenAI } = await import("@google/genai");
    ai = new GoogleGenAI({ apiKey });
    return ai;
  } catch (e: any) {
    console.error("Failed to initialize Gemini:", e);
    initError = e.message || "Failed to initialize AI client";
    return null;
  }
};

const SYSTEM_PROMPTS: Record<ContentType, string> = {
  [ContentType.SOCIAL_MEDIA]: "You are a social media manager. Create catchy, engaging captions with relevant hashtags.",
  [ContentType.BLOG_IDEA]: "You are a professional content strategist. Provide a catchy blog title and a detailed outline with key points.",
  [ContentType.PRODUCT_DESC]: "You are a copywriter. Write persuasive, benefit-driven product descriptions that convert.",
  [ContentType.EMAIL_TEMPLATE]: "You are a professional communication expert. Write clear, polite, and effective email templates."
};

export const generateContent = async (type: ContentType, userPrompt: string): Promise<string> => {
  const client = await initializeAI();
  
  if (!client) {
    throw new Error(initError || "API key not configured. Add VITE_GEMINI_API_KEY to your .env.local file.");
  }
  
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = SYSTEM_PROMPTS[type] || "You are a helpful AI writing assistant.";

    const prompt = `
      Task: Generate content for ${type}.
      Context/Topic: ${userPrompt}
      
      Requirements:
      - Use professional yet engaging tone.
      - Format with clear paragraphs or bullet points where appropriate.
      - Keep it concise but comprehensive.
    `;

    const response = await client.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    if (response.text) {
      return response.text;
    }

    // Handle cases where text is empty (e.g., safety blocks)
    const candidate = response.candidates?.[0];
    if (candidate?.finishReason === 'SAFETY') {
      throw new Error("Content generation blocked by safety settings. Please try a different prompt.");
    }

    throw new Error("No content generated.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};