import Block from './Block.mjs';

const Blockchain = class {
  constructor() {
    this.chain = [];
    this.createBlock(Date.now(), null, '0', []);
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
};

export default Blockchain;
