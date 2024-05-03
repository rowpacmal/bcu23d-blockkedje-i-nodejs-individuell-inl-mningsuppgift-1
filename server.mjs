import express from 'express';

import blockchainRoutes from './routes/blockchainRoutes.mjs';

global.__appdir = '';

const PORT = process.argv[2] || process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/api/v1/blockchain', blockchainRoutes);
app.use('/api/v1/members', () => {});

app.all('*', () => {});

app.use(() => {});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
