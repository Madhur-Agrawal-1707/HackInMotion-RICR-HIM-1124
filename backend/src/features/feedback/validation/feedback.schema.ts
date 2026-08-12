import { z } from 'zod';

export const StrengthSchema = z.object({
  topic: z.string(),
  description: z.string(),
});

export const WeaknessSchema = z.object({
  topic: z.string(),
  description: z.string(),
});

export const SkillGapSchema = z.object({
  skill: z.string(),
  reason: z.string(),
  recommendedResource: z.string().optional(),
});

export const RecommendationSchema = z.object({
  category: z.string(),
  actionableStep: z.string(),
});

export const GenerateFeedbackSchema = z.object({
  params: z.object({
    interviewId: z.string(),
  }),
});

export type GenerateFeedbackInput = z.infer<typeof GenerateFeedbackSchema>;
