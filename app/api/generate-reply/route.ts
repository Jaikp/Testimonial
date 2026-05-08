import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.API_KEY || "",
});

export async function POST(req: NextRequest) {
    try {
        const { customerName, reviewContent } = await req.json();

        if (!customerName || !reviewContent) {
            return NextResponse.json(
                { message: "Customer name and review content are required" },
                { status: 400 }
            );
        }

        const prompt = `
        You are a professional customer success manager. Draft a polite, concise, and personalized reply to the following customer review.
        If the review is positive, thank them for their feedback and express appreciation.
        If the review is negative or constructive, apologize for their experience, acknowledge their points, and offer to make things right.
        
        Customer Name: ${customerName}
        Review: "${reviewContent}"

        Return your response strictly matching the following JSON schema:
        {
          "type": "object",
          "properties": {
            "reply": { "type": "string", "description": "The drafted reply to the customer." }
          },
          "required": ["reply"]
        }
        
        Make sure the response is VALID JSON ONLY. Return only the JSON object, nothing else.`;

        const message = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            max_tokens: 512,
            messages: [
                {
                    role: "user",
                    content: prompt,
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
            message: "Reply Drafted",
            data: parsedData
        }, { status: 200 });

    } catch (error: any) {
        console.error("AI Reply Generation Error:", error);
        return NextResponse.json(
            { message: "Failed to generate reply", error: error.message },
            { status: 500 }
        );
    }
}
