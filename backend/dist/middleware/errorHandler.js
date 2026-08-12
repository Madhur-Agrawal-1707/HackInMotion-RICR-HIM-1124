"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
const env_config_1 = require("../config/env.config");
const errorHandler = (err, req, res, next) => {
    if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: env_config_1.env.NODE_ENV === 'development' ? err : undefined,
        });
        return;
    }
    // Unhandled errors
    logger_1.logger.error('Unhandled Exception:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: env_config_1.env.NODE_ENV === 'development' ? err.message : undefined,
    });
};
exports.errorHandler = errorHandler;
