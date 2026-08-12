export interface FeedbackReport {
  _id: string;
  userId: string;
  interviewId: string;
  overallScore: number;
  technicalScore: number;
  problemSolvingScore: number;
  communicationScore: number;
  codingScore: number;
  behavioralScore: number;
  topicScores: Record<string, number>;
  strengths: Array<{ topic: string; description: string }>;
  weaknesses: Array<{ topic: string; description: string }>;
  skillGaps: Array<{ skill: string; reason: string; recommendedResource?: string }>;
  recommendations: Array<{ category: string; actionableStep: string }>;
  summary: string;
  rubricVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: any;
}
