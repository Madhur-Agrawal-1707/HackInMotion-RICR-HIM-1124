import { RoadmapState } from './roadmapAgent';

export const projectGenerator = async (state: typeof RoadmapState.State) => {
  const phases = state.phases || [];
  
  phases.forEach((phase) => {
    phase.projects = [
      {
        title: `Build a ${phase.skills[0] || 'Core'} Module`,
        description: `Create a small project focusing heavily on ${phase.skills[0] || 'core concepts'} to solidify understanding.`,
        skills: phase.skills,
        requirements: [`Demonstrate mastery of ${phase.skills[0] || 'concepts'}`],
        deliverables: ['GitHub Repo'],
        difficulty: 'INTERMEDIATE',
        estimatedDuration: '1 week'
      }
    ];
  });

  return { phases };
};
