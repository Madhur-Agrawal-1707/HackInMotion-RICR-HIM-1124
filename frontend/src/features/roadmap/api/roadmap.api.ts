import type { IRoadmap, GenerateRoadmapParams } from '../types/roadmap.types';
// Assume a base axios instance exists, but we'll mock fetch here for completeness if it doesn't
//import { axiosInstance } from '../../../api/axios'; 

const API_BASE_URL = '/api/roadmap';

export const roadmapApi = {
  generateRoadmap: async (params: GenerateRoadmapParams): Promise<IRoadmap> => {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data;
  },

  getRoadmaps: async (): Promise<IRoadmap[]> => {
    const response = await fetch(`${API_BASE_URL}`);
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data;
  },

  getRoadmapById: async (id: string): Promise<IRoadmap> => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data;
  },

  updateProgress: async (id: string, updateData: { completedTaskId?: string; completedMilestoneId?: string; phaseId?: string }): Promise<IRoadmap> => {
    const response = await fetch(`${API_BASE_URL}/${id}/progress`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    return result.data;
  }
};
