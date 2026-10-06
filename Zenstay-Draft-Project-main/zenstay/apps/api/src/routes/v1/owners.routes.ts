import { Router } from 'express';
import { OwnerController } from '../../controllers/owner.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();
router.use(authenticate);

router.get('/', OwnerController.getAll);
router.get('/:id/crg/download', OwnerController.downloadCrg);

export default router;
