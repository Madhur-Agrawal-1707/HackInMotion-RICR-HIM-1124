import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as interviewApi from './interviewApi';

global.fetch = vi.fn();

describe('interviewApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useInterviewSession', () => {
    it('is a query hook defined', () => {
      expect(interviewApi.useInterviewSession).toBeDefined();
    });
  });

  describe('useStartInterview', () => {
    it('is a mutation hook defined', () => {
      expect(interviewApi.useStartInterview).toBeDefined();
    });
  });

  describe('useSubmitAnswer', () => {
    it('is a mutation hook defined', () => {
      expect(interviewApi.useSubmitAnswer).toBeDefined();
    });
  });
});
