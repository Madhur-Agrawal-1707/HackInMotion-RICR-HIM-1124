import { useMutation, useQuery } from '@tanstack/react-query';
import type { InterviewSession, StartInterviewRequest, AnswerData } from '../types/interview';

// Mock API functions for now
const fetchSession = async (sessionId: string): Promise<InterviewSession> => {
  const res = await fetch(`/api/interviews/${sessionId}`);
  if (!res.ok) throw new Error('Failed to fetch session');
  return res.json();
};

const startSession = async (data: StartInterviewRequest): Promise<InterviewSession> => {
  const res = await fetch('/api/interviews/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to start session');
  return res.json();
};

const submitAnswer = async ({ sessionId, answer }: { sessionId: string; answer: Partial<AnswerData> }) => {
  const res = await fetch(`/api/interviews/${sessionId}/answers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answer),
  });
  if (!res.ok) throw new Error('Failed to submit answer');
  return res.json(); // Returns next question or session completion status
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
