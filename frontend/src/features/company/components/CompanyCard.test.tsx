import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CompanyCard } from './CompanyCard';
import { describe, it, expect } from 'vitest';

const mockCompany = {
  id: '1',
  name: 'Tech Corp',
  slug: 'tech-corp',
  industry: 'Software',
  logo: 'https://example.com/logo.png',
  description: 'A leading tech company',
  roles: [{ id: 'r1' }, { id: 'r2' }]
};

describe('CompanyCard', () => {
  it('renders company information correctly', () => {
    render(
      <MemoryRouter>
        <CompanyCard company={mockCompany as any} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Software')).toBeInTheDocument();
    expect(screen.getByText('A leading tech company')).toBeInTheDocument();
    expect(screen.getByText('2 Roles')).toBeInTheDocument();
    
    const logo = screen.getByAltText('Tech Corp logo');
    expect(logo).toHaveAttribute('src', 'https://example.com/logo.png');
  });

  it('contains a link to the company details page', () => {
    render(
      <MemoryRouter>
        <CompanyCard company={mockCompany as any} />
      </MemoryRouter>
    );
    
    const link = screen.getByRole('link', { name: /view details/i });
    expect(link).toHaveAttribute('href', '/company/tech-corp');
  });
});
