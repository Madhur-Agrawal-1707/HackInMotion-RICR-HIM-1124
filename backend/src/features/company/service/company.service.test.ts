import { CompanyService } from './company.service';
import { CompanyRepository } from '../repository/company.repository';

jest.mock('../repository/company.repository');

describe('CompanyService', () => {
  let service: CompanyService;
  let repositoryMock: jest.Mocked<CompanyRepository>;

  beforeEach(() => {
    repositoryMock = new CompanyRepository() as jest.Mocked<CompanyRepository>;
    service = new CompanyService();
    // Inject mock repository
    (service as any).repository = repositoryMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCompanies', () => {
    it('should return companies', async () => {
      const mockResult = { data: [{ id: '1', name: 'Company 1' }], total: 1 };
      repositoryMock.getCompanies.mockResolvedValue(mockResult as any);

      const result = await service.getCompanies(1, 10);

      expect(repositoryMock.getCompanies).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual(mockResult);
    });
  });

  describe('getCompanyBySlug', () => {
    it('should return a company if found', async () => {
      const mockCompany = { id: '1', slug: 'company-1', name: 'Company 1' };
      repositoryMock.getCompanyBySlug.mockResolvedValue(mockCompany as any);

      const result = await service.getCompanyBySlug('company-1');

      expect(repositoryMock.getCompanyBySlug).toHaveBeenCalledWith('company-1');
      expect(result).toEqual(mockCompany);
    });

    it('should throw an error if company not found', async () => {
      repositoryMock.getCompanyBySlug.mockResolvedValue(null);

      await expect(service.getCompanyBySlug('non-existent')).rejects.toThrow('Company not found');
    });
  });

  describe('getRolesByCompanyId', () => {
    it('should return roles for a company', async () => {
      repositoryMock.getCompanyById.mockResolvedValue({ id: '1', name: 'Company 1' } as any);
      const mockRoles = [{ id: 'role-1', title: 'SDE 1' }];
      repositoryMock.getRolesByCompanyId.mockResolvedValue(mockRoles as any);

      const result = await service.getRolesByCompanyId('1');

      expect(repositoryMock.getCompanyById).toHaveBeenCalledWith('1');
      expect(repositoryMock.getRolesByCompanyId).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockRoles);
    });

    it('should throw an error if company not found', async () => {
      repositoryMock.getCompanyById.mockResolvedValue(null);

      await expect(service.getRolesByCompanyId('invalid-id')).rejects.toThrow('Company not found');
    });
  });

  describe('getQuestions', () => {
    it('should return questions with provided filters', async () => {
      const query = { page: '2', limit: '5', search: 'tree' };
      const mockResult = { data: [{ id: 'q1', questionText: 'tree question' }], total: 1 };
      repositoryMock.getQuestions.mockResolvedValue(mockResult as any);

      const result = await service.getQuestions('company-1', query);

      expect(repositoryMock.getQuestions).toHaveBeenCalledWith(
        'company-1',
        { questionText: { $regex: 'tree', $options: 'i' } },
        2,
        5
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('startInterview', () => {
    it('should start an interview and return a placeholder', async () => {
      const payload = { companyId: 'c1', roleId: 'r1', round: 'TECHNICAL' as any, difficulty: 'EASY' as any };
      repositoryMock.getCompanyById.mockResolvedValue({ id: 'c1', name: 'Company 1' } as any);
      repositoryMock.getRoleById.mockResolvedValue({ id: 'r1', title: 'SDE 1' } as any);

      const result = await service.startInterview(payload);

      expect(repositoryMock.getCompanyById).toHaveBeenCalledWith('c1');
      expect(repositoryMock.getRoleById).toHaveBeenCalledWith('r1');
      expect(result).toEqual({
        interviewId: 'mock-interview-id',
        status: 'STARTED',
        companyContext: {
          companyName: 'Company 1',
          role: 'SDE 1',
          round: 'TECHNICAL',
        },
      });
    });

    it('should throw an error if company or role not found', async () => {
      const payload = { companyId: 'c1', roleId: 'r1', round: 'TECHNICAL' as any, difficulty: 'EASY' as any };
      repositoryMock.getCompanyById.mockResolvedValue(null);

      await expect(service.startInterview(payload)).rejects.toThrow('Company or Role not found');
    });
  });
});
