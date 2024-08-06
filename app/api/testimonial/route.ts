
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../utils/prisma';


async function POST(req: NextRequest) {

    console.log("hellow");
    const {id} = await req.json();
    
    try{
        const response = await prisma.space.findMany({
        where :{
            id
        }
        })
        return NextResponse.json({ message: "Space Created" , data: response });
    }
    catch(e){
        return NextResponse.json({ message: "Failes" });
    }
}

export {POST};


