import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  slug: string;
  description?: string;
  industry?: string;
  website?: string;
  logo?: string;
  roles: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    industry: { type: String },
    website: { type: String },
    logo: { type: String },
    roles: [{ type: Schema.Types.ObjectId, ref: 'CompanyRole' }],
  },
  { timestamps: true }
);

CompanySchema.index({ slug: 1 });
CompanySchema.index({ name: 'text' });

export const Company = mongoose.model<ICompany>('Company', CompanySchema);
