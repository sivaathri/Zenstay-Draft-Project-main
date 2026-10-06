import { Router } from 'express';
import { MaintenanceController } from '../../controllers/maintenance.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();
router.use(authenticate);

router.get('/', MaintenanceController.getAll);

export default router;
