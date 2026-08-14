import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.config';
import { connectDB } from './database/mongodb/connection';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import { resumeRoutes } from './features/resume';
// import { roadmapRoutes } from './features/roadmap'; // assuming it's exported
import { roadmapRouter as roadmapRoutes } from './features/roadmap/routes/roadmap.routes';
import { interviewRoutes } from './features/interview';
import companyRoutes from './features/company/routes/company.routes';
import feedbackRoutes from './features/feedback/routes/feedback.routes';
import authRoutes from './features/auth/routes/auth.routes';
import userRoutes from './features/user/routes/user.routes';

const app = express();

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || [env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174'].includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Logger Middleware
app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
});

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/feedback', feedbackRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server
const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });
};

startServer();
