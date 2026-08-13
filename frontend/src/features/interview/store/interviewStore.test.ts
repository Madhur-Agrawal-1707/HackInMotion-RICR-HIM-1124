import { renderHook, act } from '@testing-library/react';
import { useInterviewStore } from './interviewStore';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useInterviewStore', () => {
  beforeEach(() => {
    // Reset the store state before each test
    const { result } = renderHook(() => useInterviewStore());
    act(() => {
      result.current.clearSession();
    });
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useInterviewStore());
    expect(result.current.currentSession).toBeNull();
    expect(result.current.currentQuestion).toBeNull();
    expect(result.current.timeRemaining).toBe(0);
    expect(result.current.isRecording).toBe(false);
  });

  it('should set session', () => {
    const { result } = renderHook(() => useInterviewStore());
    const mockSession = {
      id: 'session-123',
      userId: 'user-1',
      type: 'Technical' as const,
      status: 'In Progress' as const,
      startTime: new Date().toISOString(),
    };

    act(() => {
      result.current.setSession(mockSession);
    });

    expect(result.current.currentSession).toEqual(mockSession);
  });

  it('should set current question', () => {
    const { result } = renderHook(() => useInterviewStore());
    const mockQuestion = {
      id: 'q-1',
      text: 'What is React?',
      topic: 'Frontend',
      difficulty: 'Easy',
      timeLimit: 120
    };

    act(() => {
      result.current.setCurrentQuestion(mockQuestion);
    });

    expect(result.current.currentQuestion).toEqual(mockQuestion);
  });

  it('should set time remaining', () => {
    const { result } = renderHook(() => useInterviewStore());

    act(() => {
      result.current.setTimeRemaining(60);
    });

    expect(result.current.timeRemaining).toBe(60);
  });

  it('should set isRecording', () => {
    const { result } = renderHook(() => useInterviewStore());

    act(() => {
      result.current.setIsRecording(true);
    });

    expect(result.current.isRecording).toBe(true);
  });

  it('should clear session', () => {
    const { result } = renderHook(() => useInterviewStore());
    
    act(() => {
      result.current.setIsRecording(true);
      result.current.setTimeRemaining(60);
      result.current.clearSession();
    });

    expect(result.current.currentSession).toBeNull();
    expect(result.current.currentQuestion).toBeNull();
    expect(result.current.timeRemaining).toBe(0);
    expect(result.current.isRecording).toBe(false);
  });
});
