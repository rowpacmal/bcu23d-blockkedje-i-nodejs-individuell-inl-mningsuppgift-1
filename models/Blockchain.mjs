import { createHash } from '../utils/crypto-lib.mjs';
import Block from './Block.mjs';

const Blockchain = class {
  constructor() {
    this.chain = [];
    this.createBlock(Date.now(), null, '0', []);
  }

  getLastBlock() {
    return this.chain.at(-1);
  }

  createBlock(timestamp, previousHash, hash, data, difficulty) {
    const block = new Block(
      this.chain.length,
      timestamp,
      previousHash,
      hash,
      data,
      difficulty
    );

    this.chain.push(block);

    return block;
  }

  hashBlock(timestamp, previousHash, data, nonce, difficulty) {
    return createHash(
      (
        timestamp +
        previousHash +
        JSON.stringify(data) +
        nonce +
        difficulty
      ).toString()
    );
  }

  adjustDifficulty(startTime, timestamp, block) {
    const MINE_RATE = process.env.MINE_RATE;
    const miningTime = timestamp - startTime;
    let { difficulty } = block;

    return miningTime < MINE_RATE ? +difficulty + 1 : +difficulty - 1;
  }

  proofOfWork(previousHash, data) {
    const startTime = Date.now();
    const lastBlock = this.getLastBlock();
    let timestamp, hash, difficulty;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = this.adjustDifficulty(startTime, timestamp, lastBlock);

      hash = this.hashBlock(timestamp, previousHash, data, nonce, difficulty);
    } while (!hash.startsWith('0'.repeat(difficulty)));

    return { timestamp, nonce, difficulty };
  }
};

export default Blockchain;
