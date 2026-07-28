import { ApiError } from '../utils/ApiError.js';

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (error) {
    const errors = error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    next(new ApiError(422, 'Validation failed', errors));
  }
};