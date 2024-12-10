import bcrypt from 'bcryptjs';
import { User } from '../models/userSchema';
import { generateToken } from '../utils/jwt';
import { AppError } from '../utils/error';
import { IUser } from '../models/userSchema'; 

class UserService {
  // Регистрация нового пользователя
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('User email already exists', 400); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return generateToken({ userId: user._id }); 
  }

  // Вход пользователя
  async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('Invalid credentials', 401); 
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401); 
    }

    return generateToken({ userId: user._id }); 
  }

  // Получение информации о пользователе по его ID
  async getUserById(userId: string): Promise<IUser | null> {
    const user = await User.findById(userId).select('-password'); 
    if (!user) {
      throw new AppError('User not found', 404); 
    }
    return user;
  }
}

export const userService = new UserService();
