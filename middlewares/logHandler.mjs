import FileHandler from '../utils/FileHandler.mjs';

const logHandler = (req, res, next) => {
  const date = new Date();
  const log = `======
  Method: ${req.method}
  URL: ${req.originalUrl}
  Date: ${date.toLocaleDateString('sv-SE')}
  Time: ${date.toLocaleTimeString('sv-SE')}
  ---
  Headers: ${JSON.stringify(req.headers, null, 2)}
  Body: ${JSON.stringify(req.body, null, 2)}`;

  new FileHandler('logs', 'server.log').append(log);

  next();
};

export default logHandler;
