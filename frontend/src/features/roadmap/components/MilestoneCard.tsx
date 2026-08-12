import React from 'react';
import { IMilestone } from '../types/roadmap.types';

interface MilestoneCardProps {
  milestone: IMilestone;
  onUpdateStatus?: (status: string) => void;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone, onUpdateStatus }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <span className="text-green-500 text-xl">✅</span>;
      case 'IN_PROGRESS': return <span className="text-blue-500 text-xl">⏳</span>;
      case 'SKIPPED': return <span className="text-gray-400 text-xl">⏭️</span>;
      default: return <span className="text-gray-300 text-xl">⭕</span>;
    }
  };

  return (
    <div className={`rounded-lg border p-4 flex gap-4 ${milestone.status === 'COMPLETED' ? 'bg-green-50/50 dark:bg-green-950/10 border-green-200 dark:border-green-900/50' : 'bg-card'}`}>
      <div className="flex-shrink-0 mt-1">
        {getStatusIcon(milestone.status)}
      </div>
      <div className="flex-1">
        <h4 className={`font-semibold ${milestone.status === 'COMPLETED' ? 'text-green-800 dark:text-green-400 line-through opacity-70' : ''}`}>
          {milestone.title}
        </h4>
        <p className="text-sm text-muted-foreground mt-1 mb-2">{milestone.description}</p>
        
        <div className="text-xs text-muted-foreground">
          <strong>Criteria:</strong>
          <ul className="list-disc list-inside mt-1">
            {milestone.criteria.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
          Target: {new Date(milestone.targetDate).toLocaleDateString()}
        </span>
        {milestone.status !== 'COMPLETED' && onUpdateStatus && (
          <button 
            onClick={() => onUpdateStatus('COMPLETED')}
            className="text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 transition-colors"
          >
            Mark Done
          </button>
        )}
      </div>
    </div>
  );
};
