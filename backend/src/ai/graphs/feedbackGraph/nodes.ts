import { FeedbackGraphStateType } from './state';
import { ChatOpenAI } from '@langchain/openai';
import { ANSWER_ANALYSIS_PROMPT } from '../../prompts/feedback/answerAnalysis.prompt';
import { RECOMMENDATION_PROMPT } from '../../prompts/feedback/recommendation.prompt';
import { SUMMARY_PROMPT } from '../../prompts/feedback/summary.prompt';
import { FEEDBACK_SYSTEM_PROMPT } from '../../prompts/feedback/system.prompt';
import { z } from 'zod';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';

// Mock LLM setup. In a real scenario, configure this with the actual provider.
const getLLM = () => new ChatOpenAI({ modelName: 'gpt-4o', temperature: 0 });

export const loadInterviewNode = async (state: FeedbackGraphStateType): Promise<Partial<FeedbackGraphStateType>> => {
  // In a real scenario, we might fetch the interview from a service here if not already provided.
  return {};
};

export const loadCandidateContextNode = async (state: FeedbackGraphStateType): Promise<Partial<FeedbackGraphStateType>> => {
  // Load any candidate specific context.
  return {};
};

import { IFeedbackReport } from '../../../features/feedback/model/feedback.model';

export const analyzeAnswersNode = async (state: FeedbackGraphStateType): Promise<Partial<FeedbackGraphStateType>> => {
  const llm = getLLM();
  const evaluationSchema = z.object({
    evaluatedAnswers: z.array(z.object({
      questionId: z.string(),
      score: z.number(),
      feedback: z.string(),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string())
    }))
  });

  const structuredLlm = llm.withStructuredOutput(evaluationSchema);

  const prompt = ANSWER_ANALYSIS_PROMPT
    .replace('{targetRole}', state.interviewData.targetRole)
    .replace('{experienceLevel}', state.interviewData.experienceLevel)
    .replace('{qaPairs}', JSON.stringify(state.interviewData.questions.map((q: any, i: number) => ({
      question: q,
      answer: state.interviewData.answers[i] || ''
    }))));

  const result = await structuredLlm.invoke([
    new SystemMessage(FEEDBACK_SYSTEM_PROMPT),
    new HumanMessage(prompt)
  ]);

  return { evaluatedAnswers: result.evaluatedAnswers };
};

export const calculateScoresNode = async (state: FeedbackGraphStateType): Promise<Partial<FeedbackGraphStateType>> => {
  // Basic mock scoring based on evaluated answers
  const answers = state.evaluatedAnswers || [];
  const avg = answers.length > 0 ? answers.reduce((sum: number, a: any) => sum + a.score, 0) / answers.length : 0;
  
  return {
    scores: {
      overallScore: avg,
      technicalScore: avg, // mock
      problemSolvingScore: avg, // mock
      communicationScore: avg, // mock
      codingScore: avg, // mock
      behavioralScore: avg, // mock
      topicScores: { 'General': avg } // mock
    }
  };
};

export const identifyStrengthsNode = async (state: FeedbackGraphStateType): Promise<Partial<FeedbackGraphStateType>> => {
  const strengths = (state.evaluatedAnswers || []).flatMap((a: any) => a.strengths.map((s: string) => ({ topic: 'General', description: s })));
  return { strengths: strengths.slice(0, 5) };
};

export const identifyWeaknessesNode = async (state: FeedbackGraphStateType): Promise<Partial<FeedbackGraphStateType>> => {
  const weaknesses = (state.evaluatedAnswers || []).flatMap((a: any) => a.weaknesses.map((w: string) => ({ topic: 'General', description: w })));
  return { weaknesses: weaknesses.slice(0, 5) };
};

export const identifySkillGapsNode = async (state: FeedbackGraphStateType): Promise<Partial<FeedbackGraphStateType>> => {
  // Simple mapping from weaknesses to skill gaps for demonstration
  const skillGaps = (state.weaknesses || []).map((w: any) => ({
    skill: w.topic,
    reason: w.description,
    recommendedResource: 'Review basic concepts'
  }));
  return { skillGaps };
};

export const generateRecommendationsNode = async (state: FeedbackGraphStateType): Promise<Partial<FeedbackGraphStateType>> => {
  const llm = getLLM();
  const recSchema = z.object({
    recommendations: z.array(z.object({
      category: z.string(),
      actionableStep: z.string()
    }))
  });

  const structuredLlm = llm.withStructuredOutput(recSchema);
  const prompt = RECOMMENDATION_PROMPT
    .replace('{targetRole}', state.interviewData.targetRole)
    .replace('{skillGaps}', JSON.stringify(state.skillGaps))
    .replace('{weaknesses}', JSON.stringify(state.weaknesses));

  const result = await structuredLlm.invoke([
    new SystemMessage(FEEDBACK_SYSTEM_PROMPT),
    new HumanMessage(prompt)
  ]);

  return { recommendations: result.recommendations };
};

export const generateSummaryNode = async (state: FeedbackGraphStateType): Promise<Partial<FeedbackGraphStateType>> => {
  const llm = getLLM();
  
  const prompt = SUMMARY_PROMPT
    .replace('{targetRole}', state.interviewData.targetRole)
    .replace('{overallScore}', state.scores?.overallScore.toString() || '0')
    .replace('{strengths}', JSON.stringify(state.strengths))
    .replace('{weaknesses}', JSON.stringify(state.weaknesses));

  const result = await llm.invoke([
    new SystemMessage(FEEDBACK_SYSTEM_PROMPT),
    new HumanMessage(prompt)
  ]);

  return { summary: result.content as string };
};

export const persistFeedbackNode = async (state: FeedbackGraphStateType): Promise<Partial<FeedbackGraphStateType>> => {
  const report: Partial<IFeedbackReport> = {
    userId: state.interviewData.userId,
    interviewId: state.interviewId,
    overallScore: state.scores?.overallScore || 0,
    technicalScore: state.scores?.technicalScore || 0,
    problemSolvingScore: state.scores?.problemSolvingScore || 0,
    communicationScore: state.scores?.communicationScore || 0,
    codingScore: state.scores?.codingScore || 0,
    behavioralScore: state.scores?.behavioralScore || 0,
    topicScores: state.scores?.topicScores || {},
    strengths: state.strengths || [],
    weaknesses: state.weaknesses || [],
    skillGaps: state.skillGaps || [],
    recommendations: state.recommendations || [],
    summary: state.summary || 'Summary unavailable.',
    rubricVersion: '1.0'
  };

  return { feedbackReport: report };
};
