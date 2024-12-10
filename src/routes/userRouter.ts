import express from 'express';
import { userController } from '../controllers/userController';
import { verifyToken } from '../utils/jwt';
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/me', verifyToken, userController.getUserInfo);

export default router;
