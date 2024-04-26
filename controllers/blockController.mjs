import Block from '../models/Block.mjs';
import FileHandler from '../utils/FileHandler.mjs';
import ResponseModel from '../utils/ResponseModel.mjs';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const blocks = require('../data/blocks.json');

export const getAllBlocks = (req, res, next) => {
  res.status(200).json(new ResponseModel({ statusCode: 200, data: blocks }));
};

export const getBlockByIndex = (req, res, next) => {
  const block = blocks.find((b) => b.index === +req.params.index);

  if (!block) {
    return next();
  }

  res.status(200).json(new ResponseModel({ statusCode: 200, data: block }));
};

export const createNewBlock = (req, res, next) => {
  const block = new Block(
    blocks.length + 1,
    { ...req.body },
    blocks.length > 0 ? blocks[blocks.length - 1].hash : null
  );

  blocks.push(block);

  new FileHandler('data', 'blocks.json').write(blocks);

  res.status(201).json(new ResponseModel({ statusCode: 201, data: block }));
};
