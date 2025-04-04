import { Router } from 'express';

import * as UserController from '../controllers/user.controller.js';
import { authRequired } from '../middlewares/verifyToken.middleware.js';

const router = Router();

router.get('/users',authRequired, UserController.getUsers);
router.get('/users/:id',authRequired, UserController.getUserById);
router.post('/users',authRequired, UserController.createUser);
router.put('/users/:id',authRequired, UserController.updateUser);
router.delete('/users/:id',authRequired, UserController.deleteUser);

export default router;