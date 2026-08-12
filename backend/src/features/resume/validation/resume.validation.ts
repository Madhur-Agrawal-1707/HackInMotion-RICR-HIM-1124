import { z } from 'zod';

export const socialLinksSchema = z.object({
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  portfolio: z.string().url().optional(),
}).optional();

export const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

export const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional(),
  current: z.boolean().default(false),
  location: z.string().optional(),
  description: z.array(z.string()).default([]),
});

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  link: z.string().url().optional().or(z.literal('')),
});

export const resumeDataSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  summary: z.string().optional(),
  education: z.array(educationSchema).default([]),
  experience: z.array(experienceSchema).default([]),
  skills: z.array(z.string()).default([]),
  projects: z.array(projectSchema).default([]),
  certifications: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  socialLinks: socialLinksSchema,
  interests: z.array(z.string()).default([]),
});

export const buildResumeSchema = z.object({
  body: resumeDataSchema
});

export const updateResumeSchema = z.object({
  body: resumeDataSchema.partial()
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID'),
  })
});
