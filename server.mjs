import { startup } from './startup.mjs';
import express from 'express';
import blockchainRouter from './routes/blockchain-routes.mjs';

startup();

const app = express();

app.use(express.json());
app.use('/api/v1/blockchain', blockchainRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({ success: false, status: '404 Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
