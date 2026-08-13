import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().optional(),
});

export const socialLinksSchema = z.object({
  portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().or(z.literal("")),
  current: z.boolean(),
  score: z.string().optional(),
}).refine(data => data.current || data.endDate, {
  message: "End date is required if not current",
  path: ["endDate"],
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().or(z.literal("")),
  current: z.boolean(),
  description: z.array(z.string()).min(1, "At least one responsibility is required"),
}).refine(data => data.current || data.endDate, {
  message: "End date is required if not current",
  path: ["endDate"],
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.array(z.string()).min(1, "At least one description bullet is required"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  link: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().min(1, "Date is required"),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const parsedResumeSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().min(10, "Summary should be at least 10 characters"),
  education: z.array(educationSchema),
  experience: z.array(experienceSchema),
  skills: z.array(z.string()),
  projects: z.array(projectSchema),
  certifications: z.array(certificationSchema),
  achievements: z.array(z.string()),
  languages: z.array(z.string()),
  socialLinks: socialLinksSchema,
});

export const uploadResumeSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size <= 10 * 1024 * 1024, {
    message: "File size must be less than 10MB",
  }).refine((file) => ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type), {
    message: "Only PDF and DOCX files are allowed",
  }),
});
