import Response from '../utils/Response.mjs';

const errorHandler = (err, req, res, next) => {
  res
    .status(err.status)
    .json(new Response({ status: err.status, error: err.message }));
};

export default errorHandler;
