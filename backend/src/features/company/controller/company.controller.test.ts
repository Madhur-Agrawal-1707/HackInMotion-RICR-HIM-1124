/// <reference types="jest" />
import { Request, Response } from 'express';
import { CompanyController } from './company.controller';
import { CompanyService } from '../service/company.service';

jest.mock('../service/company.service'); // eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const jest: any;

/// <reference types="jest" />

describe('CompanyController', () => {
  let controller: CompanyController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    controller = new CompanyController();
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {
      query: {},
      params: {},
      body: {},
    };
    res = {
      status: statusMock,
    };
    (CompanyService.prototype.getCompanies as jest.Mock).mockClear();
    (CompanyService.prototype.getCompanyBySlug as jest.Mock).mockClear();
    (CompanyService.prototype.getRolesByCompanyId as jest.Mock).mockClear();
    (CompanyService.prototype.getQuestions as jest.Mock).mockClear();
    (CompanyService.prototype.startInterview as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCompanies', () => {
    it('should return companies successfully', async () => {
      req.query = { page: '1', limit: '10' };
      const mockResult = { data: [], total: 0 };
      (CompanyService.prototype.getCompanies as jest.Mock).mockResolvedValue(mockResult);

      await controller.getCompanies(req as Request, res as Response);

      expect(CompanyService.prototype.getCompanies).toHaveBeenCalledWith(1, 10);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Companies fetched successfully',
        data: mockResult,
      });
    });

    it('should handle errors', async () => {
      (CompanyService.prototype.getCompanies as jest.Mock).mockRejectedValue(new Error('Test error'));

      await controller.getCompanies(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        success: false,
        message: 'Unable to fetch companies',
        error: 'Test error',
      });
    });
  });

  describe('getCompanyBySlug', () => {
    it('should return a company successfully', async () => {
      req.params = { slug: 'test-slug' };
      const mockCompany = { id: '1', slug: 'test-slug' };
      (CompanyService.prototype.getCompanyBySlug as jest.Mock).mockResolvedValue(mockCompany);

      await controller.getCompanyBySlug(req as Request, res as Response);

      expect(CompanyService.prototype.getCompanyBySlug).toHaveBeenCalledWith('test-slug');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Company fetched successfully',
        data: mockCompany,
      });
    });
  });

  describe('getRoles', () => {
    it('should return roles successfully', async () => {
      req.params = { companyId: 'company1' };
      const mockRoles = [{ id: '1', title: 'Developer' }];
      (CompanyService.prototype.getRolesByCompanyId as jest.Mock).mockResolvedValue(mockRoles);

      await controller.getRoles(req as Request, res as Response);

      expect(CompanyService.prototype.getRolesByCompanyId).toHaveBeenCalledWith('company1');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Roles fetched successfully',
        data: mockRoles,
      });
    });
  });

  describe('getQuestions', () => {
    it('should return questions successfully', async () => {
      req.params = { companyId: 'company1' };
      req.query = { page: '1', limit: '10' };
      const mockQuestions = { data: [], total: 0 };
      (CompanyService.prototype.getQuestions as jest.Mock).mockResolvedValue(mockQuestions);

      await controller.getQuestions(req as Request, res as Response);

      expect(CompanyService.prototype.getQuestions).toHaveBeenCalledWith('company1', req.query);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Questions fetched successfully',
        data: mockQuestions,
      });
    });
  });

  describe('startInterview', () => {
    it('should start interview successfully', async () => {
      req.body = { companyId: 'company1', roleId: 'role1', round: 'TECHNICAL', difficulty: 'EASY' };
      const mockResult = { interviewId: '123' };
      (CompanyService.prototype.startInterview as jest.Mock).mockResolvedValue(mockResult);

      await controller.startInterview(req as Request, res as Response);

      expect(CompanyService.prototype.startInterview).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Interview started successfully',
        data: mockResult,
      });
    });
  });
});
