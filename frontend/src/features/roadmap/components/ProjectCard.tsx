import React from 'react';
import { IProject } from '../types/roadmap.types';

interface ProjectCardProps {
  project: IProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'ADVANCED': return 'text-red-500 border-red-200 bg-red-50 dark:bg-red-950/20';
      case 'INTERMEDIATE': return 'text-yellow-600 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20';
      case 'BEGINNER': return 'text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20';
      default: return 'text-gray-500 border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg leading-tight">{project.title}</h3>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${getDifficultyColor(project.difficulty)}`}>
            {project.difficulty}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Applied Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.skills.map((skill, i) => (
                <span key={i} className="text-xs bg-secondary px-2 py-0.5 rounded-md">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Requirements</h4>
            <ul className="text-sm space-y-1 text-card-foreground">
              {project.requirements.map((req, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 border-t bg-muted/30 text-xs flex justify-between items-center text-muted-foreground">
        <span>Est. Time: {project.estimatedDuration}</span>
        <button className="text-primary font-medium hover:underline">View Details</button>
      </div>
    </div>
  );
};
