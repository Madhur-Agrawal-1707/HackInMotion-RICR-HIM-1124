import { InterviewSessionModel, IInterviewSessionDocument } from '../model/interview.model';
import { IInterviewSession, IQuestion, IAnswer } from '../types/interview.types';

export class InterviewRepository {
  async createSession(data: Partial<IInterviewSession>): Promise<IInterviewSessionDocument> {
    const session = new InterviewSessionModel(data);
    return await session.save();
  }

  async getSessionById(sessionId: string): Promise<IInterviewSessionDocument | null> {
    return await InterviewSessionModel.findById(sessionId);
  }

  async addQuestion(sessionId: string, question: IQuestion): Promise<IInterviewSessionDocument | null> {
    return await InterviewSessionModel.findByIdAndUpdate(
      sessionId,
      { 
        $push: { questions: question },
        $inc: { questionCount: 1 }
      },
      { new: true }
    );
  }

  async addAnswer(sessionId: string, answer: IAnswer): Promise<IInterviewSessionDocument | null> {
    return await InterviewSessionModel.findByIdAndUpdate(
      sessionId,
      { $push: { answers: answer } },
      { new: true }
    );
  }

  async updateSessionStatus(sessionId: string, status: string, additionalData: any = {}): Promise<IInterviewSessionDocument | null> {
    return await InterviewSessionModel.findByIdAndUpdate(
      sessionId,
      { status, ...additionalData },
      { new: true }
    );
  }
}
