import { blockchain } from '../startup.mjs';

import ServerResponse from '../utils/ServerResponse.mjs';
import ErrorResponse from '../utils/ErrorResponse.mjs';
import FileHandler from '../utils/FileHandler.mjs';

const getBlockchain = (req, res, next) => {
  res.status(200).json(new ServerResponse({ status: 200, data: blockchain }));
};

const getAllBlocks = (req, res, next) => {
  res
    .status(200)
    .json(new ServerResponse({ status: 200, data: blockchain.chain }));
};

const getLatestBlock = (req, res, next) => {
  res
    .status(200)
    .json(new ServerResponse({ status: 200, data: blockchain.getLastBlock() }));
};

const getBlockByIndex = (req, res, next) => {
  const index = +req.params.index;
  const block = blockchain.chain[index];

  if (!block) {
    return next(
      new ErrorResponse(`Cannot find block with index ${index}`, 404)
    );
  }

  res.status(200).json(new ServerResponse({ status: 200, data: block }));
};

const mineBlock = (req, res, next) => {
  const block = blockchain.proofOfWork(req.body);

  new FileHandler('data', `blockchain-${process.argv[2]}.json`).write(
    blockchain
  );

  res.status(201).json(new ServerResponse({ status: 201, data: block }));
};

const synchronizeChain = (req, res, next) => {};

export {
  getBlockchain,
  getAllBlocks,
  getLatestBlock,
  getBlockByIndex,
  mineBlock,
  synchronizeChain,
};
