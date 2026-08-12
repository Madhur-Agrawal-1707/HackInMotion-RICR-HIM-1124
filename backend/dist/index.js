"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_config_1 = require("./config/env.config");
const connection_1 = require("./database/mongodb/connection");
const connection_2 = require("./database/redis/connection");
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./utils/logger");
const auth_routes_1 = __importDefault(require("./features/auth/routes/auth.routes"));
const user_routes_1 = __importDefault(require("./features/user/routes/user.routes"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: env_config_1.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Rate Limiter
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', apiLimiter);
// Logger Middleware
app.use((req, res, next) => {
    logger_1.logger.info(`[${req.method}] ${req.url}`);
    next();
});
// Routes
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy' });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/user', user_routes_1.default);
// Global Error Handler
app.use(errorHandler_1.errorHandler);
// Start Server
const startServer = async () => {
    await (0, connection_1.connectDB)();
    await (0, connection_2.connectRedis)();
    app.listen(env_config_1.env.PORT, () => {
        logger_1.logger.info(`🚀 Server running on port ${env_config_1.env.PORT} in ${env_config_1.env.NODE_ENV} mode`);
    });
};
startServer();
