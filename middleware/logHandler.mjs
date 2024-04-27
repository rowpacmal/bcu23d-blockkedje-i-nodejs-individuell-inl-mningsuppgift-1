import FileHandler from '../utils/FileHandler.mjs';

const logHandler = (req, res, next) => {
  new FileHandler('logs', 'server.log').append(`
  Method: ${req.method}
  Url: ${req.originalUrl}
  Date: ${new Date().toLocaleDateString('sv-SE')}
  Time: ${new Date().toLocaleTimeString('sv-SE')}`);

  next();
};

export default logHandler;
