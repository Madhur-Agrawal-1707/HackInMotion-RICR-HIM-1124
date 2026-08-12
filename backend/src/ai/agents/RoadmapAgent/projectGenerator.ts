import { RoadmapState } from './roadmapAgent';

export const projectGenerator = async (state: typeof RoadmapState.State) => {
  const phases = state.phases || [];
  
  if (phases.length > 0) {
    phases[0].projects = [
      {
        title: 'Distributed Key-Value Store',
        description: 'Build a simplified Redis clone with replication.',
        skills: ['System Design', 'Concurrency', 'Networking'],
        requirements: ['Support SET/GET', 'Implement Master-Slave replication'],
        deliverables: ['GitHub Repo', 'Architecture Diagram'],
        difficulty: 'ADVANCED',
        estimatedDuration: '2 weeks'
      }
    ];
  }

  return { phases };
};
