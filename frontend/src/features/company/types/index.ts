export interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  industry: string;
  website: string;
  logo?: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CompanyRole {
  id: string;
  companyId: string;
  title: string;
  slug: string;
  description: string;
  skills: string[];
  experienceLevel: string;
  interviewRounds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CompanyInterviewQuestion {
  id: string;
  companyId: string;
  roleId: string;
  questionText: string;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
  round: string;
  sourceType: 'OFFICIAL' | 'VERIFIED_REPORT' | 'COMMUNITY_REPORTED' | 'CURATED' | 'AI_GENERATED';
  sourceUrl?: string;
  sourceTitle?: string;
  sourceYear?: number;
  tags: string[];
  frequency?: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CompanyFilters {
  industry?: string;
  search?: string;
}

export interface QuestionFilters {
  role?: string;
  round?: string;
  category?: string;
  difficulty?: string;
  sourceType?: string;
  search?: string;
  page?: number;
  limit?: number;
}
