import { Router } from 'express';
import { authRequired } from '../middlewares/verifyToken.middleware.js';
import * as ProjectController from '../controllers/project.controller.js';

const router = Router();


router.get('/projects', authRequired, ProjectController.getProjects);
router.get('/projects/:id', authRequired, ProjectController.getProjectById);
router.post('/projects', authRequired, ProjectController.createProject);
router.put('/projects/:id', authRequired, ProjectController.updateProject);
router.delete('/projects/:id', authRequired, ProjectController.deleteProject);

export default router;