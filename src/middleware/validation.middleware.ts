// src/middleware/validation.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
const Validators = require('../validators');

export default function Validator(validator: string) {
  //! If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator)) {
    throw new Error(`'${validator}' validator does not exist`);
  }

  return async function Validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validated = await Validators[validator].validateAsync(
        req.body,
        { abortEarly: false }
      );
      req.body = validated;
      next();
    } catch (err) {
      //* Pass err to next
      //! If validation error occurs, call next with HTTP 422. Otherwise, HTTP 500
      if (err && (err as any).isJoi) {
        const error: Record<string, string>[] = [];
        (err as any)?.details?.map((e: any) => {
          const obj: Record<string, string> = {};
          obj[`${e?.context?.key}`] = e.message;
          error.push(obj);
        });
        return next(
          res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({ message: error })
        );
      }
      next(res.status(StatusCodes.INTERNAL_SERVER_ERROR));
    }
  };
}
