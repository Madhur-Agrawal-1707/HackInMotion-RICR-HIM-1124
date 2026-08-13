import { Document, Types } from 'mongoose';

export interface IEducation {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: Date | string;
  endDate?: Date | string;
  current: boolean;
  description?: string;
}

export interface IExperience {
  company: string;
  position: string;
  startDate: Date | string;
  endDate?: Date | string;
  current: boolean;
  location?: string;
  description: string[];
}

export interface IProject {
  name: string;
  description: string[];
  technologies: string[];
  link?: string;
}

export interface IResumeData {
  name: string;
  email: string;
  phone?: string;
  summary?: string;
  education: IEducation[];
  experience: IExperience[];
  skills: string[];
  projects: IProject[];
  certifications: string[];
  achievements: string[];
  languages: string[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  interests?: string[];
}

export interface IAtsAnalysis {
  overallScore: number;
  sectionScores: {
    formatting: number;
    keywords: number;
    readability: number;
    experience: number;
    skills: number;
  };
  missingKeywords: string[];
  improvementSuggestions: string[];
  priorityFixes: string[];
}

export interface IProfileStrength {
  overallScore: number;
  strengthAreas: string[];
  weakAreas: string[];
  recommendedNextSteps: string[];
}

export interface IAiSuggestions {
  improvedSummary?: string;
  improvedExperience?: Array<{ company: string; position: string; newDescription: string[] }>;
  improvedProjects?: Array<{ name: string; newDescription: string[] }>;
  skillRecommendations: string[];
  missingCertifications: string[];
  missingTechnologies: string[];
  resumeRewritingSuggestions: string[];
}

export interface IResume extends Document {
  userId: Types.ObjectId;
  originalFileUrl?: string;
  parsedResume: IResumeData;
  atsScore?: IAtsAnalysis;
  profileStrength?: IProfileStrength;
  aiSuggestions?: IAiSuggestions;
  versionId: string;
  currentVersion: boolean;
  createdAt: Date;
  updatedAt: Date;
}
