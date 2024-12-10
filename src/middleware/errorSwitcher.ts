import { Request, Response, NextFunction } from 'express';

import { AppError } from '../utils/error';

export const errorSwitcher = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({status:'error', message:err.message})
};
