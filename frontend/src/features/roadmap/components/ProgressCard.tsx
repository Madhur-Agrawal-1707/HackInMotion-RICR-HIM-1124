import React from 'react';
import type { IRoadmapProgress } from '../types/roadmap.types';

interface ProgressCardProps {
  progress: IRoadmapProgress;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ progress }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="font-semibold text-lg mb-4">Overall Progress</h3>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-secondary stroke-current"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-primary stroke-current"
              strokeWidth="3"
              strokeDasharray={`${progress.overallPercentage}, 100`}
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold">{progress.overallPercentage}%</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-center border-t pt-4 mt-2">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Tasks</p>
          <p className="text-xl font-medium mt-1">{progress.completedTasks} <span className="text-sm text-muted-foreground">/ {progress.totalTasks || 0}</span></p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Milestones</p>
          <p className="text-xl font-medium mt-1">{progress.completedMilestones} <span className="text-sm text-muted-foreground">/ {progress.totalMilestones || 0}</span></p>
        </div>
      </div>
    </div>
  );
};
