import { v2 as cloudinary } from 'cloudinary';

export const uploadToCloudinary = async (fileBuffer: Buffer, filename: string, folder: string = 'resumes'): Promise<string> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder, public_id: filename.split('.')[0] },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Cloudinary upload failed with no result'));
        resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};
