import { Request, Response } from 'express';
import { InterviewService } from '../service/interview.service';

export class InterviewController {
  private service: InterviewService;

  constructor() {
    this.service = new InterviewService();
  }

  public startInterview = async (req: Request, res: Response): Promise<void> => {
    try {
      // Assuming user ID is attached by auth middleware
      const userId = (req as any).user?.id || 'mock-user-id'; 
      const sessionData = req.body;

      const session = await this.service.startInterview(userId, sessionData);

      res.status(201).json({
        success: true,
        message: "Interview session created successfully",
        data: session
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to start interview",
        error: {}
      });
    }
  };

  public getNextQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const { sessionId } = req.params;
      const question = await this.service.getNextQuestion(sessionId as string);

      res.status(200).json({
        success: true,
        message: "Next question retrieved",
        data: question
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to get next question",
        error: {}
      });
    }
  };

  public submitAnswer = async (req: Request, res: Response): Promise<void> => {
    try {
      const { sessionId } = req.params;
      const answerData = req.body;

      const result = await this.service.submitAnswer(sessionId as string, answerData);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.evaluation
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to submit answer",
        error: {}
      });
    }
  };

  public getSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const { sessionId } = req.params;
      const session = await this.service.getSessionDetails(sessionId as string);

      res.status(200).json({
        success: true,
        message: "Session details retrieved",
        data: session
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || "Session not found",
        error: {}
      });
    }
  };
}
