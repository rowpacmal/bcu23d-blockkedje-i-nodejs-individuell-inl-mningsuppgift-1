const ErrorResponseModel = class extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.success = statusCode >= 200 && statusCode <= 299;
    this.statusCode = statusCode;
    this.status = this.setStatus();
  }

  setStatus() {
    switch (this.statusCode) {
      case 400:
        return 'Bad Request';

      case 404:
        return 'Not Found';

      case 666:
        return 'Hail Satan!';

      default:
        return 'Internal Server Error';
    }
  }
};

export default ErrorResponseModel;
