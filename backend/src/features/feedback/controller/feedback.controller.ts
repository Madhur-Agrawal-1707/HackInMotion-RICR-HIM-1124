import { Request, Response } from 'express';
import { feedbackService } from '../service/feedback.service';
import { GenerateFeedbackSchema } from '../validation/feedback.schema';
import { generateFeedbackPDF } from '../../../utils/pdfGenerator';
import { InterviewData } from '../types';

export class FeedbackController {
  async generateFeedback(req: Request, res: Response) {
    try {
      const { interviewId } = GenerateFeedbackSchema.shape.params.parse(req.params);
      
      // Mock fetching interview data since the Interview module isn't here
      const mockInterviewData: InterviewData = {
        interviewId,
        userId: (req as any).user?.id || 'mockUserId',
        targetRole: 'Software Engineer',
        experienceLevel: 'Mid-Level',
        interviewType: 'Technical',
        questions: ['Explain closures in JS.'],
        answers: ['Closures are functions that remember their outer scope.'],
        topics: ['JavaScript'],
        difficulty: 'Medium',
        codingSubmissions: [],
        duration: 45
      };

      const feedback = await feedbackService.generateFeedback(interviewId, mockInterviewData);
      
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
