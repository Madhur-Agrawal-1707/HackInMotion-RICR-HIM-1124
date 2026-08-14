import { InterviewStateType } from "./state";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import { 
  QUESTION_GENERATION_PROMPT,
  ANSWER_EVALUATION_PROMPT,
  TOPIC_SELECTION_PROMPT
} from "../../prompts/interview";

const getModel = () => {
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn("No OPENROUTER_API_KEY found, using mock model.");
    return {
      invoke: async () => ({ content: "Mock question from OpenRouter?" }),
      withStructuredOutput: () => ({
        invoke: async () => ({
          correctness: 4,
          technicalDepth: 4,
          communication: 5,
          confidence: 4,
          relevance: 5,
          needsFollowUp: false,
          recommendedDifficulty: "Medium",
          timeLimit: 60,
          questionText: `Mock Question ${Math.floor(Math.random() * 1000)}: How would you approach this problem?`
        })
      })
    } as any;
  }

  return new ChatOpenAI({ 
    modelName: "openai/gpt-4o",
    temperature: 0.7,
    maxTokens: 1500,
    apiKey: process.env.OPENROUTER_API_KEY,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:5176",
        "X-Title": "HackInMotion",
      }
    }
  });
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
    .replace("{weakAreas}", (state.weakAreas || []).join(", "))
    .replace("{strongAreas}", (state.strongAreas || []).join(", "))
    .replace("{qaHistory}", (state.questionHistory || []).map((q, i) => `Q: ${q}\nA: ${state.answerHistory?.[i]?.answerText || 'No answer'}`).join("\n\n"));

  const questionSchema = z.object({
    questionText: z.string().describe("The interview question text."),
    timeLimit: z.number().describe("The recommended time limit to answer this question in seconds (e.g. 60 for easy, 120 for medium, 180+ for long).")
  });

  const model = getModel();
  const structuredModel = model.withStructuredOutput(questionSchema);
  const response = await structuredModel.invoke(prompt);

  const newQuestion = response.questionText;
  const timeLimit = response.timeLimit;

  // We temporarily store timeLimit in the currentQuestion string by stringifying it? No, state.ts has currentQuestion as string. 
  // Let's store timeLimit in a new state variable or just return it. 
  // Wait, the state doesn't have a timeLimit field yet. Let's add it to state or just append to currentQuestion? 
  // Actually, we can just return it if we update InterviewState.
  return {
    currentQuestion: newQuestion,
    questionHistory: [newQuestion],
    questionCount: 1,
    timeLimit: timeLimit
  };
};

// Node specifically for evaluating candidate's input from an external interaction step
// In real use, an external process stops the graph, waits for input, and resumes
export const evaluateAnswerNode = async (state: InterviewStateType) => {
  const latestAnswer = state.answerHistory[state.answerHistory.length - 1];
  
  if (!latestAnswer || !latestAnswer.answerText || latestAnswer.answerText.trim() === "") {
     return {
       weakAreas: [state.currentTopic || "Unknown"],
       skippedQuestions: [state.currentQuestion || "Unknown"]
     };
  }

  const prompt = ANSWER_EVALUATION_PROMPT
    .replace("{questionText}", state.currentQuestion || "")
    .replace("{answerText}", latestAnswer.answerText)
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
