import { Annotation } from '@langchain/langgraph';
import { InterviewData } from '../../../features/feedback/types';
import { IFeedbackReport } from '../../../features/feedback/model/feedback.model';

export const FeedbackGraphState = Annotation.Root({
  interviewId: Annotation<string>(),
  interviewData: Annotation<InterviewData>(),
  candidateContext: Annotation<any>(), // Any extra candidate data
  evaluatedAnswers: Annotation<any[]>(), // The results of answer analysis
  scores: Annotation<{
    overallScore: number;
    technicalScore: number;
    problemSolvingScore: number;
    communicationScore: number;
    codingScore: number;
    behavioralScore: number;
    topicScores: Record<string, number>;
  }>(),
  strengths: Annotation<Array<{ topic: string; description: string }>>(),
  weaknesses: Annotation<Array<{ topic: string; description: string }>>(),
  skillGaps: Annotation<Array<{ skill: string; reason: string; recommendedResource?: string }>>(),
  recommendations: Annotation<Array<{ category: string; actionableStep: string }>>(),
  summary: Annotation<string>(),
  feedbackReport: Annotation<Partial<IFeedbackReport>>(), // The final combined report
});

export type FeedbackGraphStateType = typeof FeedbackGraphState.State;
