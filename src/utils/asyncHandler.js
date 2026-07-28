// Express does not automatically catch rejected Promises in the traditional middleware pattern.
// hence we have to manage for every controller with the same piece of code hence we made a global async handler to manage all the rejected promises in the controllers

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

export { asyncHandler };