import { CompanyRepository } from '../repository/company.repository';
import { GetQuestionsQueryDto, StartInterviewDto } from '../dto/company.dto';

export class CompanyService {
  private repository: CompanyRepository;

  constructor() {
    this.repository = new CompanyRepository();
  }

  async getCompanies(page: number, limit: number) {
    return this.repository.getCompanies(page, limit);
  }

  async getCompanyBySlug(slug: string) {
    const company = await this.repository.getCompanyBySlug(slug);
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  }

  async getRolesByCompanyId(companyId: string) {
    const company = await this.repository.getCompanyById(companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    return this.repository.getRolesByCompanyId(companyId);
  }

  async getQuestions(companyId: string, query: GetQuestionsQueryDto) {
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);

    const filters: Record<string, any> = {};
    if (query.role) filters.roleId = query.role;
    if (query.round) filters.round = query.round;
    if (query.category) filters.category = query.category;
    if (query.difficulty) filters.difficulty = query.difficulty;
    if (query.sourceType) filters.sourceType = query.sourceType;
    if (query.search) {
      filters.questionText = { $regex: query.search, $options: 'i' };
    }

    return this.repository.getQuestions(companyId, filters, page, limit);
  }

  async startInterview(data: StartInterviewDto) {
    const company = await this.repository.getCompanyById(data.companyId);
    const role = await this.repository.getRoleById(data.roleId);

    if (!company || !role) {
      throw new Error('Company or Role not found');
    }

    // Call external interview module integration
    // const interview = await InterviewService.startInterview({...});
    
    // For now, return a placeholder
    return {
      interviewId: 'mock-interview-id',
      status: 'STARTED',
      companyContext: {
        companyName: company.name,
        role: role.title,
        round: data.round,
      },
    };
  }
}
