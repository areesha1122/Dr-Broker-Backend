// src/utils/jwt.strategy.ts

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Secret key for JWT token
const secretKey = `${process.env.JWT_SECRET_KEY}`;

// Function to create a JWT token
export function createToken(data: any): string {
  return jwt.sign(data, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}

// Function to verify a JWT token
export function verifyToken(token: string): any | null {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null; // Token is invalid or expired
  }
}
