import { ParsedResume, ResumeModel } from "../types/resume.types";
import { apiClient as api } from "../../auth/api/axios";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const resumeApi = {
  uploadResume: async (file: File, onUploadProgress?: (progressEvent: any) => void): Promise<ApiResponse<ResumeModel>> => {
    const formData = new FormData();
    formData.append("resume", file);
    
    const response = await api.post<ApiResponse<ResumeModel>>("/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
    return response.data;
  },

  buildResume: async (data: ParsedResume): Promise<ApiResponse<ResumeModel>> => {
    const response = await api.post<ApiResponse<ResumeModel>>("/resume/build", data);
    return response.data;
  },

  analyzeResume: async (resumeId: string): Promise<ApiResponse<ResumeModel>> => {
    const response = await api.post<ApiResponse<ResumeModel>>(`/resume/analyze`, { resumeId });
    return response.data;
  },

  improveResume: async (resumeId: string): Promise<ApiResponse<ResumeModel>> => {
    const response = await api.post<ApiResponse<ResumeModel>>(`/resume/improve`, { resumeId });
    return response.data;
  },

  getResumes: async (): Promise<ApiResponse<ResumeModel[]>> => {
    const response = await api.get<ApiResponse<ResumeModel[]>>("/resume/history");
    return response.data;
  },

  getResumeById: async (id: string): Promise<ApiResponse<ResumeModel>> => {
    const response = await api.get<ApiResponse<ResumeModel>>(`/resume/${id}`);
    return response.data;
  },

  updateResume: async (id: string, data: Partial<ParsedResume>): Promise<ApiResponse<ResumeModel>> => {
    const response = await api.patch<ApiResponse<ResumeModel>>(`/resume/${id}`, data);
    return response.data;
  },

  deleteResume: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(`/resume/${id}`);
    return response.data;
  },

  getResumeHistory: async (id: string): Promise<ApiResponse<ResumeModel[]>> => {
    const response = await api.get<ApiResponse<ResumeModel[]>>(`/resume/history`);
    // Filter history by the specific resume ID on the client side since the backend returns all history for the user
    response.data.data = response.data.data.filter(r => r._id === id); // assuming history returns the versions or something. Wait, is it versions or just different resumes? 
    return response.data;
  },

  restoreResumeVersion: async (id: string, versionId: string): Promise<ApiResponse<ResumeModel>> => {
    const response = await api.post<ApiResponse<ResumeModel>>(`/resume/version/restore`, { id, versionId });
    return response.data;
  }
};
