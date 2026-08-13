import { Annotation } from "@langchain/langgraph";

export const InterviewState = Annotation.Root({
  sessionId: Annotation<string>(),
  userId: Annotation<string>(),
  resumeId: Annotation<string | undefined>(),
  targetRole: Annotation<string>(),
  experienceLevel: Annotation<string>(),
  interviewType: Annotation<string>(),
  company: Annotation<string | undefined>(),
  domain: Annotation<string>(),
  difficulty: Annotation<string>(),
  
  currentTopic: Annotation<string | null>(),
  currentQuestion: Annotation<string | null>(),
  
  questionHistory: Annotation<string[]>({
    reducer: (curr, next) => curr.concat(next),
    default: () => [],
  }),
  answerHistory: Annotation<any[]>({
    reducer: (curr, next) => curr.concat(next),
    default: () => [],
  }),
  skippedQuestions: Annotation<string[]>({
    reducer: (curr, next) => curr.concat(next),
    default: () => [],
  }),
  
  strongAreas: Annotation<string[]>({
    reducer: (curr, next) => Array.from(new Set([...curr, ...next])),
    default: () => [],
  }),
  weakAreas: Annotation<string[]>({
    reducer: (curr, next) => Array.from(new Set([...curr, ...next])),
    default: () => [],
  }),
  
  topicsCovered: Annotation<string[]>({
    reducer: (curr, next) => Array.from(new Set([...curr, ...next])),
    default: () => [],
  }),
  topicsRemaining: Annotation<string[]>({
    reducer: (curr, next) => next, // Override with updated list
    default: () => [],
  }),
  
  candidateSignals: Annotation<any[]>({
    reducer: (curr, next) => curr.concat(next),
    default: () => [],
  }),
  
  questionCount: Annotation<number>({
    reducer: (curr, next) => curr + next,
    default: () => 0,
  }),
  maxQuestions: Annotation<number>(),
  status: Annotation<string>(),
});

export type InterviewStateType = typeof InterviewState.State;
