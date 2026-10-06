import { Router } from 'express';
import { UserController } from '../../controllers/user.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();
router.use(authenticate);

router.get('/', UserController.getAll);

export default router;
