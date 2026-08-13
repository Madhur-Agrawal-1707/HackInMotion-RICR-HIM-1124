import { StateGraph, START, END } from "@langchain/langgraph";
import { InterviewState } from "./state";
import { 
  initializeInterviewNode, 
  selectTopicNode, 
  generateQuestionNode, 
  evaluateAnswerNode,
  determineDifficultyNode,
  selectNextTopicNode 
} from "./nodes";

export const interviewGraph = new StateGraph(InterviewState)
  .addNode("initializeInterview", initializeInterviewNode)
  .addNode("selectTopic", selectTopicNode)
  .addNode("generateQuestion", generateQuestionNode)
  .addNode("evaluateAnswer", evaluateAnswerNode)
  .addNode("determineDifficulty", determineDifficultyNode)
  .addNode("selectNextTopic", selectNextTopicNode)
  
  .addEdge(START, "initializeInterview")
  .addEdge("initializeInterview", "selectTopic")
  .addEdge("selectTopic", "generateQuestion")
  // Generate question sends question to user, graph pauses conceptually
  // When answer arrives, evaluateAnswer runs
  .addEdge("generateQuestion", "evaluateAnswer")
  .addEdge("evaluateAnswer", "determineDifficulty")
  .addEdge("determineDifficulty", "selectNextTopic")
  .addEdge("selectNextTopic", "generateQuestion") // Loop back
  // Add conditional edges as needed for completion logic
  
  .compile();
