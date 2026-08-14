import { Request, Response } from 'express';
import { feedbackService } from '../service/feedback.service';
import { GenerateFeedbackSchema } from '../validation/feedback.schema';
import { generateFeedbackPDF } from '../../../utils/pdfGenerator';
import { InterviewData } from '../types';
import { InterviewRepository } from '../../interview/repository/interview.repository';

const interviewRepo = new InterviewRepository();

export class FeedbackController {
  async generateFeedback(req: Request, res: Response) {
    try {
      const { interviewId } = GenerateFeedbackSchema.shape.params.parse(req.params);
      
      const session = await interviewRepo.getSessionById(interviewId);
      if (!session) {
        return res.status(404).json({ success: false, message: 'Interview session not found' });
      }

      const realInterviewData: InterviewData = {
        interviewId,
        userId: session.userId,
        targetRole: session.targetRole,
        experienceLevel: session.experienceLevel,
        interviewType: session.interviewType.join(', '),
        questions: session.questions || [],
        answers: session.answers || [],
        topics: [session.domain],
        difficulty: session.difficulty,
        codingSubmissions: [],
        duration: session.duration || 45
      };

      const feedback = await feedbackService.generateFeedback(interviewId, realInterviewData);
      
      res.status(201).json({
        success: true,
        message: 'Feedback generated successfully',
        data: feedback
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Unable to generate feedback',
        error: error.message
      });
    }
  }

  async getFeedback(req: Request, res: Response) {
    try {
      const { interviewId } = req.params;
      const feedback = await feedbackService.getFeedbackByInterviewId(interviewId as string);
      
      if (!feedback) {
        return res.status(404).json({ success: false, message: 'Feedback not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Feedback retrieved successfully',
        data: feedback
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'Unable to retrieve feedback', error: error.message });
    }
  }

  async downloadPDF(req: Request, res: Response) {
    try {
      const { interviewId } = req.params;
      const feedback = await feedbackService.getFeedbackByInterviewId(interviewId as string);
      
      if (!feedback) {
        return res.status(404).json({ success: false, message: 'Feedback not found' });
      }

      const pdfBuffer = await generateFeedbackPDF(feedback, 'Jane Doe', 'Software Engineer', 'Technical');
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=feedback_${interviewId}.pdf`);
      res.send(pdfBuffer);
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'Unable to generate PDF', error: error.message });
    }
  }
}

export const feedbackController = new FeedbackController();
