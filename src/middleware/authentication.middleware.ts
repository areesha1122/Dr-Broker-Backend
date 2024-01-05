// src/middleware/authentication.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.strategy';

// Middleware function to extract and verify JWT token from request
export function verifyTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization?.split(' ')[1] || ''; // Extract token from authorization header

  if (!token) {
    // Token is missing
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    // Token is invalid or expired
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }

  // Token is valid, continue with the next middleware or route handler
  next();
}
