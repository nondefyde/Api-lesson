import { Router } from 'express';
import auth from '../../middleware/auth';
import Auth from './auth.controller';

const router = Router();
router.use(auth);
router.post('/register', Auth.register);
router.post('/login', Auth.login);

export default router;
