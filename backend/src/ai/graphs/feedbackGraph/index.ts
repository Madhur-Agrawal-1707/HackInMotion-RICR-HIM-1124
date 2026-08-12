import { StateGraph, END, START } from '@langchain/langgraph';
import { FeedbackGraphState } from './state';
import {
  loadInterviewNode,
  loadCandidateContextNode,
  analyzeAnswersNode,
  calculateScoresNode,
  identifyStrengthsNode,
  identifyWeaknessesNode,
  identifySkillGapsNode,
  generateRecommendationsNode,
  generateSummaryNode,
  persistFeedbackNode
} from './nodes';

const builder = new StateGraph(FeedbackGraphState)
  .addNode('loadInterviewNode', loadInterviewNode)
  .addNode('loadCandidateContextNode', loadCandidateContextNode)
  .addNode('analyzeAnswersNode', analyzeAnswersNode)
  .addNode('calculateScoresNode', calculateScoresNode)
  .addNode('identifyStrengthsNode', identifyStrengthsNode)
  .addNode('identifyWeaknessesNode', identifyWeaknessesNode)
  .addNode('identifySkillGapsNode', identifySkillGapsNode)
  .addNode('generateRecommendationsNode', generateRecommendationsNode)
  .addNode('generateSummaryNode', generateSummaryNode)
  .addNode('persistFeedbackNode', persistFeedbackNode);

builder.addEdge(START, 'loadInterviewNode');
builder.addEdge('loadInterviewNode', 'loadCandidateContextNode');
builder.addEdge('loadCandidateContextNode', 'analyzeAnswersNode');
builder.addEdge('analyzeAnswersNode', 'calculateScoresNode');
builder.addEdge('calculateScoresNode', 'identifyStrengthsNode');
builder.addEdge('identifyStrengthsNode', 'identifyWeaknessesNode');
builder.addEdge('identifyWeaknessesNode', 'identifySkillGapsNode');
builder.addEdge('identifySkillGapsNode', 'generateRecommendationsNode');
builder.addEdge('generateRecommendationsNode', 'generateSummaryNode');
builder.addEdge('generateSummaryNode', 'persistFeedbackNode');
builder.addEdge('persistFeedbackNode', END);

export const feedbackGraph = builder.compile();
