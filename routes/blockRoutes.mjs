import express from 'express';
import {
  getAllBlocks,
  createNewBlock,
} from '../controllers/blockController.mjs';

const router = express.Router();

router.route('/').get(getAllBlocks).post(createNewBlock);

export default router;
