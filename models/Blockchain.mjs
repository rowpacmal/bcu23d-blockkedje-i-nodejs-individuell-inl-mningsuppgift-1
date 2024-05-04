import { createHash } from '../utils/cryptoLib.mjs';
import Block from './Block.mjs';

const Blockchain = class {
  constructor() {
    this.chain = [];
    this.createGenesisBlock();
  }

  createGenesisBlock() {
    const block = new Block(0, Date.now(), null, []);
    this.chain.push(block);
  }

  createBlock(data) {
    const block = new Block(
      this.chain.length,
      Date.now(),
      this.getLastBlock().hash,
      data
    );
    block.hash = this.hashBlock(block);

    this.chain.push(block);
    return block;
  }

  getLastBlock() {
    return this.chain.at(-1);
  }

  hashBlock(block) {
    const stringToHash = (
      block.index +
      block.timestamp +
      block.previousHash +
      block.data +
      block.nonce +
      block.difficulty
    ).toString();

    return createHash(stringToHash);
  }

  proofOfWork(data) {
    const lastBlock = this.getLastBlock();
    const block = this.createBlock(data);

    let difficulty, hash, timestamp;
    let nonce = 0;

    do {
      timestamp = Date.now();
      nonce++;
      difficulty = this.adjustDifficulty(lastBlock);
      hash = this.hashBlock({ ...block, timestamp, nonce, difficulty });
    } while (!hash.startsWith('0'.repeat(difficulty)));

    Object.assign(block, { timestamp, hash, nonce, difficulty });

    return block;
  }

  adjustDifficulty(block) {
    let { difficulty, timestamp } = block;

    return timestamp + process.env.MINE_RATE > timestamp
      ? +difficulty + 1
      : +difficulty - 1;
  }
};

export default Blockchain;
