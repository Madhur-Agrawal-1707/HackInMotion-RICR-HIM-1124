import mongoose, { Document, Schema } from 'mongoose';
import { IRoadmap, ISkillGap, IPhase, IMilestone, IRoadmapProgress, IProject, ITask } from '../types/roadmap.types';

export interface IRoadmapDocument extends Omit<IRoadmap, 'createdAt' | 'updatedAt'>, Document {
  createdAt: Date;
  updatedAt: Date;
}

const SkillGapSchema = new Schema<ISkillGap>({
  skill: { type: String, required: true },
  currentLevel: { type: Number, required: true, min: 1, max: 10 },
  requiredLevel: { type: Number, required: true, min: 1, max: 10 },
  gap: { type: Number, required: true },
  priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], required: true },
  reason: { type: String, required: true },
  evidence: { type: String, required: true },
}, { _id: false });

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['PRACTICE', 'READING', 'VIDEO', 'PROJECT'], required: true },
  estimatedDuration: { type: String, required: true },
}, { _id: false });

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: [{ type: String, required: true }],
  requirements: [{ type: String, required: true }],
  deliverables: [{ type: String, required: true }],
  difficulty: { type: String, enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], required: true },
  estimatedDuration: { type: String, required: true },
}, { _id: false });

const MilestoneSchema = new Schema<IMilestone>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  criteria: [{ type: String, required: true }],
  targetDate: { type: Date, required: true },
  status: { type: String, enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'], default: 'NOT_STARTED' },
});

const PhaseSchema = new Schema<IPhase>({
  phaseId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: [{ type: String, required: true }],
  topics: [{ type: String, required: true }],
  estimatedDuration: { type: String, required: true },
  tasks: [TaskSchema],
  projects: [ProjectSchema],
  milestones: [MilestoneSchema],
  order: { type: Number, required: true },
});

const RoadmapProgressSchema = new Schema<IRoadmapProgress>({
  completedTasks: { type: Number, default: 0 },
  totalTasks: { type: Number, default: 0 },
  completedMilestones: { type: Number, default: 0 },
  totalMilestones: { type: Number, default: 0 },
  overallPercentage: { type: Number, default: 0, min: 0, max: 100 },
}, { _id: false });

const RoadmapSchema = new Schema<IRoadmapDocument>({
  userId: { type: String, required: true },
  version: { type: Number, required: true, default: 1 },
  targetRole: { type: String, required: true },
  currentLevel: { type: String, required: true },
  targetLevel: { type: String, required: true },
  careerGoal: { type: String, required: true },
  estimatedDuration: { type: String, required: true },
  skillGaps: [SkillGapSchema],
  phases: [PhaseSchema],
  milestones: [MilestoneSchema], // Overall milestones
  progress: { type: RoadmapProgressSchema, required: true },
  status: { type: String, enum: ['ACTIVE', 'ARCHIVED', 'COMPLETED'], default: 'ACTIVE' },
}, {
  timestamps: true,
});

// Indexes for fast retrieval by user and status
RoadmapSchema.index({ userId: 1, status: 1 });
RoadmapSchema.index({ userId: 1, version: -1 });

export const RoadmapModel = mongoose.model<IRoadmapDocument>('Roadmap', RoadmapSchema);
