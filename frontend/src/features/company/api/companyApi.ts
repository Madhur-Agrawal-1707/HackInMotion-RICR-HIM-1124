import type { Company, CompanyRole, CompanyInterviewQuestion, PaginatedResponse, ApiResponse, QuestionFilters, CompanyFilters } from '../types';
import { apiClient } from '../../auth/api/axios';

export const companyApi = {
  getCompanies: async (filters: CompanyFilters): Promise<PaginatedResponse<Company>> => {
    const response = await apiClient.get('/company', { params: filters });
    return response.data;
  },

  getCompany: async (slug: string): Promise<ApiResponse<Company>> => {
    const response = await apiClient.get(`/company/${slug}`);
    return response.data;
  },

  getCompanyRoles: async (companyId: string): Promise<ApiResponse<CompanyRole[]>> => {
    const response = await apiClient.get(`/company/${companyId}/roles`);
    return response.data;
  },

  getCompanyQuestions: async (companyId: string, filters: QuestionFilters): Promise<PaginatedResponse<CompanyInterviewQuestion>> => {
    const response = await apiClient.get(`/company/${companyId}/questions`, { params: filters });
    return response.data;
  },
  
  startInterview: async (payload: { companyId: string, roleId: string, interviewType: string, context?: any }): Promise<ApiResponse<{ interviewId: string }>> => {
    const response = await apiClient.post('/company/interview/start', payload);
    return response.data;
  }
};
