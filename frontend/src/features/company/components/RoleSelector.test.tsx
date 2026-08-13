import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RoleSelector } from './RoleSelector';

const mockRoles = [
  { id: '1', title: 'Frontend Developer', experienceLevel: 'Mid' },
  { id: '2', title: 'Backend Developer', experienceLevel: 'Senior' },
];

describe('RoleSelector', () => {
  it('renders the selector with roles', () => {
    render(
      <RoleSelector 
        roles={mockRoles as any} 
        selectedRoleId="" 
        onSelectRole={() => {}} 
      />
    );
    
    expect(screen.getByText('Select Role')).toBeInTheDocument();
    expect(screen.getByText('Select a role')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer (Mid)')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer (Senior)')).toBeInTheDocument();
  });

  it('calls onSelectRole when a role is selected', () => {
    const handleSelectRole = vi.fn();
    
    render(
      <RoleSelector 
        roles={mockRoles as any} 
        selectedRoleId="" 
        onSelectRole={handleSelectRole} 
      />
    );
    
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '2' } });
    
    expect(handleSelectRole).toHaveBeenCalledWith('2');
  });

  it('displays the selected role correctly', () => {
    render(
      <RoleSelector 
        roles={mockRoles as any} 
        selectedRoleId="1" 
        onSelectRole={() => {}} 
      />
    );
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('1');
  });
});
