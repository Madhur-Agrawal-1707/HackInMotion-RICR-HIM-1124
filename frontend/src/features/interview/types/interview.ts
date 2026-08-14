export type ExperienceLevel = 'Student' | 'Fresher' | 'Junior' | 'Mid-Level' | 'Senior' | 'Lead';
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';
export type InterviewStatus = 'CREATED' | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED';

export interface QuestionData {
  questionId: string;
  questionText: string;
  type: string;
  topic: string;
  difficulty: string;
  sequence: number;
  parentQuestionId?: string;
  isFollowUp: boolean;
  followUpType?: string;
  createdAt: string;
}

export interface AnswerData {
  questionId: string;
  answerText: string;
  duration: number;
  submittedAt: string;
  answerQuality?: number;
  correctness?: number;
  technicalDepth?: number;
  communication?: number;
  confidence?: number;
  relevance?: number;
  isSkipped: boolean;
}

export interface InterviewSession {
  _id: string;
  userId: string;
  resumeId?: string;
  targetRole: string;
  experienceLevel: ExperienceLevel;
  interviewType: string; // e.g. HR, Technical, Behavioral, Coding
  company?: string;
  domain: string;
  difficulty: Difficulty;
  status: InterviewStatus;
  startedAt?: string;
  completedAt?: string;
  duration: number; // in minutes
  questionCount: number;
  questions: QuestionData[];
  answers: AnswerData[];
  topicsCovered: string[];
  strongAreas: string[];
  weakAreas: string[];
  overallSignals?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface StartInterviewRequest {
  targetRole: string;
  experienceLevel: ExperienceLevel;
  interviewType: string[];
  difficulty: Difficulty;
  duration: number;
  domain: string;
  company?: string;
  resumeId?: string;
}
