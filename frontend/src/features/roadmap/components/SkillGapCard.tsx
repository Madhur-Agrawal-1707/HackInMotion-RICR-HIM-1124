import React from 'react';
import { ISkillGap } from '../types/roadmap.types';

interface SkillGapCardProps {
  gap: ISkillGap;
}

export const SkillGapCard: React.FC<SkillGapCardProps> = ({ gap }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'LOW': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{gap.skill}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(gap.priority)}`}>
          {gap.priority} PRIORITY
        </span>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Current: {gap.currentLevel}/10</span>
          <span>Target: {gap.requiredLevel}/10</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all" 
            style={{ width: `${(gap.currentLevel / gap.requiredLevel) * 100}%` }}
          />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{gap.reason}</p>
    </div>
  );
};
