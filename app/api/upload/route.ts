import multer from 'multer';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

// Configure Multer to store the uploaded files
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const uploadDir = path.join(process.cwd(), 'public/uploads');

      // Ensure the directory exists
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      console.error('Error creating directory:', error);
      cb(error as Error, ''); // Handle errors related to directory creation
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage });

// Middleware to handle multipart/form-data
const handler = upload.single('video');

export const POST = async (req: any, res: any) => {
  return new Promise<NextResponse>((resolve, reject) => {
    handler(req as any, res, (err) => {
      if (err) {
        console.error('Multer file upload error:', err); // Log specific multer errors
        return reject(
          NextResponse.json(
            { success: false, message: 'File upload failed.' },
            { status: 500 }
          )
        );
      }

      // Access the uploaded file via req.file
      const file = (req as any).formData.file;
      console.log(file);
      if (!file) {
        console.error('No file uploaded.');
        return reject(
          NextResponse.json(
            { success: false, message: 'No file uploaded.' },
            { status: 400 }
          )
        );
      }

      const filePath = `/uploads/${file.filename}`;
      console.log('File uploaded successfully to:', filePath); // Log successful file upload

      // Respond with the file path
      return resolve(
        NextResponse.json({ success: true, filePath }, { status: 200 })
      );
    });
  });
};
