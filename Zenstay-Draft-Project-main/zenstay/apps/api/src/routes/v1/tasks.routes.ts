import { Router } from 'express';
import { TaskController } from '../../controllers/task.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();
router.use(authenticate);

router.get('/', TaskController.getAll);

export default router;
