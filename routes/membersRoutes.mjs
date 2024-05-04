import { Router } from 'express';
import {
  getMemberNodes,
  createNode,
} from '../controllers/membersController.mjs';

const router = Router();

router.route('/').get(getMemberNodes);

router.route('/register-node').post(createNode);

export default router;
