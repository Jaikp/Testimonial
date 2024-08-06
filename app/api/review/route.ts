
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../utils/prisma';


 async function POST(req: NextRequest) {
    const {name,email,content,spaceId,rating} = await req.json();

    try{const response = await prisma.review.create({
        data : {
            name,
            email,
            content,
            spaceId,
            rating
        }
    })
    return NextResponse.json({ message: "Space Created" , data: response });
    
    }
    catch(e){
        return NextResponse.json({ message: e });
    }
}

async function GET(req: NextRequest) {
   
    const spaceId = req.headers.get('spaceId')?.toString();
    console.log(spaceId);
    try{
        const response = await prisma.review.findMany({
        where :{
            spaceId
        }
        })
        return NextResponse.json({ message: "Reviews" , data: response });
    }
    catch(e){
        return NextResponse.json({ message: "Failes" });
    }
}

export {GET,POST};


