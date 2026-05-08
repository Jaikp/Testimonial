import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.API_KEY || "",
});

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json(
                { message: "A valid prompt string is required" },
                { status: 400 }
            );
        }

        const systemPrompt = `
        You are an expert UI/UX designer. The user wants to generate a custom styling theme for a testimonial widget based on their description.
        You must convert their description into a strict JSON object containing standard CSS values (like hex colors) and layout preferences.
        
        User Prompt: "${prompt}"

        Return your response strictly matching the following JSON schema:
        {
          "type": "object",
          "properties": {
            "backgroundColor": { "type": "string", "description": "The main background color of the embed container (use valid CSS color like #Hex, rgb, or color name)." },
            "cardBackgroundColor": { "type": "string", "description": "The background color of the individual testimonial cards." },
            "textColor": { "type": "string", "description": "The primary text color for the reviews and names." },
            "borderColor": { "type": "string", "description": "The color of the card borders." },
            "borderRadius": { "type": "string", "description": "The border radius for the cards (e.g., '8px', '16px', '1rem', '50%')." },
            "layout": { "type": "string", "enum": ["grid", "list", "carousel"], "description": "The preferred layout type." }
          },
          "required": ["backgroundColor", "cardBackgroundColor", "textColor", "borderColor", "borderRadius", "layout"]
        }
        
        Ensure you only return valid CSS string values for the colors and sizes.
        Make sure the response is VALID JSON ONLY. Return only the JSON object, nothing else.`;

        const message = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            max_tokens: 512,
            messages: [
                {
                    role: "user",
                    content: systemPrompt,
                }
            ],
            response_format: { type: "json_object" }
        });

        const responseText = message.choices[0].message.content || "";
        
        let parsedData;
        try {
            parsedData = JSON.parse(responseText);
        } catch (e) {
            console.error("Failed to parse Groq response:", responseText);
            return NextResponse.json(
                { message: "Invalid JSON response from AI" },
                { status: 500 }
            );
        }

        return NextResponse.json({ 
            message: "Theme Generated",
            data: parsedData
        }, { status: 200 });

    } catch (error: any) {
        console.error("AI Theme Generation Error:", error);
        return NextResponse.json(
            { message: "Failed to generate theme", error: error.message },
            { status: 500 }
        );
    }
}
