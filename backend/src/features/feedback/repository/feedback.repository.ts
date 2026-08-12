import { FeedbackReport, IFeedbackReport } from '../model/feedback.model';

export class FeedbackRepository {
  /**
   * Retrieves a feedback report by interview ID.
   */
  async findByInterviewId(interviewId: string): Promise<IFeedbackReport | null> {
    return FeedbackReport.findOne({ interviewId }).exec();
  }

  /**
   * Retrieves a feedback report by its own ID.
   */
  async findById(id: string): Promise<IFeedbackReport | null> {
    return FeedbackReport.findById(id).exec();
  }

  /**
   * Retrieves all feedback reports for a given user.
   */
  async findByUserId(userId: string): Promise<IFeedbackReport[]> {
    return FeedbackReport.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  /**
   * Creates or updates a feedback report for an interview.
   */
  async upsertFeedback(interviewId: string, feedbackData: Partial<IFeedbackReport>): Promise<IFeedbackReport> {
    return FeedbackReport.findOneAndUpdate(
      { interviewId },
      { $set: feedbackData },
      { new: true, upsert: true }
    ).exec();
  }
}

export const feedbackRepository = new FeedbackRepository();
