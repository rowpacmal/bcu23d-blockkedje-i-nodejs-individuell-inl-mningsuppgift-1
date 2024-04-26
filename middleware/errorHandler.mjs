const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({
    success: err.success,
    statusCode: err.statusCode,
    status: err.status,
    error: err.message,
  });
};

export default errorHandler;
