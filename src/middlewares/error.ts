import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../interface';
import { Exception, logger } from '../helpers';

class ErrorMiddleware {
  static notFound(req: Request, res: Response, next: NextFunction) {
    const error = new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    next(error);
  }

  static errorHandler(
    err: Exception & Error,
    _req: CustomRequest,
    res: Response,
    _next: NextFunction
  ) {
    if (err.isApiException) {
      const { message, statusCode, data } = err;
      res.status(statusCode || 400).json({
        message,
        error: statusCode,
        data,
      });
    } else {
      logger.error(err.message);
      res.status(500).json({
        message: 'Internal Server Error',
        error: 500,
      });
    }
  }
}

export default ErrorMiddleware;
