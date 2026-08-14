import { Response } from 'express';
import { ResumeService } from '../service/resume.service';
import { AuthRequest } from '../../../middleware/auth.middleware';

export class ResumeController {
  private resumeService: ResumeService;

  constructor() {
    this.resumeService = new ResumeService();
  }

  uploadResume = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      const file = req.file;

      if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
      if (!file) return res.status(400).json({ success: false, message: 'No file uploaded' });

      const resume = await this.resumeService.uploadAndParse(userId, file.buffer, file.originalname, file.mimetype);
      
      res.status(201).json({ success: true, message: 'Resume uploaded successfully', data: resume });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  };

  buildResume = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

      const resumeData = req.body;
      const resume = await this.resumeService.buildResume(userId, resumeData);

      res.status(201).json({ success: true, message: 'Resume built successfully', data: resume });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  };

  analyzeResume = async (req: AuthRequest, res: Response) => {
    try {
      const id = req.body.resumeId; // or get from params if preferred
      const resume = await this.resumeService.analyzeResume(id);

      res.status(200).json({ success: true, message: 'Analysis completed', data: resume });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  };

  improveResume = async (req: AuthRequest, res: Response) => {
    try {
      const id = req.body.resumeId;
      const resume = await this.resumeService.improveResume(id);

      res.status(200).json({ success: true, message: 'Improvement suggestions generated', data: resume });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  };

  getCurrentResume = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

      const resume = await this.resumeService.getCurrentResume(userId);
      
      res.status(200).json({ success: true, message: 'Fetched current resume', data: resume });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  };

  getResumeById = async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;
      const resume = await this.resumeService.getResumeById(id);
      
      res.status(200).json({ success: true, message: 'Fetched resume', data: resume });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  };

  updateResume = async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;
      const updateData = req.body;
      const resume = await this.resumeService.updateResume(id, updateData);
      
      res.status(200).json({ success: true, message: 'Resume updated successfully', data: resume });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  };

  deleteResume = async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;
      await this.resumeService.deleteResume(id);
      
      res.status(200).json({ success: true, message: 'Resume deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  };

  getResumeHistory = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

      const history = await this.resumeService.getResumeHistory(userId);
      
      res.status(200).json({ success: true, message: 'Fetched resume history', data: history });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  };

  restoreVersion = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      const versionId = req.body.versionId;
      if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

      const resume = await this.resumeService.restoreVersion(userId, versionId);
      
      res.status(200).json({ success: true, message: 'Version restored successfully', data: resume });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
  };
}
