class CustomError extends Error {
  constructor(message, status = 200, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.message = message;
    this.status = status;

    switch (status) {
      case 200:
        this.name = 'Success';
        break;
      case 400:
        this.name = 'BadRequest';
        break;
      case 401:
        this.name = 'UnauthorizedError';
        break;
      case 403:
        this.name = 'Forbidden';
        break;
      case 404:
        this.name = 'NotFound';
        break;
      case 500:
        this.name = 'ServerError';
        this.message =
          'Server not able to process the request, Please try again';
        break;
      default:
        this.name = 'Oops!!, Please try again';
        break;
    }
  }
}

module.exports = CustomError;
