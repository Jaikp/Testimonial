
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY || "" );


async function POST(req: NextRequest) {
    const {name} = await req.json();
    try {
        let model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
  
            generationConfig: { responseMimeType: "application/json" }
          });
          
          let prompt = `
          I have a ${name}, and i want to ask my customers for review. Please give me the layout for the survey page with header title a custom message and a 3 questions  using this JSON schema :
          {
            "type": "object",
            "properties": {
                "name": { "type": "string" },
                "header": { "type": "string" },
                "message": { "type": "string" },
                "questions": [
                { "id": 1, "question": "string" },
                { "id": 2, "question": "string" },
                { "id": 3, "question": "string" }
                ]
            }
            }`;
          let result = await model.generateContent(prompt)
          console.log(result.response.text());
          return NextResponse.json({ message: "Space Created" , data: JSON.parse(result.response.text()) });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failes" });
    }
}

export {POST};

  
