const fs = require('fs');
const path = require('path');

const resources = [
  'tenant', 'user', 'owner', 'traveler', 'reservation', 
  'task', 'housekeeping', 'maintenance', 'invoice', 
  'payment', 'lead', 'report'
];

const controllersDir = path.join(__dirname, 'src', 'controllers');
const routesDir = path.join(__dirname, 'src', 'routes', 'v1');

resources.forEach(res => {
  const cap = res.charAt(0).toUpperCase() + res.slice(1);
  const controllerCode = `import { Request, Response } from 'express';
import { prisma } from '@zenstay/database';

export class ${cap}Controller {
  static async getAll(req: any, res: Response) {
    try {
      const tenantId = req.user.tenantId;
      // const data = await prisma.${res}.findMany({ where: { tenantId } });
      return res.json({ message: 'Not implemented' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
`;
  fs.writeFileSync(path.join(controllersDir, `${res}.controller.ts`), controllerCode);

  const routeCode = `import { Router } from 'express';
import { ${cap}Controller } from '../../controllers/${res}.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireRoles } from '../../middlewares/rbac.middleware';

const router = Router();
router.use(authenticate);

router.get('/', ${cap}Controller.getAll);

export default router;
`;
  fs.writeFileSync(path.join(routesDir, `${res}s.routes.ts`), routeCode);
});

// Update index.ts
let indexCode = `import { Router } from 'express';
import authRoutes from './auth.routes';
import propertiesRoutes from './properties.routes';\n`;

resources.forEach(res => {
  indexCode += `import ${res}sRoutes from './${res}s.routes';\n`;
});

indexCode += `\nconst router = Router();\nrouter.use('/auth', authRoutes);\nrouter.use('/properties', propertiesRoutes);\n`;

resources.forEach(res => {
  indexCode += `router.use('/${res}s', ${res}sRoutes);\n`;
});

indexCode += `\nexport default router;\n`;
fs.writeFileSync(path.join(routesDir, 'index.ts'), indexCode);

console.log('Scaffolding complete!');
