import { IResume, IResumeData } from '../types/resume.types';
import { Resume } from '../model/resume.model';

export class ResumeRepository {
  /**
   * Create a new resume record
   */
  async create(resumeData: Partial<IResume>): Promise<IResume> {
    const resume = new Resume(resumeData);
    return await resume.save();
  }

  /**
   * Find a resume by ID
   */
  async findById(id: string): Promise<IResume | null> {
    return await Resume.findById(id);
  }

  /**
   * Find the current version of user's resume
   */
  async findCurrentByUserId(userId: string): Promise<IResume | null> {
    return await Resume.findOne({ userId, currentVersion: true });
  }

  /**
   * Find all versions for a user
   */
  async findAllVersionsByUserId(userId: string): Promise<IResume[]> {
    return await Resume.find({ userId }).sort({ createdAt: -1 });
  }

  /**
   * Update a resume
   */
  async update(id: string, updateData: Partial<IResume>): Promise<IResume | null> {
    return await Resume.findByIdAndUpdate(id, updateData, { new: true });
  }

  /**
   * Unset current version flag for all user's resumes
   */
  async unsetCurrentVersion(userId: string): Promise<void> {
    await Resume.updateMany({ userId }, { $set: { currentVersion: false } });
  }

  /**
   * Delete a resume
   */
  async delete(id: string): Promise<boolean> {
    const result = await Resume.findByIdAndDelete(id);
    return result !== null;
  }
}
