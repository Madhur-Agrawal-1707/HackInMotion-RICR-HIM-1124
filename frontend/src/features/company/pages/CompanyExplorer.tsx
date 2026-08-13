import React, { useState } from 'react';
import { useCompanies } from '../hooks/api/useCompanyApi';
import { CompanyCard } from '../components/CompanyCard';
import { useCompanyStore } from '../store/useCompanyStore';

export const CompanyExplorer: React.FC = () => {
  const { companyFilters, setCompanyFilters } = useCompanyStore();
  const [searchInput, setSearchInput] = useState(companyFilters.search || '');

  const { data, isLoading, error } = useCompanies(companyFilters);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyFilters({ search: searchInput });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Explorer</h1>
          <p className="text-gray-600">Discover companies and practice their interview questions.</p>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="flex w-full md:w-auto">
          <input
            type="text"
            placeholder="Search companies..."
            className="border border-gray-300 rounded-l-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors">
            Search
          </button>
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to load companies. Please try again.
        </div>
      ) : data?.data.items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No companies found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data.items.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
};
