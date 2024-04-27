import crypto from 'crypto';

const Block = class {
  constructor(data) {
    this.index = 0;
    this.timestamp = new Date().getTime();
    this.data = data;
    this.previousHash = null;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const block = (
      this.index +
      this.timestamp +
      JSON.stringify(this.data) +
      this.previousHash +
      this.nonce
    ).toString();

    const hash = crypto.createHash('sha256');
    hash.update(block);

    return hash.digest('hex');
  }

  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
};

export default Block;
