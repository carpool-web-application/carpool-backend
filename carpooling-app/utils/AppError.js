class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Fail" : "System Failure";
    //removing the original stack trace and taking it from this constructor
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
