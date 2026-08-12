import { feedbackGraph } from '../../../ai/graphs/feedbackGraph';
import { feedbackRepository } from '../repository/feedback.repository';
import { InterviewData, FeedbackDataForRoadmap } from '../types';
import { IFeedbackReport } from '../model/feedback.model';

export class FeedbackService {
  /**
   * Generates feedback using LangGraph and persists it.
   */
  async generateFeedback(interviewId: string, interviewData: InterviewData): Promise<IFeedbackReport> {
    const initialState = {
      interviewId,
      interviewData,
    };

    const finalState = await feedbackGraph.invoke(initialState);
    
    if (!finalState.feedbackReport) {
      throw new Error('Failed to generate feedback report data from LangGraph.');
    }

    const savedReport = await feedbackRepository.upsertFeedback(interviewId, finalState.feedbackReport);
    return savedReport;
  }

  /**
   * Retrieves a feedback report by Interview ID.
   */
  async getFeedbackByInterviewId(interviewId: string): Promise<IFeedbackReport | null> {
    return feedbackRepository.findByInterviewId(interviewId);
  }

  /**
   * Returns formatted feedback data for the Roadmap module.
   */
  async getFeedbackForRoadmap(interviewId: string): Promise<FeedbackDataForRoadmap | null> {
    const report = await feedbackRepository.findByInterviewId(interviewId);
    if (!report) return null;

    return {
      overallScore: report.overallScore,
      technicalScore: report.technicalScore,
      problemSolvingScore: report.problemSolvingScore,
      communicationScore: report.communicationScore,
      codingScore: report.codingScore,
      topicScores: report.topicScores,
      strongAreas: report.strengths.map(s => s.topic),
      weakAreas: report.weaknesses.map(w => w.topic),
      skillGaps: report.skillGaps.map(g => ({ skill: g.skill, reason: g.reason })),
      recommendations: report.recommendations,
    };
  }
}

export const feedbackService = new FeedbackService();
