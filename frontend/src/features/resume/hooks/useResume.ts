import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { resumeApi } from "../api/resume.api";
import { useResumeStore } from "../store/resume.store";
import { ParsedResume } from "../types/resume.types";

export const resumeKeys = {
  all: ["resumes"] as const,
  lists: () => [...resumeKeys.all, "list"] as const,
  details: () => [...resumeKeys.all, "detail"] as const,
  detail: (id: string) => [...resumeKeys.details(), id] as const,
  history: (id: string) => [...resumeKeys.detail(id), "history"] as const,
};

export function useResumes() {
  return useQuery({
    queryKey: resumeKeys.lists(),
    queryFn: async () => {
      const response = await resumeApi.getResumes();
      return response.data;
    },
  });
}

export function useResume(id: string) {
  const setCurrentResume = useResumeStore((state) => state.setCurrentResume);

  return useQuery({
    queryKey: resumeKeys.detail(id),
    queryFn: async () => {
      const response = await resumeApi.getResumeById(id);
      setCurrentResume(response.data);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useResumeHistory(id: string) {
  const setResumeVersions = useResumeStore((state) => state.setResumeVersions);

  return useQuery({
    queryKey: resumeKeys.history(id),
    queryFn: async () => {
      const response = await resumeApi.getResumeHistory(id);
      setResumeVersions(response.data);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useUploadResume() {
  const queryClient = useQueryClient();
  const setUploadState = useResumeStore((state) => state.setUploadState);
  const setUploadProgress = useResumeStore((state) => state.setUploadProgress);
  const setCurrentResume = useResumeStore((state) => state.setCurrentResume);

  return useMutation({
    mutationFn: async (file: File) => {
      setUploadState("uploading");
      setUploadProgress(0);
      return resumeApi.uploadResume(file, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100));
        setUploadProgress(percentCompleted);
      });
    },
    onSuccess: (response) => {
      setUploadState("success");
      setCurrentResume(response.data);
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
    },
    onError: () => {
      setUploadState("error");
      setUploadProgress(0);
    },
  });
}

export function useBuildResume() {
  const queryClient = useQueryClient();
  const setCurrentResume = useResumeStore((state) => state.setCurrentResume);

  return useMutation({
    mutationFn: (data: ParsedResume) => resumeApi.buildResume(data),
    onSuccess: (response) => {
      setCurrentResume(response.data);
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
    },
  });
}

export function useUpdateResume() {
  const queryClient = useQueryClient();
  const setCurrentResume = useResumeStore((state) => state.setCurrentResume);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ParsedResume> }) => resumeApi.updateResume(id, data),
    onSuccess: (response, variables) => {
      setCurrentResume(response.data);
      queryClient.invalidateQueries({ queryKey: resumeKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
    },
  });
}

export function useAnalyzeResume() {
  const queryClient = useQueryClient();
  const setCurrentResume = useResumeStore((state) => state.setCurrentResume);

  return useMutation({
    mutationFn: (id: string) => resumeApi.analyzeResume(id),
    onSuccess: (response, id) => {
      setCurrentResume(response.data);
      queryClient.invalidateQueries({ queryKey: resumeKeys.detail(id) });
    },
  });
}

export function useImproveResume() {
  const queryClient = useQueryClient();
  const setCurrentResume = useResumeStore((state) => state.setCurrentResume);

  return useMutation({
    mutationFn: (id: string) => resumeApi.improveResume(id),
    onSuccess: (response, id) => {
      setCurrentResume(response.data);
      queryClient.invalidateQueries({ queryKey: resumeKeys.detail(id) });
    },
  });
}

export function useDeleteResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resumeApi.deleteResume(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
      queryClient.removeQueries({ queryKey: resumeKeys.detail(id) });
    },
  });
}

export function useRestoreResumeVersion() {
  const queryClient = useQueryClient();
  const setCurrentResume = useResumeStore((state) => state.setCurrentResume);

  return useMutation({
    mutationFn: ({ id, versionId }: { id: string; versionId: string }) => resumeApi.restoreResumeVersion(id, versionId),
    onSuccess: (response, variables) => {
      setCurrentResume(response.data);
      queryClient.invalidateQueries({ queryKey: resumeKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: resumeKeys.history(variables.id) });
    },
  });
}
