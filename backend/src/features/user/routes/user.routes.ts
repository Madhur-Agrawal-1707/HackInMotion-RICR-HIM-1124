import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { authenticate } from '../../../middleware/auth';
import { validate } from '../../../middleware/validate';
import { updateProfileSchema } from '../validation/user.validation';
import { upload } from '../../../middleware/upload';

const router = Router();
const userController = new UserController();

// All user routes require authentication
router.use(authenticate);

router.get('/profile', userController.getProfile);
router.patch('/profile', validate(updateProfileSchema), userController.updateProfile);
router.patch('/avatar', upload.single('avatar'), userController.uploadAvatar);
router.delete('/account', userController.deleteAccount);

export default router;
