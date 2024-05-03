import { Router } from 'express';
import {
  getBlockchain,
  getLatestBlock,
  getBlockByIndex,
  mineBlock,
} from '../controllers/blockchainControllers.mjs';

const router = Router();

router.route('/').get(getBlockchain);
router.route('/latest').get(getLatestBlock);
router.route('/:index').get(getBlockByIndex);

router.route('/mine').post(mineBlock);

export default router;
