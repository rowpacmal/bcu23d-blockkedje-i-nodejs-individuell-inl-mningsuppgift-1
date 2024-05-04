import Blockchain from './models/Blockchain.mjs';

const setupBlockchain = () => {
  let blockchain = new Blockchain();
  return blockchain;
};

const blockchain = setupBlockchain();

export { blockchain };
