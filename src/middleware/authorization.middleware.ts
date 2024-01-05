import { verifyToken } from '../utils/jwt.strategy';
import { User } from '../models'; // Import models from the index file
import { Request, Response, NextFunction } from 'express';

export const checkRole = (roles:any) => async (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] || ''; // Extract token from authorization header
    const decoded = verifyToken(token);
    const user:any = await User.findOne({ uuid:decoded.userId });
    !roles.includes(user.role)
      ? res.status(401).json("Sorry you do not have access to this route")
      : next();
  };