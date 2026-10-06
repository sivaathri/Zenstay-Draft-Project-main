import { Request, Response } from 'express';
import { prisma } from '@zenstay/database';
import { CrgService } from '../services/crg.service';

export class OwnerController {
  static async getAll(req: any, res: Response) {
    try {
      const tenantId = req.user.tenantId;
      const data = await prisma.owner.findMany({ where: { tenantId } });
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * MODULE C - Download CRG PDF
   */
  static async downloadCrg(req: any, res: Response) {
    try {
      const tenantId = req.user.tenantId;
      const { id: ownerId } = req.params;
      const { month, year } = req.query;

      const m = parseInt(month as string) || new Date().getMonth() + 1;
      const y = parseInt(year as string) || new Date().getFullYear();

      const pdfBuffer = await CrgService.generateMonthlyCrgPdf(tenantId, ownerId, m, y);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=CRG_${y}_${m}_${ownerId.substring(0,6)}.pdf`);
      
      return res.send(pdfBuffer);
    } catch (error: any) {
      console.error('Failed to generate CRG:', error.message);
      return res.status(500).json({ error: 'Failed to generate CRG report' });
    }
  }
}
