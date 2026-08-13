import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';
import { env } from '../config/env.config';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: env.NODE_ENV === 'development' ? err : undefined,
    });
    return;
  }

  // Unhandled errors
  logger.error('Unhandled Exception:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: env.NODE_ENV === 'development' ? err.message : undefined,
  });
};
