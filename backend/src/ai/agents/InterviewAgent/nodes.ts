import { InterviewStateType } from "./state";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { 
  QUESTION_GENERATION_PROMPT,
  ANSWER_EVALUATION_PROMPT,
  TOPIC_SELECTION_PROMPT
} from "../../prompts/interview";

const getModel = () => {
  if (!process.env.OPENAI_API_KEY) {
    return {
      invoke: async () => ({ content: "Mock question" }),
      withStructuredOutput: () => ({
        invoke: async () => ({
          correctness: 4,
          technicalDepth: 4,
          communication: 5,
          confidence: 4,
          relevance: 5,
          needsFollowUp: false,
          recommendedDifficulty: "Medium"
        })
      })
    };
  }

  return new ChatOpenAI({ modelName: "gpt-4o", temperature: 0.7 });
};

export const initializeInterviewNode = async (state: InterviewStateType) => {
  // Logic to initialize topics based on role/domain
  const initialTopics = ["Fundamentals", "Problem Solving", "System Design", "Behavioral"]; // Example
  return { 
    status: "IN_PROGRESS",
    topicsRemaining: initialTopics
  };
};

export const selectTopicNode = async (state: InterviewStateType) => {
  if (state.topicsRemaining.length === 0) {
    return { status: "COMPLETED" };
  }
  const nextTopic = state.topicsRemaining[0];
  const remaining = state.topicsRemaining.slice(1);
  return { 
    currentTopic: nextTopic, 
    topicsRemaining: remaining,
    topicsCovered: [nextTopic]
  };
};

export const generateQuestionNode = async (state: InterviewStateType) => {
  const prompt = QUESTION_GENERATION_PROMPT
    .replace("{targetRole}", state.targetRole)
    .replace("{experienceLevel}", state.experienceLevel)
    .replace("{domain}", state.domain)
    .replace("{currentTopic}", state.currentTopic || "General")
    .replace("{difficulty}", state.difficulty)
    .replace("{weakAreas}", state.weakAreas.join(", "))
    .replace("{strongAreas}", state.strongAreas.join(", "))
    .replace("{questionHistory}", state.questionHistory.join("\n"));

  const model = getModel();
  const response = await model.invoke(prompt);
  const newQuestion = response.content as string;

  return {
    currentQuestion: newQuestion,
    questionHistory: [newQuestion],
    questionCount: 1
  };
};

// Node specifically for evaluating candidate's input from an external interaction step
// In real use, an external process stops the graph, waits for input, and resumes
export const evaluateAnswerNode = async (state: InterviewStateType) => {
  const latestAnswer = state.answerHistory[state.answerHistory.length - 1];
  
  if (!latestAnswer || !latestAnswer.text || latestAnswer.text.trim() === "") {
     return {
       weakAreas: [state.currentTopic || "Unknown"],
       skippedQuestions: [state.currentQuestion || "Unknown"]
     };
  }

  const prompt = ANSWER_EVALUATION_PROMPT
    .replace("{questionText}", state.currentQuestion || "")
    .replace("{answerText}", latestAnswer.text)
    .replace("{difficulty}", state.difficulty);

  const evaluationSchema = z.object({
    correctness: z.number(),
    technicalDepth: z.number(),
    communication: z.number(),
    confidence: z.number(),
    relevance: z.number(),
    needsFollowUp: z.boolean(),
    recommendedDifficulty: z.enum(["Easy", "Medium", "Hard", "Expert"])
  });

  const model = getModel();
  const structuredModel = model.withStructuredOutput(evaluationSchema);
  const evaluation = await structuredModel.invoke(prompt);

  return {
    candidateSignals: [evaluation],
    difficulty: evaluation.recommendedDifficulty
  };
};

export const determineDifficultyNode = async (state: InterviewStateType) => {
  // Logic to adjust difficulty based on multiple signals
  const signals = state.candidateSignals;
  if (signals.length > 0) {
    const latestSignal = signals[signals.length - 1];
    return { difficulty: latestSignal.recommendedDifficulty };
  }
  return {};
};

export const selectNextTopicNode = async (state: InterviewStateType) => {
  // Evaluates if we need to change topic based on candidate's performance or time
  return {};
};
