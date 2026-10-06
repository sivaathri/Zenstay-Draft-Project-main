import { Router } from 'express';
import { ReportController } from '../../controllers/report.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();
router.use(authenticate);

router.get('/', ReportController.getAll);

export default router;
