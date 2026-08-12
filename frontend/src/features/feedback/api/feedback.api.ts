import { useQuery, useMutation } from '@tanstack/react-query';
import type { FeedbackReport, ApiResponse } from '../types';

// Mock API base URL. In real app, from environment config.
const API_URL = 'http://localhost:3000/api/feedback';

const fetchFeedback = async (interviewId: string): Promise<FeedbackReport> => {
  const response = await fetch(`${API_URL}/interview/${interviewId}`);
  const data: ApiResponse<FeedbackReport> = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  return data.data;
};

const generateFeedback = async (interviewId: string): Promise<FeedbackReport> => {
  const response = await fetch(`${API_URL}/generate/${interviewId}`, {
    method: 'POST',
  });
  const data: ApiResponse<FeedbackReport> = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  return data.data;
};

export const useFeedback = (interviewId: string) => {
  return useQuery({
    queryKey: ['feedback', interviewId],
    queryFn: () => fetchFeedback(interviewId),
    enabled: !!interviewId,
  });
};

export const useGenerateFeedback = () => {
  return useMutation({
    mutationFn: generateFeedback,
  });
};
