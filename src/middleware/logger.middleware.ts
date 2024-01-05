// src/middleware/logger.middleware.ts

import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();

  res.on('finish', () => {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    logger.info(
      `[${req.method}] ${req.url} | Status: ${res.statusCode} | Duration: ${elapsedTime}ms`
    );
  });

  next();
}
