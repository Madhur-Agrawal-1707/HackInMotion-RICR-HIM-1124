import { Company, ICompany } from '../model/Company';
import { CompanyRole, ICompanyRole } from '../model/CompanyRole';
import { CompanyInterviewQuestion, ICompanyInterviewQuestion } from '../model/CompanyInterviewQuestion';
import mongoose from 'mongoose';

export class CompanyRepository {
  async getCompanies(page: number, limit: number): Promise<{ data: ICompany[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Company.find().skip(skip).limit(limit).exec(),
      Company.countDocuments(),
    ]);
    return { data, total };
  }

  async getCompanyBySlug(slug: string): Promise<ICompany | null> {
    return Company.findOne({ slug }).exec();
  }

  async getCompanyById(id: string): Promise<ICompany | null> {
    return Company.findById(id).exec();
  }

  async getRolesByCompanyId(companyId: string): Promise<ICompanyRole[]> {
    return CompanyRole.find({ companyId }).exec();
  }

  async getRoleById(roleId: string): Promise<ICompanyRole | null> {
    return CompanyRole.findById(roleId).exec();
  }

  async getQuestions(
    companyId: string,
    filters: Record<string, any>,
    page: number,
    limit: number
  ): Promise<{ data: ICompanyInterviewQuestion[]; total: number }> {
    const skip = (page - 1) * limit;
    const query = { companyId, ...filters };
    const [data, total] = await Promise.all([
      CompanyInterviewQuestion.find(query).skip(skip).limit(limit).exec(),
      CompanyInterviewQuestion.countDocuments(query),
    ]);
    return { data, total };
  }
}
