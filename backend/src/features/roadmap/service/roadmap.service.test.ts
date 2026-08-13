/// <reference types="jest" />
import { roadmapService } from './roadmap.service';
import { roadmapRepository } from '../repository/roadmap.repository';

// Mock the repository
jest.mock('../repository/roadmap.repository', () => ({
  roadmapRepository: {
    findActiveByUserId: jest.fn(),
    archiveRoadmap: jest.fn(),
    createNewVersion: jest.fn(),
    findById: jest.fn(),
    updateProgress: jest.fn(),
  }
}));

// Mock the roadmapAgent
jest.mock('../../../ai/agents/RoadmapAgent/roadmapAgent', () => ({
  roadmapAgent: {
    invoke: jest.fn().mockResolvedValue({
      skillGaps: [],
      phases: [],
      milestones: []
    })
  }
}));

describe('RoadmapService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateRoadmap', () => {
    it('should generate a new roadmap and archive the old active one', async () => {
      const mockUserId = 'user1';
      const mockData = {
        userId: mockUserId,
        targetRole: 'Senior Dev',
        experienceLevel: 'Mid',
        careerGoal: 'Become a lead',
        preferredTimeline: '6 months'
      };

      (roadmapRepository.findActiveByUserId as jest.Mock).mockResolvedValue({ _id: 'old_id', version: 1 });
      (roadmapRepository.createNewVersion as jest.Mock).mockResolvedValue({ _id: 'new_id', version: 2 });

      const result = await roadmapService.generateRoadmap(mockUserId, mockData);

      expect(roadmapRepository.findActiveByUserId).toHaveBeenCalledWith(mockUserId);
      expect(roadmapRepository.archiveRoadmap).toHaveBeenCalledWith('old_id');
      expect(roadmapRepository.createNewVersion).toHaveBeenCalled();
      expect((result as any).id || result?._id).toBe('new_id');
    });

    it('should throw Error if creation fails', async () => {
      (roadmapRepository.createNewVersion as jest.Mock).mockRejectedValue(new Error('DB Error'));

      await expect(roadmapService.generateRoadmap('user1', {} as any))
        .rejects.toThrow('DB Error');
    });
  });

  describe('updateProgress', () => {
    it('should calculate new overall percentage correctly', async () => {
      const mockRoadmap = {
        progress: {
          completedTasks: 0,
          totalTasks: 4,
          completedMilestones: 0,
          totalMilestones: 2,
          overallPercentage: 0
        }
      };

      (roadmapRepository.findById as jest.Mock).mockResolvedValue(mockRoadmap);
      (roadmapRepository.updateProgress as jest.Mock).mockImplementation((id, prog) => prog);

      const result = await roadmapService.updateProgress('test_id', { completedTaskId: 'task1' });

      // 1 out of 4 tasks = 25% for tasks, out of 50% total task weight = 12.5%
      // 0 milestones = 0% for milestones
      // Total = 13% (rounded)
      expect((result as any)?.overallPercentage).toBe(13);
    });
  });
});
