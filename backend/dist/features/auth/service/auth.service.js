"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_repository_1 = require("../../user/repository/user.repository");
const password_service_1 = require("../../../utils/password.service");
const jwt_service_1 = require("../../../utils/jwt.service");
const errors_1 = require("../../../utils/errors");
const auth_1 = require("firebase-admin/auth");
const firebase_config_1 = require("../../../config/firebase.config");
const user_model_1 = require("../../user/model/user.model");
const connection_1 = require("../../../database/redis/connection");
const token_service_1 = require("../../../utils/token.service");
class AuthService {
    userRepository;
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    async register(data) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new errors_1.ValidationError('Email is already registered');
        }
        const hashedPassword = await password_service_1.PasswordService.hash(data.password);
        const user = await this.userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            provider: user_model_1.AuthProvider.LOCAL,
            role: user_model_1.UserRole.USER,
        });
        const tokens = this.generateTokens(user._id.toString(), user.role);
        await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);
        const userResponse = user.toObject();
        delete userResponse.password;
        return { user: userResponse, ...tokens };
    }
    async login(data) {
        const user = await this.userRepository.findByEmail(data.email, true);
        if (!user || !user.password) {
            throw new errors_1.UnauthorizedError('Invalid credentials');
        }
        const isMatch = await password_service_1.PasswordService.compare(data.password, user.password);
        if (!isMatch) {
            throw new errors_1.UnauthorizedError('Invalid credentials');
        }
        const tokens = this.generateTokens(user._id.toString(), user.role);
        await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);
        const userResponse = user.toObject();
        delete userResponse.password;
        return { user: userResponse, ...tokens };
    }
    async googleLogin(data) {
        if (!firebase_config_1.firebaseAppInitialized) {
            throw new Error('Google Login is not configured');
        }
        const decodedToken = await (0, auth_1.getAuth)().verifyIdToken(data.idToken);
        const { email, name, picture } = decodedToken;
        if (!email) {
            throw new errors_1.ValidationError('Google token missing email');
        }
        let user = await this.userRepository.findByEmail(email);
        if (!user) {
            user = await this.userRepository.create({
                email,
                name: name || 'Google User',
                avatar: picture || '',
                provider: user_model_1.AuthProvider.GOOGLE,
                role: user_model_1.UserRole.USER,
                emailVerified: true,
            });
        }
        const tokens = this.generateTokens(user._id.toString(), user.role);
        await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);
        return { user, ...tokens };
    }
    async refreshTokens(refreshToken) {
        if (!refreshToken)
            throw new errors_1.UnauthorizedError('Refresh token is required');
        try {
            const decoded = jwt_service_1.JwtService.verifyRefreshToken(refreshToken);
            const user = await this.userRepository.findById(decoded.userId);
            if (!user) {
                throw new errors_1.UnauthorizedError('User not found');
            }
            // Check if refresh token matches the one stored in DB/Redis
            if (user.refreshToken !== refreshToken) {
                throw new errors_1.UnauthorizedError('Invalid refresh token');
            }
            const tokens = this.generateTokens(user._id.toString(), user.role);
            await this.storeRefreshToken(user._id.toString(), tokens.refreshToken);
            return tokens;
        }
        catch (error) {
            throw new errors_1.UnauthorizedError('Invalid or expired refresh token');
        }
    }
    async logout(userId) {
        await this.userRepository.updateById(userId, { $unset: { refreshToken: 1 } });
        // Invalidate session in Redis if applicable
        await connection_1.redisClient.del(`session:${userId}`);
    }
    async changePassword(userId, data) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new errors_1.NotFoundError('User not found');
        // We need to fetch the password specifically
        const userWithPassword = await this.userRepository.findByEmail(user.email, true);
        if (!userWithPassword || !userWithPassword.password) {
            throw new errors_1.UnauthorizedError('Current password is not set or valid');
        }
        const isMatch = await password_service_1.PasswordService.compare(data.currentPassword, userWithPassword.password);
        if (!isMatch) {
            throw new errors_1.UnauthorizedError('Incorrect current password');
        }
        const newHashedPassword = await password_service_1.PasswordService.hash(data.newPassword);
        await this.userRepository.updateById(userId, { password: newHashedPassword });
    }
    async forgotPassword(data) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            // Return success even if user not found to prevent email enumeration
            return { success: true, message: 'Password reset email sent (mock)' };
        }
        const resetToken = token_service_1.TokenService.generateRandomToken();
        const resetPasswordToken = token_service_1.TokenService.hashToken(resetToken);
        const resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await this.userRepository.updateById(user._id.toString(), {
            resetPasswordToken,
            resetPasswordExpire,
        });
        // TODO: Send Email using an Email Service
        // For now, returning token for testing purposes (mock email)
        return { success: true, message: 'Password reset email sent (mock)', resetToken };
    }
    async resetPassword(data) {
        const resetPasswordToken = token_service_1.TokenService.hashToken(data.token);
        const user = await this.userRepository.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: new Date() },
        });
        if (!user) {
            throw new errors_1.UnauthorizedError('Invalid or expired password reset token');
        }
        const newHashedPassword = await password_service_1.PasswordService.hash(data.newPassword);
        await this.userRepository.updateById(user._id.toString(), {
            password: newHashedPassword,
            $unset: { resetPasswordToken: 1, resetPasswordExpire: 1 },
        });
    }
    generateTokens(userId, role) {
        const accessToken = jwt_service_1.JwtService.generateAccessToken({ userId, role });
        const refreshToken = jwt_service_1.JwtService.generateRefreshToken({ userId, role });
        return { accessToken, refreshToken };
    }
    async storeRefreshToken(userId, token) {
        // Store in MongoDB
        await this.userRepository.updateById(userId, { refreshToken: token });
        // Cache in Redis for quick session checking (optional based on rules, prompt said "Use Redis for Session Cache")
        await connection_1.redisClient.set(`session:${userId}`, token, { EX: 7 * 24 * 60 * 60 }); // 7 days
    }
}
exports.AuthService = AuthService;
