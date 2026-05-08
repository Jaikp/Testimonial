import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.API_KEY || "",
});

export async function POST(req: NextRequest) {
    try {
        const { reviews } = await req.json();

        if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
            return NextResponse.json(
                { message: "A valid array of reviews is required" },
                { status: 400 }
            );
        }

        // Extract just the text content from the reviews to save tokens
        const reviewTexts = reviews
            .filter(r => r.content && r.content.trim() !== "")
            .map(r => r.content)
            .join("\n\n---\n\n");

        if (!reviewTexts) {
             return NextResponse.json(
                { message: "No text content found in reviews to analyze" },
                { status: 400 }
            );
        }

        const prompt = `
        Analyze the following customer reviews and provide a comprehensive summary.
        
        Reviews:
        ${reviewTexts}

        Please return your analysis strictly matching the following JSON schema:
        {
          "type": "object",
          "properties": {
            "summary": { "type": "string", "description": "A 2-3 sentence overall summary of the sentiment and feedback." },
            "sentimentScore": { "type": "number", "description": "An overall sentiment score from 0 (very negative) to 100 (very positive)." },
            "positives": { 
              "type": "array",
              "items": { "type": "string" },
              "description": "Top 3-5 positive highlights mentioned by customers."
            },
            "negatives": { 
              "type": "array",
              "items": { "type": "string" },
              "description": "Top 3-5 constructive criticisms, issues, or negative points mentioned. Leave empty if none."
            },
            "themes": { 
              "type": "array",
              "items": { "type": "string" },
              "description": "3-5 short keywords or phrases representing the most common themes (e.g., 'Customer Service', 'Ease of Use')."
            }
          },
          "required": ["summary", "sentimentScore", "positives", "negatives", "themes"]
        }
        
        Make sure the response is VALID JSON ONLY. Return only the JSON object, nothing else.`;

        const message = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            max_tokens: 1024,
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
            response_format: { type: "json_object" } // Enforce JSON response if supported, otherwise prompt usually handles it
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
            message: "Analysis Complete",
            data: parsedData
        }, { status: 200 });

    } catch (error: any) {
        console.error("AI Analysis Error:", error);
        return NextResponse.json(
            { message: "Failed to analyze reviews", error: error.message },
            { status: 500 }
        );
    }
}
