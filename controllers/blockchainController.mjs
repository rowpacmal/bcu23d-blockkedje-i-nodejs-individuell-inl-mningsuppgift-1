import { PORT, blockchain } from '../startup.mjs';

import Blockchain from '../models/Blockchain.mjs';
import ServerResponse from '../utils/ServerResponse.mjs';
import ErrorResponse from '../utils/ErrorResponse.mjs';
import FileHandler from '../utils/FileHandler.mjs';

const blockchainJSON = new FileHandler('data', `blockchain-${PORT}.json`);

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
  const body = req.body;

  if (!(body instanceof Object && !(body instanceof Array))) {
    return next(
      new ErrorResponse(
        `${JSON.stringify(body)} is not valid data[Object]`,
        400
      )
    );
  }

  const block = blockchain.proofOfWork(body);

  try {
    blockchain.memberNodes.forEach(async (url) => {
      await fetch(`${url}/api/v1/blockchain/blocks/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(block),
      });
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, error.status));
  }

  blockchainJSON.write(blockchain);
  res.status(201).json(new ServerResponse({ status: 201, data: block }));
};

const broadcastBlocks = (req, res, next) => {
  const block = req.body;
  const lastBlock = blockchain.getLastBlock();
  const currentHash = lastBlock.hash === block.previousHash;
  const currentIndex = lastBlock.index + 1 === block.index;

  if (currentHash && currentIndex) {
    blockchain.chain.push(block);

    blockchainJSON.write(blockchain);
    res.status(201).json(new ServerResponse({ status: 201, data: block }));
  } else {
    next(
      new ErrorResponse(
        `Cannot add the block to the current node ${req.headers.host}`,
        400
      )
    );
  }
};

const synchronizeChain = (req, res, next) => {
  const invalidChains = [];
  let nodesToCheck = blockchain.memberNodes.length;
  let syncCounter = 0;

  let maxLength = blockchain.chain.length;
  let longestChain = blockchain.chain;

  if (nodesToCheck === 0) {
    return next(
      new ErrorResponse(
        `The current node ${blockchain.nodeUrl} is not connected to a network`,
        400
      )
    );
  }

  if (!Blockchain.validateChain(longestChain)) {
    return next(
      new ErrorResponse(
        `The current node ${blockchain.nodeUrl} has been compromised`,
        400
      )
    );
  }

  try {
    blockchain.memberNodes.forEach(async (member) => {
      const response = await fetch(`${member}/api/v1/blockchain`);

      if (response.ok) {
        const result = await response.json();

        if (result.data.chain.length > maxLength) {
          maxLength = result.data.chain.length;
          longestChain = result.data.chain;
        }

        if (longestChain !== blockchain.chain) {
          if (!Blockchain.validateChain(longestChain)) {
            maxLength = blockchain.chain.length;
            longestChain = blockchain.chain;

            invalidChains.push(result.data.nodeUrl);
          } else {
            blockchain.chain = longestChain;
            blockchainJSON.write(blockchain);
            syncCounter++;
          }
        }

        nodesToCheck--;

        if (nodesToCheck === 0) {
          res.status(200).json(
            new ServerResponse({
              status: 200,
              error:
                invalidChains.length > 0 &&
                `Node(s) ${invalidChains.join(', ')} has been compromised`,
              data: {
                message: `Synchronization completed, [${syncCounter}] change(s) has been made to the current node ${blockchain.nodeUrl}`,
              },
            })
          );
        }
      }
    });
  } catch (error) {
    return next(new ErrorResponse(error, error.status));
  }
};

export {
  getBlockchain,
  getAllBlocks,
  getLatestBlock,
  getBlockByIndex,
  mineBlock,
  broadcastBlocks,
  synchronizeChain,
};
