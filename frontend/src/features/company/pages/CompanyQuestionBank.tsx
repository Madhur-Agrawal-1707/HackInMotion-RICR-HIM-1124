import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCompany, useCompanyQuestions } from '../hooks/api/useCompanyApi';
import { useCompanyStore } from '../store/useCompanyStore';
import { FilterPanel } from '../components/FilterPanel';
import { QuestionCard } from '../components/QuestionCard';

export const CompanyQuestionBank: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: companyData, isLoading: isLoadingCompany } = useCompany(slug || '');
  const { questionFilters, setQuestionFilters } = useCompanyStore();
  
  // Use debounced search text for API to avoid too many requests
  const [debouncedSearch, setDebouncedSearch] = useState(questionFilters.search);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedSearch !== questionFilters.search) {
        setQuestionFilters({ search: debouncedSearch });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedSearch, questionFilters.search, setQuestionFilters]);

  const companyId = companyData?.data?.id || '';
  const { data: questionsData, isLoading: isLoadingQuestions } = useCompanyQuestions(companyId, questionFilters);

  if (isLoadingCompany) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div></div>;
  }

  const company = companyData?.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to={`/company/${slug}`} className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← Back to {company?.name || 'Company'}
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{company?.name} Question Bank</h1>
        <p className="text-gray-600">
          Explore historically asked, curated, and AI-generated questions for {company?.name}. 
          Every question maintains source transparency.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <FilterPanel onSearchChange={setDebouncedSearch} />
        </div>
        
        <div className="w-full lg:w-3/4">
          {isLoadingQuestions ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : questionsData?.data.items.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
              <p className="text-gray-500">No questions found matching your filters.</p>
              <button 
                onClick={() => useCompanyStore.getState().resetQuestionFilters()}
                className="mt-4 text-blue-600 hover:underline text-sm"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {questionsData?.data.items.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
              
              {/* Pagination Controls */}
              {questionsData && questionsData.data.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <button 
                    disabled={questionsData.data.page <= 1}
                    onClick={() => setQuestionFilters({ page: questionsData.data.page - 1 })}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1">
                    Page {questionsData.data.page} of {questionsData.data.totalPages}
                  </span>
                  <button 
                    disabled={questionsData.data.page >= questionsData.data.totalPages}
                    onClick={() => setQuestionFilters({ page: questionsData.data.page + 1 })}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
