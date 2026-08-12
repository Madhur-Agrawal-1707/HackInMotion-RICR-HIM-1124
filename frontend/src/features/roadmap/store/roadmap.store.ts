import { create } from 'zustand';
import { IRoadmap } from '../types/roadmap.types';

interface RoadmapState {
  activeRoadmap: IRoadmap | null;
  setActiveRoadmap: (roadmap: IRoadmap) => void;
  clearActiveRoadmap: () => void;
}

export const useRoadmapStore = create<RoadmapState>((set) => ({
  activeRoadmap: null,
  setActiveRoadmap: (roadmap) => set({ activeRoadmap: roadmap }),
  clearActiveRoadmap: () => set({ activeRoadmap: null }),
}));
