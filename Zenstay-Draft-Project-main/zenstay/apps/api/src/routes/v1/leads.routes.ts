import { Router } from 'express';
import { LeadController } from '../../controllers/lead.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();
router.use(authenticate);

router.get('/', LeadController.getAll);

export default router;
