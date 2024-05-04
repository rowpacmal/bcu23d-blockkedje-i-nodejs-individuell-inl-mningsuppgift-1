import express from 'express';

import { PORT } from './startup.mjs';
import blockchainRoutes from './routes/blockchainRoutes.mjs';

const app = express();

app.use(express.json());

app.use('/api/v1/blockchain', blockchainRoutes);
app.use('/api/v1/members', () => {});

app.all('*', () => {});

app.use(() => {});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
