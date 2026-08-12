"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repository/user.repository");
const errors_1 = require("../../../utils/errors");
const cloudinary_config_1 = __importDefault(require("../../../config/cloudinary.config"));
class UserService {
    userRepository;
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    async getProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new errors_1.NotFoundError('User not found');
        return user;
    }
    async updateProfile(userId, data) {
        const user = await this.userRepository.updateById(userId, data);
        if (!user)
            throw new errors_1.NotFoundError('User not found');
        return user;
    }
    async uploadAvatar(userId, fileBuffer) {
        if (!cloudinary_config_1.default) {
            throw new Error('Cloudinary is not configured');
        }
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_config_1.default.uploader.upload_stream({ folder: 'avatars' }, async (error, result) => {
                if (error)
                    return reject(new errors_1.ValidationError('Image upload failed'));
                if (result) {
                    const user = await this.userRepository.updateById(userId, { avatar: result.secure_url });
                    resolve(user);
                }
            });
            uploadStream.end(fileBuffer);
        });
    }
    async deleteAccount(userId) {
        const user = await this.userRepository.deleteById(userId);
        if (!user)
            throw new errors_1.NotFoundError('User not found');
        return true;
    }
}
exports.UserService = UserService;
