import express from 'express';

const router = express.Router();

router.route('/').get((req, res, next) => {
  res.json({ msg: 'Hej på dig' });
});

export default router;
