import { useQuery, useMutation } from '@tanstack/react-query';
import type { FeedbackReport } from '../types';
import { apiClient } from '../../auth/api/axios';

const fetchFeedback = async (interviewId: string): Promise<FeedbackReport> => {
  const response = await apiClient.get(`/feedback/interview/${interviewId}`);
  return response.data.data;
};

const generateFeedback = async (interviewId: string): Promise<FeedbackReport> => {
  const response = await apiClient.post(`/feedback/generate/${interviewId}`);
  return response.data.data;
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
