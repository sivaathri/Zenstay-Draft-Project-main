import { Router } from 'express';
import authRoutes from './auth.routes';
import propertiesRoutes from './properties.routes';
import tenantsRoutes from './tenants.routes';
import usersRoutes from './users.routes';
import ownersRoutes from './owners.routes';
import travelersRoutes from './travelers.routes';
import reservationsRoutes from './reservations.routes';
import tasksRoutes from './tasks.routes';
import housekeepingsRoutes from './housekeepings.routes';
import maintenancesRoutes from './maintenances.routes';
import invoicesRoutes from './invoices.routes';
import paymentsRoutes from './payments.routes';
import leadsRoutes from './leads.routes';
import reportsRoutes from './reports.routes';

import webhookRoutes from './webhook.routes';

const router = Router();
router.use('/webhooks', webhookRoutes);
router.use('/auth', authRoutes);
router.use('/properties', propertiesRoutes);
router.use('/tenants', tenantsRoutes);
router.use('/users', usersRoutes);
router.use('/owners', ownersRoutes);
router.use('/travelers', travelersRoutes);
router.use('/reservations', reservationsRoutes);
router.use('/tasks', tasksRoutes);
router.use('/housekeepings', housekeepingsRoutes);
router.use('/maintenances', maintenancesRoutes);
router.use('/invoices', invoicesRoutes);
router.use('/payments', paymentsRoutes);
router.use('/leads', leadsRoutes);
router.use('/reports', reportsRoutes);

export default router;
