import mongoose, { Schema } from 'mongoose';
import { IResume } from '../types/resume.types';

const EducationSchema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
});

const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  location: { type: String },
  description: [{ type: String }],
});

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: [{ type: String }],
  technologies: [{ type: String }],
  link: { type: String },
});

const ResumeDataSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  summary: { type: String },
  education: [EducationSchema],
  experience: [ExperienceSchema],
  skills: [{ type: String }],
  projects: [ProjectSchema],
  certifications: [{ type: String }],
  achievements: [{ type: String }],
  languages: [{ type: String }],
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    portfolio: { type: String },
  },
  interests: [{ type: String }],
});

const AtsAnalysisSchema = new Schema({
  overallScore: { type: Number, required: true },
  sectionScores: {
    formatting: { type: Number, required: true },
    keywords: { type: Number, required: true },
    readability: { type: Number, required: true },
    experience: { type: Number, required: true },
    skills: { type: Number, required: true },
  },
  missingKeywords: [{ type: String }],
  improvementSuggestions: [{ type: String }],
  priorityFixes: [{ type: String }],
});

const ProfileStrengthSchema = new Schema({
  overallScore: { type: Number, required: true },
  strengthAreas: [{ type: String }],
  weakAreas: [{ type: String }],
  recommendedNextSteps: [{ type: String }],
});

const AiSuggestionsSchema = new Schema({
  improvedSummary: { type: String },
  improvedExperience: [{
    company: String,
    position: String,
    newDescription: [String]
  }],
  improvedProjects: [{
    name: String,
    newDescription: [String]
  }],
  skillRecommendations: [{ type: String }],
  missingCertifications: [{ type: String }],
  missingTechnologies: [{ type: String }],
  resumeRewritingSuggestions: [{ type: String }],
});

const ResumeSchema = new Schema<IResume>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    originalFileUrl: { type: String },
    parsedResume: { type: ResumeDataSchema, required: true },
    atsScore: { type: AtsAnalysisSchema },
    profileStrength: { type: ProfileStrengthSchema },
    aiSuggestions: { type: AiSuggestionsSchema },
    versionId: { type: String, required: true },
    currentVersion: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const Resume = mongoose.model<IResume>('Resume', ResumeSchema);
