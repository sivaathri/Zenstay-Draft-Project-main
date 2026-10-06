import { Router } from 'express';
import { PropertyController } from '../../controllers/property.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();

router.use(authenticate);

router.get('/', PropertyController.getProperties);
router.post('/', requireRoles(['Tenant Admin', 'Operations Manager']), PropertyController.createProperty);

export default router;
