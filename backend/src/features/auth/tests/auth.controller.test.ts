import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from '../routes/auth.routes';
import { AuthService } from '../service/auth.service';

jest.mock('../service/auth.service');
jest.mock('../../../middleware/auth', () => ({
  authenticate: (req: any, res: any, next: any) => {
    req.user = { userId: 'mock-user-id', role: 'USER' };
    next();
  }
}));

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoutes);

// Error handler middleware mock for tests
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Server Error' });
});

describe('AuthController', () => {
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(() => {
    jest.clearAllMocks();
    // In our routes, we do `const authController = new AuthController();`
    // which does `this.authService = new AuthService();`
    // By mocking the class, the instance methods become mock functions automatically
    // but we can access the mocked instance via the constructor mock
    const MockedAuthService = jest.mocked(AuthService);
    authServiceMock = MockedAuthService.mock.instances[0] as unknown as jest.Mocked<AuthService>;
    
    // If the instance wasn't captured properly (e.g. created before clearAllMocks), 
    // we can fallback to prototype mocking
    if (!authServiceMock) {
        authServiceMock = AuthService.prototype as unknown as jest.Mocked<AuthService>;
    }
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user and set cookies', async () => {
      authServiceMock.register.mockResolvedValueOnce({
        user: { _id: '1', email: 'test@example.com', name: 'Test' } as any,
        accessToken: 'mock-access',
        refreshToken: 'mock-refresh'
      });

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test',
          email: 'test@example.com',
          password: 'Password123!'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe('test@example.com');
      
      const cookiesHeader = response.headers['set-cookie'];
      expect(cookiesHeader).toBeDefined();
      const cookies = (Array.isArray(cookiesHeader) ? cookiesHeader : [cookiesHeader]) as string[];
      expect(cookies.some((c: string) => c.includes('accessToken=mock-access'))).toBeTruthy();
      expect(cookies.some((c: string) => c.includes('refreshToken=mock-refresh'))).toBeTruthy();
    });

    it('should fail if validation fails (missing email)', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(authServiceMock.register).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login and set cookies', async () => {
      authServiceMock.login.mockResolvedValueOnce({
        user: { _id: '1', email: 'test@example.com', name: 'Test' } as any,
        accessToken: 'mock-access',
        refreshToken: 'mock-refresh'
      });

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      
      const cookiesHeader = response.headers['set-cookie'];
      expect(cookiesHeader).toBeDefined();
      const cookies = (Array.isArray(cookiesHeader) ? cookiesHeader : [cookiesHeader]) as string[];
      expect(cookies.some((c: string) => c.includes('accessToken=mock-access'))).toBeTruthy();
    });
  });

  describe('POST /api/v1/auth/logout', () => {
    it('should clear cookies and call logout service', async () => {
      authServiceMock.logout.mockResolvedValueOnce(undefined);

      const response = await request(app)
        .post('/api/v1/auth/logout');

      expect(response.status).toBe(200);
      expect(authServiceMock.logout).toHaveBeenCalledWith('mock-user-id');

      const cookiesHeader = response.headers['set-cookie'];
      expect(cookiesHeader).toBeDefined();
      const cookies = (Array.isArray(cookiesHeader) ? cookiesHeader : [cookiesHeader]) as string[];
      expect(cookies.some((c: string) => c.includes('accessToken=;'))).toBeTruthy();
    });
  });
});
