import { ApiError } from '../utils/ApiError.js';
import { logger } from '../config/logger.js';
import { env } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  let error = err;

  // If it's not our custom ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    error = new ApiError(statusCode, message, [], err.stack);
  }

  // Log the error
  if (error.statusCode >= 500) {
    logger.error(error.message, { stack: error.stack, url: req.url });
  }

  const response = {
    success: false,
    message: error.message,
    errors: error.errors,
    ...(env.isDev && { stack: error.stack }),
  };

  res.status(error.statusCode).json(response);
};