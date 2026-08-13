import React, { useEffect, useState } from 'react';
import { roadmapApi } from '../api/roadmap.api';
import type { IRoadmap } from '../types/roadmap.types';

export const RoadmapDashboard: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<IRoadmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const data = await roadmapApi.getRoadmaps();
        setRoadmaps(data);
      } catch (error) {
        console.error("Failed to fetch roadmaps:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  if (isLoading) return <div className="p-8 text-center">Loading roadmaps...</div>;

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Learning Roadmaps</h1>
          <p className="text-muted-foreground mt-1">Track your progress and access generated career paths.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90">
          Generate New Roadmap
        </button>
      </div>

      {roadmaps.length === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-muted/20 border-dashed">
          <h3 className="text-lg font-semibold mb-2">No roadmaps generated yet</h3>
          <p className="text-muted-foreground mb-4">Complete an interview or provide your target role to generate one.</p>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">
            Get Started
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map(roadmap => (
            <div key={roadmap._id} className="border rounded-lg bg-card p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg">{roadmap.targetRole}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  roadmap.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {roadmap.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Version {roadmap.version}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{roadmap.progress.overallPercentage}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${roadmap.progress.overallPercentage}%` }}
                  />
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>{roadmap.phases.length} Phases</span>
                <span>{roadmap.estimatedDuration}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
