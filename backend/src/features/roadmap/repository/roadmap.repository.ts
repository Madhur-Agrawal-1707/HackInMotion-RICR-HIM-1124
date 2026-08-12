import { RoadmapModel, IRoadmapDocument } from '../model/roadmap.model';
import { IRoadmap } from '../types/roadmap.types';

export class RoadmapRepository {
  async create(roadmapData: Omit<IRoadmap, 'createdAt' | 'updatedAt' | 'version'>): Promise<IRoadmapDocument> {
    const roadmap = new RoadmapModel({
      ...roadmapData,
      version: 1, // Start with version 1
    });
    return roadmap.save();
  }

  async findById(id: string): Promise<IRoadmapDocument | null> {
    return RoadmapModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<IRoadmapDocument[]> {
    return RoadmapModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async findActiveByUserId(userId: string): Promise<IRoadmapDocument | null> {
    return RoadmapModel.findOne({ userId, status: 'ACTIVE' }).sort({ version: -1 }).exec();
  }

  async updateProgress(id: string, progress: IRoadmap['progress']): Promise<IRoadmapDocument | null> {
    return RoadmapModel.findByIdAndUpdate(
      id,
      { $set: { progress } },
      { new: true }
    ).exec();
  }

  async archiveRoadmap(id: string): Promise<IRoadmapDocument | null> {
    return RoadmapModel.findByIdAndUpdate(
      id,
      { $set: { status: 'ARCHIVED' } },
      { new: true }
    ).exec();
  }

  async createNewVersion(roadmapData: Partial<IRoadmap>, previousVersion: number): Promise<IRoadmapDocument> {
    const roadmap = new RoadmapModel({
      ...roadmapData,
      version: previousVersion + 1,
    });
    return roadmap.save();
  }

  async delete(id: string): Promise<IRoadmapDocument | null> {
    return RoadmapModel.findByIdAndDelete(id).exec();
  }
}

export const roadmapRepository = new RoadmapRepository();
