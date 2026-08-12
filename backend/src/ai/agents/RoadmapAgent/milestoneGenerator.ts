import { RoadmapState } from './roadmapAgent';
import { IMilestone } from '../../../features/roadmap/types/roadmap.types';

export const milestoneGenerator = async (state: typeof RoadmapState.State) => {
  const phases = state.phases || [];
  
  if (phases.length > 0) {
    phases[0].milestones = [
      {
        title: 'Complete System Design Basics',
        description: 'Understand load balancing and caching.',
        criteria: ['Finish URL shortener practice', 'Read chapters 1-3 of DDIA'],
        targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        status: 'NOT_STARTED'
      }
    ];
  }

  // Also set top-level milestones based on phase milestones
  const topLevelMilestones: IMilestone[] = [];
  phases.forEach(p => {
    if (p.milestones) {
      topLevelMilestones.push(...p.milestones);
    }
  });

  return { phases, milestones: topLevelMilestones };
};
