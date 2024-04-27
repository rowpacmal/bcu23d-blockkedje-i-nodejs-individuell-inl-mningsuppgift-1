import express from 'express';
import {
  getAllBlocks,
  getBlockByIndex,
  getLatestBlock,
  createBlock,
} from '../controllers/blockController.mjs';

const router = express.Router();

router.route('/').get(getAllBlocks).post(createBlock);

router.route('/latest').get(getLatestBlock);

router.route('/:index').get(getBlockByIndex);

export default router;
