import React from 'react';
import { useCompanyStore } from '../store/useCompanyStore';

interface FilterPanelProps {
  onSearchChange: (search: string) => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onSearchChange, className }) => {
  const { questionFilters, setQuestionFilters } = useCompanyStore();

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestionFilters({ difficulty: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestionFilters({ category: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionFilters({ search: e.target.value });
    onSearchChange(e.target.value);
  };

  return (
    <div className={`p-4 bg-white border rounded-lg shadow-sm ${className}`}>
      <h3 className="font-medium text-lg mb-4">Filters</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Search Questions</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="e.g. dynamic programming"
            value={questionFilters.search || ''}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Difficulty</label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={questionFilters.difficulty || ''}
            onChange={handleDifficultyChange}
          >
            <option value="">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
            <option value="EXPERT">Expert</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={questionFilters.category || ''}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="DSA">DSA</option>
            <option value="System Design">System Design</option>
            <option value="React">React</option>
            <option value="Behavioral">Behavioral</option>
          </select>
        </div>
        <button 
          onClick={() => useCompanyStore.getState().resetQuestionFilters()}
          className="w-full mt-2 text-sm text-blue-600 hover:underline"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};
