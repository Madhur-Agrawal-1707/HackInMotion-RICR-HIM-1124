import { StateGraph, START, END, Annotation } from '@langchain/langgraph';
import { ISkillGap, IPhase, IMilestone } from '../../../features/roadmap/types/roadmap.types';
import { skillGapAnalyzer } from './skillGapAnalyzer';
import { skillPrioritizer } from './skillPrioritizer';
import { learningPlanGenerator } from './learningPlanGenerator';
import { practiceTaskGenerator } from './practiceTaskGenerator';
import { projectGenerator } from './projectGenerator';
import { milestoneGenerator } from './milestoneGenerator';

// Define the State for the LangGraph
export const RoadmapState = Annotation.Root({
  candidateProfile: Annotation<any>(),
  interviewFeedback: Annotation<any>(),
  targetRole: Annotation<string>(),
  experienceLevel: Annotation<string>(),
  careerGoal: Annotation<string>(),
  preferredTimeline: Annotation<string>(),
  
  skillGaps: Annotation<ISkillGap[]>(),
  phases: Annotation<IPhase[]>(),
  milestones: Annotation<IMilestone[]>(),
  
  error: Annotation<string | null>(),
});

// Define Nodes
async function loadDataNode(state: typeof RoadmapState.State) {
  // In a real implementation, this might fetch from DB.
  // Here, the data is already passed into the state by the service.
  return {};
}

// Build Graph
const workflow = new StateGraph(RoadmapState)
  .addNode("loadData", loadDataNode)
  .addNode("analyzeSkillGaps", skillGapAnalyzer)
  .addNode("prioritizeSkills", skillPrioritizer)
  .addNode("generateLearningPlan", learningPlanGenerator)
  .addNode("generatePracticeTasks", practiceTaskGenerator)
  .addNode("generateProjects", projectGenerator)
  .addNode("generateMilestones", milestoneGenerator)
  // Edges
  .addEdge(START, "loadData")
  .addEdge("loadData", "analyzeSkillGaps")
  .addEdge("analyzeSkillGaps", "prioritizeSkills")
  .addEdge("prioritizeSkills", "generateLearningPlan")
  .addEdge("generateLearningPlan", "generatePracticeTasks")
  .addEdge("generatePracticeTasks", "generateProjects")
  .addEdge("generateProjects", "generateMilestones")
  .addEdge("generateMilestones", END);

export const roadmapAgent = workflow.compile();
