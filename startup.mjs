import Blockchain from './models/Blockchain.mjs';
import { createRequire } from 'module';
import FileHandler from './utils/FileHandler.mjs';
const require = createRequire(import.meta.url);
const database = require('./data/blockchain.json');

export let blockchain = database.chain && database;

export const createBlockchain = (req, res, next) => {
  if (!blockchain) {
    blockchain = new Blockchain();

    new FileHandler('data', 'blockchain.json').write(blockchain);
  } else {
    Object.setPrototypeOf(blockchain, Blockchain.prototype);
  }

  next();
};
