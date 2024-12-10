import { IUser } from '../models/userSchema'; 

declare global {
  namespace Express {
    interface Request {
      user?: IUser; 
    }
  }
}
