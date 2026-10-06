import { Request, Response } from 'express';
import { prisma } from '@zenstay/database';

export class ReservationController {
  static async getAll(req: any, res: Response) {
    try {
      const tenantId = req.user.tenantId;
      const roles = req.user.roles || [];
      const userId = req.user.id;
      
      const isManager = roles.includes('COMPANY_ADMIN') || roles.includes('OPERATIONS_MANAGER') || roles.includes('SUPER_ADMIN');
      const isOwner = roles.includes('PROPERTY_OWNER');
      const isGuest = roles.includes('TRAVELER');

      const whereClause: any = { tenantId };
      
      // RBAC: Travelers can only see their own reservations
      if (isGuest && !isManager) {
        whereClause.guests = {
          some: { id: userId }
        };
      }
      
      // RBAC: Owners can only see reservations for their properties
      if (isOwner && !isManager && !isGuest) {
        whereClause.property = {
          ownerId: userId
        };
      }

      const data = await prisma.reservation.findMany({ 
        where: whereClause,
        include: { property: true, guests: true }
      });
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
