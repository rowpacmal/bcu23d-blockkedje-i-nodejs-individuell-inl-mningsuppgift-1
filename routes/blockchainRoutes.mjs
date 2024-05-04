import { Router } from 'express';
import {
  getBlockchain,
  getAllBlocks,
  getLatestBlock,
  getBlockByIndex,
  mineBlock,
  synchronizeChain,
} from '../controllers/blockchainController.mjs';

const router = Router();

router.route('/').get(getBlockchain);

router.route('/blocks').get(getAllBlocks);
router.route('/blocks/latest').get(getLatestBlock);
router.route('/blocks/:index').get(getBlockByIndex);

router.route('/mine').post(mineBlock);

router.route('/consensus').get(synchronizeChain);

export default router;
