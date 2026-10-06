import { Router } from 'express';
import { PaymentController } from '../../controllers/payment.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();
router.use(authenticate);

router.get('/', PaymentController.getAll);

export default router;
