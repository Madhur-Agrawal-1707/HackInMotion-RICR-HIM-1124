import { RoadmapState } from './roadmapAgent';
import { ISkillGap } from '../../../features/roadmap/types/roadmap.types';

export const skillGapAnalyzer = async (state: typeof RoadmapState.State) => {
  // In a real AI implementation, we'd use an LLM with Zod structured output.
  // Example: const response = await llm.withStructuredOutput(zodSchema).invoke(prompt);
  
  const weaknesses = state.interviewFeedback?.weaknesses || [];
  
  const mockedSkillGaps: ISkillGap[] = weaknesses.length > 0 
    ? weaknesses.map((w: any) => ({
        skill: w.topic,
        currentLevel: 4,
        requiredLevel: 8,
        gap: 4,
        priority: 'HIGH',
        reason: `Based on interview feedback: ${w.description}`,
        evidence: 'Interview performance'
      }))
    : [
        {
          skill: 'System Design',
          currentLevel: 4,
          requiredLevel: 8,
          gap: 4,
          priority: 'HIGH',
          reason: 'Required for Senior Backend role, candidate scored 40/100 in interview.',
          evidence: 'Feedback shows weakness in scalability concepts.'
        }
      ];

  return { skillGaps: mockedSkillGaps };
};
