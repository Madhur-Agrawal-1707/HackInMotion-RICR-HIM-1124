import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedbackReport extends Document {
  userId: string;
  interviewId: string;
  overallScore: number;
  technicalScore: number;
  problemSolvingScore: number;
  communicationScore: number;
  codingScore: number;
  behavioralScore: number;
  topicScores: Record<string, number>;
  strengths: Array<{ topic: string; description: string }>;
  weaknesses: Array<{ topic: string; description: string }>;
  skillGaps: Array<{ skill: string; reason: string; recommendedResource?: string }>;
  recommendations: Array<{ category: string; actionableStep: string }>;
  summary: string;
  rubricVersion: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackReportSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    interviewId: { type: String, required: true, unique: true },
    overallScore: { type: Number, required: true, min: 0, max: 100 },
    technicalScore: { type: Number, required: true, min: 0, max: 100 },
    problemSolvingScore: { type: Number, required: true, min: 0, max: 100 },
    communicationScore: { type: Number, required: true, min: 0, max: 100 },
    codingScore: { type: Number, required: true, min: 0, max: 100 },
    behavioralScore: { type: Number, required: true, min: 0, max: 100 },
    topicScores: { type: Map, of: Number, default: {} },
    strengths: [
      {
        topic: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    weaknesses: [
      {
        topic: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    skillGaps: [
      {
        skill: { type: String, required: true },
        reason: { type: String, required: true },
        recommendedResource: { type: String },
      },
    ],
    recommendations: [
      {
        category: { type: String, required: true },
        actionableStep: { type: String, required: true },
      },
    ],
    summary: { type: String, required: true },
    rubricVersion: { type: String, required: true, default: '1.0' },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast retrieval
FeedbackReportSchema.index({ interviewId: 1 });
FeedbackReportSchema.index({ userId: 1 });

export const FeedbackReport = mongoose.model<IFeedbackReport>('FeedbackReport', FeedbackReportSchema);
