import { blockchain } from '../startup.mjs';

export const getBlockchain = (req, res, next) => {
  res.status(200).json({
    success: true,
    status: '200 OK',
    data: { items: blockchain.chain.length, ...blockchain },
  });
};

export const getBlockByIndex = (req, res, next) => {
  res.status(200).json({
    success: true,
    status: '200 OK',
    data: blockchain.chain[req.params.index],
  });
};

export const getLatestBlock = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, status: '200 OK', data: blockchain.getLastBlock() });
};

export const mineBlock = (req, res, next) => {
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

  res.status(201).json({ success: true, status: '201 Created', data: block });
};
