import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { content, imageUrl } = await req.json();

    if (!content && !imageUrl) {
      return NextResponse.json(
        { error: "Content or Image is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are an emotional AI diary assistant.
      
      Task 1: Format the user's input into a diary style (Korean).
      CRITICAL INSTRUCTION: 
      - Use the User Input EXACTLY as the base. 
      - Do NOT add any fictional events, feelings, or details that are not in the input.
      - Do NOT remove any facts or details from the input.
      - You may only correct typos, improve sentence flow, and ensure it sounds like a natural diary entry (e.g., ending sentences with ~했다, ~였다).
      - If the input is short, keep the output short. Do not expand it into a story.

      Task 2: Analyze the emotion and suggest design elements.
      Task 3: Generate a creative image prompt (English) for a generative AI model. The prompt should describe a background image that matches the diary's mood and content (e.g., "watercolor painting of a sunny park", "starry night sky with soft clouds"). Keep it artistic and soft.

      User Input: "${content}"

      Provide a JSON response with:
      1. rewritten_content: The formatted diary entry in Korean.
      2. mood: A single word describing the emotional tone.
      3. keywords: An array of 3 key words.
      4. color: A hex color code that matches the mood.
      5. image_prompt: A descriptive English prompt for generating a background image.
      6. stickers: An array of 3 objects, each with stickerId (one of ["smile", "heart", "star", "sun", "cloud", "moon", "coffee", "music", "zap", "crown"]), x, and y coordinates.

      Response Format (JSON only, no markdown):
      {
        "rewritten_content": "...",
        "mood": "...",
        "keywords": ["...", "...", "..."],
        "color": "#...",
        "image_prompt": "...",
        "stickers": [ ... ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up markdown code blocks if present
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const analysis = JSON.parse(cleanText);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Fallback: Use original content if API fails
    // This prevents the "content changed completely" issue when API key is missing
    const requestBody = await req.clone().json().catch(() => ({ content: "" }));
    
    return NextResponse.json({
      rewritten_content: requestBody.content || "일기 내용을 입력해주세요.",
      mood: "Peaceful",
      keywords: ["Daily", "Memory", "Life"],
      color: "#FDF5E6", // Default paper color
      stickers: [
        { stickerId: "smile", x: 50, "y": 50 },
        { stickerId: "star", x: 200, "y": 80 }
      ]
    });
  }
}
