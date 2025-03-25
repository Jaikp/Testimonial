import { NextResponse } from 'next/server';
import {uploadToCloudinary, cloudinary} from '@/lib/cloudinary';
import prisma from '../../../utils/prisma';
import { NextRequest } from 'next/server';
export const POST = async (req: Request) => {
  try {
    // Get the form data
    const formData = await req.formData();
    const file = formData.get('video') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert to buffer for Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const result :any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'recordings'
        },
        (error: any, result: unknown) => {
          if (error) reject(error);
          resolve(result);
        }
      );
      
      uploadStream.end(buffer);
    });

    await prisma.review.create({
      data : {
        spaceId : formData.get('spaceId') as string,
        name : formData.get('name') as string,
        email : formData.get('email') as string,
        videoUrl : result.public_id,
        rating : formData.get('rating') as string,
      }
    })
    

    return NextResponse.json(
      { 
        success: true, 
        url: result.secure_url,
        publicId: result.public_id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Upload failed' },
      { status: 500 }
    );
  }
};