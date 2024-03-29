import { Router } from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware';
import { deployProject } from '../controllers/project.controller';

const router = Router();

router.route('/').post(isLoggedIn, deployProject);

export default router;
