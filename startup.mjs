import { dirname } from 'path';
import { fileURLToPath } from 'url';

import Blockchain from './models/Blockchain.mjs';

global.__appdir = dirname(fileURLToPath(import.meta.url));

const NODE_URL = process.argv[3] || 'http://localhost:5000';
const PORT = +process.argv[2] || +process.env.PORT || 5000;
const DIFFICULTY = +process.env.DIFFICULTY || 1;
const MINE_RATE = +process.env.MINE_RATE || 1000;

const blockchain = Blockchain.createChain('GameBlock');

export { NODE_URL, PORT, DIFFICULTY, MINE_RATE, blockchain };
