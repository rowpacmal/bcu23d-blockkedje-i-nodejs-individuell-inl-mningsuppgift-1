import express from 'express';
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';

import { createBlockchain } from './startup.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';

dotenv.config({ path: 'config/config.env' });
global.__appdir = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(createBlockchain);
app.use('/api/v1/blockchain', blockchainRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({ success: false, status: '404 Not Found' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
