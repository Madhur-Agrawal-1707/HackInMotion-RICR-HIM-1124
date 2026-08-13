import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.config';
import { logger } from '../utils/logger';

if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
  logger.info('✅ Cloudinary configured successfully');
} else {
  logger.warn('⚠️ Cloudinary configuration is missing. Avatar uploads will fail.');
}

export default cloudinary;
