// this is the exception handler class for the api errors we need to extend the error class to create our own custom error class

// JavaScript's built-in Error only contains generic information like the message and stack trace. In a web API, we also need HTTP-specific information such as the status code, validation details, and a consistent response structure. ApiError standardizes how errors are represented across the application so that the global error handler can convert every thrown error into a predictable API respons

class ApiError extends Error {
  constructor(statusCode, message, errors = [], stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;
    this.isOperational = true;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };