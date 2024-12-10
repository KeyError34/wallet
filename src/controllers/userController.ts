import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { ResponseHandler } from '../utils/responses';
import { AppError } from '../utils/error'; // Добавил для обработки ошибок

class UserController {
  // Регистрация пользователя
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

  // Вход пользователя
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await userService.login(email, password);
      ResponseHandler.success(res, { token }, 'User logged in successfully');
    } catch (error) {
      next(error);
    }
  }

  // Получение информации о пользователе (защищённый маршрут)
  async getUserInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?._id;

      // Проверяем, что userId существует и является строкой
      if (!userId || typeof userId !== 'string') {
        return next(new AppError('User not found', 404));
      }

      const user = await userService.getUserById(userId); // Получаем пользователя по ID
      if (!user) {
        return next(new AppError('User not found', 404)); // Ошибка, если пользователя нет в базе
      }

      ResponseHandler.success(res, user, 'User data retrieved successfully');
    } catch (error) {
      next(error); // Обработка ошибок
    }
  }
}

export const userController = new UserController();
