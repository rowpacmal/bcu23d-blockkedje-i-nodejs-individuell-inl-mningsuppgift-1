import { dirname } from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import express from 'express';

import blockRoutes from './routes/blockRoutes.mjs';

global.__appdir = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/blocks', blockRoutes);

app.use('*', (req, res, next) => {
  next();
});

app.use((req, res, next) => {
  res.json({ msg: 'Din tönt!! Du gjorde helt fel!' });
});

app.listen(PORT, () =>
  console.log(
    `Server is running on port (${PORT}), in [${process.env.NODE_ENV}] mode...`
  )
);
