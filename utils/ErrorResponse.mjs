const ErrorResponse = class extends Error {
  constructor(message, status) {
    super(message);
    this.success = status >= 200 && status <= 299;
    this.status = status || 500;
  }
};

export default ErrorResponse;
