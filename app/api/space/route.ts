
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../utils/prisma';


 async function POST(req: NextRequest) {
    const {name,header,message,Question,userId} = await req.json();

    try{const response = await prisma.space.create({
        data : {
            name,
            userId,
            header,
            message,
            Question
        }
    })
    return NextResponse.json({ message: "Space Created" , data: response });
    
    }
    catch(e){
        return NextResponse.json({ message: "Failed" });
    }
}

async function GET(req: NextRequest) {
   
    const userId : number = Number(req.headers.get('userId'));
    console.log(userId);
    try{
        const response = await prisma.space.findMany({
        where :{
            userId
        }
        })
        return NextResponse.json({ message: "Space Created" , data: response });
    }
    catch(e){
        return NextResponse.json({ message: "Failes" });
    }
}

export {GET,POST};


