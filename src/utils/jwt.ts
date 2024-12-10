import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './error';
import { IUser } from '../models/userSchema';

const SECRET_KEY = process.env.JWT_SECRET || 'super_secret';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: '1h',
  });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
  
    return next(new AppError('Token not provided', 403)); 
  }

  try {
  
    const decoded = jwt.verify(token, SECRET_KEY) as IUser;
    req.user = decoded;
    next();
  } catch (error) {

    return next(new AppError('Invalid or expired token', 403));
  }
};
