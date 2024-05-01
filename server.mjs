import express from 'express';

import { startup } from './startup.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
import resourceNotFound from './middleware/resourceNotFound.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import logHandler from './middleware/logHandler.mjs';

startup();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

if (NODE_ENV === 'development') {
  app.use(logHandler);
}

app.use('/api/v1/blockchain', blockchainRouter);

app.all('*', resourceNotFound);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running in [${NODE_ENV}] mode, on port [${PORT}]...`)
);
