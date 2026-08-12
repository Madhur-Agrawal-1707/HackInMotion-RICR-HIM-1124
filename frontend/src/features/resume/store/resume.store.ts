import { create } from "zustand";
import { ParsedResume, AtsScore, ResumeModel } from "../types/resume.types";

interface ResumeState {
  currentResume: ResumeModel | null;
  parsedResume: ParsedResume | null;
  atsScore: AtsScore | null;
  resumeVersions: ResumeModel[];
  uploadState: "idle" | "uploading" | "success" | "error";
  uploadProgress: number;
  
  setCurrentResume: (resume: ResumeModel | null) => void;
  setParsedResume: (resume: ParsedResume | null) => void;
  updateParsedResume: (partial: Partial<ParsedResume>) => void;
  setAtsScore: (score: AtsScore | null) => void;
  setResumeVersions: (versions: ResumeModel[]) => void;
  setUploadState: (state: "idle" | "uploading" | "success" | "error") => void;
  setUploadProgress: (progress: number) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  currentResume: null,
  parsedResume: null,
  atsScore: null,
  resumeVersions: [],
  uploadState: "idle",
  uploadProgress: 0,
  
  setCurrentResume: (resume) => set({ currentResume: resume, parsedResume: resume?.parsedResume || null, atsScore: resume?.atsScore || null }),
  setParsedResume: (resume) => set({ parsedResume: resume }),
  updateParsedResume: (partial) => set((state) => ({
    parsedResume: state.parsedResume ? { ...state.parsedResume, ...partial } : null
  })),
  setAtsScore: (score) => set({ atsScore: score }),
  setResumeVersions: (versions) => set({ resumeVersions: versions }),
  setUploadState: (state) => set({ uploadState: state }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  reset: () => set({
    currentResume: null,
    parsedResume: null,
    atsScore: null,
    resumeVersions: [],
    uploadState: "idle",
    uploadProgress: 0,
  }),
}));
