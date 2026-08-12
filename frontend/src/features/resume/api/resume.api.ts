import axios from "axios";
import { ParsedResume, ResumeModel } from "../types/resume.types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true, // Assuming JWT auth might be in cookies, or interceptors will add it
});

// Optional: Interceptor to add auth token if stored in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const resumeApi = {
  uploadResume: async (file: File, onUploadProgress?: (progressEvent: any) => void): Promise<ApiResponse<ResumeModel>> => {
    const formData = new FormData();
    formData.append("file", file);
    
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
    const response = await api.get<ApiResponse<ResumeModel[]>>("/resume");
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
    const response = await api.get<ApiResponse<ResumeModel[]>>(`/resume/${id}/history`);
    return response.data;
  },

  restoreResumeVersion: async (id: string, versionId: string): Promise<ApiResponse<ResumeModel>> => {
    const response = await api.post<ApiResponse<ResumeModel>>(`/resume/version/restore`, { id, versionId });
    return response.data;
  }
};
