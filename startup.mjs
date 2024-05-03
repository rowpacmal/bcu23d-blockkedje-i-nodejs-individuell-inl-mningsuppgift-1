import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Blockchain from './models/Blockchain.mjs';
import FileHandler from './utils/FileHandler.mjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let blockchain = require('./data/blockchain.json');

dotenv.config({ path: 'config/config.env' });
global.__appdir = path.dirname(fileURLToPath(import.meta.url));

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

if (Object.keys(blockchain).length === 0) {
  blockchain = new Blockchain();

  new FileHandler('data', 'blockchain.json').write(blockchain);
} else {
  Object.setPrototypeOf(blockchain, Blockchain.prototype);
}

console.log('startup');

export { blockchain, NODE_ENV, PORT };
