import { User } from '../models/userSchema';
import { Transaction } from '../models/transactionSchema';
import { AppError } from '../utils/error';

class TransactionService {
  async deposit(userId: string, amount: number, description: string) {
    if (amount <= 0) {
      throw new AppError('Amount must be greater than 0', 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.balance += amount;
    await user.save();

    const transaction = new Transaction({
      userId: user._id,
      amount,
      type: 'income',
      description,
    });

    await transaction.save();
    return user.balance;
  }

  async withdraw(userId: string, amount: number, description: string) {
    if (amount <= 0) {
      throw new AppError('Amount must be greater than 0', 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.balance < amount) {
      throw new AppError('Insufficient funds', 400);
    }

    user.balance -= amount;
    await user.save();

    const transaction = new Transaction({
      userId: user._id,
      amount,
      type: 'expense',
      description,
    });

    await transaction.save();
    return user.balance;
  }

  async getTransactions(userId: string) {
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    return transactions;
  }
}

export const transactionService = new TransactionService();
