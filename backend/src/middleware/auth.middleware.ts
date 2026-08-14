import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtService } from '../utils/jwt.service';

export interface AuthRequest extends Request {}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }
    const decoded = JwtService.verifyAccessToken(token);

    req.user = {
      userId: decoded.userId,
      email: (decoded as any).email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};
