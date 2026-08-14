import { RoadmapState } from './roadmapAgent';
import { IPhase } from '../../../features/roadmap/types/roadmap.types';

export const learningPlanGenerator = async (state: typeof RoadmapState.State) => {
  const skillGaps = state.skillGaps || [];

  const phases: IPhase[] = skillGaps.length > 0
    ? skillGaps.map((gap: any, index: number) => ({
        phaseId: `phase-${index + 1}`,
        title: `Mastering ${gap.skill}`,
        description: `Focus on improving your skills in ${gap.skill} to bridge the gap.`,
        skills: [gap.skill],
        topics: [gap.skill, 'Best Practices', 'Advanced Concepts'],
        estimatedDuration: '2 weeks',
        tasks: [],
        projects: [],
        milestones: [],
        order: index + 1
      }))
    : [
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
