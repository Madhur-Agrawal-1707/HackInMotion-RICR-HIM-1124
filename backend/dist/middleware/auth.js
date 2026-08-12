"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jwt_service_1 = require("../utils/jwt.service");
const errors_1 = require("../utils/errors");
const connection_1 = require("../database/redis/connection");
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new errors_1.UnauthorizedError('Authentication required');
        }
        const decoded = jwt_service_1.JwtService.verifyAccessToken(token);
        // Check if session exists/is valid in Redis (optional extra security)
        const sessionToken = await connection_1.redisClient.get(`session:${decoded.userId}`);
        if (!sessionToken) {
            throw new errors_1.UnauthorizedError('Session expired');
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new errors_1.UnauthorizedError('Invalid or expired token'));
    }
};
exports.authenticate = authenticate;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new errors_1.UnauthorizedError('Not authenticated'));
        }
        if (!roles.includes(req.user.role)) {
            return next(new errors_1.ForbiddenError('You do not have permission to perform this action'));
        }
        next();
    };
};
exports.authorize = authorize;
