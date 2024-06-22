import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';

// Define the type for the uploadOnCloudinary function
type UploadOnCloudinary = (localFilePath: string) => Promise<UploadApiResponse | null>;

// Define the type for the Cloudinary configuration object
interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

// Configure Cloudinary with TypeScript types
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
} as CloudinaryConfig);

const uploadOnCloudinary: UploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      upload_preset: 'petopia',
      resource_type: 'auto',
      format: 'webp',
      quality: 'auto:best',
    });

    // Remove file from public/temp on successful upload
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload operation failed
    return null;
  }
};

// Delete Assets from Cloudinary
export const DeleteAssets = async (publicId: string): Promise<boolean | null> => {
  try {
    if (!publicId) {
      throw new Error('Public Id is Required to Delete an Asset');
    }

    const deleteAsset = await cloudinary.uploader.destroy(publicId);

    return deleteAsset?.result ? true : false;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { uploadOnCloudinary };
