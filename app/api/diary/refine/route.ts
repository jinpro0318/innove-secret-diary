import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Use Gemini 1.5 Flash for speed
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a warm, empathetic diary assistant.
      Rewrite the following raw text into a coherent, beautifully written diary entry.
      The tone should be personal, reflective, and slightly nostalgic (handmade diary style).
      Fix any grammar mistakes and improve the flow, but keep the original meaning and sentiment.
      
      Raw Text: "${text}"
      
      Output only the rewritten diary entry text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const refinedText = response.text();

    return NextResponse.json({ refinedText });
  } catch (error) {
    console.error('Refine API Error:', error);
    return NextResponse.json({ error: 'Failed to refine text' }, { status: 500 });
  }
}
