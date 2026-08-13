import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { FilterPanel } from './FilterPanel';

// Mock the store
vi.mock('../store/useCompanyStore', () => ({
  useCompanyStore: vi.fn(() => ({
    questionFilters: { search: '', difficulty: '', category: '' },
    setQuestionFilters: vi.fn(),
  })),
}));

import { useCompanyStore } from '../store/useCompanyStore';

describe('FilterPanel', () => {
  const mockOnSearchChange = vi.fn();
  const mockSetQuestionFilters = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCompanyStore as any).mockReturnValue({
      questionFilters: { search: '', difficulty: '', category: '' },
      setQuestionFilters: mockSetQuestionFilters,
    });
    
    (useCompanyStore as any).getState = vi.fn(() => ({
      resetQuestionFilters: vi.fn(),
    }));
  });

  it('renders filter inputs correctly', () => {
    render(<FilterPanel onSearchChange={mockOnSearchChange} />);
    
    expect(screen.getByPlaceholderText('e.g. dynamic programming')).toBeInTheDocument();
    expect(screen.getByText('Difficulty')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('calls onSearchChange and setQuestionFilters when search input changes', () => {
    render(<FilterPanel onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('e.g. dynamic programming');
    fireEvent.change(searchInput, { target: { value: 'React' } });
    
    expect(mockSetQuestionFilters).toHaveBeenCalledWith({ search: 'React' });
    expect(mockOnSearchChange).toHaveBeenCalledWith('React');
  });

  it('calls setQuestionFilters when difficulty changes', () => {
    render(<FilterPanel onSearchChange={mockOnSearchChange} />);
    
    const difficultySelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(difficultySelect, { target: { value: 'EASY' } });
    
    expect(mockSetQuestionFilters).toHaveBeenCalledWith({ difficulty: 'EASY' });
  });

  it('calls setQuestionFilters when category changes', () => {
    render(<FilterPanel onSearchChange={mockOnSearchChange} />);
    
    const categorySelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(categorySelect, { target: { value: 'DSA' } });
    
    expect(mockSetQuestionFilters).toHaveBeenCalledWith({ category: 'DSA' });
  });
});
