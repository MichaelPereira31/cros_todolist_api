import { Request, Response, NextFunction } from 'express';

import { logger } from '../providers/logger/implementations/LoggerProvider';
import { AppError } from './AppError';

export function getErrors(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (error instanceof AppError) {
    logger.error(error.message, {
      err: error,
    });

    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  logger.error(error.message, { err: error });

  return response.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
  });
}
