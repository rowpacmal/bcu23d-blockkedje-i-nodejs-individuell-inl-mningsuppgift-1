import { Router } from 'express';
import {
  getBlockchain,
  getAllBlocks,
  getLatestBlock,
  getBlockByIndex,
  mineBlock,
} from '../controllers/blockchainControllers.mjs';

const router = Router();

router.route('/').get(getBlockchain);

router.route('/blocks').get(getAllBlocks);
router.route('/blocks/latest').get(getLatestBlock);
router.route('/blocks/:index').get(getBlockByIndex);

router.route('/mine').post(mineBlock);

export default router;
