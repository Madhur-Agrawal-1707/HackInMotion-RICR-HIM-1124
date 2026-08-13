import React from 'react';
import type { CompanyRole } from '../types';

interface RoleSelectorProps {
  roles: CompanyRole[];
  selectedRoleId?: string;
  onSelectRole: (roleId: string) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ roles, selectedRoleId, onSelectRole }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">Select Role</label>
      <select
        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={selectedRoleId || ''}
        onChange={(e) => onSelectRole(e.target.value)}
      >
        <option value="" disabled>Select a role</option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.title} ({role.experienceLevel})
          </option>
        ))}
      </select>
    </div>
  );
};
