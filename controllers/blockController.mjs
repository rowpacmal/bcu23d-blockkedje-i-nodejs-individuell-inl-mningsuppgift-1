import Block from '../models/Block.mjs';
import Blockchain from '../models/Blockchain.mjs';
import FileHandler from '../utils/FileHandler.mjs';
import ResponseModel from '../utils/ResponseModel.mjs';
import ErrorResponseModel from '../utils/ErrorResponseModel.mjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const blockchainCoder = require('../data/blockchain.json');

const blockchain = new Blockchain(blockchainCoder.difficulty);
blockchain.chain = blockchainCoder.chain;

export const getAllBlocks = (req, res, next) => {
  res
    .status(200)
    .json(new ResponseModel({ statusCode: 200, data: blockchain.chain }));
};

export const getBlockByIndex = (req, res, next) => {
  const block = blockchain.chain.find((b) => b.index === +req.params.index);

  if (!block) {
    return next(
      new ErrorResponseModel(
        `Can't find the block with index [${req.params.index}]`,
        404
      )
    );
  }

  res.status(200).json(new ResponseModel({ statusCode: 200, data: block }));
};

export const getLatestBlock = (req, res, next) => {
  const block = blockchain.obtainLatestBlock();

  if (!block) {
    return next(
      new ErrorResponseModel(`Can't find the latest block in the chain`, 404)
    );
  }

  res.status(200).json(new ResponseModel({ statusCode: 200, data: block }));
};

export const createBlock = (req, res, next) => {
  const block = blockchain.createNewBlock(new Block(req.body));
  blockchain.chain.push(block);

  new FileHandler('data', 'blockchain.json').write(blockchain);

  res.status(201).json(new ResponseModel({ statusCode: 201, data: block }));
};
