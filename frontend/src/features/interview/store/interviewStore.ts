import { create } from 'zustand';
import type { InterviewSession, QuestionData } from '../types/interview';

interface InterviewState {
  currentSession: InterviewSession | null;
  currentQuestion: QuestionData | null;
  timeRemaining: number; // in seconds
  isRecording: boolean;
  
  setSession: (session: InterviewSession) => void;
  setCurrentQuestion: (question: QuestionData) => void;
  setTimeRemaining: (time: number) => void;
  setIsRecording: (isRecording: boolean) => void;
  clearSession: () => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  currentSession: null,
  currentQuestion: null,
  timeRemaining: 0,
  isRecording: false,

  setSession: (session) => set({ currentSession: session }),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  setIsRecording: (isRecording) => set({ isRecording }),
  clearSession: () => set({ currentSession: null, currentQuestion: null, timeRemaining: 0, isRecording: false }),
}));
