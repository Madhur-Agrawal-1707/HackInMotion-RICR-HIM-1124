import { Request, Response } from 'express';
import { roadmapService } from '../service/roadmap.service';
import { GenerateRoadmapRequestDto, UpdateRoadmapProgressDto } from '../dto/roadmap.dto';

export class RoadmapController {
  
  generateRoadmap = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: GenerateRoadmapRequestDto = req.body;
      // In a real app, userId comes from req.user (auth middleware)
      // Assuming it's set by auth middleware, or fallback to body for testing
      const userId = (req as any).user?.id || data.userId || 'test-user-id';
      
      const roadmap = await roadmapService.generateRoadmap(userId, data);
      
      res.status(201).json({
        success: true,
        message: "Roadmap generated successfully",
        data: roadmap,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Unable to generate roadmap",
        error: error.message,
      });
    }
  };

  getRoadmaps = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.id || 'test-user-id'; // Fallback for testing
      
      const roadmaps = await roadmapService.getRoadmapsByUserId(userId);
      
      res.status(200).json({
        success: true,
        message: "Roadmaps retrieved successfully",
        data: roadmaps,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve roadmaps",
        error: error.message,
      });
    }
  };

  getRoadmapById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const roadmap = await roadmapService.getRoadmapById(id);
      
      if (!roadmap) {
        res.status(404).json({
          success: false,
          message: "Roadmap not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Roadmap retrieved successfully",
        data: roadmap,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve roadmap",
        error: error.message,
      });
    }
  };

  updateProgress = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const updateData: UpdateRoadmapProgressDto = req.body;
      
      const updatedRoadmap = await roadmapService.updateProgress(id, updateData);
      
      if (!updatedRoadmap) {
        res.status(404).json({
          success: false,
          message: "Roadmap not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Progress updated successfully",
        data: updatedRoadmap,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to update progress",
        error: error.message,
      });
    }
  };

  deleteRoadmap = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const deletedRoadmap = await roadmapService.deleteRoadmap(id);

      if (!deletedRoadmap) {
        res.status(404).json({
          success: false,
          message: "Roadmap not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Roadmap deleted successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to delete roadmap",
        error: error.message,
      });
    }
  };
}

export const roadmapController = new RoadmapController();
