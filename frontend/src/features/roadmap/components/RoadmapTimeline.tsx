import React from 'react';
import { IPhase } from '../types/roadmap.types';

interface RoadmapTimelineProps {
  phases: IPhase[];
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ phases }) => {
  return (
    <div className="relative pl-8 border-l-2 border-primary/20 space-y-8 my-8">
      {phases.map((phase, idx) => (
        <div key={idx} className="relative">
          {/* Timeline dot */}
          <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-sm" />
          
          <div className="bg-card border rounded-lg p-4 shadow-sm hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold">Phase {phase.order}: {phase.title}</h4>
              <span className="text-xs bg-secondary px-2 py-1 rounded font-medium text-muted-foreground">
                {phase.estimatedDuration}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{phase.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
