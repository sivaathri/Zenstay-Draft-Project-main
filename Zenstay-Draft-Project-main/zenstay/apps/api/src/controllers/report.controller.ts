import { Request, Response } from 'express';
import { prisma } from '@zenstay/database';

export class ReportController {
  static async getAll(req: any, res: Response) {
    try {
      const tenantId = req.user.tenantId;
      return res.json({ message: 'Not implemented' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
