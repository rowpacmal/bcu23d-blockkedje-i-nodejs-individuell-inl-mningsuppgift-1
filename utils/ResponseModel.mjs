const ResponseModel = class {
  constructor({ statusCode = 400, error = null, data = null }) {
    this.success = statusCode >= 200 && statusCode <= 299;
    this.statusCode = statusCode;
    this.error = error;
    this.items = data ? (Array.isArray(data) ? data.length : 1) : 0;
    this.data = data;
  }
};

export default ResponseModel;
