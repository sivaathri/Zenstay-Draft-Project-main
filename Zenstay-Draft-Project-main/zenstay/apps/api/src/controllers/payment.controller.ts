import { Request, Response } from 'express';
import { prisma } from '@zenstay/database';

export class PaymentController {
  static async getAll(req: any, res: Response) {
    try {
      const tenantId = req.user.tenantId;
      const data = await prisma.payment.findMany({ where: { tenantId } });
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
