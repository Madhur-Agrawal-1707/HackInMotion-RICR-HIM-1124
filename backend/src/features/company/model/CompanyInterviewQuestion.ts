import mongoose, { Schema, Document } from 'mongoose';

export interface ICompanyInterviewQuestion extends Document {
  companyId: mongoose.Types.ObjectId;
  roleId?: mongoose.Types.ObjectId;
  questionText: string;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
  round: 'ONLINE_ASSESSMENT' | 'CODING' | 'TECHNICAL' | 'SYSTEM_DESIGN' | 'BEHAVIORAL' | 'HR' | 'MANAGERIAL' | 'FINAL';
  sourceType: 'OFFICIAL' | 'VERIFIED_REPORT' | 'COMMUNITY_REPORTED' | 'CURATED' | 'AI_GENERATED';
  sourceUrl?: string;
  sourceTitle?: string;
  sourceYear?: number;
  tags: string[];
  frequency: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CompanyInterviewQuestionSchema = new Schema<ICompanyInterviewQuestion>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    roleId: { type: Schema.Types.ObjectId, ref: 'CompanyRole' },
    questionText: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['EASY', 'MEDIUM', 'HARD', 'EXPERT'],
      required: true,
    },
    round: {
      type: String,
      enum: [
        'ONLINE_ASSESSMENT',
        'CODING',
        'TECHNICAL',
        'SYSTEM_DESIGN',
        'BEHAVIORAL',
        'HR',
        'MANAGERIAL',
        'FINAL',
      ],
      required: true,
    },
    sourceType: {
      type: String,
      enum: [
        'OFFICIAL',
        'VERIFIED_REPORT',
        'COMMUNITY_REPORTED',
        'CURATED',
        'AI_GENERATED',
      ],
      required: true,
    },
    sourceUrl: { type: String },
    sourceTitle: { type: String },
    sourceYear: { type: Number },
    tags: [{ type: String }],
    frequency: { type: Number, default: 1 },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CompanyInterviewQuestionSchema.index({ companyId: 1, category: 1 });
CompanyInterviewQuestionSchema.index({ roleId: 1 });

export const CompanyInterviewQuestion = mongoose.model<ICompanyInterviewQuestion>(
  'CompanyInterviewQuestion',
  CompanyInterviewQuestionSchema
);
