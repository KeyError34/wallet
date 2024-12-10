import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService'; 
import { ResponseHandler } from '../utils/responses'; 

class UserController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const token = await userService.register(name, email, password);
      ResponseHandler.success(
        res,
        { token },
        'User registered successfully',
        201
      ); 
    } catch (error) {
      next(error); 
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await userService.login(email, password);
      ResponseHandler.success(res, { token }, 'User logged in successfully'); // Используем ResponseHandler для успеха
    } catch (error) {
      next(error); 
    }
  }
}

export const userController = new UserController();
