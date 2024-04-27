import express from 'express';
import {
  getAllBlocks,
  getBlockByNumber,
  createNewBlock,
} from '../controllers/blockController.mjs';

const router = express.Router();

router.route('/').get(getAllBlocks).post(createNewBlock);

router.route('/:index').get(getBlockByNumber);

export default router;
