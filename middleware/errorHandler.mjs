import FileHandler from '../utils/FileHandler.mjs';

const errorHandler = (err, req, res, next) => {
  new FileHandler('logs', 'error.log').append(`
  Method: ${req.method}
  Url: ${req.originalUrl}
  Date: ${new Date().toLocaleDateString('sv-SE')}
  Time: ${new Date().toLocaleTimeString('sv-SE')}
  Success: ${err.success}
  Status: ${err.statusCode} (${err.status})
  Error: ${err.message}`);

  res.status(err.statusCode).json({
    success: err.success,
    statusCode: err.statusCode,
    status: err.status,
    error: err.message,
  });
};

export default errorHandler;
