export interface InterviewData {
  interviewId: string;
  userId: string;
  targetRole: string;
  experienceLevel: string;
  interviewType: string;
  questions: any[];
  answers: any[];
  topics: string[];
  difficulty: string;
  codingSubmissions: any[];
  duration: number;
}

export interface FeedbackDataForRoadmap {
  overallScore: number;
  technicalScore: number;
  problemSolvingScore: number;
  communicationScore: number;
  codingScore: number;
  topicScores: Record<string, number>;
  strongAreas: string[];
  weakAreas: string[];
  skillGaps: Array<{ skill: string; reason: string }>;
  recommendations: Array<{ category: string; actionableStep: string }>;
}
