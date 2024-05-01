import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/temp');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

// Middleware function to handle multiple file upload
export const uploadMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    // Use multer upload instance
    upload.array('images', 5)(req, res, (err: any) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Retrieve uploaded files
      const files = req.files || [];
      const errors: string[] = [];

      // Validate file types and sizes
      files.forEach((file: any) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.mimetype)) {
          errors.push(`Invalid file type: ${file.originalname}`);
        }

        if (file.size > maxSize) {
          errors.push(`File too large: ${file.originalname}`);
        }
      });

      // Handle validation errors
      if (errors.length > 0) {
        // Remove uploaded files
        files.forEach((file: any) => {
          fs.unlinkSync(file.path);
        });

        return res.status(400).json({ errors });
      }

      // Proceed to the next middleware or route handler
      next();
    });
  } catch (error: any) {
    console.log(error);
  }
};
