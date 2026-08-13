import { roadmapRepository } from '../repository/roadmap.repository';
import { GenerateRoadmapRequestDto, UpdateRoadmapProgressDto } from '../dto/roadmap.dto';
import { IRoadmapDocument } from '../model/roadmap.model';
import { roadmapAgent } from '../../../ai/agents/RoadmapAgent/roadmapAgent';

export class RoadmapService {
  async generateRoadmap(userId: string, data: GenerateRoadmapRequestDto): Promise<IRoadmapDocument> {
    // 1. Fetch Resume Data (Mocked or real integration)
    // const resume = await resumeService.findById(data.resumeId);

    // 2. Fetch Feedback Data (Mocked or real integration)
    // const feedback = await feedbackService.findById(data.interviewId);

    // 3. Call AI LangGraph Workflow
    const aiResult = await roadmapAgent.invoke({
      candidateProfile: {}, // Mock
      interviewFeedback: {}, // Mock
      targetRole: data.targetRole,
      experienceLevel: data.experienceLevel,
      careerGoal: data.careerGoal,
      preferredTimeline: data.preferredTimeline,
      skillGaps: [],
      phases: [],
      milestones: [],
      error: null
    });

    const stubbedRoadmap = {
      userId,
      targetRole: data.targetRole,
      currentLevel: data.experienceLevel,
      targetLevel: 'Next Level',
      careerGoal: data.careerGoal,
      estimatedDuration: data.preferredTimeline,
      skillGaps: aiResult.skillGaps || [],
      phases: aiResult.phases || [],
      milestones: aiResult.milestones || [],
      progress: {
        completedTasks: 0,
        totalTasks: 0,
        completedMilestones: 0,
        totalMilestones: 0,
        overallPercentage: 0
      },
      status: 'ACTIVE' as const,
    };

    // 4. Archive any existing active roadmap
    const activeRoadmap = await roadmapRepository.findActiveByUserId(userId);
    let previousVersion = 0;
    if (activeRoadmap) {
      previousVersion = activeRoadmap.version;
      await roadmapRepository.archiveRoadmap((activeRoadmap as any).id || (activeRoadmap as any)._id);
    }

    // 5. Persist the new roadmap
    return roadmapRepository.createNewVersion(stubbedRoadmap, previousVersion);
  }

  async getRoadmapById(id: string): Promise<IRoadmapDocument | null> {
    return roadmapRepository.findById(id);
  }

  async getRoadmapsByUserId(userId: string): Promise<IRoadmapDocument[]> {
    return roadmapRepository.findByUserId(userId);
  }

  async getActiveRoadmap(userId: string): Promise<IRoadmapDocument | null> {
    return roadmapRepository.findActiveByUserId(userId);
  }

  async updateProgress(id: string, updateDto: UpdateRoadmapProgressDto): Promise<IRoadmapDocument | null> {
    const roadmap = await roadmapRepository.findById(id);
    if (!roadmap) {
      throw new Error("Roadmap not found");
    }

    // A real implementation would parse through the phases, mark specific tasks/milestones as complete,
    // and then recalculate the overall progress.
    // For now, this is a placeholder logic:
    const newProgress = { ...roadmap.progress };
    
    if (updateDto.completedTaskId) {
      newProgress.completedTasks += 1;
    }
    
    if (updateDto.completedMilestoneId) {
      newProgress.completedMilestones += 1;
    }

    // Ensure we don't divide by zero
    const taskPercent = newProgress.totalTasks > 0 ? (newProgress.completedTasks / newProgress.totalTasks) * 50 : 0;
    const milestonePercent = newProgress.totalMilestones > 0 ? (newProgress.completedMilestones / newProgress.totalMilestones) * 50 : 0;
    
    newProgress.overallPercentage = Math.min(100, Math.round(taskPercent + milestonePercent));

    return roadmapRepository.updateProgress(id, newProgress);
  }

  async deleteRoadmap(id: string): Promise<IRoadmapDocument | null> {
    return roadmapRepository.delete(id);
  }
}

export const roadmapService = new RoadmapService();
