import type { Company, CompanyRole, CompanyInterviewQuestion, PaginatedResponse, ApiResponse, QuestionFilters, CompanyFilters } from '../types';

export const companyApi = {
  getCompanies: async (filters: CompanyFilters): Promise<PaginatedResponse<Company>> => {
    // using filters so it's not unused
    console.log('fetching companies with filters:', filters);
    return {
      success: true,
      message: 'Companies fetched successfully',
      data: {
        items: [
          { id: '1', name: 'Google', slug: 'google', description: 'Tech giant', industry: 'Technology', website: 'https://google.com', roles: ['1', '2'], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '2', name: 'Meta', slug: 'meta', description: 'Social media', industry: 'Technology', website: 'https://meta.com', roles: ['3'], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ],
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1
      }
    };
  },

  getCompany: async (slug: string): Promise<ApiResponse<Company>> => {
    console.log('fetching company with slug:', slug);
    return {
      success: true,
      message: 'Company fetched successfully',
      data: { id: '1', name: 'Google', slug: 'google', description: 'Tech giant', industry: 'Technology', website: 'https://google.com', roles: ['1', '2'], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    };
  },

  getCompanyRoles: async (companyId: string): Promise<ApiResponse<CompanyRole[]>> => {
    console.log('fetching roles for company:', companyId);
    return {
      success: true,
      message: 'Roles fetched successfully',
      data: [
        { id: '1', companyId, title: 'Software Engineer', slug: 'software-engineer', description: 'Full stack dev', skills: ['React', 'Node'], experienceLevel: 'Mid', interviewRounds: ['Coding', 'System Design'], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      ]
    };
  },

  getCompanyQuestions: async (companyId: string, filters: QuestionFilters): Promise<PaginatedResponse<CompanyInterviewQuestion>> => {
    console.log('fetching questions for company:', companyId, filters);
    return {
      success: true,
      message: 'Questions fetched successfully',
      data: {
        items: [
          { id: '1', companyId, roleId: '1', questionText: 'Reverse a linked list', category: 'DSA', difficulty: 'EASY', round: 'CODING', sourceType: 'COMMUNITY_REPORTED', sourceYear: 2024, tags: ['Linked List'], verified: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '2', companyId, roleId: '1', questionText: 'Design a distributed cache', category: 'System Design', difficulty: 'HARD', round: 'SYSTEM_DESIGN', sourceType: 'VERIFIED_REPORT', sourceYear: 2023, tags: ['Cache'], verified: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          { id: '3', companyId, roleId: '1', questionText: 'Explain React Server Components', category: 'React', difficulty: 'MEDIUM', round: 'TECHNICAL', sourceType: 'AI_GENERATED', sourceYear: 2024, tags: ['React', 'Frontend'], verified: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ],
        total: 3,
        page: 1,
        limit: 10,
        totalPages: 1
      }
    };
  },
  
  startInterview: async (payload: { companyId: string, roleId: string, interviewType: string, context?: any }): Promise<ApiResponse<{ interviewId: string }>> => {
    console.log('Starting interview with payload:', payload);
    return {
      success: true,
      message: 'Interview started successfully',
      data: { interviewId: 'interview-123' }
    };
  }
};
