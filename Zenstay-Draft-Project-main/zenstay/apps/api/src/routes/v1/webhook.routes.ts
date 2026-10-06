import { Router } from 'express';
import { WebhookController } from '../../controllers/webhook.controller';

const router = Router();

// Public webhook endpoint for Guesty
router.post('/guesty/reservation', WebhookController.handleGuestyReservationWebhook);

export default router;
