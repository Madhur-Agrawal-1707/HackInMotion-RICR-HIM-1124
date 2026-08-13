"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
class JwtService {
    static generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, env_config_1.env.JWT_ACCESS_SECRET, {
            expiresIn: '15m',
        });
    }
    static generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, env_config_1.env.JWT_REFRESH_SECRET, {
            expiresIn: '7d',
        });
    }
    static verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, env_config_1.env.JWT_ACCESS_SECRET);
    }
    static verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, env_config_1.env.JWT_REFRESH_SECRET);
    }
}
exports.JwtService = JwtService;
