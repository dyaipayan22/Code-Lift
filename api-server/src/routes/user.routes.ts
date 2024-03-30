import { Router } from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware';
import { getUserDeployments } from '../controllers/user.controller';

const router = Router();

router.route('/deployments').get(isLoggedIn, getUserDeployments);

export default router;
