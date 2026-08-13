import { authenticate, AuthRequest } from './auth.middleware';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('auth.middleware', () => {
  let mockReq: Partial<AuthRequest>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 if no auth header is provided', () => {
    authenticate(mockReq as AuthRequest, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: 'Unauthorized: No token provided' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    mockReq.headers = { authorization: 'Bearer invalid_token' };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authenticate(mockReq as AuthRequest, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ success: false, message: 'Unauthorized: Invalid token' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next if token is valid', () => {
    mockReq.headers = { authorization: 'Bearer valid_token' };
    const decodedToken = { userId: '123', email: 'test@test.com' };
    (jwt.verify as jest.Mock).mockReturnValue(decodedToken);

    authenticate(mockReq as AuthRequest, mockRes as Response, mockNext);

    expect(mockReq.user).toEqual({ userId: '123', email: 'test@test.com' });
    expect(mockNext).toHaveBeenCalled();
  });
});
