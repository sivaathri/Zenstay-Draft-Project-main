import { Request, Response } from 'express';
import { prisma } from '@zenstay/database';

export class HousekeepingController {
  static async getAll(req: any, res: Response) {
    try {
      const tenantId = req.user.tenantId;
      const roles = req.user.roles || [];
      
      const isManager = roles.includes('COMPANY_ADMIN') || roles.includes('OPERATIONS_MANAGER') || roles.includes('SUPER_ADMIN');
      const isHousekeeper = roles.includes('HOUSEKEEPER');

      const whereClause: any = { tenantId };
      
      // RBAC: Housekeepers can only see their assigned tasks
      if (isHousekeeper && !isManager) {
        whereClause.assignedToId = req.user.id;
      }

      const data = await prisma.housekeepingJob.findMany({ 
        where: whereClause,
        include: {
          reservation: {
            include: { property: true }
          },
          assignee: true
        }
      });
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * MODULE A - Housekeeper completes checklist and generates Invoice
   */
  static async completeJob(req: any, res: Response) {
    try {
      const tenantId = req.user.tenantId;
      const { id } = req.params;

      // 1. Fetch the job
      const job = await prisma.housekeepingJob.findUnique({
        where: { id }
      });

      if (!job || job.tenantId !== tenantId) {
        return res.status(404).json({ error: 'Job not found' });
      }

      if (job.status === 'COMPLETED' || job.status === 'INVOICED') {
        return res.status(400).json({ error: 'Job already completed or invoiced' });
      }

      // 2. Mark as completed
      const updatedJob = await prisma.housekeepingJob.update({
        where: { id },
        data: { status: 'COMPLETED' }
      });

      // 3. Automatically generate an invoice for the Housekeeper
      // In a real application, you might batch these monthly, but for this workflow demonstration,
      // we generate an individual invoice for the job payload to satisfy "Invoice Generated" step.
      
      const invoice = await prisma.invoice.create({
        data: {
          tenantId,
          number: `INV-HK-${Date.now()}`,
          status: 'pending',
          total: job.price || 0,
          reservationId: job.reservationId, // Linking to the reservation
          items: {
            create: [
              {
                description: `Cleaning Intervention for ${job.type}`,
                amount: job.price || 0
              }
            ]
          }
        }
      });

      // Update the job to 'INVOICED' state
      await prisma.housekeepingJob.update({
        where: { id },
        data: { status: 'INVOICED' }
      });

      return res.json({ success: true, job: updatedJob, invoice });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
