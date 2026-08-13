import { Types } from 'mongoose';

export enum InterviewStatus {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum ExperienceLevel {
  STUDENT = 'Student',
  FRESHER = 'Fresher',
  JUNIOR = 'Junior',
  MID_LEVEL = 'Mid-Level',
  SENIOR = 'Senior',
  LEAD = 'Lead'
}

export enum DifficultyLevel {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  EXPERT = 'Expert'
}

export enum InterviewType {
  HR = 'HR',
  TECHNICAL = 'Technical',
  BEHAVIORAL = 'Behavioral',
  PROJECT = 'Project Discussion',
  RESUME = 'Resume-Based',
  CODING = 'Coding'
}

export interface IQuestion {
  questionId: string;
  questionText: string;
  type: string;
  topic: string;
  difficulty: string;
  sequence: number;
  parentQuestionId?: string;
  isFollowUp: boolean;
  followUpType?: string;
  createdAt: Date;
}

export interface IAnswer {
  questionId: string;
  answerText: string;
  duration: number; // in seconds
  submittedAt: Date;
  answerQuality?: number;
  correctness?: number;
  technicalDepth?: number;
  communication?: number;
  confidence?: number;
  relevance?: number;
  isSkipped: boolean;
}

export interface IInterviewSession {
  _id: Types.ObjectId;
  userId: string;
  resumeId?: string;
  targetRole: string;
  experienceLevel: ExperienceLevel;
  interviewType: InterviewType[];
  company?: string;
  domain: string;
  difficulty: DifficultyLevel;
  status: InterviewStatus;
  startedAt?: Date;
  completedAt?: Date;
  duration: number; // Configured total duration in minutes
  questionCount: number;
  questions: IQuestion[];
  answers: IAnswer[];
  topicsCovered: string[];
  strongAreas: string[];
  weakAreas: string[];
  overallSignals?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
