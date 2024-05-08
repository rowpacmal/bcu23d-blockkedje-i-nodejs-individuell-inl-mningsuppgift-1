import ServerResponse from '../utils/ServerResponse.mjs';
import FileHandler from '../utils/FileHandler.mjs';

const errorHandler = (err, req, res, next) => {
  const date = new Date();
  const log = `======
  Success: ${err.success}
  Status: ${err.status}
  Error: ${err.message}
  ---
  Method: ${req.method}
  URL: ${req.originalUrl}
  Date: ${date.toLocaleDateString('sv-SE')}
  Time: ${date.toLocaleTimeString('sv-SE')}
  ---
  Headers: ${JSON.stringify(req.headers, null, 2)}
  Body: ${JSON.stringify(req.body, null, 2)}`;

  new FileHandler('logs', 'error.log').append(log);

  res
    .status(err.status)
    .json(
      new ServerResponse({ status: err.status || 500, error: err.message })
    );
};

export default errorHandler;
