import React from 'react';
import { IPhase } from '../types/roadmap.types';

interface PhaseCardProps {
  phase: IPhase;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({ phase }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden mb-6">
      <div className="p-6 border-b bg-muted/50">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold tracking-tight">Phase {phase.order}: {phase.title}</h2>
          <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {phase.estimatedDuration}
          </span>
        </div>
        <p className="text-muted-foreground">{phase.description}</p>
      </div>
      
      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <span className="mr-2">🎯</span> Target Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {phase.skills.map((skill, i) => (
                <span key={i} className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-md font-medium border border-primary/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 flex items-center">
              <span className="mr-2">📚</span> Key Topics
            </h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {phase.topics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>

        {phase.tasks && phase.tasks.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold mb-3">Tasks</h4>
            <div className="space-y-3">
              {phase.tasks.map((task, i) => (
                <div key={i} className="flex items-start p-3 bg-secondary/50 rounded-md">
                  <div className="mr-3 mt-0.5 text-primary">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
                    {task.estimatedDuration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
