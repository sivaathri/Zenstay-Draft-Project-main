import { Request, Response } from 'express';
import { prisma } from '@zenstay/database';
import { guestyService } from '../services/guesty.service';
import { FinancialService } from '../services/financial.service';

export class WebhookController {
  
  /**
   * Endpoint for Guesty to push reservation updates
   */
  static async handleGuestyReservationWebhook(req: Request, res: Response) {
    try {
      const payload = req.body;
      const reservationId = payload._id;
      
      // In a real scenario, you would verify the webhook signature here
      // to ensure it actually came from Guesty.

      console.log(`Received Guesty webhook for reservation ${reservationId}`);

      // Fetch the full reservation details
      const guestyReservation = await guestyService.getReservation(reservationId);
      
      if (!guestyReservation) {
        return res.status(404).json({ error: 'Reservation not found in Guesty' });
      }

      // Sync reservation to local DB
      // We assume the property already exists in our DB and is linked by guesty_id
      // (For this mock we will use a generic property ID if it doesn't exist)
      
      // 1. Process Housekeeper Interventions (MODULE A)
      if (guestyReservation.status === 'confirmed') {
        await WebhookController.generateInterventions(guestyReservation);
        
        // 2. Process Traveler Link Generation (MODULE B)
        await WebhookController.generateTravelerLink(guestyReservation);
      } else if (guestyReservation.status === 'cancelled') {
        await WebhookController.handleCancellation(guestyReservation);
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Webhook processing failed:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * MODULE A - Automatic Intervention Generation
   * Generates a Check-in and a Check-out task when a reservation is confirmed
   */
  private static async generateInterventions(guestyReservation: any) {
    console.log(`Generating interventions for ${guestyReservation._id}`);
    
    const tenantId = 'tenant-1'; // Mock tenant
    const totalCleaningFee = guestyReservation.money.fareCleaning;

    // Use strict Locked Financial Logic
    const { checkInAmount, checkOutAmount } = await FinancialService.calculateCleaningDistribution(tenantId, totalCleaningFee);

    // Create Check-in Intervention
    await prisma.housekeepingJob.create({
      data: {
        type: 'CHECK_IN',
        status: 'AVAILABLE',
        scheduledDate: new Date(guestyReservation.checkIn),
        price: checkInAmount,
        reservationId: guestyReservation._id,
        tenantId
      }
    });

    // Create Check-out Intervention
    await prisma.housekeepingJob.create({
      data: {
        type: 'CHECK_OUT',
        status: 'AVAILABLE',
        scheduledDate: new Date(guestyReservation.checkOut),
        price: checkOutAmount,
        reservationId: guestyReservation._id,
        tenantId
      }
    });
  }

  /**
   * MODULE A - Cancellation Management
   * "If a stay is cancelled in Guesty: All interventions are deleted..."
   */
  private static async handleCancellation(guestyReservation: any) {
    console.log(`Handling cancellation for ${guestyReservation._id}`);
    
    // Find all interventions for this reservation
    const interventions = await prisma.housekeepingJob.findMany({
      where: { reservationId: guestyReservation._id }
    });

    for (const job of interventions) {
      // In production, we'd also check if the job was already invoiced/paid to handle refunds
      await prisma.housekeepingJob.delete({
        where: { id: job.id }
      });
      console.log(`Deleted intervention ${job.id} due to cancellation`);
    }
  }

  /**
   * MODULE B - Traveler Link Generation
   * Generates a unique check-in link and (in production) pushes it to Guesty
   * so Guesty can automatically message it to the traveler.
   */
  private static async generateTravelerLink(guestyReservation: any) {
    const reservationId = guestyReservation._id;
    // We use the reservation ID to generate a unique link to the frontend traveler portal
    const travelerLink = `https://zenstay.app/traveler/${reservationId}/check-in`;
    
    console.log(`Generated Traveler Link for ${reservationId}: ${travelerLink}`);

    // In a real implementation we would call guestyService.pushCustomField(reservationId, 'ZenstayCheckinLink', travelerLink);
    // Which fulfills the spec: "Zenstay pushes the URL to Guesty... Guesty uses its own Auto-Message module to send the email/SMS."
  }
}
