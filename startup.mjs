import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Blockchain from './models/Blockchain.mjs';
import FileHandler from './utils/FileHandler.mjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let blockchain = require('./data/blockchain.json');

const startup = () => {
  dotenv.config({ path: 'config/config.env' });
  global.__appdir = path.dirname(fileURLToPath(import.meta.url));

  if (Object.keys(blockchain).length === 0) {
    blockchain = new Blockchain();

    new FileHandler('data', 'blockchain.json').write(blockchain);
  } else {
    Object.setPrototypeOf(blockchain, Blockchain.prototype);
  }
};

export { blockchain, startup };
