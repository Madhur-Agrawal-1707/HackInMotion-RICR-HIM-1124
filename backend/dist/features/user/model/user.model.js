"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.AuthProvider = exports.UserRole = void 0;
const mongoose_1 = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["USER"] = "USER";
})(UserRole || (exports.UserRole = UserRole = {}));
var AuthProvider;
(function (AuthProvider) {
    AuthProvider["LOCAL"] = "LOCAL";
    AuthProvider["GOOGLE"] = "GOOGLE";
})(AuthProvider || (exports.AuthProvider = AuthProvider = {}));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        select: false, // Don't return password by default
    },
    avatar: {
        type: String,
        default: '',
    },
    provider: {
        type: String,
        enum: Object.values(AuthProvider),
        default: AuthProvider.LOCAL,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true, // Automatically manages createdAt and updatedAt
});
// Indexes
userSchema.index({ email: 1 });
userSchema.index({ createdAt: 1 });
userSchema.index({ updatedAt: 1 });
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
