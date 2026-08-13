"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
const env_config_1 = require("../../config/env.config");
const logger_1 = require("../../utils/logger");
exports.redisClient = (0, redis_1.createClient)({
    url: env_config_1.env.REDIS_URL,
});
exports.redisClient.on('error', (err) => {
    logger_1.logger.error('❌ Redis connection error:', err);
});
exports.redisClient.on('connect', () => {
    logger_1.logger.info('✅ Redis connected successfully');
});
const connectRedis = async () => {
    try {
        await exports.redisClient.connect();
    }
    catch (error) {
        logger_1.logger.error('❌ Failed to connect to Redis:', error);
        process.exit(1);
    }
};
exports.connectRedis = connectRedis;
