import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { resumeApi } from './resume.api';

// Mock axios
vi.mock('axios', () => {
  const mAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() }
    }
  };
  return {
    default: {
      create: vi.fn(() => mAxiosInstance)
    }
  };
});

describe('resumeApi', () => {
  let axiosInstance: any;

  beforeEach(() => {
    vi.clearAllMocks();
    axiosInstance = axios.create();
  });

  it('should fetch resumes', async () => {
    const mockData = { success: true, message: 'Success', data: [] };
    axiosInstance.get.mockResolvedValueOnce({ data: mockData });

    const result = await resumeApi.getResumes();

    expect(axiosInstance.get).toHaveBeenCalledWith('/resume');
    expect(result).toEqual(mockData);
  });

  it('should fetch resume by id', async () => {
    const mockData = { success: true, message: 'Success', data: { id: '123' } };
    axiosInstance.get.mockResolvedValueOnce({ data: mockData });

    const result = await resumeApi.getResumeById('123');

    expect(axiosInstance.get).toHaveBeenCalledWith('/resume/123');
    expect(result).toEqual(mockData);
  });
});
