import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      Analyze the sentiment and content of the following diary entry.
      Based on the mood, suggest a set of 'stickers' (emojis) and a background color tint to decorate the page.
      
      Diary Entry: "${text}"
      
      Return a JSON object with the following schema:
      {
        "sentiment": "happy" | "sad" | "calm" | "excited" | "melancholy",
        "backgroundColor": "hex code for a very subtle paper tint matching the mood (e.g. #FFFDF0 for happy, #F0F4FF for sad)",
        "stickers": [
          {
            "emoji": "emoji character",
            "x": "random percentage string between 0% and 90% (e.g. '10%')",
            "y": "random percentage string between 0% and 90% (e.g. '80%')",
            "rotation": "random rotation between -20deg and 20deg"
          }
        ]
      }
      Generate 3 to 5 stickers that are relevant to the content.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonResponse = JSON.parse(response.text());

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Decorate API Error:', error);
    return NextResponse.json({ error: 'Failed to decorate' }, { status: 500 });
  }
}
