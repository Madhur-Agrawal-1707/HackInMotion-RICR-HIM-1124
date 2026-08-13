import { CompanyRepository } from '../../../features/company/repository/company.repository';

export class QuestionRetriever {
  private repository: CompanyRepository;

  constructor() {
    this.repository = new CompanyRepository();
  }

  async getRelevantQuestions({
    companyId,
    roleId,
    round,
    category,
    difficulty,
    query
  }: {
    companyId: string;
    roleId?: string;
    round?: string;
    category?: string;
    difficulty?: string;
    query?: string;
  }) {
    // Basic database fallback implementation as instructed
    const filters: any = {};
    if (roleId) filters.roleId = roleId;
    if (round) filters.round = round;
    if (category) filters.category = category;
    if (difficulty) filters.difficulty = difficulty;
    if (query) {
      filters.questionText = { $regex: query, $options: 'i' };
    }

    // Attempt retrieval using DB
    const { data } = await this.repository.getQuestions(companyId, filters, 1, 20);
    return data;
    
    // Future: implement Qdrant vector search for semantic retrieval here
  }
}
