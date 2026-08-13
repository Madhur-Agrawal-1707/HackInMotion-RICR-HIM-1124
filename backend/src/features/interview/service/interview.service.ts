import { InterviewRepository } from '../repository/interview.repository';
import { IInterviewSession, InterviewStatus, IQuestion, IAnswer } from '../types/interview.types';
// Dummy import for AI Agent
// import { InterviewAgent } from '../../../ai/agents/InterviewAgent';

export class InterviewService {
  private repository: InterviewRepository;

  constructor() {
    this.repository = new InterviewRepository();
  }

  /**
   * Starts a new interview session
   */
  async startInterview(userId: string, data: Partial<IInterviewSession>): Promise<IInterviewSession> {
    const sessionData = {
      ...data,
      userId,
      status: InterviewStatus.CREATED
    };

    const session = await this.repository.createSession(sessionData);
    
    // Here we would typically initialize the LangGraph state and trigger the InterviewAgent
    // await InterviewAgent.initialize(session._id.toString(), session);

    return session;
  }

  /**
   * Generates the next question for the interview
   */
  async getNextQuestion(sessionId: string): Promise<IQuestion | null> {
    const session = await this.repository.getSessionById(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    if (session.status !== InterviewStatus.IN_PROGRESS && session.status !== InterviewStatus.CREATED) {
      throw new Error(`Cannot get next question for session in status: ${session.status}`);
    }

    if (session.status === InterviewStatus.CREATED) {
      await this.repository.updateSessionStatus(sessionId, InterviewStatus.IN_PROGRESS, { startedAt: new Date() });
    }

    // Dummy logic to simulate AI agent generating a question
    // const nextQuestion = await InterviewAgent.generateQuestion(sessionId);
    
    const dummyQuestion: IQuestion = {
      questionId: `q_${Date.now()}`,
      questionText: "Can you explain how React reconciliation works?",
      type: "Technical",
      topic: session.domain,
      difficulty: session.difficulty,
      sequence: session.questionCount + 1,
      isFollowUp: false,
      createdAt: new Date()
    };

    await this.repository.addQuestion(sessionId, dummyQuestion);
    return dummyQuestion;
  }

  /**
   * Submits an answer and returns the evaluation/next step
   */
  async submitAnswer(sessionId: string, answerData: Partial<IAnswer>): Promise<any> {
    const session = await this.repository.getSessionById(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    const answer: IAnswer = {
      questionId: answerData.questionId!,
      answerText: answerData.answerText || "",
      duration: answerData.duration || 0,
      submittedAt: new Date(),
      isSkipped: answerData.isSkipped || false,
      // The AI agent will populate these fields asynchronously or synchronously
      answerQuality: 80, 
      correctness: 80,
      technicalDepth: 75,
      communication: 85,
      confidence: 90,
      relevance: 80
    };

    await this.repository.addAnswer(sessionId, answer);

    // Trigger AI evaluation and context update
    // const evaluation = await InterviewAgent.evaluateAnswer(sessionId, answer);
    
    return {
      success: true,
      message: "Answer submitted successfully",
      evaluation: {
        // dummy evaluation
        needsFollowUp: false,
        recommendedDifficulty: "Medium",
        recommendedTopic: session.domain
      }
    };
  }

  /**
   * Retrieves full session details
   */
  async getSessionDetails(sessionId: string): Promise<IInterviewSession> {
    const session = await this.repository.getSessionById(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }
    return session;
  }
}
