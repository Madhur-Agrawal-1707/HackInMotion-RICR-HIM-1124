import multer from 'multer';
import { ValidationError } from '../utils/errors';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
      cb(null, true);
    } else {
      cb(new ValidationError('Unsupported file type. Only JPEG, PNG, WEBP are allowed.') as any, false);
    }
  },
});
