import { Router } from 'express';

import * as AuthController from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/verifyToken.middleware.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const router = Router();

// Rutas públicas
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);

// Ruta protegida
router.get('/me', authRequired, AuthController.me);

export default router;
