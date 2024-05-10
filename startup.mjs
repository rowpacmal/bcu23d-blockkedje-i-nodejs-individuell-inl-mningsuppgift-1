import { dirname } from 'path';
import { fileURLToPath } from 'url';

import Blockchain from './models/Blockchain.mjs';

import FileHandler from './utils/FileHandler.mjs';

global.__appdir = dirname(fileURLToPath(import.meta.url));

const NODE_URL = process.argv[3] || 'http://localhost:3000';
const PORT = +process.argv[2] || +process.env.PORT || 3000;
const DIFFICULTY = +process.env.DIFFICULTY || 1;
const MINE_RATE = +process.env.MINE_RATE || 1000;

const fileHandler = new FileHandler('data', `blockchain-${PORT}.json`);
let blockchainJSON;

if (fileHandler.exists()) {
  blockchainJSON = fileHandler.read(true);
} else {
  fileHandler.write({});
  blockchainJSON = fileHandler.read(true);
}

const blockchain = Blockchain
  ? Blockchain.createChain(blockchainJSON, 'GameBlock')
  : {};

if (JSON.stringify(blockchain) !== JSON.stringify(blockchainJSON))
  fileHandler.write(blockchain);

export { NODE_URL, PORT, DIFFICULTY, MINE_RATE, blockchain };
