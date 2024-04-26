import crypto from 'crypto';

const Block = class {
  constructor(index, data, previousHash) {
    this.index = index;
    this.timestamp = new Date().getTime();
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0; // Math.random() * Math.pow(10, 18)
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const block = [
      this.index,
      this.timestamp,
      JSON.stringify(this.data),
      this.previousHash,
      this.nonce,
    ].toString();

    const hash = crypto.createHash('sha256');
    hash.update(block);

    return hash.digest('hex');
  }
};

export default Block;
