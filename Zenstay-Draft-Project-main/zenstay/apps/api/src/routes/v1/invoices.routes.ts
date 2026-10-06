import { Router } from 'express';
import { InvoiceController } from '../../controllers/invoice.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();
router.use(authenticate);

router.get('/', InvoiceController.getAll);

export default router;
