import { Router } from 'express';
import { InterviewController } from '../controller/interview.controller';
import { startInterviewSchema, submitAnswerSchema, getSessionParamsSchema } from '../validation/interview.schema';

const router = Router();
const controller = new InterviewController();

// Local generic validation middleware, usually imported from common/
const validate = (schema: any) => (req: any, res: any, next: any) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      error
    });
  }
};

router.post(
  '/start',
  validate(startInterviewSchema),
  controller.startInterview
);

router.get(
  '/history',
  // maybe authenticate middleware is needed, but assuming it's applied globally or not needed for mock
  controller.getHistory
);

router.get(
  '/:sessionId/next-question',
  validate(getSessionParamsSchema),
  controller.getNextQuestion
);

router.post(
  '/:sessionId/answer',
  validate(submitAnswerSchema),
  controller.submitAnswer
);

router.get(
  '/:sessionId',
  validate(getSessionParamsSchema),
  controller.getSession
);

export default router;
