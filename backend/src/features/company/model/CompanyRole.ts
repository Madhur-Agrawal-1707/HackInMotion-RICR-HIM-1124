import mongoose, { Schema, Document } from 'mongoose';

export interface ICompanyRole extends Document {
  companyId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description?: string;
  skills: string[];
  experienceLevel?: string;
  interviewRounds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CompanyRoleSchema = new Schema<ICompanyRole>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    skills: [{ type: String }],
    experienceLevel: { type: String },
    interviewRounds: [{ type: String }],
  },
  { timestamps: true }
);

CompanyRoleSchema.index({ companyId: 1, slug: 1 }, { unique: true });

export const CompanyRole = mongoose.model<ICompanyRole>('CompanyRole', CompanyRoleSchema);
