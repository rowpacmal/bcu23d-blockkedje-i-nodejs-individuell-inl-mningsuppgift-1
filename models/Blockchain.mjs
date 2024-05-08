import { createHash } from '../utils/cryptoLib.mjs';
import Block from './Block.mjs';

const Blockchain = class {
  constructor(name) {
    this.name = name || 'Blockchain';
    this.chain = [];
    this.createGenesisBlock();

    this.memberNodes = [];
    this.nodeUrl = process.argv[3];
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
      JSON.stringify(block.data) +
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
      difficulty = lastBlock.difficulty;
      // difficulty = this.adjustDifficulty(lastBlock);
      hash = this.hashBlock({ ...block, timestamp, nonce, difficulty });
    } while (!hash.startsWith('0'.repeat(difficulty)));

    Object.assign(block, { timestamp, hash, nonce, difficulty });

    this.chain.push(block);
    return block;
  }

  adjustDifficulty(block) {
    let { difficulty, timestamp } = block;

    return timestamp + process.env.MINE_RATE > timestamp
      ? +difficulty + 1
      : +difficulty - 1;
  }

  validateChain(blockchain) {
    for (let i = 1; i < blockchain.length; i++) {
      const block = blockchain[i];
      const previousBlock = blockchain[i - 1];
      const hash = this.hashBlock(block);

      if (hash !== block.hash) return false;
      if (block.previousHash !== previousBlock.hash) return false;
    }

    return true;
  }
};

export default Blockchain;
