"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user.service");
const errors_1 = require("../../../utils/errors");
class UserController {
    userService;
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    getProfile = async (req, res, next) => {
        try {
            if (!req.user)
                throw new Error('Not authenticated');
            const user = await this.userService.getProfile(req.user.userId);
            res.status(200).json({
                success: true,
                message: 'Profile retrieved successfully',
                data: { user },
            });
        }
        catch (error) {
            next(error);
        }
    };
    updateProfile = async (req, res, next) => {
        try {
            if (!req.user)
                throw new Error('Not authenticated');
            const user = await this.userService.updateProfile(req.user.userId, req.body);
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: { user },
            });
        }
        catch (error) {
            next(error);
        }
    };
    uploadAvatar = async (req, res, next) => {
        try {
            if (!req.user)
                throw new Error('Not authenticated');
            if (!req.file)
                throw new errors_1.ValidationError('No file uploaded');
            const user = await this.userService.uploadAvatar(req.user.userId, req.file.buffer);
            res.status(200).json({
                success: true,
                message: 'Avatar uploaded successfully',
                data: { user },
            });
        }
        catch (error) {
            next(error);
        }
    };
    deleteAccount = async (req, res, next) => {
        try {
            if (!req.user)
                throw new Error('Not authenticated');
            await this.userService.deleteAccount(req.user.userId);
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.status(200).json({
                success: true,
                message: 'Account deleted successfully',
                data: null,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.UserController = UserController;
