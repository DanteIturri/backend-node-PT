import { Router } from 'express';

import * as ClientController from '../controllers/client.controller.js';
import { authRequired } from '../middlewares/verifyToken.middleware.js';

const router = Router();

router.get('/clients',authRequired,ClientController.getClients);
router.get('/clients/:id', authRequired,ClientController.getClientById);
router.post('/clients', authRequired,ClientController.createClient);
router.put('/clients/:id', authRequired,ClientController.updateClient);
router.delete('/clients/:id', authRequired,ClientController.deleteClient);

export default router;