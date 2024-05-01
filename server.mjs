import express from 'express';

import { startup } from './startup.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
import resourceNotFound from './middleware/resourceNotFound.mjs';
import errorHandler from './middleware/errorHandler.mjs';

startup();

const app = express();

app.use(express.json());
app.use('/api/v1/blockchain', blockchainRouter);

app.all('*', resourceNotFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
