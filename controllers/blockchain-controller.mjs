import { blockchain } from '../startup.mjs';
import FileHandler from '../utils/FileHandler.mjs';
import ServerResponse from '../utils/ServerResponse.mjs';
import ErrorResponse from '../utils/ErrorResponse.mjs';

const getBlockchain = (req, res, next) => {
  res
    .status(200)
    .json(new ServerResponse({ status: 200, data: blockchain.chain }));
};

const getBlockByIndex = (req, res, next) => {
  const index = req.params.index;
  const block = blockchain.chain[index];

  if (!block) {
    return next(
      new ErrorResponse(
        `Cannot use ${req.method} to find block with index ${index} at ${req.originalUrl}`,
        404
      )
    );
  }

  res.status(200).json(
    new ServerResponse({
      status: 200,
      data: block,
    })
  );
};

const getLatestBlock = (req, res, next) => {
  res
    .status(200)
    .json(new ServerResponse({ status: 200, data: blockchain.getLastBlock() }));
};

const mineBlock = (req, res, next) => {
  if (!(req.body.from && req.body.to && req.body.amount)) {
    return next(
      new ErrorResponse(
        `Cannot use ${req.method} to add ${JSON.stringify(
          req.body
        )} to the block at ${req.originalUrl}`,
        400
      )
    );
  }

  const previousHash = blockchain.getLastBlock().hash;
  const data = req.body;
  const { timestamp, nonce, difficulty } = blockchain.proofOfWork(
    previousHash,
    data
  );

  const hash = blockchain.hashBlock(
    timestamp,
    previousHash,
    data,
    nonce,
    difficulty
  );

  const block = blockchain.createBlock(
    timestamp,
    previousHash,
    hash,
    data,
    difficulty
  );

  new FileHandler('data', 'blockchain.json').write(blockchain);

  res.status(201).json(new ServerResponse({ status: 201, data: block }));
};

export { getBlockchain, getBlockByIndex, getLatestBlock, mineBlock };
