const ErrorResponse = class extends Error {
  constructor(message, status = 500) {
    super(message);
    this.success = status >= 200 && status <= 299;
    this.status = status;
  }
};

export default ErrorResponse;
