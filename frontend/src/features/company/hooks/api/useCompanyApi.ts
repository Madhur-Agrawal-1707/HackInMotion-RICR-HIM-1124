import { useQuery, useMutation } from '@tanstack/react-query';
import { companyApi } from '../../api/companyApi';
import type { CompanyFilters, QuestionFilters } from '../../types';

export const useCompanies = (filters: CompanyFilters) => {
  return useQuery({
    queryKey: ['companies', filters],
    queryFn: () => companyApi.getCompanies(filters),
  });
};

export const useCompany = (slug: string) => {
  return useQuery({
    queryKey: ['company', slug],
    queryFn: () => companyApi.getCompany(slug),
    enabled: !!slug,
  });
};

export const useCompanyRoles = (companyId: string) => {
  return useQuery({
    queryKey: ['companyRoles', companyId],
    queryFn: () => companyApi.getCompanyRoles(companyId),
    enabled: !!companyId,
  });
};

export const useCompanyQuestions = (companyId: string, filters: QuestionFilters) => {
  return useQuery({
    queryKey: ['companyQuestions', companyId, filters],
    queryFn: () => companyApi.getCompanyQuestions(companyId, filters),
    enabled: !!companyId,
  });
};

export const useStartInterview = () => {
  return useMutation({
    mutationFn: companyApi.startInterview,
  });
};
