import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../utils/prisma';

export async function PATCH(req: NextRequest) {
    try {
        const { reviewId, favourite } = await req.json();

        if (!reviewId || typeof favourite !== "boolean") {
            return NextResponse.json(
                { message: "reviewId and a boolean favourite status are required" },
                { status: 400 }
            );
        }

        const response = await prisma.review.update({
            where: {
                id: reviewId
            },
            data: {
                favourite
            }
        });

        return NextResponse.json({ message: "Review updated successfully", data: response });
    } catch (error: any) {
        console.error("Failed to update favourite status:", error);
        return NextResponse.json(
            { message: "Failed to update review", error: error.message },
            { status: 500 }
        );
    }
}
