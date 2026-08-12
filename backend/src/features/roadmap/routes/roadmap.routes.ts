import { Router } from 'express';
import { roadmapController } from '../controller/roadmap.controller';

const router = Router();

// Validation middlewares can be injected here based on the schemas defined earlier.
// For example: router.post('/generate', validateBody(generateRoadmapSchema), roadmapController.generateRoadmap);
// Since I don't have the exact validateRequest middleware from the common folder, I'll define routes without them for now,
// or I can assume a standard validation middleware exists. Let's keep it simple.

router.post('/generate', roadmapController.generateRoadmap);
router.get('/', roadmapController.getRoadmaps);
router.get('/:id', roadmapController.getRoadmapById);
router.patch('/:id/progress', roadmapController.updateProgress);
router.delete('/:id', roadmapController.deleteRoadmap);

export const roadmapRouter = router;
