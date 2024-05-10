import express from 'express';
import { PORT } from './startup.mjs';

import errorHandler from './middlewares/errorHandler.mjs';
import logHandler from './middlewares/logHandler.mjs';

import blockchainRoutes from './routes/blockchainRoutes.mjs';
import membersRoutes from './routes/membersRoutes.mjs';

import resourceNotFound from './utils/resourceNotFound.mjs';

const app = express();
app.use(express.json());

app.use(logHandler);

app.use('/api/v1/blockchain', blockchainRoutes);
app.use('/api/v1/members', membersRoutes);

app.all('*', resourceNotFound);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
