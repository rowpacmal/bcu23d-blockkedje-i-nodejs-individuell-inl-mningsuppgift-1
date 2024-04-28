import Block from './Block.mjs';
import Transaction from './Transaction.mjs';

const Blockchain = class {
  #difficulty;
  #miningReward;

  constructor(difficulty, miningReward) {
    this.#difficulty = difficulty;
    this.#miningReward = miningReward;
    this.chain = [this.createGenesisBlock()];
    this.pendingData = [];
  }

  createGenesisBlock() {
    return new Block('Initial block in the chain');
  }

  createNewBlock(newBlock) {
    newBlock.index = this.chain.length;
    newBlock.previousHash = this.obtainLatestBlock().hash;
    newBlock.mineBlock(this.#difficulty);

    return newBlock;
  }

  createPendingData(data) {
    this.pendingData.push(data);
  }

  obtainLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  obtainBalanceOfAddress(address) {
    let balance = 0;

    this.chain.forEach((block) => {
      for (const data of block.data) {
        if (data.fromAddress && data.toAddress && data.amount) {
          data.fromAddress === address && (balance -= data.amount);
          data.toAddress === address && (balance += data.amount);
        }
      }
    });

    return balance;
  }

  minePendingData(miningAddress) {
    const block = this.createNewBlock(new Block(this.pendingData));

    this.chain.push(block);
    this.pendingData = [
      new Transaction(null, miningAddress, this.#miningReward),
    ];
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      Object.setPrototypeOf(currentBlock, Block.prototype);

      const previousBlock = this.chain[i - 1];

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
