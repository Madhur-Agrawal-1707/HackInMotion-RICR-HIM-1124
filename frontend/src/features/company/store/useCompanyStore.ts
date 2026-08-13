import { create } from 'zustand';
import type { CompanyFilters, QuestionFilters } from '../types';

interface CompanyState {
  companyFilters: CompanyFilters;
  questionFilters: QuestionFilters;
  setCompanyFilters: (filters: Partial<CompanyFilters>) => void;
  setQuestionFilters: (filters: Partial<QuestionFilters>) => void;
  resetQuestionFilters: () => void;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  companyFilters: {
    industry: '',
    search: '',
  },
  questionFilters: {
    page: 1,
    limit: 10,
    search: '',
  },
  setCompanyFilters: (filters) =>
    set((state) => ({
      companyFilters: { ...state.companyFilters, ...filters },
    })),
  setQuestionFilters: (filters) =>
    set((state) => ({
      questionFilters: { ...state.questionFilters, ...filters, page: filters.page ?? 1 },
    })),
  resetQuestionFilters: () =>
    set(() => ({
      questionFilters: { page: 1, limit: 10, search: '' },
    })),
}));
