import { useMutation, useQuery } from '@tanstack/react-query';
import type { InterviewSession, StartInterviewRequest, AnswerData } from '../types/interview';
import { apiClient } from '../../auth/api/axios';

const fetchSession = async (sessionId: string): Promise<InterviewSession> => {
  const res = await apiClient.get(`/interview/${sessionId}`);
  return res.data.data;
};

const startSession = async (data: StartInterviewRequest): Promise<InterviewSession> => {
  const res = await apiClient.post('/interview/start', data);
  return res.data.data;
};

const submitAnswer = async ({ sessionId, answer }: { sessionId: string; answer: Partial<AnswerData> }) => {
  const res = await apiClient.post(`/interview/${sessionId}/answer`, answer);
  return res.data.data; // Returns next question or session completion status
};

const fetchHistory = async (): Promise<InterviewSession[]> => {
  const res = await apiClient.get('/interview/history');
  return res.data.data;
};

const fetchNextQuestion = async (sessionId: string): Promise<any> => {
  const res = await apiClient.get(`/interview/${sessionId}/next-question`);
  return res.data.data;
};

// Hooks
export const useInterviewSession = (sessionId: string) => {
  return useQuery({
    queryKey: ['interview', sessionId],
    queryFn: () => fetchSession(sessionId),
    enabled: !!sessionId,
  });
};

export const useStartInterview = () => {
  return useMutation({
    mutationFn: startSession,
  });
};

export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: submitAnswer,
  });
};

export const useInterviewHistory = () => {
  return useQuery({
    queryKey: ['interview-history'],
    queryFn: fetchHistory,
  });
};

export const useNextQuestion = (sessionId: string) => {
  return useQuery({
    queryKey: ['interview-next-question', sessionId],
    queryFn: () => fetchNextQuestion(sessionId),
    enabled: !!sessionId,
    refetchOnWindowFocus: false, // Don't fetch multiple times automatically
  });
};
