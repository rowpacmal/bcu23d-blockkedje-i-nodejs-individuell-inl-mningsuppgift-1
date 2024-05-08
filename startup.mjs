import { dirname } from 'path';
import { fileURLToPath } from 'url';

import Blockchain from './models/Blockchain.mjs';
import FileHandler from './utils/FileHandler.mjs';

global.__appdir = dirname(fileURLToPath(import.meta.url));

const setupBlockchain = () => {
  const blockchainJSON = new FileHandler(
    'data',
    process.argv[2]
      ? `blockchain-${process.argv[2]}.json`
      : 'blockchain-test.json'
  );

  let blockchain = blockchainJSON.read(true);

  console.log(Object.keys(blockchain));

  if (Object.keys(blockchain).length === 0) {
    blockchain = new Blockchain();

    blockchainJSON.write(blockchain);
  } else {
    Object.setPrototypeOf(blockchain, Blockchain.prototype);
  }

  return blockchain;
};

const blockchain = setupBlockchain();
const PORT = process.argv[2] || process.env.PORT || 5000;

export { blockchain, PORT };
