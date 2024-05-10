import { DIFFICULTY } from '../startup.mjs';

const Block = class {
  constructor(index, timestamp, previousHash, data) {
    this.index = index;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = '0';
    this.data = data;
    this.nonce = 0;
    this.difficulty = DIFFICULTY;
  }
};

export default Block;
