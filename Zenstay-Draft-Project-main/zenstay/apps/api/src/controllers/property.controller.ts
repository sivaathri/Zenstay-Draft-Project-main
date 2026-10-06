import { Request, Response } from 'express';
import { prisma } from '@zenstay/database';

export class PropertyController {
  static async getProperties(req: any, res: Response) {
    try {
      const tenantId = req.user.tenantId;
      const roles = req.user.roles || [];
      
      const isManager = roles.includes('COMPANY_ADMIN') || roles.includes('OPERATIONS_MANAGER') || roles.includes('SUPER_ADMIN');
      const isOwner = roles.includes('PROPERTY_OWNER');

      const whereClause: any = { tenantId };
      
      // RBAC: Owners can only see their own properties
      if (isOwner && !isManager) {
        whereClause.ownerId = req.user.id;
      }

      const properties = await prisma.property.findMany({
        where: whereClause,
        include: { units: true, owner: true }
      });
      return res.json(properties);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createProperty(req: any, res: Response) {
    try {
      const tenantId = req.user.tenantId;
      const { name, address, city, cleaningFee } = req.body;
      const property = await prisma.property.create({
        data: { name, address, city, cleaningFee, tenantId }
      });
      return res.status(201).json(property);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
