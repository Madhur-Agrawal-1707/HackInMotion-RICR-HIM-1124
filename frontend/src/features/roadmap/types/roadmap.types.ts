export type SkillPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface ISkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: SkillPriority;
  reason: string;
  evidence: string;
}

export interface ITask {
  title: string;
  description: string;
  type: 'PRACTICE' | 'READING' | 'VIDEO' | 'PROJECT';
  estimatedDuration: string;
}

export interface IProject {
  title: string;
  description: string;
  skills: string[];
  requirements: string[];
  deliverables: string[];
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedDuration: string;
}

export interface IMilestone {
  _id?: string;
  title: string;
  description: string;
  criteria: string[];
  targetDate: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED';
}

export interface IPhase {
  phaseId: string;
  title: string;
  description: string;
  skills: string[];
  topics: string[];
  estimatedDuration: string;
  tasks: ITask[];
  projects: IProject[];
  milestones: IMilestone[];
  order: number;
}

export interface IRoadmapProgress {
  completedTasks: number;
  totalTasks: number;
  completedMilestones: number;
  totalMilestones: number;
  overallPercentage: number;
}

export interface IRoadmap {
  _id: string;
  userId: string;
  version: number;
  targetRole: string;
  currentLevel: string;
  targetLevel: string;
  careerGoal: string;
  estimatedDuration: string;
  skillGaps: ISkillGap[];
  phases: IPhase[];
  milestones: IMilestone[];
  progress: IRoadmapProgress;
  status: 'ACTIVE' | 'ARCHIVED' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export interface GenerateRoadmapParams {
  targetRole: string;
  experienceLevel: string;
  careerGoal: string;
  preferredTimeline: string;
}
