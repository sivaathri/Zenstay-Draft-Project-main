import { Request, Response } from 'express';
import { prisma } from '@zenstay/database';

export class TravelerController {
  static async getAll(req: any, res: Response) {
    try {
      const tenantId = req.user.tenantId;
      const data = await prisma.traveler.findMany({ where: { tenantId } });
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * MODULE B - Get Reservation Details for Traveler Portal
   */
  static async getRegistrationInfo(req: Request, res: Response) {
    try {
      const { reservationId } = req.params;
      const reservation = await prisma.reservation.findUnique({
        where: { id: reservationId },
        include: {
          property: true,
          traveler: true,
          guests: true
        }
      });

      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      return res.json(reservation);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * MODULE B - Process Upsells (Stripe Payment Mock)
   */
  static async processUpsell(req: Request, res: Response) {
    try {
      const { reservationId } = req.params;
      const { serviceId, amount } = req.body;
      
      // Mock Stripe Payment Intent generation
      const mockPaymentIntentId = `pi_${Math.random().toString(36).substring(7)}`;

      return res.json({
        success: true,
        message: `Successfully processed ${serviceId} upsell.`,
        paymentIntent: mockPaymentIntentId,
        amount
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
