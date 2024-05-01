import Blockchain from './models/Blockchain.mjs';

export let blockchain;

export const createBlockchain = (req, res, next) => {
  if (!blockchain) blockchain = new Blockchain();

  next();
};
