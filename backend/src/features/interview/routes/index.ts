import { Router } from 'express';
import { InterviewController } from '../controller/interview.controller';
import { startInterviewSchema, submitAnswerSchema, getSessionParamsSchema } from '../validation/interview.schema';

const router = Router();
const controller = new InterviewController();

// Local generic validation middleware, usually imported from common/
const validate = (schema: any) => (req: any, res: any, next: any) => {
  try {
    if (schema.body) schema.body.parse(req.body);
    if (schema.params) schema.params.parse(req.params);
    if (schema.query) schema.query.parse(req.query);
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
