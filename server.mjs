import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: 'config/config.env' });

const app = express();

app.use(express.json());
app.use('/api/v1/blockchain', () => {});

app.all('*', (req, res, next) => {
  res.status(404).json({ success: false, status: '404 Not Found' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
