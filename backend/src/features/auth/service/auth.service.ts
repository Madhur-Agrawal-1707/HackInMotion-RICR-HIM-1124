import { UserRepository } from '../../user/repository/user.repository';
import { RegisterDto, LoginDto, GoogleLoginDto } from '../validation/auth.validation';
import { PasswordService } from '../../../utils/password.service';
import { JwtService } from '../../../utils/jwt.service';
import { UnauthorizedError, ValidationError, NotFoundError } from '../../../utils/errors';
import { getAuth } from 'firebase-admin/auth';
import { firebaseAppInitialized } from '../../../config/firebase.config';
import { AuthProvider, UserRole } from '../../user/model/user.model';
import { TokenService } from '../../../utils/token.service';
import { ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto } from '../validation/auth.validation';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: RegisterDto) {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ValidationError('Email is already registered');
    }

    const hashedPassword = await PasswordService.hash(data.password);
    
    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      provider: AuthProvider.LOCAL,
      role: UserRole.USER,
    });

    const tokens = this.generateTokens(user._id.toString(), user.role);
    await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);

    const userResponse = user.toObject();
    delete userResponse.password;

    return { user: userResponse, ...tokens };
  }

  async login(data: LoginDto) {
    const user = await this.userRepository.findByEmail(data.email, true);
    if (!user || !user.password) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isMatch = await PasswordService.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const tokens = this.generateTokens(user._id.toString(), user.role);
    await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);

    const userResponse = user.toObject();
    delete userResponse.password;

    return { user: userResponse, ...tokens };
  }

  async googleLogin(data: GoogleLoginDto) {
    if (!firebaseAppInitialized) {
      throw new Error('Google Login is not configured');
    }

    const decodedToken = await getAuth().verifyIdToken(data.idToken);
    const { email, name, picture } = decodedToken;

    if (!email) {
      throw new ValidationError('Google token missing email');
    }

    let user = await this.userRepository.findByEmail(email);

    if (!user) {
      user = await this.userRepository.create({
        email,
        name: name || 'Google User',
        avatar: picture || '',
        provider: AuthProvider.GOOGLE,
        role: UserRole.USER,
        emailVerified: true,
      });
    }

    const tokens = this.generateTokens(user._id.toString(), user.role);
    await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);

    return { user, ...tokens };
  }

  async refreshTokens(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedError('Refresh token is required');

    try {
      const decoded = JwtService.verifyRefreshToken(refreshToken);
      const user = await this.userRepository.findById(decoded.userId);

      if (!user) {
        throw new UnauthorizedError('User not found');
      }

      // Check if refresh token matches the one stored in DB
      if (user.refreshToken !== refreshToken) {
         throw new UnauthorizedError('Invalid refresh token');
      }

      const tokens = this.generateTokens(user._id.toString(), user.role);
      await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);

      return tokens;
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }
  }

  async logout(userId: string) {
    await this.userRepository.updateById(userId, { $unset: { refreshToken: 1 } });
  }

  async changePassword(userId: string, data: ChangePasswordDto) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError('User not found');
    
    // We need to fetch the password specifically
    const userWithPassword = await this.userRepository.findByEmail(user.email, true);
    if (!userWithPassword || !userWithPassword.password) {
       throw new UnauthorizedError('Current password is not set or valid');
    }

    const isMatch = await PasswordService.compare(data.currentPassword, userWithPassword.password);
    if (!isMatch) {
      throw new UnauthorizedError('Incorrect current password');
    }

    const newHashedPassword = await PasswordService.hash(data.newPassword);
    await this.userRepository.updateById(userId, { password: newHashedPassword });
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      // Return success even if user not found to prevent email enumeration
      return { success: true, message: 'Password reset email sent (mock)' };
    }

    const resetToken = TokenService.generateRandomToken();
    const resetPasswordToken = TokenService.hashToken(resetToken);
    const resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.userRepository.updateById(user._id.toString(), {
      resetPasswordToken,
      resetPasswordExpire,
    });

    // TODO: Send Email using an Email Service
    // For now, returning token for testing purposes (mock email)
    return { success: true, message: 'Password reset email sent (mock)', resetToken };
  }

  async resetPassword(data: ResetPasswordDto) {
    const resetPasswordToken = TokenService.hashToken(data.token);

    const user = await this.userRepository.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: new Date() },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid or expired password reset token');
    }

    const newHashedPassword = await PasswordService.hash(data.newPassword);

    await this.userRepository.updateById(user._id.toString(), {
      password: newHashedPassword,
      $unset: { resetPasswordToken: 1, resetPasswordExpire: 1 },
    });
  }

  private generateTokens(userId: string, role: string) {
    const accessToken = JwtService.generateAccessToken({ userId, role });
    const refreshToken = JwtService.generateRefreshToken({ userId, role });
    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(userId: string, token: string) {
    // Store in MongoDB
    await this.userRepository.updateById(userId, { refreshToken: token });
  }
}
