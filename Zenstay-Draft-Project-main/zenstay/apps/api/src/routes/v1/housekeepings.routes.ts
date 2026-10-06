import { Router } from 'express';
import { HousekeepingController } from '../../controllers/housekeeping.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();
router.use(authenticate);

router.get('/', HousekeepingController.getAll);
router.post('/:id/complete', HousekeepingController.completeJob);

export default router;
