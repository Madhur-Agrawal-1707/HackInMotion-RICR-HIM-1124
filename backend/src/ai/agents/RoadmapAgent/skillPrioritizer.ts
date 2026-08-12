import { RoadmapState } from './roadmapAgent';

export const skillPrioritizer = async (state: typeof RoadmapState.State) => {
  // Mock prioritizer that could potentially adjust gaps or sort them.
  // We've already set priority in skillGapAnalyzer for simplicity here.
  const gaps = state.skillGaps || [];
  
  const sortedGaps = gaps.sort((a, b) => {
    const pVal = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    return pVal[b.priority] - pVal[a.priority];
  });

  return { skillGaps: sortedGaps };
};
