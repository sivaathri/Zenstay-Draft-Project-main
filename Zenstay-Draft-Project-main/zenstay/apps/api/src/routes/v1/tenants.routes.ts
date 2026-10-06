import { Router } from 'express';
import { TenantController } from '../../controllers/tenant.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();
router.use(authenticate);

router.get('/', TenantController.getAll);

export default router;
