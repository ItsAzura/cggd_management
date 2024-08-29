import express from 'express';
import {
  getAllOrder,
  getTotalAmount,
  getCountOrder,
  getTotalAmountEveryMonth,
  getCountCategory,
} from '../services/order.service.js';
const router = express.Router();

router.get('/', getAllOrder);
router.get('/total_amount', getTotalAmount);
router.get('/count_order', getCountOrder);
router.get('/total_amount_every_month', getTotalAmountEveryMonth);
router.get('/count_category', getCountCategory);

export default router;
