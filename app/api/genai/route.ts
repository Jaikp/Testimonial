
import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.API_KEY || "",
});


async function POST(req: NextRequest) {
    const {name} = await req.json();
    
    if (!name || name.trim() === "") {
        return NextResponse.json(
            { message: "Product name is required" },
            { status: 400 }
        );
    }
    
    try {
        let prompt = `
        I have a ${name}, and i want to ask my customers for review. Please give me the layout for the survey page with header title a custom message and exactly 3 to 6 questions using this strict JSON schema:
        {
          "type": "object",
          "properties": {
            "name": { "type": "string", "description": "Name of the product or service" },
            "header": { "type": "string", "description": "Header title for the testimonial page" },
            "message": { "type": "string", "description": "Welcome message for customers" },
            "questions": { 
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": { "type": "number" },
                  "question": { "type": "string" }
                }
              },
              "description": "Exactly 3 to 6 questions to ask customers"
            }
          }
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
        });
        
        const responseText = message.choices[0].message.content || "";
        console.log("Groq Response:", responseText);
        
        const parsedData = JSON.parse(responseText);
        
        // Validate response structure
        if (!parsedData.name || !parsedData.header || !parsedData.message || !Array.isArray(parsedData.questions)) {
            return NextResponse.json(
                { message: "Invalid response structure from AI" },
                { status: 400 }
            );
        }
        
        return NextResponse.json({ 
            message: "Space Created",
            data: parsedData
        }, { status: 200 });
        
    } catch (error: any) {
        console.error("AI Generation Error:", error);
        
        // Fallback: Generate default content when AI is unavailable
        console.log("Using fallback default content...");
        const fallbackData = {
            name: name,
            header: `Share Your Feedback on ${name}`,
            message: `We'd love to hear from you! Your feedback helps us improve ${name}. Please take a moment to share your thoughts with us.`,
            questions: [
                { id: Date.now() + 1, question: "What is your overall experience with our product?" },
                { id: Date.now() + 2, question: "What features do you like the most?" },
                { id: Date.now() + 3, question: "What can we improve?" }
            ]
        };
        
        console.log("Fallback data being returned:", fallbackData);
        console.log("Questions in fallback:", fallbackData.questions);
        console.log("Number of questions:", fallbackData.questions.length);
        
        return NextResponse.json({ 
            message: "Space Created (using default template)",
            data: fallbackData
        }, { status: 200 });
    }
}

export {POST};

  
