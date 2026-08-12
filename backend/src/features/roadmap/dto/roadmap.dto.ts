export interface GenerateRoadmapRequestDto {
  userId: string; // Typically from auth, but passing here for context if needed
  targetRole: string;
  experienceLevel: string;
  careerGoal: string;
  preferredTimeline: string;
  // Options for overriding or specifying data sources
  resumeId?: string;
  interviewId?: string;
}

export interface UpdateRoadmapProgressDto {
  completedTaskId?: string;
  completedMilestoneId?: string;
  phaseId?: string; // If a specific task in a phase is completed
}
