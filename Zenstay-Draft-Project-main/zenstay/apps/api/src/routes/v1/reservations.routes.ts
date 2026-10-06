import { Router } from 'express';
import { ReservationController } from '../../controllers/reservation.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();
router.use(authenticate);

router.get('/', ReservationController.getAll);

export default router;
