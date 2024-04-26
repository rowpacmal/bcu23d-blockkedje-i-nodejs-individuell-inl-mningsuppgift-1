import Block from '../models/Block.mjs';
import { createRequire } from 'module';
import FileHandler from '../utils/FileHandler.mjs';
const require = createRequire(import.meta.url);
const blocks = require('../data/blocks.json');

const folderName = 'data';
const fileName = 'blocks.json';

export const getAllBlocks = (req, res, next) => {
  res.json({ data: blocks });
};

export const createNewBlock = (req, res, next) => {
  const block = new Block(
    blocks.length + 1,
    { type: 'data' },
    blocks[blocks.length - 1].hash
  );

  blocks.push(block);

  new FileHandler(folderName, fileName).write(blocks);

  res.json({ data: block });
};
