import { 
  initializeInterviewNode, 
  selectTopicNode, 
  determineDifficultyNode, 
  selectNextTopicNode 
} from './nodes';
import { InterviewStateType } from './state';

jest.mock('@langchain/openai', () => {
  return {
    ChatOpenAI: jest.fn().mockImplementation(() => {
      return {
        invoke: jest.fn().mockResolvedValue({ content: 'Mock question' }),
        withStructuredOutput: jest.fn().mockReturnValue({
          invoke: jest.fn().mockResolvedValue({
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
    })
  };
});

// Need to import after mock to use the mocked model
import { generateQuestionNode, evaluateAnswerNode } from './nodes';

describe('InterviewAgent Nodes', () => {
  
  const createBaseState = (): InterviewStateType => ({
    sessionId: 'session_1',
    userId: 'user_1',
    resumeId: undefined,
    interviewType: 'Technical',
    company: undefined,
    maxQuestions: 10,
    skippedQuestions: [],
    status: 'NOT_STARTED',
    targetRole: 'Software Engineer',
    experienceLevel: 'Mid-Level',
    domain: 'Frontend',
    difficulty: 'Medium',
    weakAreas: [],
    strongAreas: [],
    questionHistory: [],
    answerHistory: [],
    candidateSignals: [],
    topicsRemaining: [],
    topicsCovered: [],
    currentTopic: null,
    currentQuestion: null,
    questionCount: 0,
  });

  describe('initializeInterviewNode', () => {
    it('should initialize interview state with topics and IN_PROGRESS status', async () => {
      const state = createBaseState();
      const result = await initializeInterviewNode(state);
      
      expect(result.status).toBe('IN_PROGRESS');
      expect(result.topicsRemaining).toEqual(["Fundamentals", "Problem Solving", "System Design", "Behavioral"]);
    });
  });

  describe('selectTopicNode', () => {
    it('should return COMPLETED status if no topics remaining', async () => {
      const state = { ...createBaseState(), topicsRemaining: [] };
      const result = await selectTopicNode(state);
      
      expect(result).toEqual({ status: 'COMPLETED' });
    });

    it('should select next topic and update topics arrays', async () => {
      const state = { 
        ...createBaseState(), 
        topicsRemaining: ["Fundamentals", "Problem Solving"] 
      };
      const result = await selectTopicNode(state);
      
      expect(result.currentTopic).toBe("Fundamentals");
      expect(result.topicsRemaining).toEqual(["Problem Solving"]);
      expect(result.topicsCovered).toEqual(["Fundamentals"]);
    });
  });

  describe('generateQuestionNode', () => {
    it('should generate a new question using the model', async () => {
      const state = {
        ...createBaseState(),
        currentTopic: "Fundamentals",
        difficulty: "Medium",
      };
      
      const result = await generateQuestionNode(state);
      
      expect(result.currentQuestion).toBe('Mock question');
      expect(result.questionHistory).toEqual(['Mock question']);
      expect(result.questionCount).toBe(1);
    });
  });

  describe('evaluateAnswerNode', () => {
    it('should handle empty answers gracefully', async () => {
      const state = {
        ...createBaseState(),
        currentTopic: "Fundamentals",
        currentQuestion: "What is JS?",
        answerHistory: []
      };
      
      const result = await evaluateAnswerNode(state);
      expect(result).toEqual({
        weakAreas: ["Fundamentals"],
        skippedQuestions: ["What is JS?"]
      });
    });

    it('should evaluate valid answer and return candidate signals', async () => {
      const state = {
        ...createBaseState(),
        currentTopic: "Fundamentals",
        currentQuestion: "What is JS?",
        answerHistory: [{
           questionId: "q1",
           text: "JavaScript is a programming language",
           timestamp: new Date().toISOString()
        }]
      };
      
      const result = await evaluateAnswerNode(state);
      
      expect(result.candidateSignals).toBeDefined();
      expect(result.candidateSignals?.length).toBe(1);
      expect(result.difficulty).toBe("Medium");
    });
  });

  describe('determineDifficultyNode', () => {
    it('should return empty object if no candidate signals', async () => {
      const state = createBaseState();
      const result = await determineDifficultyNode(state);
      expect(result).toEqual({});
    });

    it('should determine next difficulty based on latest signal', async () => {
      const state = {
        ...createBaseState(),
        candidateSignals: [{
          correctness: 4,
          technicalDepth: 4,
          communication: 5,
          confidence: 4,
          relevance: 5,
          needsFollowUp: false,
          recommendedDifficulty: "Hard" as const
        }]
      };
      const result = await determineDifficultyNode(state);
      expect(result).toEqual({ difficulty: "Hard" });
    });
  });

  describe('selectNextTopicNode', () => {
    it('should return empty object currently', async () => {
      const state = createBaseState();
      const result = await selectNextTopicNode(state);
      expect(result).toEqual({});
    });
  });

});
