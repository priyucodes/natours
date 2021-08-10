class AppError extends Error {
  // constructor is run at the beginning whenever an instance(obj) from this class is created.
  constructor(message, statusCode) {
    // message is only parameter  that built-in 'Error' accepts
    // super();
    super(message); // Already set the message property to our incoming message   i.e            this.message = message.

    // this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
