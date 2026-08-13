import { AuthService } from '../service/auth.service';
import { UserRepository } from '../../user/repository/user.repository';
import { PasswordService } from '../../../utils/password.service';
import { JwtService } from '../../../utils/jwt.service';
import { ValidationError, UnauthorizedError } from '../../../utils/errors';
import { redisClient } from '../../../database/redis/connection';
import mongoose from 'mongoose';

jest.mock('../../user/repository/user.repository');
jest.mock('../../../utils/password.service');
jest.mock('../../../utils/jwt.service');
jest.mock('../../../database/redis/connection', () => ({
  redisClient: {
    set: jest.fn(),
    del: jest.fn(),
  }
}));

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Initialize service
    authService = new AuthService();
    
    // Access the mocked repository instance
    mockUserRepository = (authService as any).userRepository;
  });

  describe('register', () => {
    it('should throw ValidationError if email already exists', async () => {
      mockUserRepository.findByEmail.mockResolvedValueOnce({} as any);

      await expect(authService.register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })).rejects.toThrow(ValidationError);
    });

    it('should successfully register a user and return tokens', async () => {
      mockUserRepository.findByEmail.mockResolvedValueOnce(null);
      (PasswordService.hash as jest.Mock).mockResolvedValueOnce('hashed_password');
      
      const mockUserId = new mongoose.Types.ObjectId();
      const mockUser = {
        _id: mockUserId,
        role: 'user',
        toObject: () => ({ _id: mockUserId, role: 'user', email: 'test@example.com' })
      };
      
      mockUserRepository.create.mockResolvedValueOnce(mockUser as any);
      (JwtService.generateAccessToken as jest.Mock).mockReturnValue('access_token');
      (JwtService.generateRefreshToken as jest.Mock).mockReturnValue('refresh_token');

      const result = await authService.register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('accessToken', 'access_token');
      expect(result).toHaveProperty('refreshToken', 'refresh_token');
      
      expect(mockUserRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        email: 'test@example.com',
        password: 'hashed_password'
      }));
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedError if user not found', async () => {
      mockUserRepository.findByEmail.mockResolvedValueOnce(null);

      await expect(authService.login({
        email: 'wrong@example.com',
        password: 'password123'
      })).rejects.toThrow(UnauthorizedError);
    });

    it('should throw UnauthorizedError if password does not match', async () => {
      mockUserRepository.findByEmail.mockResolvedValueOnce({ password: 'hashed_password' } as any);
      (PasswordService.compare as jest.Mock).mockResolvedValueOnce(false);

      await expect(authService.login({
        email: 'test@example.com',
        password: 'wrongpassword'
      })).rejects.toThrow(UnauthorizedError);
    });

    it('should login successfully and return tokens', async () => {
      const mockUserId = new mongoose.Types.ObjectId();
      mockUserRepository.findByEmail.mockResolvedValueOnce({
        _id: mockUserId,
        password: 'hashed_password',
        role: 'user',
        toObject: () => ({ _id: mockUserId, role: 'user' })
      } as any);
      
      (PasswordService.compare as jest.Mock).mockResolvedValueOnce(true);
      (JwtService.generateAccessToken as jest.Mock).mockReturnValue('access_token');
      (JwtService.generateRefreshToken as jest.Mock).mockReturnValue('refresh_token');

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(result).toHaveProperty('accessToken', 'access_token');
      expect(result).toHaveProperty('refreshToken', 'refresh_token');
    });
  });
});
