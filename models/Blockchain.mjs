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
    // newBlock.hash = newBlock.calculateHash();
    newBlock.proofOfWork(this.difficulty);

    // this.blocks.push(newBlock);
    return newBlock;
  }

  validateBlockchain() {
    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      Object.setPrototypeOf(currentBlock, Block.prototype);

      const previousBlock = this.blocks[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash())
        return {
          status: false,
          block: currentBlock.index,
        };

      if (currentBlock.previousHash !== previousBlock.hash)
        return {
          status: false,
          block: previousBlock.index,
        };
    }

    return { status: true };
  }
};

export default Blockchain;
