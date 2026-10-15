class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    //removing the original stack trace and taking it from this constructor
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
