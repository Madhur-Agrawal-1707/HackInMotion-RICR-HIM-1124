import type { IRoadmap, GenerateRoadmapParams } from '../types/roadmap.types';
import { apiClient } from '../../auth/api/axios';

const API_BASE_URL = '/roadmap';

export const roadmapApi = {
  generateRoadmap: async (params: GenerateRoadmapParams): Promise<IRoadmap> => {
    const response = await apiClient.post(`${API_BASE_URL}/generate`, params);
    return response.data.data;
  },

  getRoadmaps: async (): Promise<IRoadmap[]> => {
    const response = await apiClient.get(`${API_BASE_URL}`);
    return response.data.data;
  },

  getRoadmapById: async (id: string): Promise<IRoadmap> => {
    const response = await apiClient.get(`${API_BASE_URL}/${id}`);
    return response.data.data;
  },

  updateProgress: async (id: string, updateData: { completedTaskId?: string; completedMilestoneId?: string; phaseId?: string }): Promise<IRoadmap> => {
    const response = await apiClient.patch(`${API_BASE_URL}/${id}/progress`, updateData);
    return response.data.data;
  }
};
