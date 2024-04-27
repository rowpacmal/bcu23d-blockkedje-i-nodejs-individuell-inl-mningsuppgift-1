import Blockchain from '../models/Blockchain.mjs';
import ErrorResponseModel from '../utils/ErrorResponseModel.mjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const blockchainCoder = require('../data/blockchain.json');

const blockchain = new Blockchain(blockchainCoder.difficulty);
blockchain.chain = blockchainCoder.chain;

const validateBlockchain = (req, res, next) => {
  const validation = blockchain.isChainValid();

  if (!validation.status)
    return next(
      new ErrorResponseModel(
        `Block with index [${validation.block}] has been tampered with!`,
        500
      )
    );

  next();
};

export default validateBlockchain;