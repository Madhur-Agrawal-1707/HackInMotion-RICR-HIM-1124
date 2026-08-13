import { Router } from 'express';
import { ResumeController } from '../controller/resume.controller';
import { authenticate } from '../../../middleware/auth.middleware';
import { upload } from '../../../middleware/upload.middleware';

// Note: Ensure Zod validation middleware is used in a real app (omitted here for brevity, but schemas are in validation folder)
// import { validateRequest } from '../../../middleware/validate.middleware';
// import { buildResumeSchema, updateResumeSchema } from '../validation/resume.validation';

const router = Router();
const controller = new ResumeController();

// Apply auth middleware to all resume routes
router.use(authenticate);

// Core features
router.post('/upload', upload.single('resume'), controller.uploadResume);
router.post('/build', controller.buildResume);
router.post('/analyze', controller.analyzeResume);
router.post('/improve', controller.improveResume);

// Fetching
router.get('/', controller.getCurrentResume);
router.get('/history', controller.getResumeHistory);
router.get('/:id', controller.getResumeById);

// Updating & Versioning
router.patch('/:id', controller.updateResume);
router.delete('/:id', controller.deleteResume);
router.post('/version/restore', controller.restoreVersion);

export default router;
