import mongoose, { Schema, Document } from 'mongoose';
import { IInterviewSession, InterviewStatus, ExperienceLevel, DifficultyLevel, InterviewType } from '../types/interview.types';

export interface IInterviewSessionDocument extends IInterviewSession, Document {
  _id: mongoose.Types.ObjectId;
}

const QuestionSchema = new Schema({
  questionId: { type: String, required: true },
  questionText: { type: String, required: true },
  type: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true },
  sequence: { type: Number, required: true },
  parentQuestionId: { type: String, default: null },
  isFollowUp: { type: Boolean, default: false },
  followUpType: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const AnswerSchema = new Schema({
  questionId: { type: String, required: true },
  answerText: { type: String, required: true },
  duration: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
  answerQuality: { type: Number },
  correctness: { type: Number },
  technicalDepth: { type: Number },
  communication: { type: Number },
  confidence: { type: Number },
  relevance: { type: Number },
  isSkipped: { type: Boolean, default: false }
}, { _id: false });

const InterviewSessionSchema = new Schema({
  userId: { type: String, required: true, index: true },
  resumeId: { type: String },
  targetRole: { type: String, required: true },
  experienceLevel: { type: String, enum: Object.values(ExperienceLevel), required: true },
  interviewType: [{ type: String, enum: Object.values(InterviewType), required: true }],
  company: { type: String },
  domain: { type: String, required: true },
  difficulty: { type: String, enum: Object.values(DifficultyLevel), required: true },
  status: { type: String, enum: Object.values(InterviewStatus), default: InterviewStatus.CREATED },
  startedAt: { type: Date },
  completedAt: { type: Date },
  duration: { type: Number, required: true },
  questionCount: { type: Number, default: 0 },
  questions: [QuestionSchema],
  answers: [AnswerSchema],
  topicsCovered: [{ type: String }],
  strongAreas: [{ type: String }],
  weakAreas: [{ type: String }],
  overallSignals: { type: Schema.Types.Mixed }
}, { 
  timestamps: true 
});

export const InterviewSessionModel = mongoose.model<IInterviewSessionDocument>('InterviewSession', InterviewSessionSchema);
