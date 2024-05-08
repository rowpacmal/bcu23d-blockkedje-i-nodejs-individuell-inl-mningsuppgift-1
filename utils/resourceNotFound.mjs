import ErrorResponse from './ErrorResponse.mjs';

const resourceNotFound = (req, res, next) => {
  next(
    new ErrorResponse(
      `Cannot use ${req.method} on resource at ${req.originalUrl}`,
      404
    )
  );
};

export default resourceNotFound;
