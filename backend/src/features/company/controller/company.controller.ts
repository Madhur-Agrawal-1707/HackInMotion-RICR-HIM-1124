import { Request, Response } from 'express';
import { CompanyService } from '../service/company.service';
import { getQuestionsQuerySchema, startInterviewSchema } from '../validation/company.validation';

const companyService = new CompanyService();

export class CompanyController {
  async getCompanies(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await companyService.getCompanies(page, limit);
      return res.status(200).json({
        success: true,
        message: 'Companies fetched successfully',
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Unable to fetch companies',
        error: error.message,
      });
    }
  }

  async getCompanyBySlug(req: Request, res: Response) {
    try {
      const slug = req.params.slug as string;
      const result = await companyService.getCompanyBySlug(slug);
      return res.status(200).json({
        success: true,
        message: 'Company fetched successfully',
        data: result,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: 'Unable to fetch company',
        error: error.message,
      });
    }
  }

  async getRoles(req: Request, res: Response) {
    try {
      const companyId = req.params.companyId as string;
      const result = await companyService.getRolesByCompanyId(companyId);
      return res.status(200).json({
        success: true,
        message: 'Roles fetched successfully',
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Unable to fetch roles',
        error: error.message,
      });
    }
  }

  async getQuestions(req: Request, res: Response) {
    try {
      const companyId = req.params.companyId as string;
      const query = getQuestionsQuerySchema.parse(req.query);
      const result = await companyService.getQuestions(companyId, query);
      return res.status(200).json({
        success: true,
        message: 'Questions fetched successfully',
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: 'Unable to fetch questions',
        error: error.message,
      });
    }
  }

  async startInterview(req: Request, res: Response) {
    try {
      const data = startInterviewSchema.parse(req.body);
      const result = await companyService.startInterview(data);
      return res.status(200).json({
        success: true,
        message: 'Interview started successfully',
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: 'Unable to start interview',
        error: error.message,
      });
    }
  }

  async getInterviewStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      return res.status(200).json({
        success: true,
        message: 'Interview status fetched',
        data: { id, status: 'IN_PROGRESS' },
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Unable to fetch interview status',
        error: error.message,
      });
    }
  }
}
