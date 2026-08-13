import { z } from 'zod';

export const getQuestionsQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  role: z.string().optional(),
  round: z.enum([
    'ONLINE_ASSESSMENT',
    'CODING',
    'TECHNICAL',
    'SYSTEM_DESIGN',
    'BEHAVIORAL',
    'HR',
    'MANAGERIAL',
    'FINAL'
  ]).optional(),
  category: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']).optional(),
  sourceType: z.enum([
    'OFFICIAL',
    'VERIFIED_REPORT',
    'COMMUNITY_REPORTED',
    'CURATED',
    'AI_GENERATED'
  ]).optional(),
  search: z.string().optional(),
});

export const startInterviewSchema = z.object({
  companyId: z.string().min(1, 'companyId is required'),
  roleId: z.string().min(1, 'roleId is required'),
  round: z.enum([
    'ONLINE_ASSESSMENT',
    'CODING',
    'TECHNICAL',
    'SYSTEM_DESIGN',
    'BEHAVIORAL',
    'HR',
    'MANAGERIAL',
    'FINAL'
  ]),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']),
  interviewDuration: z.number().optional(),
  resumeUrl: z.string().url().optional(),
});
