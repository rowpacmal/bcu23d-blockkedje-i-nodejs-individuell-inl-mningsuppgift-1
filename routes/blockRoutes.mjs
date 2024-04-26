import express from 'express';
import {
  getAllBlocks,
  getBlockByIndex,
  createNewBlock,
} from '../controllers/blockController.mjs';

const router = express.Router();

router.route('/').get(getAllBlocks).post(createNewBlock);

router.route('/:index').get(getBlockByIndex);

export default router;
