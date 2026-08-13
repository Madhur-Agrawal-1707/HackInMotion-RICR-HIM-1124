import { Request, Response } from 'express';
import { InterviewController } from './interview.controller';
import { InterviewService } from '../service/interview.service';

jest.mock('../service/interview.service');

describe('InterviewController', () => {
  let controller: InterviewController;
  let mockService: jest.Mocked<InterviewService>;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockService = new InterviewService() as jest.Mocked<InterviewService>;
    controller = new InterviewController();
    (controller as any).service = mockService;

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockReq = { params: {}, body: {} };
    mockRes = { status: mockStatus };
  });

  describe('startInterview', () => {
    it('should create session and return 201', async () => {
      mockReq.body = { targetRole: 'Dev' };
      mockService.startInterview.mockResolvedValue({ _id: 'session1' } as any);

      await controller.startInterview(mockReq as Request, mockRes as Response);

      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        data: { _id: 'session1' }
      }));
    });

    it('should return 500 on error', async () => {
      mockService.startInterview.mockRejectedValue(new Error('Service Error'));
      
      await controller.startInterview(mockReq as Request, mockRes as Response);
      
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: 'Service Error'
      }));
    });
  });
});
