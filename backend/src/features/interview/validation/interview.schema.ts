import { z } from 'zod';
import { ExperienceLevel, DifficultyLevel, InterviewType } from '../types/interview.types';

export const startInterviewSchema = z.object({
  body: z.object({
    resumeId: z.string().optional(),
    targetRole: z.string().min(1, "Target role is required"),
    experienceLevel: z.nativeEnum(ExperienceLevel),
    interviewType: z.array(z.nativeEnum(InterviewType)).min(1, "At least one interview type is required"),
    company: z.string().optional(),
    domain: z.string().min(1, "Domain is required"),
    difficulty: z.nativeEnum(DifficultyLevel),
    duration: z.number().min(5, "Minimum duration is 5 minutes").max(120, "Maximum duration is 120 minutes")
  })
});

export const submitAnswerSchema = z.object({
  params: z.object({
    sessionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Session ID")
  }),
  body: z.object({
    questionId: z.string().min(1, "Question ID is required"),
    answerText: z.string().optional(),
    duration: z.number().min(0, "Duration must be non-negative"),
    isSkipped: z.boolean().default(false)
  })
});

export const getSessionParamsSchema = z.object({
  params: z.object({
    sessionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Session ID")
  })
});
