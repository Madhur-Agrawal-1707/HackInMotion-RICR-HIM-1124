import { InterviewService } from './interview.service';
import { InterviewRepository } from '../repository/interview.repository';
import { InterviewStatus } from '../types/interview.types';

jest.mock('../repository/interview.repository');

describe('InterviewService', () => {
  let service: InterviewService;
  let mockRepository: jest.Mocked<InterviewRepository>;

  beforeEach(() => {
    mockRepository = new InterviewRepository() as jest.Mocked<InterviewRepository>;
    service = new InterviewService();
    // Overwrite the private repository property with our mock
    (service as any).repository = mockRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('startInterview', () => {
    it('should create a new session', async () => {
      const mockSession = { _id: 'session1', userId: 'user1', status: InterviewStatus.CREATED };
      mockRepository.createSession.mockResolvedValue(mockSession as any);

      const result = await service.startInterview('user1', { targetRole: 'Dev' } as any);

      expect(mockRepository.createSession).toHaveBeenCalledWith(expect.objectContaining({
        userId: 'user1',
        status: InterviewStatus.CREATED,
        targetRole: 'Dev'
      }));
      expect(result).toEqual(mockSession);
    });
  });

  describe('getNextQuestion', () => {
    it('should throw if session not found', async () => {
      mockRepository.getSessionById.mockResolvedValue(null);
      await expect(service.getNextQuestion('session1')).rejects.toThrow('Session not found');
    });

    it('should throw if session is not CREATED or IN_PROGRESS', async () => {
      mockRepository.getSessionById.mockResolvedValue({ status: InterviewStatus.COMPLETED } as any);
      await expect(service.getNextQuestion('session1')).rejects.toThrow(/Cannot get next question/);
    });

    it('should get next question and update status if CREATED', async () => {
      mockRepository.getSessionById.mockResolvedValue({ 
        status: InterviewStatus.CREATED,
        domain: 'Frontend',
        difficulty: 'Medium',
        questionCount: 0
      } as any);

      const result = await service.getNextQuestion('session1');

      expect(mockRepository.updateSessionStatus).toHaveBeenCalledWith('session1', InterviewStatus.IN_PROGRESS, expect.any(Object));
      expect(mockRepository.addQuestion).toHaveBeenCalled();
      expect(result?.questionText).toContain('React');
    });
  });

  describe('submitAnswer', () => {
    it('should submit answer successfully', async () => {
      mockRepository.getSessionById.mockResolvedValue({ domain: 'Frontend' } as any);
      const result = await service.submitAnswer('session1', { questionId: 'q1', answerText: 'Answer' });
      
      expect(mockRepository.addAnswer).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.evaluation.recommendedTopic).toBe('Frontend');
    });
  });

  describe('getSessionDetails', () => {
    it('should return session details', async () => {
      mockRepository.getSessionById.mockResolvedValue({ _id: 'session1' } as any);
      const result = await service.getSessionDetails('session1');
      expect(result).toEqual({ _id: 'session1' });
    });
  });
});
