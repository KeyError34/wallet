import { Router } from 'express';
import { transactionController } from '../controllers/transactionController';
import { verifyToken } from '../utils/jwt';

const router = Router();

router.post('/deposit', verifyToken, transactionController.deposit);

router.post('/withdraw', verifyToken, transactionController.withdraw);

router.get(
  '/transactions/:userId',
  verifyToken,
  transactionController.getTransactions
);

export default router;
