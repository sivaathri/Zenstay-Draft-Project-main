import { Router } from 'express';
import { TravelerController } from '../../controllers/traveler.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

// Used by manager dashboard (requires authentication)
router.get('/', authenticate, TravelerController.getAll);

// Used by the public traveler web app (Module B) - typically uses a token or the reservation hash itself for security, leaving open for mock
router.get('/registration/:reservationId', TravelerController.getRegistrationInfo);
router.post('/registration/:reservationId/upsell', TravelerController.processUpsell);

export default router;
