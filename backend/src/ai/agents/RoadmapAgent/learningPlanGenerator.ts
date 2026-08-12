import { RoadmapState } from './roadmapAgent';
import { IPhase } from '../../../features/roadmap/types/roadmap.types';

export const learningPlanGenerator = async (state: typeof RoadmapState.State) => {
  const phases: IPhase[] = [
    {
      phaseId: 'phase-1',
      title: 'Foundations of Scalability',
      description: 'Master core concepts of System Design.',
      skills: ['System Design', 'Caching'],
      topics: ['Load Balancing', 'Data Partitioning'],
      estimatedDuration: '2 weeks',
      tasks: [],
      projects: [],
      milestones: [],
      order: 1
    }
  ];

  return { phases };
};
