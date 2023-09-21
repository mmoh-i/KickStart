import { Handler, NextFunction, Response } from 'express';
import { CustomRequest } from '../interface';
import ErrorMiddleware from '../middlewares/error';
import Exception from './error';

export default function asyncHandler(handler: Handler): Handler {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      return await handler(req, res, next);
    } catch (error: Exception | Error | any) {
      ErrorMiddleware.errorHandler(error, req, res, next);
    }
  };
}
