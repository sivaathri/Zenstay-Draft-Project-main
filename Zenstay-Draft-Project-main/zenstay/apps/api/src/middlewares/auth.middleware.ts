import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '@zenstay/database';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    tenantId: string;
    roles: string[];
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as any;

    req.user = {
      id: decoded.id,
      tenantId: decoded.tenantId,
      roles: decoded.roles || []
    };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
