import { InterviewRepository } from './interview.repository';
import { InterviewSessionModel } from '../model/interview.model';
import { InterviewStatus } from '../types/interview.types';

jest.mock('../model/interview.model');

describe('InterviewRepository', () => {
  let repository: InterviewRepository;

  beforeEach(() => {
    repository = new InterviewRepository();
    jest.clearAllMocks();
  });

  describe('createSession', () => {
    it('should create and save a new session', async () => {
      const mockSave = jest.fn().mockResolvedValue({ _id: 'session1' });
      (InterviewSessionModel as unknown as jest.Mock).mockImplementation(() => ({
        save: mockSave
      }));

      const result = await repository.createSession({ userId: 'user1' } as any);

      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual({ _id: 'session1' });
    });
  });

  describe('getSessionById', () => {
    it('should find session by id', async () => {
      InterviewSessionModel.findById = jest.fn().mockResolvedValue({ _id: 'session1' });

      const result = await repository.getSessionById('session1');

      expect(InterviewSessionModel.findById).toHaveBeenCalledWith('session1');
      expect(result).toEqual({ _id: 'session1' });
    });
  });

  describe('updateSessionStatus', () => {
    it('should update status', async () => {
      InterviewSessionModel.findByIdAndUpdate = jest.fn().mockResolvedValue({ _id: 'session1', status: InterviewStatus.IN_PROGRESS });

      const result = await repository.updateSessionStatus('session1', InterviewStatus.IN_PROGRESS, {});

      expect(InterviewSessionModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'session1',
        { status: InterviewStatus.IN_PROGRESS },
        { new: true }
      );
      expect(result?.status).toBe(InterviewStatus.IN_PROGRESS);
    });
  });

  describe('addQuestion', () => {
    it('should push a new question', async () => {
      InterviewSessionModel.findByIdAndUpdate = jest.fn().mockResolvedValue({ _id: 'session1' });

      await repository.addQuestion('session1', { questionText: 'test' } as any);

      expect(InterviewSessionModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'session1',
        { 
          $push: { questions: { questionText: 'test' } },
          $inc: { questionCount: 1 }
        },
        { new: true }
      );
    });
  });

  describe('addAnswer', () => {
    it('should push a new answer', async () => {
      InterviewSessionModel.findByIdAndUpdate = jest.fn().mockResolvedValue({ _id: 'session1' });

      await repository.addAnswer('session1', { answerText: 'test' } as any);

      expect(InterviewSessionModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'session1',
        { $push: { answers: { answerText: 'test' } } },
        { new: true }
      );
    });
  });
});
