import mongoose, { Schema, Document, Types } from 'mongoose';


export interface ITransaction extends Document {
  userId: Types.ObjectId; // пользуем Types.ObjectId вместо mongoose.Types.ObjectId
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: Date;
}


const TransactionSchema = new Schema<ITransaction>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // пользуем Schema.Types.ObjectId
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model<ITransaction>(
  'Transaction',
  TransactionSchema
);
