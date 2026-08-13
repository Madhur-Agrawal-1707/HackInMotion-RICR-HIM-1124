import { CompanyRepository } from '../../../features/company/repository/company.repository';

export class CompanyContextBuilder {
  private repository: CompanyRepository;

  constructor() {
    this.repository = new CompanyRepository();
  }

  async buildContext(companyId: string, roleId: string) {
    const company = await this.repository.getCompanyById(companyId);
    const role = await this.repository.getRoleById(roleId);

    if (!company || !role) {
      throw new Error('Company or Role not found for building context');
    }

    return {
      companyName: company.name,
      companyIndustry: company.industry,
      role: role.title,
      roleDescription: role.description,
      requiredSkills: role.skills,
      interviewRounds: role.interviewRounds,
      // The following are placeholders to be expanded with historical data
      commonTopics: [],
      questionPatterns: [],
    };
  }
}
