const Block = class {
  constructor(index, timestamp, previousHash, hash, data, difficulty) {
    this.index = index;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.difficulty = +(difficulty || process.env.DIFFICULTY);
  }
};

export default Block;
