export interface ResumeModel {
  _id: string;
  userId: string;
  originalFileUrl: string;
  parsedResume: ParsedResume;
  atsScore: AtsScore;
  profileStrength: ProfileStrength;
  aiSuggestions: AiSuggestions;
  resumeVersions: string[];
  currentVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParsedResume {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  achievements: string[];
  languages: string[];
  socialLinks: SocialLinks;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location?: string;
}

export interface SocialLinks {
  portfolio?: string;
  github?: string;
  linkedin?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  score?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string[];
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface AtsScore {
  overallScore: number;
  sectionScores: {
    formatting: number;
    keywords: number;
    readability: number;
    experience: number;
    skills: number;
    grammar: number;
    sectionCompleteness: number;
    contactInformation: number;
    projectQuality: number;
    actionVerbs: number;
  };
  missingKeywords: string[];
  improvementSuggestions: string[];
  priorityFixes: string[];
}

export interface ProfileStrength {
  overallScore: number;
  strengthAreas: string[];
  weakAreas: string[];
  recommendedNextSteps: string[];
}

export interface AiSuggestions {
  improvedSummary?: string;
  betterProjectDescriptions?: Record<string, string[]>;
  betterBulletPoints?: Record<string, string[]>;
  strongActionVerbs?: string[];
  grammarImprovements?: string[];
  skillRecommendations?: string[];
  missingCertifications?: string[];
  missingTechnologies?: string[];
  resumeRewritingSuggestions?: string[];
}
