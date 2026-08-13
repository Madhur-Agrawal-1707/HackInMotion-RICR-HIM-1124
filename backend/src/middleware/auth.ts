import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../utils/jwt.service';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { redisClient } from '../database/redis/connection';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Authentication required');
    }

    const decoded = JwtService.verifyAccessToken(token);
    
    // Check if session exists/is valid in Redis (optional extra security)
    const sessionToken = await redisClient.get(`session:${decoded.userId}`);
    if (!sessionToken) {
       throw new UnauthorizedError('Session expired');
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid or expired token'));
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError('Not authenticated'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('You do not have permission to perform this action'));
    }

    next();
  };
};
