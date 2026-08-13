import { CompanyContextBuilder } from './companyContextBuilder';
import { QuestionRetriever } from './questionRetriever';

export class CompanyInterviewAgent {
  private contextBuilder: CompanyContextBuilder;
  private questionRetriever: QuestionRetriever;

  constructor() {
    this.contextBuilder = new CompanyContextBuilder();
    this.questionRetriever = new QuestionRetriever();
  }

  async initializeInterview(companyId: string, roleId: string, round: string) {
    const context = await this.contextBuilder.buildContext(companyId, roleId);
    
    const relevantQuestions = await this.questionRetriever.getRelevantQuestions({
      companyId,
      roleId,
      round
    });

    return {
      context,
      relevantQuestions,
      // Pass this structured data to LangGraph or existing interview engine
      status: 'INITIALIZED'
    };
  }

  // Future method for running LangGraph workflow
  async runWorkflow(state: any) {
    // Implement full LangGraph flow: Load -> Retrieve -> Ask -> Evaluate...
    return state;
  }
}
