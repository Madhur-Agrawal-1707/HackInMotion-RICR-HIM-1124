import { RoadmapState } from './roadmapAgent';

export const practiceTaskGenerator = async (state: typeof RoadmapState.State) => {
  const phases = state.phases || [];
  
  // Assign tasks to all phases
  phases.forEach((phase) => {
    phase.tasks = [
      {
        title: `Practice ${phase.skills[0] || 'Core Concepts'}`,
        description: `Implement small practice exercises for ${phase.skills[0] || 'the required skills'}.`,
        type: 'PRACTICE',
        estimatedDuration: '3 hours'
      }
    ];
  });

  return { phases };
};
