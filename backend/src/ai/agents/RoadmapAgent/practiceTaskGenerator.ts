import { RoadmapState } from './roadmapAgent';

export const practiceTaskGenerator = async (state: typeof RoadmapState.State) => {
  const phases = state.phases || [];
  
  // Assign tasks to the first phase as an example
  if (phases.length > 0) {
    phases[0].tasks = [
      {
        title: 'Design a URL Shortener',
        description: 'Sketch out the high-level architecture and data model.',
        type: 'PRACTICE',
        estimatedDuration: '3 hours'
      }
    ];
  }

  return { phases };
};
