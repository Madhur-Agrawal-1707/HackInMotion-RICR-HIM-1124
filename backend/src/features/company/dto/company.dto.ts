import { z } from 'zod';
import { getQuestionsQuerySchema, startInterviewSchema } from '../validation/company.validation';

export type GetQuestionsQueryDto = z.infer<typeof getQuestionsQuerySchema>;
export type StartInterviewDto = z.infer<typeof startInterviewSchema>;

export interface CompanyResponseDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  industry?: string;
  website?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyRoleResponseDto {
  id: string;
  companyId: string;
  title: string;
  slug: string;
  description?: string;
  skills: string[];
  experienceLevel?: string;
  interviewRounds: string[];
}

export interface CompanyQuestionResponseDto {
  id: string;
  companyId: string;
  roleId?: string;
  questionText: string;
  category: string;
  difficulty: string;
  round: string;
  sourceType: string;
  sourceUrl?: string;
  sourceTitle?: string;
  sourceYear?: number;
  tags: string[];
  frequency: number;
  verified: boolean;
}
