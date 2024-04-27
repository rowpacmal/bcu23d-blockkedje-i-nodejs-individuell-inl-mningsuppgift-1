import Block from './Block.mjs';

const Blockchain = class {
  constructor(difficulty) {
    this.blocks = [this.createGenesisBlock()];
    this.difficulty = difficulty;
  }

  createGenesisBlock() {
    return new Block('Initial block in the chain');
  }

  obtainLatestBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  createNewBlock(newBlock) {
    newBlock.index = this.blocks.length;
    newBlock.previousHash = this.obtainLatestBlock().hash;
    newBlock.proofOfWork(this.difficulty);
    this.blocks.push(newBlock);
  }

  validateBlockchain() {
    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) return false;
      if (currentBlock.previousHash !== previousBlock.hash) return false;
    }

    return true;
  }
};

export default Blockchain;
