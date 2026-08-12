import React, { useEffect, useState } from 'react';
import { roadmapApi } from '../api/roadmap.api';
import { IRoadmap } from '../types/roadmap.types';
import { ProgressCard } from '../components/ProgressCard';
import { SkillGapCard } from '../components/SkillGapCard';
import { RoadmapTimeline } from '../components/RoadmapTimeline';
import { PhaseCard } from '../components/PhaseCard';
import { ProjectCard } from '../components/ProjectCard';
import { MilestoneCard } from '../components/MilestoneCard';

interface RoadmapDetailsProps {
  roadmapId: string; // Typically comes from URL params (e.g. react-router useParams)
}

export const RoadmapDetails: React.FC<RoadmapDetailsProps> = ({ roadmapId }) => {
  const [roadmap, setRoadmap] = useState<IRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PHASES' | 'PROJECTS'>('OVERVIEW');

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const data = await roadmapApi.getRoadmapById(roadmapId);
        setRoadmap(data);
      } catch (error) {
        console.error("Failed to fetch roadmap:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmap();
  }, [roadmapId]);

  if (isLoading) return <div className="p-8 text-center">Loading roadmap details...</div>;
  if (!roadmap) return <div className="p-8 text-center">Roadmap not found.</div>;

  const handleUpdateMilestoneStatus = async (milestoneId: string, status: string) => {
    // Optimistic UI update could be added here
    try {
      const updated = await roadmapApi.updateProgress(roadmap._id, { completedMilestoneId: milestoneId });
      setRoadmap(updated);
    } catch (error) {
      console.error("Failed to update milestone:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{roadmap.targetRole} Roadmap</h1>
          <p className="text-muted-foreground">{roadmap.careerGoal} • Version {roadmap.version}</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium mb-1">Target Timeline</div>
          <div className="text-muted-foreground">{roadmap.estimatedDuration}</div>
        </div>
      </div>

      <div className="flex border-b mb-8">
        <button 
          className={`pb-3 px-4 font-medium text-sm ${activeTab === 'OVERVIEW' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab('OVERVIEW')}
        >
          Overview
        </button>
        <button 
          className={`pb-3 px-4 font-medium text-sm ${activeTab === 'PHASES' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab('PHASES')}
        >
          Phases & Tasks
        </button>
        <button 
          className={`pb-3 px-4 font-medium text-sm ${activeTab === 'PROJECTS' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab('PROJECTS')}
        >
          Projects
        </button>
      </div>

      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <ProgressCard progress={roadmap.progress} />
            
            <div>
              <h3 className="font-bold text-lg mb-4">Top Priorities</h3>
              <div className="space-y-4">
                {roadmap.skillGaps.slice(0, 3).map((gap, idx) => (
                  <SkillGapCard key={idx} gap={gap} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-4">Journey Timeline</h3>
            <RoadmapTimeline phases={roadmap.phases} />
            
            <h3 className="font-bold text-lg mb-4 mt-8">Major Milestones</h3>
            <div className="space-y-4">
              {roadmap.milestones.map((milestone, idx) => (
                <MilestoneCard 
                  key={idx} 
                  milestone={milestone} 
                  onUpdateStatus={(status) => handleUpdateMilestoneStatus(milestone._id || String(idx), status)} 
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'PHASES' && (
        <div className="max-w-4xl mx-auto">
          {roadmap.phases.map((phase) => (
            <PhaseCard key={phase.phaseId} phase={phase} />
          ))}
        </div>
      )}

      {activeTab === 'PROJECTS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmap.phases.flatMap(phase => 
            phase.projects.map((project, idx) => (
              <ProjectCard key={`${phase.phaseId}-${idx}`} project={project} />
            ))
          )}
          {roadmap.phases.every(p => p.projects.length === 0) && (
            <div className="col-span-full text-center py-12 text-muted-foreground border rounded-lg bg-muted/20">
              No projects defined in this roadmap yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
