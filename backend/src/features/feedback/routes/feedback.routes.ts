import { Router } from 'express';
import { feedbackController } from '../controller/feedback.controller';

const router = Router();

// In a real app, add authentication middleware here

router.post('/generate/:interviewId', feedbackController.generateFeedback.bind(feedbackController));
router.get('/interview/:interviewId', feedbackController.getFeedback.bind(feedbackController));
router.get('/:interviewId/pdf', feedbackController.downloadPDF.bind(feedbackController));

export default router;
