import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error';
import { ResponseHandler } from '../utils/responses';

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  ResponseHandler.error(res, err.message, statusCode);
};
