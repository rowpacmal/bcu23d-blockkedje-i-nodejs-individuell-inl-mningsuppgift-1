import { blockchain } from '../startup.mjs';
import FileHandler from '../utils/FileHandler.mjs';

const getBlockchain = (req, res, next) => {
  res.status(200).json({
    success: true,
    status: '200 OK',
    data: { items: blockchain.chain.length, ...blockchain },
  });
};

const getBlockByIndex = (req, res, next) => {
  res.status(200).json({
    success: true,
    status: '200 OK',
    data: blockchain.chain[req.params.index],
  });
};

const getLatestBlock = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, status: '200 OK', data: blockchain.getLastBlock() });
};

const mineBlock = (req, res, next) => {
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

  res.status(201).json({ success: true, status: '201 Created', data: block });
};

export { getBlockchain, getBlockByIndex, getLatestBlock, mineBlock };
