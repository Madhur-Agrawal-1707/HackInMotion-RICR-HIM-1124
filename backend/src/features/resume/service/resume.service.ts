import { v4 as uuidv4 } from 'uuid';
import { ResumeRepository } from '../repository/resume.repository';
import { ResumeParser } from '../parser/resume.parser';
import { uploadToCloudinary } from '../../../common/utils/cloudinary.util';
import { runResumeAnalysisNode, runResumeImprovementNode } from '../../../ai/graphs/resumeGraph';
import { IResumeData, IResume } from '../types/resume.types';

export class ResumeService {
  private repository: ResumeRepository;
  private parser: ResumeParser;

  constructor() {
    this.repository = new ResumeRepository();
    this.parser = new ResumeParser();
  }

  async uploadAndParse(userId: string, fileBuffer: Buffer, filename: string, mimetype: string): Promise<IResume> {
    const fileUrl = await uploadToCloudinary(fileBuffer, filename);
    const parsedData = await this.parser.parseFromBuffer(fileBuffer, mimetype);

    await this.repository.unsetCurrentVersion(userId);

    const newResume = await this.repository.create({
      userId: userId as any,
      originalFileUrl: fileUrl,
      parsedResume: parsedData,
      versionId: uuidv4(),
      currentVersion: true,
    });

    return newResume;
  }

  async buildResume(userId: string, resumeData: IResumeData): Promise<IResume> {
    await this.repository.unsetCurrentVersion(userId);

    const newResume = await this.repository.create({
      userId: userId as any,
      parsedResume: resumeData,
      versionId: uuidv4(),
      currentVersion: true,
    });

    return newResume;
  }

  async analyzeResume(id: string): Promise<IResume> {
    const resume = await this.repository.findById(id);
    if (!resume) throw new Error('Resume not found');

    const analysisResult = await runResumeAnalysisNode(resume.parsedResume);

    const updated = await this.repository.update(id, {
      atsScore: analysisResult.atsAnalysis,
      profileStrength: analysisResult.profileStrength,
    });

    return updated as IResume;
  }

  async improveResume(id: string): Promise<IResume> {
    const resume = await this.repository.findById(id);
    if (!resume) throw new Error('Resume not found');

    const suggestions = await runResumeImprovementNode(resume.parsedResume);

    const updated = await this.repository.update(id, {
      aiSuggestions: suggestions,
    });

    return updated as IResume;
  }

  async getResumeById(id: string): Promise<IResume> {
    const resume = await this.repository.findById(id);
    if (!resume) throw new Error('Resume not found');
    return resume;
  }

  async getCurrentResume(userId: string): Promise<IResume | null> {
    return await this.repository.findCurrentByUserId(userId);
  }

  async getResumeHistory(userId: string): Promise<IResume[]> {
    return await this.repository.findAllVersionsByUserId(userId);
  }

  async updateResume(id: string, updateData: Partial<IResumeData>): Promise<IResume> {
    const resume = await this.repository.findById(id);
    if (!resume) throw new Error('Resume not found');

    const updatedParsedResume = { ...resume.parsedResume, ...updateData };
    
    await this.repository.unsetCurrentVersion(resume.userId.toString());

    const newResume = await this.repository.create({
      userId: resume.userId,
      originalFileUrl: resume.originalFileUrl,
      parsedResume: updatedParsedResume,
      atsScore: resume.atsScore,
      profileStrength: resume.profileStrength,
      aiSuggestions: resume.aiSuggestions,
      versionId: uuidv4(),
      currentVersion: true,
    });

    return newResume;
  }

  async restoreVersion(userId: string, versionIdToRestore: string): Promise<IResume> {
    const allVersions = await this.repository.findAllVersionsByUserId(userId);
    const versionToRestore = allVersions.find(v => v._id.toString() === versionIdToRestore || v.versionId === versionIdToRestore);
    
    if (!versionToRestore) throw new Error('Version not found');

    await this.repository.unsetCurrentVersion(userId);

    const restoredResume = await this.repository.create({
      userId: versionToRestore.userId,
      originalFileUrl: versionToRestore.originalFileUrl,
      parsedResume: versionToRestore.parsedResume,
      atsScore: versionToRestore.atsScore,
      profileStrength: versionToRestore.profileStrength,
      aiSuggestions: versionToRestore.aiSuggestions,
      versionId: uuidv4(),
      currentVersion: true,
    });

    return restoredResume;
  }

  async deleteResume(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
