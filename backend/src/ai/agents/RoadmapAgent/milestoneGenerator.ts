import { RoadmapState } from './roadmapAgent';
import { IMilestone } from '../../../features/roadmap/types/roadmap.types';

export const milestoneGenerator = async (state: typeof RoadmapState.State) => {
  const phases = state.phases || [];
  
  phases.forEach((phase, index) => {
    phase.milestones = [
      {
        title: `Complete ${phase.skills[0] || 'Core Concepts'} Phase`,
        description: `Demonstrate proficiency in ${phase.skills[0] || 'core concepts'} through practical exercises.`,
        criteria: [`Finish all practice tasks for ${phase.skills[0] || 'the phase'}`, `Build the module project`],
        targetDate: new Date(Date.now() + (index + 1) * 14 * 24 * 60 * 60 * 1000), // Adds 2 weeks per phase
        status: 'NOT_STARTED'
      }
    ];
  });

  // Also set top-level milestones based on phase milestones
  const topLevelMilestones: IMilestone[] = [];
  phases.forEach(p => {
    if (p.milestones) {
      topLevelMilestones.push(...p.milestones);
    }
  });

  return { phases, milestones: topLevelMilestones };
};
