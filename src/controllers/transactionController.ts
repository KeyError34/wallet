import { Request, Response, NextFunction } from 'express';
import { transactionService } from '../services/transactionService';
import { ResponseHandler } from '../utils/responses';

class TransactionController {
  async deposit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId, amount, description } = req.body;
      const newBalance = await transactionService.deposit(
        userId,
        amount,
        description
      );
      ResponseHandler.success(
        res,
        { balance: newBalance },
        'Deposit successful'
      );
    } catch (error) {
      next(error);
    }
  }

  async withdraw(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId, amount, description } = req.body;
      const newBalance = await transactionService.withdraw(
        userId,
        amount,
        description
      );
      ResponseHandler.success(
        res,
        { balance: newBalance },
        'Withdrawal successful'
      );
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const transactions = await transactionService.getTransactions(userId);
      ResponseHandler.success(
        res,
        { transactions },
        'Transactions retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }
}

export const transactionController = new TransactionController();
