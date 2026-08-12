import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../service/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.register(req.body);
      
      this.setCookies(res, result.accessToken, result.refreshToken);

      res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: { user: result.user },
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.login(req.body);

      this.setCookies(res, result.accessToken, result.refreshToken);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: { user: result.user },
      });
    } catch (error) {
      next(error);
    }
  };

  googleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.googleLogin(req.body);

      this.setCookies(res, result.accessToken, result.refreshToken);

      res.status(200).json({
        success: true,
        message: 'Google login successful',
        data: { user: result.user },
      });
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      const result = await this.authService.refreshTokens(refreshToken);

      this.setCookies(res, result.accessToken, result.refreshToken);

      res.status(200).json({
        success: true,
        message: 'Tokens refreshed successfully',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user) {
        await this.authService.logout(req.user.userId);
      }

      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      res.status(200).json({
        success: true,
        message: 'Logout successful',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.forgotPassword(req.body);
      res.status(200).json({
        success: true,
        message: result.message,
        data: { resetToken: result.resetToken }, // For testing purposes
      });
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.resetPassword(req.body);
      res.status(200).json({
        success: true,
        message: 'Password reset successful. You can now login.',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new Error('Not authenticated');
      await this.authService.changePassword(req.user.userId, req.body);
      res.status(200).json({
        success: true,
        message: 'Password changed successfully',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}
