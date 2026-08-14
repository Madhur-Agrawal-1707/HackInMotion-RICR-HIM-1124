import { InterviewRepository } from '../repository/interview.repository';
import { IInterviewSession, InterviewStatus, IQuestion, IAnswer } from '../types/interview.types';
import { generateQuestionNode, evaluateAnswerNode } from '../../../ai/agents/InterviewAgent/nodes';
import { InterviewStateType } from '../../../ai/agents/InterviewAgent/state';

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

    const state: InterviewStateType = {
      sessionId: session._id.toString(),
      userId: session.userId,
      resumeId: session.resumeId,
      targetRole: session.targetRole,
      experienceLevel: session.experienceLevel,
      interviewType: session.interviewType[0] || 'Technical',
      company: session.company,
      domain: session.domain,
      difficulty: session.difficulty,
      currentTopic: session.topicsCovered[session.topicsCovered.length - 1] || null,
      currentQuestion: null,
      timeLimit: null,
      questionHistory: session.questions.map(q => q.questionText),
      answerHistory: session.answers,
      skippedQuestions: [],
      strongAreas: session.strongAreas,
      weakAreas: session.weakAreas,
      topicsCovered: session.topicsCovered,
      topicsRemaining: [],
      candidateSignals: [],
      questionCount: session.questionCount,
      maxQuestions: 10,
      status: session.status
    };

    const result = await generateQuestionNode(state);
    
    const nextQuestion: IQuestion = {
      questionId: `q_${Date.now()}`,
      questionText: result.currentQuestion || "Could you tell me about yourself?",
      type: "Technical",
      topic: session.domain,
      difficulty: session.difficulty,
      sequence: session.questionCount + 1,
      timeLimit: result.timeLimit || 120, // default to 120s if not provided
      isFollowUp: false,
      createdAt: new Date()
    };

    await this.repository.addQuestion(sessionId, nextQuestion);
    return nextQuestion;
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
    const state: InterviewStateType = {
      sessionId: session._id.toString(),
      userId: session.userId,
      resumeId: session.resumeId,
      targetRole: session.targetRole,
      experienceLevel: session.experienceLevel,
      interviewType: session.interviewType[0] || 'Technical',
      company: session.company,
      domain: session.domain,
      difficulty: session.difficulty,
      currentTopic: session.topicsCovered[session.topicsCovered.length - 1] || null,
      currentQuestion: session.questions.find(q => q.questionId === answerData.questionId)?.questionText || null,
      timeLimit: null,
      questionHistory: session.questions.map(q => q.questionText),
      answerHistory: [...session.answers, answer], // include the new answer
      skippedQuestions: [],
      strongAreas: session.strongAreas,
      weakAreas: session.weakAreas,
      topicsCovered: session.topicsCovered,
      topicsRemaining: [],
      candidateSignals: [],
      questionCount: session.questionCount,
      maxQuestions: 10,
      status: session.status
    };

    let evaluationResult = null;
    try {
      const evalNodeResult = await evaluateAnswerNode(state);
      if (evalNodeResult.candidateSignals && evalNodeResult.candidateSignals.length > 0) {
        evaluationResult = evalNodeResult.candidateSignals[evalNodeResult.candidateSignals.length - 1];
        
        // Update the session's difficulty based on evaluation
        if (evalNodeResult.difficulty) {
          await this.repository.updateSessionStatus(sessionId, session.status, { difficulty: evalNodeResult.difficulty });
        }
      }
    } catch (e) {
      console.error("Evaluation failed", e);
    }
    
    return {
      success: true,
      message: "Answer submitted successfully",
      evaluation: evaluationResult || {
        needsFollowUp: false,
        recommendedDifficulty: session.difficulty,
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

  /**
   * Retrieves all sessions for a user
   */
  async getHistory(userId: string): Promise<IInterviewSession[]> {
    return await this.repository.getSessionsByUserId(userId);
  }
}
