import express from 'express';
import {
  getBlockByIndex,
  getBlockchain,
  getLatestBlock,
  mineBlock,
} from '../controllers/blockchain-controller.mjs';

const router = express.Router();

router.route('/').get(getBlockchain);

router.route('/latest').get(getLatestBlock);

router.route('/mine').post(mineBlock);

router.route('/:index').get(getBlockByIndex);

export default router;
