import { z } from 'zod';

export const generateRoadmapSchema = z.object({
  body: z.object({
    targetRole: z.string().min(2, "Target role must be at least 2 characters"),
    experienceLevel: z.string().min(2, "Experience level is required"),
    careerGoal: z.string().min(5, "Career goal must be at least 5 characters"),
    preferredTimeline: z.string().min(2, "Preferred timeline is required"),
    resumeId: z.string().optional(),
    interviewId: z.string().optional(),
  }),
});

export const updateRoadmapProgressSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Roadmap ID is required"),
  }),
  body: z.object({
    completedTaskId: z.string().optional(),
    completedMilestoneId: z.string().optional(),
    phaseId: z.string().optional(),
  }).refine(data => data.completedTaskId || data.completedMilestoneId, {
    message: "Must provide either completedTaskId or completedMilestoneId",
    path: ["body"],
  }),
});

export const roadmapIdParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Roadmap ID is required"),
  }),
});
