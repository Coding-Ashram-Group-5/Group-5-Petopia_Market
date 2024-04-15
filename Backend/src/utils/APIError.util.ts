export class APIError extends Error {
  errorMessage: string;
  data: null;
  statusCode: number;
  errors: never[];
  success: boolean;

  constructor (message = 'This is Default Error Message', statusCode = 502, errors = [], stack = '') {
    super(message);
    this.data = null; // There is No Data Sent to User on Error
    this.errorMessage = message;
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;

    // Checking if Error Stack Available or not

    if (this.stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
